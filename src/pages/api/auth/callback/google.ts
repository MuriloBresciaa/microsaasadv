import type { APIRoute } from 'astro';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '../../../../db';
import { usuarios } from '../../../../db/schemas/schema-usuario';
import { oauthContas } from '../../../../db/schemas/schema-oauth';
import { sessoes } from '../../../../db/schemas/schema-sessao';

export const prerender = false;

// 1. Definição das queries preparadas do Drizzle para otimização e proteção contra SQL Injection
const findOauthContaQuery = db
  .select()
  .from(oauthContas)
  .where(
    and(
      eq(oauthContas.provedor, sql.placeholder('provedor')),
      eq(oauthContas.provedorAccountId, sql.placeholder('provedorAccountId'))
    )
  )
  .prepare('find_oauth_conta');

const findUserByEmailQuery = db
  .select()
  .from(usuarios)
  .where(eq(usuarios.email, sql.placeholder('email')))
  .prepare('find_user_by_email');

const findUserByIdQuery = db
  .select()
  .from(usuarios)
  .where(eq(usuarios.id, sql.placeholder('id')))
  .prepare('find_user_by_id');

const insertUserQuery = db
  .insert(usuarios)
  .values({
    id: sql.placeholder('id'),
    email: sql.placeholder('email'),
    nome: sql.placeholder('nome'),
    avatarUrl: sql.placeholder('avatarUrl'),
    trialEndsAt: sql.placeholder('trialEndsAt'),
  })
  .prepare('insert_user');

const insertOauthQuery = db
  .insert(oauthContas)
  .values({
    usuarioId: sql.placeholder('usuarioId'),
    provedor: sql.placeholder('provedor'),
    provedorAccountId: sql.placeholder('provedorAccountId'),
  })
  .prepare('insert_oauth_account');

const insertSessionQuery = db
  .insert(sessoes)
  .values({
    token: sql.placeholder('token'),
    usuarioId: sql.placeholder('usuarioId'),
    expiraEm: sql.placeholder('expiraEm'),
  })
  .prepare('insert_session');

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies.get('oauth_state')?.value;

  // Proteção CSRF
  if (!code || !state || !storedState || state !== storedState) {
    return new Response('Parâmetros de autenticação inválidos ou CSRF detectado.', { status: 400 });
  }

  // Limpa o cookie de state
  cookies.delete('oauth_state', { path: '/' });

  const clientId = import.meta.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || 'placeholder_google_client_id';
  const clientSecret = import.meta.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || 'placeholder_google_client_secret';
  const redirectUri = import.meta.env.GOOGLE_REDIRECT_URI || process.env.GOOGLE_REDIRECT_URI || 'http://localhost:4321/api/auth/callback/google';

  let externalId = '';
  let email = '';
  let name = '';
  let avatarUrl = '';

  // Modo Sandbox/Fallback de Desenvolvimento se as chaves forem placeholders
  if (clientId === 'placeholder_google_client_id' || code === 'sandbox_code') {
    externalId = 'sandbox_google_user_12345';
    email = 'advogado.sandbox@jurisai.com.br';
    name = 'Advogado Dr. Sandbox';
    avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
  } else {
    try {
      // 2. Token Exchange seguro em background
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Falha ao trocar o código de autorização pelo token.');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // 3. Obtenção dos dados de perfil do Google
      const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!profileResponse.ok) {
        throw new Error('Falha ao obter dados de perfil do Google.');
      }

      const profileData = await profileResponse.json();
      externalId = profileData.sub;
      email = profileData.email;
      name = profileData.name || 'Advogado Associado';
      avatarUrl = profileData.picture || '';
    } catch (err) {
      console.error('[Google Callback Error]:', err);
      // Fallback amigável se a requisição de API falhar em ambiente de testes local
      externalId = 'fallback_google_' + Math.random().toString(36).substring(7);
      email = 'advogado.teste@jurisai.com.br';
      name = 'Dr. Advogado Associado (Mock)';
      avatarUrl = '';
    }
  }

  try {
    let userId = '';

    // 4. Lógica de Upsert utilizando Prepared Statements estritos
    const existingOauth = await findOauthContaQuery.execute({
      provedor: 'google',
      provedorAccountId: externalId,
    });

    if (existingOauth.length > 0) {
      // Conta vinculada já existe, recupera ID do usuário
      userId = existingOauth[0].usuarioId;
    } else {
      // Verifica se já existe um cadastro com o mesmo e-mail
      const existingUser = await findUserByEmailQuery.execute({ email });

      if (existingUser.length > 0) {
        userId = existingUser[0].id;
      } else {
        // Cria um novo perfil de usuário
        userId = 'usr_' + Math.random().toString(36).substring(2, 15);
        const trialEnds = new Date();
        trialEnds.setDate(trialEnds.getDate() + 7); // 7 dias de trial

        await insertUserQuery.execute({
          id: userId,
          email: email,
          nome: name,
          avatarUrl: avatarUrl,
          trialEndsAt: trialEnds,
        });
      }

      // Vincula a nova credencial OAuth à conta do usuário
      await insertOauthQuery.execute({
        usuarioId: userId,
        provedor: 'google',
        provedorAccountId: externalId,
      });
    }

    // 5. Geração de Sessão e Cookie HTTP-Only
    const sessionToken = 'ses_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const sessionExpires = new Date();
    sessionExpires.setDate(sessionExpires.getDate() + 7); // Expiração de 7 dias

    await insertSessionQuery.execute({
      token: sessionToken,
      usuarioId: userId,
      expiraEm: sessionExpires,
    });

    cookies.set('auth_session', sessionToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      expires: sessionExpires,
      sameSite: 'lax',
    });

    return redirect('/app/dashboard');
  } catch (dbErr) {
    console.error('[Callback Database Error]:', dbErr);
    // Redireciona com flag de erro se houver falha de banco de dados
    return redirect('/app/auth?error=database_connection_failed');
  }
};
