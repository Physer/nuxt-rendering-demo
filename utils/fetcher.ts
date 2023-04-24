import * as Contentstack from "contentstack";
import { ContentPage } from "~/types/pages";

export async function fetchContentPage(url: string): Promise<ContentPage> {
  const config = useRuntimeConfig();
  const stack = Contentstack.Stack({
    api_key: config?.public?.contentstackApikey,
    delivery_token: config?.public?.contentstackDeliverytoken,
    environment: config?.public?.contentstackEnvironment,
  });
  const contentType = "schouls_content_page";
  const query = stack.ContentType(contentType).Query();
  const result: Array<any> = await query.where("url", url).toJSON().find();

  const pageData = result[0][0];
  if (!pageData) {
    throw new Error(`Unable to find data for the URL: ${url}`);
  }

  return {
    locale: pageData.locale,
    pageContent: pageData.page_content,
    subtext: pageData.subtext,
    title: pageData.title,
    uid: pageData.uid,
  };
}
