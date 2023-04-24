import { Stack } from 'contentstack';
import { ContentPage } from '~/types/pages';
import { NuxtRoute } from '~/types/route';

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

    const contentPageRouteData: Array<NuxtRoute<ContentPage>> = [];
    result[0].forEach((pageData: any) => {
        const contentPage: ContentPage = {
            locale: pageData.locale,
            pageContent: pageData.page_content,
            subtext: pageData.subtext,
            title: pageData.title,
            uid: pageData.uid,
        };
        contentPageRouteData.push({
            payload: contentPage,
            route: pageData.url,
        });
    });
    return contentPageRouteData;
}

export async function fetchContentPage(url: string): Promise<ContentPage> {
    console.log('Fetching data for:', url);
    const config = useRuntimeConfig();
    const stack = Stack({
        api_key: config?.public?.contentstackApikey,
        delivery_token: config?.public?.contentstackDeliverytoken,
        environment: config?.public?.contentstackEnvironment,
    });
    const contentType = 'schouls_content_page';
    const query = stack.ContentType(contentType).Query();
    const result: Array<any> = await query.where('url', url).toJSON().find();

    const pageData = result[0][0];
    return {
        locale: pageData.locale,
        pageContent: pageData.page_content,
        subtext: pageData.subtext,
        title: pageData.title,
        uid: pageData.uid,
    };
}
