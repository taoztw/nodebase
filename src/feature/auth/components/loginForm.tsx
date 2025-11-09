"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
	const router = useRouter();
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	async function onSubmit(values: LoginFormValues) {
		await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
				callbackURL: "/"
			},
			{
				onSuccess: () => {
					toast.success("登录成功");
				},
				onError: ctx => {
					toast.error(`登录失败: ${ctx.error.message}`);
				}
			}
		);
	}

	const isPending = form.formState.isSubmitting;
	return (
		<div className="flex flex-col gap-8">
			<Card>
				<CardHeader className="text-center">Welcom back</CardHeader>
				<CardDescription className="text-center">Login to continue</CardDescription>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
							<div className="grid gap-6">
								<div className="flex flex-col gap-4">
									<Button variant="outline" className="w-full" type="button" disabled={isPending}>
										Continue with Github
									</Button>
									<Button variant="outline" className="w-full" type="button" disabled={isPending}>
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

							<Button type="submit" variant="default" className="w-full" disabled={isPending}>
								Login
							</Button>

							<div className="text-sm text-center">
								Don&apos;t have an account?{" "}
								<Link href="/register" className="underline underline-offset-4">
									Sign Up
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
