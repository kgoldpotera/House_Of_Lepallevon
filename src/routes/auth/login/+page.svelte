<script lang="ts">
  import { goto } from '$app/navigation';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
  import { createBrowserClient } from '@supabase/ssr';
  import type { PageData } from './$types';

  export let data: PageData;

  let email = '';
  let loading = false;
  let message = '';
  let error = '';

  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  async function handleLogin() {
    if (!email) {
      error = 'Please enter your email address';
      return;
    }

    loading = true;
    error = '';
    message = '';

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    loading = false;

    if (signInError) {
      error = signInError.message;
    } else {
      message = 'Check your email for the login link!';
      email = '';
    }
  }

  if (data.session) {
    goto('/');
  }
</script>

<svelte:head>
  <title>Login - House of Le Pallevon</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="page-wrapper">
  <header class="header">
    <div class="header-content">
      <nav class="nav">
        <a href="/" class="logo">HOUSE OF LE PALLEVON</a>
        <div class="nav-links">
          <a href="/" class="nav-link">Home</a>
        </div>
      </nav>
    </div>
  </header>

  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Sign in to access your account</p>

        <form on:submit|preventDefault={handleLogin} class="auth-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              bind:value={email}
              placeholder="you@example.com"
              class="form-input"
              disabled={loading}
              required
            />
          </div>

          {#if error}
            <div class="alert alert-error">{error}</div>
          {/if}

          {#if message}
            <div class="alert alert-success">{message}</div>
          {/if}

          <button type="submit" class="btn-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        <p class="auth-note">
          We'll send you a secure login link via email. No password required.
        </p>
      </div>
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    color: #333;
    line-height: 1.6;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }

  .logo {
    font-family: 'Libre Baskerville', serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    text-decoration: none;
    color: #1a1a1a;
  }

  .nav-links {
    display: flex;
    gap: 32px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: #c58e46;
  }

  .auth-page {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120px 24px 60px;
  }

  .auth-container {
    width: 100%;
    max-width: 480px;
  }

  .auth-card {
    background: white;
    padding: 48px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .auth-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 32px;
    margin: 0 0 12px 0;
    color: #1a1a1a;
    text-align: center;
  }

  .auth-subtitle {
    font-size: 16px;
    color: #666;
    text-align: center;
    margin: 0 0 40px 0;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    letter-spacing: 0.3px;
  }

  .form-input {
    padding: 14px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.3s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: #c58e46;
    box-shadow: 0 0 0 3px rgba(197, 142, 70, 0.1);
  }

  .form-input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  .alert {
    padding: 12px 16px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
  }

  .alert-error {
    background: #fee;
    color: #c33;
    border: 1px solid #fcc;
  }

  .alert-success {
    background: #efe;
    color: #383;
    border: 1px solid #cfc;
  }

  .btn-submit {
    padding: 16px 32px;
    background: #c58e46;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-submit:hover:not(:disabled) {
    background: #b57d35;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(197, 142, 70, 0.3);
  }

  .btn-submit:disabled {
    background: #ddd;
    cursor: not-allowed;
    transform: none;
  }

  .auth-note {
    margin: 24px 0 0 0;
    font-size: 13px;
    color: #999;
    text-align: center;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .logo {
      font-size: 14px;
      letter-spacing: 1px;
    }

    .auth-page {
      padding: 100px 20px 40px;
    }

    .auth-card {
      padding: 32px 24px;
    }

    .auth-title {
      font-size: 26px;
    }

    .auth-subtitle {
      font-size: 14px;
      margin-bottom: 32px;
    }
  }
</style>
