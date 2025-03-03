"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Info from "./(homePageComponents)/Info";
import Leagues from "../../../components/home/Leagues";
import TextBox from "@/components/home/TextBox";
import ScheduleComponent from "@/components/home/schedule/Schedule";
import RegistrationTable from "@/components/home/RegistrationTable";
import { useEffect, useState } from "react";
import { EventData } from "../home2/layout";
import axios from "axios";
import { API_URLS } from "@/app/api/url";

const HomePage = () => {
  const [eventData, setEventData] = useState<EventData>();
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.INFO);
        setEventData(response.data);
      } catch (error) {
        console.log("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URLS.QUALIFICATION);
        setText(response.data.text);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Tabs defaultValue="info">
      <ScrollArea className="overflow-hidden">
        <TabsList>
          <TabsTrigger value="info">info</TabsTrigger>
          <TabsTrigger value="leagues">Leagues</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="travel">Travel</TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="info">
        <Info />
      </TabsContent>
      <TabsContent value="leagues">
        <Leagues />
      </TabsContent>
      <TabsContent value="qualifications">
        <div
          id="qualifications"
          className="rounded-2xl p-4 xl:p-6 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 max-h-[300px] overflow-y-auto"
        >
          <TextBox
            title="Qualification"
            text={text}
            img={eventData?.poster}
            html={true}
          />
        </div>
      </TabsContent>
      <TabsContent value="schedule">
        <ScheduleComponent />
      </TabsContent>
      <TabsContent value="guidelines">
        <RegistrationTable />
      </TabsContent>
      <TabsContent value="travel">
        <div
          className="rounded-2xl p-4 xl:p-6 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 max-h-[300px] overflow-y-auto"
          id="travel"
        >
          <TextBox
            title="Travel"
            text={text}
            img={eventData?.poster}
            html={true}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default HomePage;
