"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { API_URLS } from "@/app/api/url";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Achievement, ActivityType, Profile } from "./type";
import Image from "next/image";
import Activity from "./Activity";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(API_URLS.ACTIVITY);
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities", error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(API_URLS.USER_PROFILE);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(API_URLS.AWARD);
        setAchievements(response.data.achievements);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto md:p-6 p-0 space-y-6">
        <Card className="p-6 flex items-center space-x-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex-1">
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-1/2 h-5 mt-2" />
            <Skeleton className="w-1/3 h-4 mt-2" />
          </div>
        </Card>

        <Card className="p-6">
          <Skeleton className="w-1/3 h-6 mb-2" />
          <Separator className="my-3" />
          <Skeleton className="w-full h-24" />
        </Card>

        <Card className="p-6">
          <Skeleton className="w-1/3 h-6 mb-2" />
          <Separator className="my-3" />
          {[...Array(2)].map((_, i) => (
            <div key={i} className="mb-4 flex space-x-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="w-1/2 h-5 mb-2" />
                <Skeleton className="w-1/3 h-4 mb-2" />
                <Skeleton className="w-1/4 h-3" />
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-6">
          <Skeleton className="w-1/3 h-6 mb-2" />
          <Separator className="my-3" />
          {[...Array(2)].map((_, i) => (
            <div key={i} className="mb-4 flex space-x-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="w-1/2 h-5 mb-2" />
                <Skeleton className="w-1/3 h-4 mb-2" />
                <Skeleton className="w-1/4 h-3" />
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-6 overflow-hidden">
          <Skeleton className="w-1/3 h-6 mb-2" />
          <Separator className="my-3" />
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-16 h-6 rounded-md" />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Skeleton className="w-1/3 h-6 mb-2" />
          <Separator className="my-3" />
          {[...Array(2)].map((_, i) => (
            <div key={i} className="mb-4">
              <Skeleton className="w-1/2 h-5 mb-2" />
              <Skeleton className="w-full h-12 mb-2" />
              <Skeleton className="w-1/4 h-6" />
            </div>
          ))}
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-red-500 text-lg font-semibold">
        Profile not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto md:p-6 p-0 space-y-6 overflow-hidden">
      <Card className="relative w-full p-6 shadow-lg rounded-xl overflow-hidden">
        <video
          src="https://files-us-east-1.t-cdn.net/files/1GG2rmxcOLAUjnt5zTqoY"
          className="absolute top-[-10rem] left-0  w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 rounded-full absolute top-6 right-0">
            <AvatarImage
              src={profile.avatar}
              alt={profile.name}
              className="object-cover"
            />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="relative flex items-center space-x-4 pt-24">
          <div className="flex-1">
            <h2 className="text-2xl font-bold flex items-center gap-1">
              {profile.name}
            </h2>
            <p className="text-neutral-600">{profile.headline}</p>
            <p className="text-sm text-neutral-500">
              {profile.location} • {profile.connections}+ Connections
            </p>

            <div className="mt-3 flex space-x-2">
              <Button className="bg-black dark:bg-white">Connect</Button>
              <Button variant="outline">Message</Button>
              <Button variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">About</h3>
        <Separator className="my-3" />
        <p className="text-neutral-600 dark:text-neutral-300 mt-2">
          {profile.about}
        </p>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <h3 className="text-xl font-semibold">Award</h3>
          <Separator className="my-3" />
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.length > 0 ? (
            achievements.map((award) => (
              <div key={award.award_id} className="flex flex-col gap-1">
                <h4 className="text-lg font-medium">{award.title}</h4>
                <p className="text-sm text-neutral-500">
                  {award.event_name || award.community_name} -{" "}
                  {award.year || award.event_date}
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">
                  {award.description}
                </p>
                <span className="text-xs font-semibold">{award.category}</span>
              </div>
            ))
          ) : (
            <p className="text-neutral-500">No awards or achievements found.</p>
          )}
        </CardContent>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">Experience</h3>
        {profile.experience.map((job) => (
          <div key={job.id} className="mb-4">
            <Separator className="my-3" />
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={job.company_logo}
                  alt={job.company}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{job.position}</h4>
                <p className="text-sm text-neutral-500">{job.company}</p>
                <p className="text-xs text-neutral-400">
                  {job.start_date} - {job.end_date || "Present"}
                </p>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mt-2">
              {job.description}
            </p>
          </div>
        ))}
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">Activity</h3>
        <Separator className="my-3" />
        <ScrollArea className="overflow-hidden">
          <div className="flex space-x-4 p-4">
            {activities.map((activity, index) => (
              <Activity key={index} activity={activity} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">Education</h3>
        <Separator className="my-3" />
        {profile.education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={edu.institution_logo}
                  alt={edu.institution}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{edu.degree}</h4>
                <p className="text-sm text-neutral-500">{edu.institution}</p>
                <p className="text-xs text-neutral-400">
                  {edu.start_date} - {edu.end_date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">Skills</h3>
        <Separator className="my-3" />
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">Projects</h3>
        <Separator className="my-3" />
        {profile.projects.map((project) => (
          <div key={project.id} className="mb-4">
            <h4 className="text-lg font-semibold">{project.title}</h4>
            <p className="text-neutral-600 dark:text-neutral-300">
              {project.description}
            </p>
            <Button asChild className="mt-2">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                View Project <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        ))}
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">Contact</h3>
        <Separator className="my-3" />
        <p className="text-neutral-600 dark:text-neutral-300">
          <strong className="text-black dark:text-white px-1">Email:</strong>
          {profile.contact.email}
        </p>
        <p className="text-neutral-600 dark:text-neutral-300">
          <strong className="text-black dark:text-white px-1">Phone:</strong>
          {profile.contact.phone}
        </p>
        <p className="sm:flex inline text-neutral-600 dark:text-neutral-300">
          <strong className="text-black dark:text-white px-1">Website:</strong>
          <a
            href={profile.contact.website}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{profile.contact.website}</p>
          </a>
        </p>
        <p className="sm:flex inline text-neutral-600 dark:text-neutral-300">
          <strong className="text-black dark:text-white px-1">LinkedIn:</strong>
          <a
            href={profile.contact.linkedin}
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>{profile.contact.linkedin}</p>
          </a>
        </p>
      </Card>
    </div>
  );
};

export default ProfilePage;
