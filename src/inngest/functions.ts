import { azure } from "@/lib/llms";
import * as Sentry from "@sentry/nextjs";
import { generateText } from "ai";
import { inngest } from "./client";

export const execute = inngest.createFunction(
	{ id: "execute-ai" },
	{ event: "execute/ai" },
	async ({ event, step, attempt, logger }) => {
		console.log("AI Execute Function triggered with event:");
		console.warn("hello warning");
		Sentry.logger.info("User triggered test log", { log_source: "sentry_test" });

		const { steps } = await step.ai.wrap("gpt5-generate-text", generateText, {
			model: azure("gpt-5-chat"),
			system: "You are a helpful assistant",
			prompt: "What is 2+2?",
			experimental_telemetry: {
				isEnabled: true,
				recordInputs: true,
				recordOutputs: true
			}
		});
		return {
			steps
		};
	}
);
