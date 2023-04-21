type ContentstackPage = {
  locale: string;
  uid: string;
};

export type ContentPage = ContentstackPage & {
  title: string;
  subtext: string;
  pageContent: string;
};
