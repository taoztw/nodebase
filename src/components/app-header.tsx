import { SidebarTrigger } from "./ui/sidebar";

export const AppHeader = () => {
	return (
		<header className="flex h-14 items-center border-b px-4 bg-background gap-2">
			<SidebarTrigger />
		</header>
	);
};
