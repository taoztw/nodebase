"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z
	.object({
		email: z.email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters long"),
		confirmPassword: z.string().min(6, "Password must be at least 6 characters long")
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisteForm() {
	const router = useRouter();
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	async function onSubmit(values: RegisterFormValues) {
		console.log(values);
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.email.split("@")[0],
				callbackURL: "/"
			},
			{
				onSuccess: () => {
					toast.success("注册成功");
				},
				onError: ctx => {
					toast.error(`注册失败: ${ctx.error.message}`);
				}
			}
		);
	}

	const isPending = form.formState.isSubmitting;
	return (
		<div className="flex flex-col gap-8">
			<Card>
				<CardHeader className="text-center">Sing Up</CardHeader>
				<CardDescription className="text-center">Register your account</CardDescription>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
							<div className="grid gap-6">
								<div className="flex flex-col gap-4">
									<Button variant="outline" className="w-full" type="button" disabled={isPending}>
										<Image src="/logo/github.svg" alt="GitHub" width={18} height={18} />
										Continue with Github
									</Button>
									<Button variant="outline" className="w-full" type="button" disabled={isPending}>
										<Image src="/logo/google.svg" alt="Google" width={18} height={18} />
										Continue with Google
									</Button>
								</div>
							</div>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="your email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="******" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Comfirm Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="******" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full" disabled={isPending}>
								Register
							</Button>

							<div className="text-sm text-center">
								Already have an account?{" "}
								<Link href="/login" className="underline underline-offset-4">
									Login In
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
