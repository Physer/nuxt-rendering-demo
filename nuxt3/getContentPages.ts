import { Stack } from 'contentstack';
import { PublicRuntimeConfig } from 'nuxt/schema';
export async function getContentPages(
    config: PublicRuntimeConfig
): Promise<Array<ContentPage>> {
    console.info('Using configuration', config);
    const stack = Stack({
        api_key: config?.contentstackApikey,
        delivery_token: config?.contentstackDeliverytoken,
        environment: config?.contentstackEnvironment,
    });
    const pages = [];
    console.info('Querying Contentstack');
    const query = stack.ContentType(config?.contentstackPagetype).Query();
    const result: Array<any> = await query.toJSON().find();
    for (const pageItem of result[0]) {
        if (pageItem) {
            pages.push(pageItem);
        }
    }
    return pages.map((page) => ({
        title: page.title,
        pageContent: page.page_content,
        subtext: page.subtext,
        url: page.url,
    }));
}

export type ContentPage = {
    title: string;
    subtext: string;
    pageContent: string;
    url: string;
};
