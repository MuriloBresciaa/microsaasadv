import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  cookies.set('oauth_state', state, {
    path: '/',
    secure: true,
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutos
    sameSite: 'lax'
  });

  const clientId = import.meta.env.APPLE_CLIENT_ID || process.env.APPLE_CLIENT_ID || 'placeholder_apple_client_id';
  const redirectUri = import.meta.env.APPLE_REDIRECT_URI || process.env.APPLE_REDIRECT_URI || 'http://localhost:4321/api/auth/callback/apple';

  const authUrl = `https://appleid.apple.com/auth/authorize?` + new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'name email',
    state: state,
    response_mode: 'form_post'
  }).toString();

  return redirect(authUrl);
};
