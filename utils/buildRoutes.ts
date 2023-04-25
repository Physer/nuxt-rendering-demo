import { Stack } from 'contentstack';

const stack = Stack({
    api_key: process.env.NUXT_PUBLIC_CONTENTSTACK_APIKEY || '',
    delivery_token: process.env.NUXT_PUBLIC_CONTENTSTACK_DELIVERYTOKEN || '',
    environment: process.env.NUXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || '',
});
export async function buildRoutes(
    contentType: Array<string>
): Promise<Array<string>> {
    console.log('Fetching URLs');
    const allPages: Array<string> = [];
    const contentTypesToQuery: Array<string> = [];
    contentTypesToQuery.push(...contentType);
    for (const contentType of contentTypesToQuery) {
        const query = stack.ContentType(contentType).Query();
        const result: Array<any> = await query.toJSON().find();
        for (const pageItem of result[0]) {
            const url = pageItem.url;
            if (url) {
                allPages.push(url);
            }
        }
    }
    console.log(`Fetched ${allPages.length} pages`);
    return allPages;
}
