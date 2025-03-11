import { NextResponse } from "next/server";

const item1 = `
    # About Fira

    **FIRA Canada** is committed to promoting and developing rugby across Canada.

    ![Logo](https://canada.firaworldcup.org/wp-content/uploads/2020/11/logo.png)

    ## Our Mission

    Our goal is to build a stronger rugby community in Canada, focusing on grassroots development.

    ### Connect With Us

    Follow us on our social media platforms to stay updated:

    - [Instagram](https://instagram.com/fira)
    - [Twitter](https://twitter.com/fira)
  `;

const item2 = `
# FIRA Canada Overview

**FIRA Canada** is dedicated to advancing rugby at all levels. Here's a comprehensive look at what we offer:

## Key Features

### Grassroots Programs
We emphasize:
- *Youth development* through local training camps
- **Coach education** with certified instructors
- Community outreach events

### Event Highlights
> "The FIRA Canada Championship was a game-changer for youth rugby in 2024."  
> — *John Doe, Head Coach*

#### Upcoming Schedule
<div className="p-6">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <table className="min-w-full border-collapse bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <thead>
            <tr className="bg-purple-700">
              <th className="px-6 py-3 text-left text-lg font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-300 bg-white text-black">
              <tr className="hover:bg-gray-200 transition">
                <td className="px-6 py-4 font-medium">name</td>
                <td className="px-6 py-4">name</td>
                <td className="px-6 py-4">role</td>
                <td className="px-6 py-2">
                  status
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>

## Supported Formats
- **Unordered Lists:**
  - Training sessions
  - Equipment grants
  - Volunteer opportunities
    - Referee training
    - Event staffing

- **Ordered Lists:**
  1. Register your team
  2. Attend orientation
  3. Compete in qualifiers

## Media
![Rugby Action Shot](https://kabartolo.github.io/chicago-docs-demo/static/0a1b76564b2e630e6fcf0ce5cbdc1cb1/e5166/sahand-babali-unsplash.jpg "Players in action during the 2024 finals")

## Code Example
Here's a sample of our registration API:
\`\`\`json
{
  "team": {
    "name": "Toronto Titans",
    "division": "Junior",
    "registered": "2025-03-10"
  }
}
\`\`\`

*For more details, contact us at [info@firacanada.org](mailto:info@firacanada.org).*
`;

const data = {
  brand: {
    name: "Fira Canada",
    primaryColor: "#c1102d",
    logo: "https://canada.firaworldcup.org/wp-content/uploads/2020/11/logo.png",
    poster:
      "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Screenshot-2025-02-13-at-12.56.18%E2%80%AFPM.png",
    copyright: "2025 FIRA Canada © All rights reserved",
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
          { name: "About Fira", path: "/home3/aboutFira", MarkDownItem: item2 },
          {
            name: "About Fira Canada",
            path: "/home3/aboutFiraCanada",
            MarkDownItem: "",
          },
          { name: "Objective", path: "/home3/objective", MarkDownItem: item1 },
          {
            name: "FIRA Canada 2024 Report",
            path: "/home3/FiraCanada2024REport",
            MarkDownItem: "mew2",
          },
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
      type: "categories",
      title: "About Challenges",
      items: [
        {
          id: 1001,
          name: "Fira Challenge",
          img: "https://canada.firaworldcup.org/wp-content/uploads/2023/09/123818-1-1024x683-1.jpg",
          items: [
            {
              id: 10011,
              title: "Autonomous Cars Simulation (U19/Pro)",
              img: "https://firaworldcup.org/wp-content/uploads/2023/11/maxresdefault-400x250.jpg",
            },
            {
              id: 10012,
              title: "Innovation and Business U19",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/IMG_0321-400x250.jpg",
            },
            {
              id: 10013,
              title: "Innovation and Business",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/Creativity1-400x250.png",
            },
            {
              id: 10014,
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
              id: 10021,
              title: "Autonomous Cars Simulation (U19/Pro)",
              img: "https://firaworldcup.org/wp-content/uploads/2023/11/maxresdefault-400x250.jpg",
            },
            {
              id: 10022,
              title: "Innovation and Business U19",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/IMG_0321-400x250.jpg",
            },
            {
              id: 10023,
              title: "Innovation and Business",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/Creativity1-400x250.png",
            },
            {
              id: 10024,
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
              id: 10031,
              title: "Autonomous Cars Simulation (U19/Pro)",
              img: "https://firaworldcup.org/wp-content/uploads/2023/11/maxresdefault-400x250.jpg",
            },
            {
              id: 10032,
              title: "Innovation and Business U19",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/IMG_0321-400x250.jpg",
            },
            {
              id: 10033,
              title: "Innovation and Business",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/Creativity1-400x250.png",
            },
            {
              id: 10034,
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
              id: 10041,
              title: "Autonomous Cars Simulation (U19/Pro)",
              img: "https://firaworldcup.org/wp-content/uploads/2023/11/maxresdefault-400x250.jpg",
            },
            {
              id: 10042,
              title: "Innovation and Business U19",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/IMG_0321-400x250.jpg",
            },
            {
              id: 10043,
              title: "Innovation and Business",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/Creativity1-400x250.png",
            },
            {
              id: 10044,
              title: "Autonomous Cars",
              img: "https://firaworldcup.org/wp-content/uploads/2021/09/123818-1-400x250.jpg",
            },
          ],
        },
      ],
      style: "1",
    },
    {
      type: "parents",
      style: "1",
      items: [
        {
          id: 1,
          name: "Parents",
          items: [
            {
              id: 1,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2024/02/fira.png",
              link: "https://firaworldcup.org/",
            },
            {
              id: 2,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-13-2.png",
              link: "https://avisengine.com/",
            },
            {
              id: 3,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-31.png",
            },
            {
              id: 9,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-31.png",
              link: "https://firaworldcup.org/",
            },
            {
              id: 8,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-13-2.png",
              link: "https://avisengine.com/",
            },
            {
              id: 7,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-31.png",
            },
            {
              id: 4,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2024/02/fira.png",
              link: "https://firaworldcup.org/",
            },
            {
              id: 5,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-13-2.png",
              link: "https://avisengine.com/",
            },
            {
              id: 6,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-31.png",
            },
          ],
        },
        {
          id: 2,
          name: "Diamond Sponsors",
          items: [
            {
              id: 1,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2024/02/fira.png",
              link: "https://firaworldcup.org/",
            },
            {
              id: 2,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-13-2.png",
              link: "https://avisengine.com/",
            },
            {
              id: 3,
              logo: "https://canada.firaworldcup.org/wp-content/uploads/2025/02/Untitled-design-31.png",
            },
          ],
        },
      ],
    },
    {
      type: "about",
      name: "About Fira",
      title: "One of the OLDEST robotics competitions",
      description:
        "In 1996, the **Federation of International Robot-sports Association (FIRA)** was founded.  <br/>It is the *first robotics competition* and one of the most **advanced and influential** competitions globally.<br/>In 2023, as the **National Chapter of International RoboSports Association in Canada**,   <br/>it was officially established in **CANADA**. <br/>The **Second Canadian FIRA Robot Competition**, organized by the   <br/>**Canadian National Robotic Society (CNRS)**, will be launched in **Markham**   <br/>on **March 15-16th, 2025**.",
      links: [
        {
          title: "Visit FIRA official website",
          link: "https://firaworldcup.org/",
        },
        { title: "FIRA RoboWorld Official Website", link: "" },
      ],
      image:
        "https://canada.firaworldcup.org/wp-content/uploads/2024/09/DJI_0924-1536x1044.jpg",
      reverse: false,
    },
    {
      type: "about",
      name: "Learn more about FIRA Canada",
      title: "One of the OLDEST robotics competitions",
      links: [
        {
          title: "FIRA RoboWorld Official Website",
          link: "https://www.youtube.com/@FIRACANADA",
        },
      ],
      video: "https://www.youtube.com/embed/UYrXdnKIwZA?si=n8iqfZJjZ8Cbzh0c",
      reverse: true,
    },
    {
      type: "importantDates",
      name: "Dates",
      title: "Important Dates",
      description: "Mark it on your calandars",
      items: [
        {
          title: "Competition",
          description: "Register your team on the website",
          date: "2025-03-15T00:00:00Z",
          links: {
            text: "Pre-register Now",
            url: "https://events.avisengine.com/",
          },
        },
      ],
    },
    {
      type: "footer",
      title: "FIRA Canada Regional Chapter",
      contacts: {
        registration_email: "infocanada@firaworldcup.org",
        address: "187 Finch ave. West Toronto",
      },
      links: [
        {
          name: "Federation of International Robot-Sports Association",
          url: "https://firaworldcup.org/",
        },
      ],
    },
  ],
};

export async function GET() {
  return NextResponse.json(data);
}
