import Image from "next/image";
import Link from "next/link";

const Layout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		// <div className="bg-muted flex flex-col min-h-svh gap-6 p-6 md:p-10 justify-center items-center">
		// <div className="flex w-full items-center justify-center flex-col gap-4 ">

		<div className="bg-muted flex flex-col min-h-svh gap-6 p-6 md:p-10 justify-center">
			<div className="flex flex-col gap-4 justify-center max-w-sm mx-auto w-full">
				<Link href="/" className="flex items-center gap-2 justify-center font-medium">
					<Image src="/logo/logo.svg" alt="Nodebase" width={30} height={30} />
					NodeBase
				</Link>
				{children}
			</div>
		</div>
	);
};

export default Layout;
