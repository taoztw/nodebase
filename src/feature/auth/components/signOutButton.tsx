"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
	const router = useRouter();
	async function handleSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
				}
			}
		});
	}
	return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutButton;
