import SignOutButton from "@/feature/auth/components/signOutButton";
import Workflow from "@/feature/tmp/workflow";
import { requireAuth } from "@/lib/auth-utils";

export default async function Home() {
	await requireAuth();

	return (
		<div>
			Home
			<Workflow />
			<SignOutButton />
		</div>
	);
}
