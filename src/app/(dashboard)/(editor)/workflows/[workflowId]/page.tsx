interface PageProps {
	params: Promise<{ workflowId: string }>;
}

const Page = async ({ params }: PageProps) => {
	const { workflowId } = await params;
	return <div>Credential ID: {workflowId}</div>;
};

export default Page;
