import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Gera state criptográfico simples
  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  cookies.set('oauth_state', state, {
    path: '/',
    secure: true,
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutos
    sameSite: 'lax'
  });

  const clientId = import.meta.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || 'placeholder_google_client_id';
  const redirectUri = import.meta.env.GOOGLE_REDIRECT_URI || process.env.GOOGLE_REDIRECT_URI || 'http://localhost:4321/api/auth/callback/google';

  // Mecanismo de Auto-Sandbox Inteligente
  if (clientId.includes('placeholder_google')) {
    return redirect(`/api/auth/callback/google?code=sandbox_code&state=${state}`);
  }

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    prompt: 'select_account'
  }).toString();

  return redirect(authUrl);
};
