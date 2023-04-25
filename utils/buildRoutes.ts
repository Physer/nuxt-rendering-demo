import { Stack } from 'contentstack';

const stack = Stack({
    api_key: process.env.NUXT_PUBLIC_CONTENTSTACK_APIKEY || '',
    delivery_token: process.env.NUXT_PUBLIC_CONTENTSTACK_DELIVERYTOKEN || '',
    environment: process.env.NUXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || '',
});
export async function buildRoutes(
    contentType?: string
): Promise<Array<string>> {
    console.log('Fetching URLs');
    const allPages: Array<string> = [];
    const contentTypesToQuery: Array<string> = [];
    if (contentType) {
        console.log('Using content type: ', contentType);
        contentTypesToQuery.push(contentType);
    } else {
        const types = await getContentTypes();
        console.log(`Found ${types.length} content types`);
        contentTypesToQuery.push(...types);
    }
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

async function getContentTypes(): Promise<Array<string>> {
    return (await stack.getContentTypes()).content_types.map(
        (type) => type.uid
    );
}
