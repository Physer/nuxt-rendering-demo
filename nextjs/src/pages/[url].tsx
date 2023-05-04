import { Stack } from 'contentstack';

const stack = Stack({
    api_key: process.env.CONTENTSTACK_APIKEY || '',
    delivery_token: process.env.CONTENTSTACK_DELIVERYTOKEN || '',
    environment: process.env.CONTENTSTACK_ENVIRONMENT || '',
});
const pages: Array<any> = [];

export default function CmsPage({ currentPage }: any) {
    return (
        <>
            <div>
                <p>Title: {currentPage.title}</p>
                <p>Subtext: {currentPage.subtext}</p>
                <div
                    dangerouslySetInnerHTML={{
                        __html: currentPage.page_content,
                    }}
                ></div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const query = stack.ContentType('schouls_content_page').Query();
    const result: Array<any> = await query.toJSON().find();
    for (const pageItem of result[0]) {
        if (pageItem) {
            pages.push(pageItem);
        }
    }
    const paths = pages.map((page) => ({
        params: { url: page.url.split('/')[1] },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
    const currentPage = pages.find((page) => page.url === `/${params.url}`);
    return { props: { currentPage } };
}
