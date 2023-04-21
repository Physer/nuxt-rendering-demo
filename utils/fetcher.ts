import { Stack } from "contentstack";

export async function fetchContentPages(): Promise<string> {
  const config = useRuntimeConfig();
  const stack = Stack({
    api_key: config?.public?.contentstackApikey,
    delivery_token: config?.public?.contentstackDeliverytoken,
    environment: config?.public?.contentstackEnvironment,
  });
  const contentType = "schouls_content_page";
  const query = stack.ContentType(contentType).Query();
  const result = await query.toJSON().find();
  return JSON.stringify(result);
}
