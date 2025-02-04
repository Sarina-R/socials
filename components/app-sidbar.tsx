import { HomeIcon, Menu, Instagram, Twitter, Facebook } from "lucide-react";

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
import Link from "next/link";

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

const learn = [
  {
    title: "academy",
    url: "",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <Link href="/explore">
              <HomeIcon />
              <span>Explore</span>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton asChild>
            <Link href="/explore">
              <Menu />
              <span>Feed</span>
            </Link>
          </SidebarMenuButton>

          <SidebarGroupLabel>Socials</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
