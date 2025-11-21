import { createAzure } from "@ai-sdk/azure";

export const azure = createAzure({
	resourceName: process.env.AZURE_RESOURCE_NAME, // Azure resource name
	apiKey: process.env.AZURE_API_KEY // Azure
});
