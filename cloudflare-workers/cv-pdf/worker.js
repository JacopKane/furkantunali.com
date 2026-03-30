export default {
  async fetch(request, env, ctx) {
    const targetUrl =
      "https://europe-west1-furkantunali-1043.cloudfunctions.net/downloadAsPDF";
    const proxied = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
    });
    const upstream = await fetch(proxied);
    const response = new Response(upstream.body, upstream);
    response.headers.set(
      "Content-Disposition",
      'attachment; filename="Furkan Tunali CV.pdf"',
    );
    return response;
  },
};
