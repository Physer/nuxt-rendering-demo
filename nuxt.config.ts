// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["contentstack"],
  },
  runtimeConfig: {
    public: {
      contentstackApikey: "",
      contentstackDeliverytoken: "",
      contentstackEnvironment: "dev",
    },
  },
});
