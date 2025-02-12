import { NextResponse } from "next/server";

export async function GET() {
  const teams = [
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Alpha",
      country: "USA",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png",
      wins: 30,
      points: 3000,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Beta",
      country: "USA",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png",
      wins: 28,
      points: 2900,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Gamma",
      country: "Iran",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/640px-Flag_of_Iran.svg.png",
      wins: 27,
      points: 2750,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Delta",
      country: "Iran",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/640px-Flag_of_Iran.svg.png",
      wins: 25,
      points: 2600,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Epsilon",
      country: "Iran",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/640px-Flag_of_Iran.svg.png",
      wins: 23,
      points: 2500,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Zeta",
      country: "Iran",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/640px-Flag_of_Iran.svg.png",
      wins: 22,
      points: 2400,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Eta",
      country: "Iran",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/640px-Flag_of_Iran.svg.png",
      wins: 21,
      points: 2300,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Theta",
      country: "USA",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png",
      wins: 20,
      points: 2200,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Iota",
      country: "USA",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png",
      wins: 19,
      points: 2100,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Kappa",
      country: "USA",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png",
      wins: 18,
      points: 2000,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Lambda",
      country: "USA",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png",
      wins: 17,
      points: 1950,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Mu",
      country: "Russia",
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFXVaBEnKbpodO0cyYPr7WLyHPiUUxtlr-g&s",
      wins: 16,
      points: 1900,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Nu",
      country: "Russia",
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFXVaBEnKbpodO0cyYPr7WLyHPiUUxtlr-g&s",
      wins: 15,
      points: 1850,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Xi",
      country: "Russia",
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFXVaBEnKbpodO0cyYPr7WLyHPiUUxtlr-g&s",
      wins: 14,
      points: 1800,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Omicron",
      country: "Russia",
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFXVaBEnKbpodO0cyYPr7WLyHPiUUxtlr-g&s",
      wins: 13,
      points: 1750,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Pi",
      country: "Russia",
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFXVaBEnKbpodO0cyYPr7WLyHPiUUxtlr-g&s",
      wins: 12,
      points: 1700,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Rho",
      country: "Russia",
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFXVaBEnKbpodO0cyYPr7WLyHPiUUxtlr-g&s",
      wins: 11,
      points: 1650,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Sigma",
      country: "Russia",
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFXVaBEnKbpodO0cyYPr7WLyHPiUUxtlr-g&s",
      wins: 10,
      points: 1600,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Tau",
      country: "China",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flag_of_China.png/1024px-Flag_of_China.png",
      wins: 9,
      points: 1550,
    },
    {
      avatar:
        "https://d.newsweek.com/en/full/2027477/avatar-2-movie.jpg?w=1600&h=1600&q=88&f=a9c76735de5944303f821b996fd8a21c",
      team: "Team Upsilon",
      country: "China",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flag_of_China.png/1024px-Flag_of_China.png",
      wins: 8,
      points: 1500,
    },
  ];

  const leaderboard = teams.sort((a, b) => b.points - a.points);

  return NextResponse.json(leaderboard);
}
