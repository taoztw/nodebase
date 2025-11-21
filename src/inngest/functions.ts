import { azure } from "@/lib/llms";
import { generateText } from "ai";
import { inngest } from "./client";

export const execute = inngest.createFunction(
	{ id: "execute-ai" },
	{ event: "execute/ai" },
	async ({ event, step, attempt, logger }) => {
		const { steps } = await step.ai.wrap("gpt5-generate-text", generateText, {
			model: azure("gpt-5-chat"),
			system: "You are a helpful assistant",
			prompt: "What is 2+2?"
		});
		return {
			steps
		};
	}
);
