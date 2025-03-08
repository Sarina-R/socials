import { NextResponse } from "next/server";

const data = {
  brand: {
    name: "Fira Canada",
    primaryColor: "#c1102d",
    logo: "https://canada.firaworldcup.org/wp-content/uploads/2020/11/logo.png",
    poster:
      "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Screenshot-2025-02-13-at-12.56.18%E2%80%AFPM.png",
  },
  menu: {
    topBar: {
      linkText: "Go to FIRAWoldCup.org",
      linkUrl: "https://firaworldcup.org",
      socials: [
        {
          name: "Instagram",
          icon: "Instagram",
          url: "https://instagram.com/fira",
        },
      ],
    },
    navItems: [
      { name: "Home", path: "/home3" },
      {
        name: "About",
        dropdown: [
          { name: "Overview", path: "/home3/about/overview" },
          { name: "History", path: "/home3/about/history" },
        ],
      },
      {
        name: "Leagues",
        dropdown: [
          { name: "Junior", path: "/home3/leagues/junior" },
          { name: "Senior", path: "/home3/leagues/senior" },
        ],
      },
      { name: "Participants", path: "/home3/participants" },
      { name: "Organization", path: "/home3/organization" },
      { name: "Sponsors", path: "/home3/sponsors" },
      { name: "Contact", path: "/home3/contact" },
      { name: "Support Letters", path: "/home3/support-letters" },
      { name: "Schedule", path: "/home3/schedule" },
    ],
    ctaButton: {
      text: "Register Now",
      path: "/home3/register",
    },
  },
  sections: [
    {
      type: "hero",
      bg: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/MarkhamCivicCenter5.jpg/1200px-MarkhamCivicCenter5.jpg",
      title: "2nd <br/> **FIRA 2025 Canada Open** <br/> Competition",
      description:
        "Build! Compete! Learn! Connect! <br/> In one of the biggest robotics competitions in the world",
      time_string: "15-16 March 2025",
      country: "Canada",
      city: "Markham",
      btnName: "FIRA Canada 2025 Announcement File",
      btnURL:
        "https://docs.google.com/document/d/10MsSv6zPkPCfnC221fqKqSwhsBLkylee/edit?tab=t.0#heading=h.gjdgxs",
      style: "1",
    },
    {
      type: "About Challenges",
      title: "2nd <br/> FIRA 2025 Canada Open Competition",
      description:
        "Build! Compete! Learn! Connect! <br/> In one of the biggest robotics competitions in the world",
      items: [
        {
          id: 1001,
          name: "Fira Challenge",
          img: "https://canada.firaworldcup.org/wp-content/uploads/2023/09/123818-1-1024x683-1.jpg",
          items: [
            {
              title: "Autonomous Cars Simulation (U19/Pro)",
              img: "https://firaworldcup.org/wp-content/uploads/2023/11/maxresdefault-400x250.jpg",
            },
            {
              title: "Innovation and Business U19",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/IMG_0321-400x250.jpg",
            },
            {
              title: "Innovation and Business",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/Creativity1-400x250.png",
            },
            {
              title: "Autonomous Cars",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/123818-1-400x250.jpg",
            },
          ],
        },
        {
          id: 1002,
          name: "Fira Youth",
          img: "https://canada.firaworldcup.org/wp-content/uploads/2023/09/robotics-companies-roundup1-1.jpeg",
          items: [
            {
              title: "Autonomous Cars Simulation (U19/Pro)",
              img: "https://firaworldcup.org/wp-content/uploads/2023/11/maxresdefault-400x250.jpg",
            },
            {
              title: "Innovation and Business U19",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/IMG_0321-400x250.jpg",
            },
            {
              title: "Innovation and Business",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/Creativity1-400x250.png",
            },
            {
              title: "Autonomous Cars",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/123818-1-400x250.jpg",
            },
          ],
        },
        {
          id: 1003,
          name: "Fira Air",
          img: "https://canada.firaworldcup.org/wp-content/uploads/2023/09/imageCarousel.imageformat.lightbox.1086769395-scaled-1.jpg",
          items: [
            {
              title: "Autonomous Cars Simulation (U19/Pro)",
              img: "https://firaworldcup.org/wp-content/uploads/2023/11/maxresdefault-400x250.jpg",
            },
            {
              title: "Innovation and Business U19",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/IMG_0321-400x250.jpg",
            },
            {
              title: "Innovation and Business",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/Creativity1-400x250.png",
            },
            {
              title: "Autonomous Cars",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/123818-1-400x250.jpg",
            },
          ],
        },
        {
          id: 1004,
          name: "Fira Sport",
          img: "https://canada.firaworldcup.org/wp-content/uploads/2023/09/FIRA_2019_Gallery_Picture_9.webp",
          items: [
            {
              title: "Autonomous Cars Simulation (U19/Pro)",
              img: "https://firaworldcup.org/wp-content/uploads/2023/11/maxresdefault-400x250.jpg",
            },
            {
              title: "Innovation and Business U19",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/IMG_0321-400x250.jpg",
            },
            {
              title: "Innovation and Business",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/Creativity1-400x250.png",
            },
            {
              title: "Autonomous Cars",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/123818-1-400x250.jpg",
            },
          ],
        },
      ],
      style: "1",
    },
  ],
};

export async function GET() {
  return NextResponse.json(data);
}
