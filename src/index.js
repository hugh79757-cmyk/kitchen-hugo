export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      const response = await env.ASSETS.fetch(url.pathname);
      return response;
    } catch (e) {
      return new Response('Error', { status: 500 });
    }
  }
};
