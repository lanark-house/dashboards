import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    data: {
      openPRs: 2,
      ciSuccessRate: 99.4,
      buildStatus: "PASSING",
      commitsToday: 14,
      serverHealth: {
        cpuUsage: 18,
        memoryUsage: 42,
      },
    },
  });
}
