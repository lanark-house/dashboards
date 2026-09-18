import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    data: {
      portfolioValue: 142850,
      dayChange: 1240,
      dayChangePercent: 0.87,
      marketStatus: "OPEN",
      sparkline: [141200, 141500, 141800, 142100, 142000, 142500, 142850],
    },
  });
}
