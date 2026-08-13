function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const p = (url.searchParams.get("p") ?? "vapor").slice(0, 48);
  const safe = escapeXml(p.replace(/-/g, " "));
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#efeae1"/>
  <text x="72" y="120" font-family="Georgia, serif" font-size="26" fill="#7a7368" letter-spacing="4">VAPOR MARKET</text>
  <text x="72" y="280" font-family="Georgia, serif" font-size="64" fill="#1c1916">${safe}</text>
  <text x="72" y="360" font-family="ui-sans-serif, sans-serif" font-size="28" fill="#5b4dff">a product that will not sell you anything</text>
  <text x="72" y="540" font-family="ui-monospace, monospace" font-size="20" fill="#7a7368">FT-004  ·  not for sale</text>
</svg>`;
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
