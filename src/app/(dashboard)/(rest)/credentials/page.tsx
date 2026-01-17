import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
	await requireAuth();
	return <div>credentials Page</div>;
};

export default Page;
