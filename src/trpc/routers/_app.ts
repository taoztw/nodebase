import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
	getUsers: baseProcedure.query(opts => {
		return prisma.user.findMany();
	}),
	testAi: baseProcedure.mutation(async () => {
		await inngest.send({
			name: "execute/ai",
			data: {}
		});
	}),
	createWorkflow: baseProcedure.mutation(async () => {
		await inngest.send({
			name: "test/hello.world",
			data: {
				email: "ta@qq.com"
			}
		});
		// await prisma.workflow.create({
		// 	data: {
		// 		id: `workflow_${Date.now()}`,
		// 		name: `New Workflow_${Date.now()}`
		// 	}
		// });
		return { success: true, message: "Workflow已创建" };
	}),
	getWorkflows: baseProcedure.query(async () => {
		return prisma.workflow.findMany();
	})
});
// export type definition of API
export type AppRouter = typeof appRouter;
