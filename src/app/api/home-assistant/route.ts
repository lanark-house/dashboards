export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    data: {
      temperature: 71.5,
      humidity: 45,
      weatherCondition: "Partly Cloudy",
      outdoorTemp: 64.0,
      activeLightsCount: 4,
      totalLightsCount: 12,
      securityStatus: "ARMED_HOME",
      energyUsageKw: 2.4,
    },
  });
}
