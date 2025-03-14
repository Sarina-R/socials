"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
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
import { SocialLink } from "./type";
import { DataProvider, useData } from "@/hooks/DataProvider";

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

function LayoutContent({ children }: { children: React.ReactNode }) {
  const data = useData();

  if (!data) return null;

  const primaryColor = data.brand.primaryColor;

  return (
    <div className="font-futura">
      {/* Top Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="text-white bg-neutral-600 dark:bg-neutral-900 flex items-center justify-between px-6 py-3 text-sm"
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="font-semibold tracking-widest uppercase"
        >
          {data.brand.name}
        </motion.span>

        <Link href={data.menu.topBar.linkUrl}>
          <motion.p
            whileHover={{ x: 5 }}
            className="text-neutral-300 flex text-xs items-center gap-1"
          >
            <Link2 className="w-4 h-4" />
            {data.menu.topBar.linkText}
          </motion.p>
        </Link>

        <div className="flex gap-6 items-center">
          {data.menu.topBar.socials.map((social) => (
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
      <nav className="sticky top-0 z-40 bg-white/85 dark:bg-black/85 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/home3">
            <motion.div whileHover={{ rotate: 5 }}>
              <Image
                src={data.brand.logo}
                alt={data.brand.name}
                width={120}
                height={50}
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex space-x-8 relative px-4 mx-4 overflow-auto items-center">
            {data.menu.navItems.map((item) => (
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
                            href={subItem.path || "#"}
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
          <Link href={data.menu.ctaButton.path} className="hidden md:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                className="shadow-lg text-white"
                style={{ backgroundColor: primaryColor }}
              >
                {data.menu.ctaButton.text}
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
                {data.menu.navItems.map((item) => (
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
                              href={subItem.path || "#"}
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
                  href={data.menu.ctaButton.path}
                  className="md:hidden block"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="default"
                      className="shadow-lg text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {data.menu.ctaButton.text}
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {children}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataProvider>
      <LayoutContent>{children}</LayoutContent>
    </DataProvider>
  );
}
