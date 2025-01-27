import React from "react";
import XFeed from "./(overview)/X";
import Instagram from "./(overview)/Instagram";
import FaceBook from "./(overview)/FaceBook";

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

const ConnectSocialsPage: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-100">
      <div className="col-span-1">
        <XFeed />
      </div>
      <div className="col-span-1">
        <Instagram grid={false} />
      </div>
      <div className="col-span-1">
        <FaceBook />
      </div>
    </div>
  );
};

export default ConnectSocialsPage;
