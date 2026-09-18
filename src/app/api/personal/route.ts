import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    data: {
      nowPlaying: {
        title: "La Vie En Rose",
        artist: "Louis Armstrong",
        album: "Caresse d'Amour",
        isPlaying: true,
      },
      weather: {
        temp: 72,
        high: 76,
        low: 62,
        condition: "Partly Sunny & Warm",
        location: "Home Sanctuary",
      },
      reminders: [
        { id: "1", text: "Sunset walk at the Botanical Garden", time: "6:30 PM", completed: false },
        { id: "2", text: "Pick up fresh dinner ingredients", time: "7:45 PM", completed: true },
        { id: "3", text: "Anniversary weekend booking", time: "Tomorrow", completed: false },
      ],
      anniversary: {
        title: "Anniversary Countdown",
        daysLeft: 42,
        targetDate: "October 14, 2025",
        subtitle: "Years of shared laughter & love",
      },
    },
  });
}
