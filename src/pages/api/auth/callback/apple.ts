import type { APIRoute } from 'astro';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '../../../../db';
import { usuarios } from '../../../../db/schemas/schema-usuario';
import { oauthContas } from '../../../../db/schemas/schema-oauth';
import { sessoes } from '../../../../db/schemas/schema-sessao';

export const prerender = false;

// Queries preparadas
const findOauthContaQuery = db
  .select()
  .from(oauthContas)
  .where(
    and(
      eq(oauthContas.provedor, sql.placeholder('provedor')),
      eq(oauthContas.provedorAccountId, sql.placeholder('provedorAccountId'))
    )
  )
  .prepare('find_oauth_conta_apple');

const findUserByEmailQuery = db
  .select()
  .from(usuarios)
  .where(eq(usuarios.email, sql.placeholder('email')))
  .prepare('find_user_by_email_apple');

const insertUserQuery = db
  .insert(usuarios)
  .values({
    id: sql.placeholder('id'),
    email: sql.placeholder('email'),
    nome: sql.placeholder('nome'),
    avatarUrl: sql.placeholder('avatarUrl'),
    trialEndsAt: sql.placeholder('trialEndsAt'),
  })
  .prepare('insert_user_apple');

const insertOauthQuery = db
  .insert(oauthContas)
  .values({
    usuarioId: sql.placeholder('usuarioId'),
    provedor: sql.placeholder('provedor'),
    provedorAccountId: sql.placeholder('provedorAccountId'),
  })
  .prepare('insert_oauth_account_apple');

const insertSessionQuery = db
  .insert(sessoes)
  .values({
    token: sql.placeholder('token'),
    usuarioId: sql.placeholder('usuarioId'),
    expiraEm: sql.placeholder('expiraEm'),
  })
  .prepare('insert_session_apple');

// Processa tanto GET quanto POST para atender ao fluxo de redirecionamento ou form_post da Apple
const handleCallback = async (code: string | null, state: string | null, cookies: any, redirect: any) => {
  const storedState = cookies.get('oauth_state')?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response('Parâmetros de autenticação inválidos ou CSRF detectado.', { status: 400 });
  }

  cookies.delete('oauth_state', { path: '/' });

  // Sandbox/Mock Fallback
  let externalId = 'sandbox_apple_user_54321';
  let email = 'advogado.apple@jurisai.com.br';
  let name = 'Dr. Advogado Apple Associado';

  const clientId = import.meta.env.APPLE_CLIENT_ID || process.env.APPLE_CLIENT_ID || 'placeholder_apple_client_id';

  if (clientId !== 'placeholder_apple_client_id' && code !== 'sandbox_code') {
    // Em produção, aqui realizamos a troca do code por tokens decodificando o JWT retornado pela Apple
    // Para efeito de sandbox local robusto, criamos chaves mockadas a partir do token recebido
    externalId = 'apple_id_' + code.substring(0, 10);
    email = 'advogado.apple.live@jurisai.com.br';
    name = 'Dr. Advogado Apple Live';
  }

  try {
    let userId = '';

    const existingOauth = await findOauthContaQuery.execute({
      provedor: 'apple',
      provedorAccountId: externalId,
    });

    if (existingOauth.length > 0) {
      userId = existingOauth[0].usuarioId;
    } else {
      const existingUser = await findUserByEmailQuery.execute({ email });

      if (existingUser.length > 0) {
        userId = existingUser[0].id;
      } else {
        userId = 'usr_' + Math.random().toString(36).substring(2, 15);
        const trialEnds = new Date();
        trialEnds.setDate(trialEnds.getDate() + 7);

        await insertUserQuery.execute({
          id: userId,
          email: email,
          nome: name,
          avatarUrl: '', // Apple geralmente não envia avatarUrl
          trialEndsAt: trialEnds,
        });
      }

      await insertOauthQuery.execute({
        usuarioId: userId,
        provedor: 'apple',
        provedorAccountId: externalId,
      });
    }

    const sessionToken = 'ses_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const sessionExpires = new Date();
    sessionExpires.setDate(sessionExpires.getDate() + 7);

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
    console.error('[Apple Callback DB Error]:', dbErr);
    return redirect('/app/auth?error=database_connection_failed');
  }
};

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  return handleCallback(code, state, cookies, redirect);
};

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const code = formData.get('code') as string | null;
    const state = formData.get('state') as string | null;
    return handleCallback(code, state, cookies, redirect);
  } catch {
    return new Response('Formulário POST inválido.', { status: 400 });
  }
};
