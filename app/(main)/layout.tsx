import { AppSidebar } from "@/components/app-sidbar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ThemeToggle } from "@/components/ThemToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  HomeIcon,
  Menu,
  Instagram,
  Twitter,
  Facebook,
  GraduationCap,
  CircleHelp,
} from "lucide-react";

const socialItems = [
  { title: "Instagram", url: "/connect-socials/instagram", icon: Instagram },
  { title: "Facebook", url: "/connect-socials/facebook", icon: Facebook },
  { title: "Twitter", url: "/connect-socials/twitter", icon: Twitter },
];

const learnItems = [
  { title: "Academy", url: "/learn/academy", icon: GraduationCap },
  { title: "Help Center", url: "/learn/help-center", icon: CircleHelp },
];

const exploreItems = [
  { title: "Explore", url: "/explore", icon: HomeIcon },
  { title: "Feed", url: "/feed", icon: Menu },
];

const groups = [
  { label: "Explore", items: exploreItems },
  { label: "Socials", items: socialItems },
  { label: "Learn", items: learnItems },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar groups={groups} />
      <div className="flex-1 p-4 w-[calc(100vw-17rem)]">
        <div className="flex justify-between items-center p-4">
          <div className="flex">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}
