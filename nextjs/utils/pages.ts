import { Stack } from 'contentstack';
const stack = Stack({
    api_key: process.env.CONTENTSTACK_APIKEY || '',
    delivery_token: process.env.CONTENTSTACK_DELIVERYTOKEN || '',
    environment: process.env.CONTENTSTACK_ENVIRONMENT || '',
});
export async function getContentPages(): Promise<Array<ContentPage>> {
    const pages = [];
    const query = stack.ContentType('schouls_content_page').Query();
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
