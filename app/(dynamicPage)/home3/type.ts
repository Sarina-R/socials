export interface Brand {
  name: string;
  primaryColor: string;
  logo: string;
  poster: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
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

export interface NavItem {
  name: string;
  path?: string;
  dropdown?: { name: string; path: string }[];
}

export interface CTAButton {
  text: string;
  path: string;
}

export interface HeroSection {
  type: "hero";
  bg: string;
  title: string;
  description: string;
  time_string: string;
  country: string;
  city: string;
  style: string;
}

export interface CategoriesSection {
  type: "categories";
  title: string;
  description: string;
  items: { firaChalenge: CategoryItem[] }[];
}

export interface CategoryItem {
  id: number;
  name: string;
  img: string;
}

export type Section = HeroSection | CategoriesSection;

export interface ApiResponse {
  brand: Brand;
  menu: Menu;
  sections: Section[];
}
