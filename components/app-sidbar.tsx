import { HomeIcon, Menu, Instagram, Twitter, Facebook } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemToggle";

const items = [
  {
    title: "Instagram",
    url: "/connect-socials/instagram",
    icon: Instagram,
  },
  {
    title: "Facebook",
    url: "/connect-socials/facebook",
    icon: Facebook,
  },
  {
    title: "Twitter",
    url: "/connect-socials/twitter",
    icon: Twitter,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <a href="/connect-socials">
              <HomeIcon />
              <span>Explore</span>
            </a>
          </SidebarMenuButton>

          <SidebarMenuButton asChild>
            <a href="/connect-socials">
              <Menu />
              <span>Feed</span>
            </a>
          </SidebarMenuButton>

          <SidebarGroupLabel>Socials</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Group 2</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
