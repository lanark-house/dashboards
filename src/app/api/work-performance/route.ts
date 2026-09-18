export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    data: {
      openPRs: 7,
      ciSuccessRate: 98.4,
      buildStatus: "PASSING",
      activeDeployments: 3,
      commitsToday: 18,
      velocity: [12, 19, 15, 22, 28, 24, 30],
      serverHealth: {
        cpuUsage: 24,
        memoryUsage: 62,
        diskUsage: 41,
      },
    },
  });
}
