"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreHorizontal, ShieldCheck } from "lucide-react";
import { API_URLS } from "@/app/api/url";
import Image from "next/image";

interface Experience {
  id: number;
  position: string;
  company: string;
  company_logo: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  institution_logo: string;
  start_date: string;
  end_date: string;
}

interface Profile {
  id: number;
  name: string;
  headline: string;
  avatar: string;
  location: string;
  connections: number;
  about: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: { id: number; title: string; description: string; url: string }[];
  contact: { email: string; phone: string; website: string; linkedin: string };
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Skeleton className="w-full h-40 rounded-lg" />
        <Skeleton className="w-1/2 h-6 mt-4" />
        <Skeleton className="w-3/4 h-5 mt-2" />
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
    <div className="max-w-3xl mx-auto md:p-6 p-0 space-y-6">
      <Card className="relative w-full max-w-2xl p-6 shadow-lg rounded-xl overflow-hidden">
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
