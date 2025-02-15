import { NextResponse } from "next/server";

export async function GET() {
  const members = [
    {
      user_id: 101,
      avatar: "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
      user_name: "Ali Rezaei",
      email: "ali.rezaei@example.com",
      current_team: {
        team_id: 7,
        team_name: "Red Dragons",
        joined_at: "2024-01-15T10:00:00Z",
        role: "Captain",
        team_logo:
          "https://static.wikia.nocookie.net/forgottenrealms/images/e/e7/4e_red_dragon.jpg/revision/latest?cb=20081013211322",
      },
      previous_teams: [
        {
          team_id: 5,
          team_name: "Blue Tigers",
          joined_at: "2023-06-10T08:30:00Z",
          left_at: "2024-01-10T18:00:00Z",
          role: "Player",
          team_logo: "https://storage.googleapis.com/pod_public/750/200740.jpg",
        },
        {
          team_id: 2,
          team_name: "Black Panthers",
          joined_at: "2022-03-05T12:00:00Z",
          left_at: "2023-06-05T15:30:00Z",
          role: "Substitute",
          team_logo:
            "https://i.pinimg.com/736x/50/ce/0f/50ce0f7d4b445a059614f548d229a683.jpg",
        },
      ],
      total_wins: 45,
      total_points: 120,
      last_active: "2024-02-10T16:45:00Z",
    },
    {
      user_id: 102,
      avatar: "https://esports.ch/wp-content/uploads/2024/11/jinx-arcane.jpg",
      user_name: "Sara Mohammadi",
      email: "sara.mohammadi@example.com",
      current_team: {
        team_id: 3,
        team_name: "Golden Eagles",
        joined_at: "2023-11-01T14:20:00Z",
        role: "Player",
        team_logo:
          "https://raptor.umn.edu/sites/raptor.umn.edu/files/2024-04/Golden%20Eagle%20RoMW.png",
      },
      previous_teams: [
        {
          team_id: 1,
          team_name: "Silver Wolves",
          joined_at: "2021-09-15T09:15:00Z",
          left_at: "2023-10-20T17:00:00Z",
          role: "Captain",
          team_logo:
            "https://i.natgeofe.com/k/093c14b4-978e-41f7-b1aa-3aff5d1c608a/gray-wolf-closeup_square.jpg",
        },
      ],
      total_wins: 32,
      total_points: 85,
      last_active: "2024-02-12T09:30:00Z",
    },
  ];

  return NextResponse.json(members);
}
