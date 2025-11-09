import SignOutButton from "@/feature/auth/components/signOutButton";
import { requireAuth } from "@/lib/auth-utils";

export default async function Home() {
	await requireAuth();

	return (
		<div>
			Home
			<SignOutButton />
		</div>
	);
}
