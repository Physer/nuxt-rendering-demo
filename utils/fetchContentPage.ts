import { Stack } from 'contentstack';
import { ContentPage } from '~/types/pages';
import { contentTypes } from './contentTypes';

export async function fetchContentPage(url: string): Promise<ContentPage> {
    console.log('Fetching data for URL:', url);
    const config = useRuntimeConfig();
    const stack = Stack({
        api_key: config?.public?.contentstackApikey,
        delivery_token: config?.public?.contentstackDeliverytoken,
        environment: config?.public?.contentstackEnvironment,
    });
    const query = stack.ContentType(contentTypes.contentPage).Query();
    const result: Array<any> = await query.where('url', url).toJSON().find();
    const pageData = result[0][0];
    if (!pageData) {
        throw new Error(`Unable to find page data for ${url}`);
    }
    return {
        locale: pageData.locale,
        pageContent: pageData.page_content,
        subtext: pageData.subtext,
        title: pageData.title,
        uid: pageData.uid,
    };
}
