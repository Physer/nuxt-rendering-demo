import { fetchContentPages } from './utils/fetcher';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    hooks: {
        'prerender:routes': async (ctx) => {
            (await fetchContentPages()).forEach((item) =>
                ctx.routes.add(item.route)
            );
        },
    },
    build: {
        transpile: ['contentstack'],
    },
    runtimeConfig: {
        public: {
            contentstackApikey: '',
            contentstackDeliverytoken: '',
            contentstackEnvironment: 'dev',
        },
    },
});
