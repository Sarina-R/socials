export interface Author {
  name: string;
}

export interface PostItem {
  id: string;
  url: string;
  title: string;
  content_text: string;
  content_html: string;
  date_published: string;
  authors: Author[];
  image?: string;
  favicon: string;
}

export interface FacebookResponse {
  version: string;
  title: string;
  home_page_url: string;
  feed_url: string;
  favicon: string;
  language: string;
  description: string;
  items: PostItem[];
}

export interface User {
  name: string;
  description: string;
  home_page_url: string;
  favicon: string;
}
