import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    data: {
      temperature: 72,
      targetTemperature: 70,
      humidity: 45,
      weatherCondition: "Clear & Soft Sunlight",
      activeLightsCount: 4,
      totalLightsCount: 12,
      securityStatus: "Armed Home",
    },
  });
}
