import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
	{ id: "hello-world", retries: 3 },
	{ event: "test/hello.world" },
	async ({ event, step, attempt, logger }) => {
		logger.info(`Function started - Attempt ${attempt}`);

		// 使用较短的 sleep 时间进行测试
		await step.sleep("parse files", "3s");

		const workflow = await step.run("create_workflow", async () => {
			logger.info("Creating workflow...");

			return await prisma.workflow.create({
				data: {
					id: `workflow_${Date.now()}`,
					name: `New Workflow_${Date.now()}`
				}
			});
		});

		logger.info(`Workflow created: ${workflow.id}`);

		return {
			message: `Hello ${event.data.email}!`,
			workflowId: workflow.id,
			attempt
		};
	}
);
