import { NextResponse } from "next/server";

const countries = {
  top_countries: [
    {
      countryName: "Canada",
      id: 1,
      rank: 1,
      totalPoint: 5950,
      countryFlag:
        "https://img.freepik.com/premium-vector/canada-flag_19426-482.jpg?semt=ais_hybrid",
      top3Teams: [
        {
          Name: "Team Alpha",
          Points: 2020,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Bravo",
          Points: 1980,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Charlie",
          Points: 1950,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "USA",
      id: 2,
      rank: 2,
      totalPoint: 5550,
      countryFlag:
        "https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg",
      top3Teams: [
        {
          Name: "Team Delta",
          Points: 1900,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Echo",
          Points: 1850,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Foxtrot",
          Points: 1800,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "Germany",
      id: 3,
      rank: 3,
      totalPoint: 5170,
      countryFlag:
        "https://static.vecteezy.com/system/resources/previews/004/757/066/non_2x/germany-flag-free-vector.jpg",
      top3Teams: [
        {
          Name: "Team Golf",
          Points: 1750,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Hotel",
          Points: 1720,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team India",
          Points: 1700,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "France",
      id: 4,
      rank: 4,
      totalPoint: 4950,
      countryFlag:
        "https://cdn.britannica.com/82/682-004-F0B47FCB/Flag-France.jpg",
      top3Teams: [
        {
          Name: "Team Juliet",
          Points: 1680,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Kilo",
          Points: 1650,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Lima",
          Points: 1620,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "Japan",
      id: 5,
      rank: 5,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg",
      top3Teams: [
        {
          Name: "Team Mike",
          Points: 1600,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team November",
          Points: 1570,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Oscar",
          Points: 1550,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "Italy",
      id: 6,
      rank: 6,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg",
      top3Teams: [
        {
          Name: "Team Papa",
          Points: 1530,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Quebec",
          Points: 1500,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Romeo",
          Points: 1480,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "UK",
      id: 7,
      rank: 7,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg",
      top3Teams: [
        {
          Name: "Team Sierra",
          Points: 1460,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Tango",
          Points: 1440,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Uniform",
          Points: 1420,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "South Korea",
      id: 8,
      rank: 8,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg",
      top3Teams: [
        {
          Name: "Team Victor",
          Points: 1400,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Whiskey",
          Points: 1380,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team X-ray",
          Points: 1350,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "India",
      id: 9,
      rank: 9,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg",
      top3Teams: [
        {
          Name: "Team Yankee",
          Points: 1320,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Zulu",
          Points: 1300,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Alpha2",
          Points: 1280,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "Australia",
      id: 10,
      rank: 10,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg",
      top3Teams: [
        {
          Name: "Team Beta",
          Points: 1260,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Gamma",
          Points: 1240,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Delta2",
          Points: 1220,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "Netherlands",
      id: 11,
      rank: 11,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png",
      top3Teams: [
        {
          Name: "Team Epsilon",
          Points: 1200,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Zeta",
          Points: 1180,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Eta",
          Points: 1150,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "Brazil",
      id: 12,
      rank: 12,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png",
      top3Teams: [
        {
          Name: "Team Theta",
          Points: 1120,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Iota",
          Points: 1100,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Kappa",
          Points: 1080,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "Spain",
      id: 13,
      rank: 13,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png",
      top3Teams: [
        {
          Name: "Team Lambda",
          Points: 1060,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Mu",
          Points: 1040,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Nu",
          Points: 1020,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
    {
      countryName: "Mexico",
      id: 14,
      rank: 14,
      countryFlag:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png",
      top3Teams: [
        {
          Name: "Team Xi",
          Points: 1000,
          Avatar:
            "https://www.msruas.ac.in/uploads/blogs/robotics.f1708523490_b8a7d9426d44becbfab22c3e3256f6d7.webp",
        },
        {
          Name: "Team Omicron",
          Points: 980,
          Avatar:
            "https://www.therobotreport.com/wp-content/uploads/2023/06/sick-sponsored-featured-image-july2023-article1.jpg",
        },
        {
          Name: "Team Pi",
          Points: 960,
          Avatar:
            "https://rguktrkv.ac.in/robotics/wp-content/uploads/elementor/thumbs/1675014214058-qlu382h2fe5c67qax5scxpjli9xfvk1q2bk21wpl6w.jpeg",
        },
      ],
    },
  ],
};

export async function GET() {
  return NextResponse.json(countries);
}
