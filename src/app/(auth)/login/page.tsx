import { LoginForm } from "@/feature/auth/components/loginForm";
import { requireUnAuth } from "@/lib/auth-utils";

const page = async () => {
	await requireUnAuth();
	return <LoginForm />;
};

export default page;
