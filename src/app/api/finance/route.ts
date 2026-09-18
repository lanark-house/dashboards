export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    data: {
      portfolioValue: 128450.75,
      dayChange: 1420.50,
      dayChangePercent: 1.12,
      marketStatus: "OPEN",
      topMovers: [
        { symbol: "AAPL", price: 189.84, change: +2.4 },
        { symbol: "NVDA", price: 875.28, change: +4.8 },
        { symbol: "TSLA", price: 175.22, change: -1.3 },
      ],
      sparkline: [120, 122, 121, 124, 125, 123, 127, 128.45],
    },
  });
}
