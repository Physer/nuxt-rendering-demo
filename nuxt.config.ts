import { buildRoutes } from './utils/buildRoutes';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    hooks: {
        async 'nitro:config'(nitroConfig) {
            if (nitroConfig.dev) {
                return;
            }
            const routes = await buildRoutes();
            nitroConfig?.prerender?.routes?.push(...routes);
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
