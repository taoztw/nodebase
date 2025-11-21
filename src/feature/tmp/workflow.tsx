"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Workflow = () => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { data } = useQuery(trpc.getWorkflows.queryOptions());

	const testAi = useMutation(
		trpc.testAi.mutationOptions({
			onSuccess: () => {
				toast.success("AI Task executed.");
			}
		})
	);

	const create = useMutation(
		trpc.createWorkflow.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
				toast.success("Workflow队列中。");
			}
		})
	);
	return (
		<div>
			{JSON.stringify(data, null, 2)}

			<Button disabled={create.isPending} onClick={() => create.mutate()}>
				create
			</Button>
			<Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
				testAI
			</Button>
		</div>
	);
};

export default Workflow;
