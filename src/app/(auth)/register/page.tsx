import { RegisteForm } from "@/feature/auth/components/registerForm";
import { requireUnAuth } from "@/lib/auth-utils";

const page = async () => {
	await requireUnAuth();
	return <RegisteForm />;
};

export default page;
