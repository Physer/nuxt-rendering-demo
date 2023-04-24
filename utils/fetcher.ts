import { Stack } from 'contentstack';
import { ContentPage } from '~/types/pages';
import { NuxtRoute } from '~/types/route';

const allPageData: Array<NuxtRoute<ContentPage>> = [];
export async function fetchContentPages(): Promise<
    Array<NuxtRoute<ContentPage>>
> {
    console.log('Fetching URLs');
    const stack = Stack({
        api_key: process.env.NUXT_PUBLIC_CONTENTSTACK_APIKEY || '',
        delivery_token:
            process.env.NUXT_PUBLIC_CONTENTSTACK_DELIVERYTOKEN || '',
        environment: process.env.NUXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || '',
    });
    const contentType = 'schouls_content_page';
    const query = stack.ContentType(contentType).Query();
    const result: Array<any> = await query.toJSON().find();

    result[0].forEach((pageData: any) => {
        const contentPage: ContentPage = {
            locale: pageData.locale,
            pageContent: pageData.page_content,
            subtext: pageData.subtext,
            title: pageData.title,
            uid: pageData.uid,
        };
        allPageData.push({
            payload: contentPage,
            route: pageData.url,
        });
    });
    console.log(`Fetched ${allPageData.length} pages`);
    return allPageData;
}

export async function fetchContentPage(url: string): Promise<ContentPage> {
    console.log('Fetching data for:', url);
    const pageData = allPageData.find((item) => item.route === url)?.payload;
    if (!pageData) {
        const errorMessage = `Unable to find page data for ${url}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    return {
        locale: pageData.locale,
        pageContent: pageData.pageContent,
        subtext: pageData.subtext,
        title: pageData.title,
        uid: pageData.uid,
    };
}
