import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Info from "./(homePageComponents)/Info";

const HomePage = () => {
  return (
    <Tabs defaultValue="info">
      <ScrollArea className="overflow-hidden">
        <TabsList>
          <TabsTrigger value="info">info</TabsTrigger>
          <TabsTrigger value="leagues">Leagues</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="venue">Venue</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="travel">Travel</TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="info">
        <Info />
      </TabsContent>
      <TabsContent value="leagues">leagues</TabsContent>
      <TabsContent value="qualifications">qualifications</TabsContent>
      <TabsContent value="schedule">schedule</TabsContent>
      <TabsContent value="venue">venue</TabsContent>
      <TabsContent value="guidelines">guidelines</TabsContent>
      <TabsContent value="travel">travel</TabsContent>
    </Tabs>
  );
};

export default HomePage;
