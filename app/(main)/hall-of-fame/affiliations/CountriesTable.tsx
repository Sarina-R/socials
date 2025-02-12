"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { API_URLS } from "@/app/api/url";
import { Countries } from "./page";
import Image from "next/image";
import axios from "axios";

const CountriesTable = () => {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.AFFILIATIONS);
        const sortedCountries = response.data.top_countries.sort(
          (a: Countries, b: Countries) => a.rank - b.rank
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = (countryId: number) => {
    setOpenDropdown(openDropdown === countryId ? null : countryId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🏆 Top Countries by Points</h2>
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="w-10 h-6 rounded-sm" />
                  <div>
                    <Skeleton className="w-32 h-5 mb-1" />
                    <Skeleton className="w-20 h-4" />
                  </div>
                </div>
                <Skeleton className="w-6 h-6" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {countries.map((country) => (
            <Card key={country.id}>
              <div
                className="flex items-center justify-between sm:p-4 p-2 cursor-pointer"
                onClick={() => toggleDropdown(country.id)}
              >
                <div className="flex items-center gap-4">
                  <p>{country.rank}.</p>
                  <div className="relative w-10 h-6">
                    <Image
                      src={country.countryFlag}
                      alt={country.countryName}
                      fill
                      className="rounded-sm border object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      {country.countryName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Points: {country.totalPoint}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`transition-transform ${
                    openDropdown === country.id ? "rotate-180" : ""
                  }`}
                />
              </div>
              {openDropdown === country.id && (
                <CardContent className="p-4 border-t bg-neutral-50 dark:bg-neutral-950">
                  {country.top3Teams.map((team) => (
                    <div
                      key={team.Name}
                      className="flex items-center gap-4 p-2 bg-white dark:bg-black rounded-md shadow-sm mb-2"
                    >
                      <div className="relative w-12 h-12">
                        <Image
                          src={team.Avatar}
                          alt={team.Name}
                          fill
                          className="object-cover rounded-full border"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{team.Name}</p>
                        <p className="text-sm text-gray-500">
                          Points: {team.Points}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesTable;
