"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, Facebook, Link2, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ApiResponse, SocialLink } from "./type";
import { API_URLS } from "@/app/api/url";

// Social Icon Component
const SocialIcon = ({ social }: { social: SocialLink }) => {
  const getIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      default:
        return <Link2 className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 360 }}
      whileTap={{ scale: 0.9 }}
      className="transition-colors"
    >
      {getIcon(social.icon)}
    </motion.div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navData, setNavData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URLS.DYNAMIC_PAGE);
        const data: ApiResponse = await response.json();
        setNavData(data);
      } catch (error) {
        console.error("Failed to fetch navigation data", error);
      }
    }
    fetchData();
  }, []);

  if (!navData)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center text-white font-futura"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-transparent border-white rounded-full"
        />
      </motion.div>
    );

  const primaryColor = navData.brand.primaryColor;

  return (
    <div className="font-futura">
      {/* Top Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="text-white flex items-center justify-between px-6 py-3 text-sm sticky top-0 z-50"
        style={{
          background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}80)`,
        }}
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="font-semibold tracking-widest uppercase"
        >
          {navData.brand.name}
        </motion.span>

        <Link href={navData.menu.topBar.linkUrl}>
          <motion.p
            whileHover={{ x: 5 }}
            className="text-neutral-300 flex text-xs items-center gap-1"
          >
            <Link2 className="w-4 h-4" />
            {navData.menu.topBar.linkText}
          </motion.p>
        </Link>

        <div className="flex gap-6 items-center">
          {navData.menu.topBar.socials.map((social) => (
            <Link key={social.name} href={social.url}>
              <SocialIcon social={social} />
            </Link>
          ))}
          <motion.div whileHover={{ scale: 1.1 }} className="h-8 w-20 relative">
            <Image
              src="https://canada.firaworldcup.org/wp-content/uploads/2020/11/logoLight-1-768x356.png"
              alt="Fira"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/home3">
            <motion.div whileHover={{ rotate: 5 }}>
              <Image
                src={navData.brand.logo}
                alt={navData.brand.name}
                width={120}
                height={50}
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex space-x-8 relative px-4 mx-4 overflow-auto items-center">
            {navData.menu.navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                className="group relative"
              >
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300 dark:hover:text-[color:var(--primaryColor)] hover:text-[color:var(--primaryColor)] transition-colors"
                        style={
                          {
                            "--primaryColor": primaryColor,
                          } as React.CSSProperties
                        }
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-52 rounded-xl shadow-xl border"
                      style={{ borderColor: `${primaryColor}20` }}
                    >
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            href={subItem.path}
                            className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-[color:var(--primaryColor)] hover:bg-[color:var(--primaryColor)]/10 transition-colors"
                            style={
                              {
                                "--primaryColor": primaryColor,
                              } as React.CSSProperties
                            }
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.path || "#"}
                    className="font-semibold text-gray-700 dark:text-gray-300 dark:hover:text-[color:var(--primaryColor)] hover:text-[color:var(--primaryColor)] transition-colors"
                    style={
                      { "--primaryColor": primaryColor } as React.CSSProperties
                    }
                  >
                    {item.name}
                  </Link>
                )}
                <motion.div
                  className="absolute -bottom-1 h-1"
                  style={{ backgroundColor: primaryColor }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <Link href={navData.menu.ctaButton.path} className="hidden md:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                className="shadow-lg text-white "
                style={{ backgroundColor: primaryColor }}
              >
                {navData.menu.ctaButton.text}
              </Button>
            </motion.div>
          </Link>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <motion.button whileTap={{ scale: 0.9 }} className="md:hidden">
                <Menu className="w-6 h-6" />
              </motion.button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-6">
                {navData.menu.navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button className="flex justify-between w-full text-left font-semibold text-gray-700 dark:text-gray-300">
                          {item.name}
                          <ChevronDown className="w-4 h-4 dark:hover:text-[color:var(--primaryColor)] hover:text-[color:var(--primaryColor)] transition-colors" />
                        </button>
                        <div className="pl-4 mt-2 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.path}
                              className="block text-gray-600 dark:text-neutral-300 dark:hover:text-[color:var(--primaryColor)] hover:text-[color:var(--primaryColor)] transition-colors"
                              style={
                                {
                                  "--primaryColor": primaryColor,
                                } as React.CSSProperties
                              }
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.path || "#"}
                        className="block text-gray-700 dark:text-gray-300 dark:hover:text-[color:var(--primaryColor)] hover:text-[color:var(--primaryColor)] transition-colors"
                        style={
                          {
                            "--primaryColor": primaryColor,
                          } as React.CSSProperties
                        }
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <Link
                  href={navData.menu.ctaButton.path}
                  className="md:hidden block"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="default"
                      className="shadow-lg text-white "
                      style={{ backgroundColor: primaryColor }}
                    >
                      {navData.menu.ctaButton.text}
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
