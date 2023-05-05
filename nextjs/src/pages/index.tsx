import { ContentPage, getContentPages } from '@ssg-demo/cms';
import Link from 'next/link';

export default function Home({ pages }: any) {
    return (
        <>
            <div>
                <p>Select a page:</p>
                <ul>
                    {pages.map((page: ContentPage) => (
                        <li key={page.url}>
                            <Link key={page.url} href={page.url}>
                                {page.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const pages = await getContentPages();
    return { props: { pages } };
}
