"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect } from "react";
import HelpCard from "./HelpCard";

const HelpCenterPage = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <div
        className="bg-cover bg-center h-[220px] flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://tribe-s3-production.imgix.net/pNjC7h1dgJgePWHQA7krF?w=2000&auto=compress')",
        }}
      >
        <h1 className="text-xl font-medium">Welcome to the Help Center</h1>
        <h2 className="text-4xl font-bold">How can we help you?</h2>
        <div className="relative mt-4 w-[60%]">
          <Input
            type="text"
            placeholder="Search for answers"
            className="pr-12"
          />
          <Search className="absolute top-1.5 right-3 text-gray-400" />
        </div>
      </div>

      <div className="px-6 py-10 text-white">
        <h3 className="text-2xl font-bold mb-6">Find articles by topic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HelpCard
            title="Getting Started"
            iconUrl="https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress"
            links={[
              "How to get Support",
              "Community&apos;s access settings",
              "Use Keyboard Shortcuts",
            ]}
          />
          <HelpCard
            title="Account & Billing"
            iconUrl="https://tribe-s3-production.imgix.net/prejBMPH4Yy5SRtNNzxkS?w=1000&auto=compress"
            links={[
              "Accessing your billing details",
              "Bettermode&apos;s Pricing and Plans",
              "Forgot your password?",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
