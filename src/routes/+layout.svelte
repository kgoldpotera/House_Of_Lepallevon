<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
  import { createBrowserClient } from '@supabase/ssr';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  // Reactive statement to keep session/profile updated
  $: ({ session, profile } = data);

  onMount(() => {
    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<div class="app-shell">
  <header class="header">
    <div class="header-content">
      <nav class="nav">
        <a href="/" class="logo">HOUSE OF LE PALLEVON</a>
        
        <div class="nav-links">
          {#if profile?.role === 'admin'}
            <a href="/admin" class="nav-link admin-link">Admin Dashboard</a>
          {/if}

          {#if session}
            <span class="user-email">{profile?.email}</span>
            <form action="/auth/logout" method="POST" style="display: inline;">
              <button type="submit" class="nav-link btn-logout">Logout</button>
            </form>
          {:else}
            <a href="/auth/login" class="nav-link">Account</a>
          {/if}
        </div>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <slot />
  </main>
</div>

<style>
  /* GLOBAL STYLES */
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

  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* HEADER STYLES */
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
    gap: 24px;
    align-items: center;
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

  /* ADMIN BUTTON STYLE */
  .admin-link {
    color: #c58e46;
    font-weight: 700;
    border: 1px solid #c58e46;
    padding: 8px 16px;
    border-radius: 4px;
  }
  
  .admin-link:hover {
    background: #c58e46;
    color: white;
  }

  .user-email {
    font-size: 12px;
    color: #999;
    margin-right: 8px;
  }

  .btn-logout {
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    padding: 0;
  }

  /* MAIN CONTENT PADDING */
  .main-content {
    padding-top: 80px; /* Pushes content down below the fixed header */
    flex: 1;
    width: 100%;
  }
</style>