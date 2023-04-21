import { Stack } from "contentstack";
import { ContentPage } from "~/types/pages";

export async function fetchContentPage(): Promise<ContentPage> {
  const requestedUrl = window.location.pathname;
  const config = useRuntimeConfig();
  const stack = Stack({
    api_key: config?.public?.contentstackApikey,
    delivery_token: config?.public?.contentstackDeliverytoken,
    environment: config?.public?.contentstackEnvironment,
  });
  const contentType = "schouls_content_page";
  const query = stack.ContentType(contentType).Query();
  const result = await query.where("url", requestedUrl).toJSON().find();

  const pageData = result[0][0];
  if (!pageData) {
    throw new Error(`Unable to find data for the URL: ${requestedUrl}`);
  }

  return {
    locale: pageData.locale,
    pageContent: pageData.page_content,
    subtext: pageData.subtext,
    title: pageData.title,
    uid: pageData.uid,
  };
}
