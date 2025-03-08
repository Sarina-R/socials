import { MDXRemoteSerializeResult } from "next-mdx-remote";

// Brand dddddddddddddddddddd
export interface Brand {
  name: string;
  primaryColor: string;
  logo: string;
  poster: string;
}

// top Bar rrrrrrrrrrrrrrrrrrrr
export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}
export interface NavItem {
  name: string;
  path?: string;
  dropdown?: { name: string; path: string }[];
}
export interface Menu {
  topBar: {
    linkText: string;
    linkUrl: string;
    socials: SocialLink[];
  };
  navItems: NavItem[];
  ctaButton: CTAButton;
}
export interface CTAButton {
  text: string;
  path: string;
}

// Hero Section nnnnnnnnnnnnnn
export interface HeroSection {
  type: "hero";
  bg: string;
  title: string | MDXRemoteSerializeResult;
  description: string | MDXRemoteSerializeResult;
  time_string: string;
  country: string;
  city: string;
  btnName?: string;
  btnURL?: string;
}

// Categories ssssssssssssssssss
export interface LeagueItems {
  id: number;
  title: string;
  img: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  img: string;
  items: LeagueItems[];
}

export interface CategoriesSection {
  type: "categories";
  title?: string;
  items: CategoryItem[];
  style: string;
}

// All lllllllllllllllllllll
export type Section = HeroSection | CategoriesSection;

export interface ApiResponse {
  brand: Brand;
  menu: Menu;
  sections: Section[];
}
