<script lang="ts">
  import { page } from '$app/stores';
  import Footer from '$lib/components/Footer.svelte';

  $: slug = $page.params.slug;

  const content: Record<string, { title: string; body: string }> = {
    'about': {
      title: 'About Us',
      body: `
        <p>House of Le Pallevon is a luxury handbag brand dedicated to creating timeless pieces that embody elegance and sophistication.</p>
        <p>Founded with a passion for exquisite craftsmanship, we combine traditional techniques with contemporary design to create handbags that are both beautiful and functional.</p>
        <p>Each piece in our collection is carefully crafted using the finest materials, ensuring that every bag is a work of art that will stand the test of time.</p>
      `
    },
    'contact-us': {
      title: 'Contact Us',
      body: `
        <p>We'd love to hear from you. Get in touch with our team for any inquiries.</p>
        <div class="contact-info">
          <div class="contact-item">
            <h3>Email</h3>
            <p>info@houseoflepallevon.com</p>
          </div>
          <div class="contact-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div class="contact-item">
            <h3>Address</h3>
            <p>123 Luxury Avenue<br>Fashion District<br>New York, NY 10001</p>
          </div>
        </div>
      `
    },
    'customer-service': {
      title: 'Customer Service',
      body: `
        <p>At House of Le Pallevon, we are committed to providing exceptional customer service.</p>
        <h3>Returns & Exchanges</h3>
        <p>We accept returns within 30 days of purchase. Items must be in their original condition with all tags attached.</p>
        <h3>Shipping</h3>
        <p>We offer complimentary shipping on all orders. International shipping is available.</p>
        <h3>Care Instructions</h3>
        <p>Each handbag comes with detailed care instructions to ensure its longevity. For leather bags, we recommend using a leather conditioner every few months.</p>
      `
    },
    'stores-locations': {
      title: 'Store Locations',
      body: `
        <p>Visit us at one of our exclusive boutiques:</p>
        <div class="locations">
          <div class="location">
            <h3>New York Flagship</h3>
            <p>123 Luxury Avenue<br>New York, NY 10001</p>
          </div>
          <div class="location">
            <h3>Los Angeles</h3>
            <p>456 Rodeo Drive<br>Beverly Hills, CA 90210</p>
          </div>
          <div class="location">
            <h3>Miami</h3>
            <p>789 Design District<br>Miami, FL 33137</p>
          </div>
        </div>
      `
    },
    'working-hours': {
      title: 'Working Hours',
      body: `
        <p>Our boutiques are open at the following times:</p>
        <div class="hours">
          <div class="hours-item">
            <span class="day">Monday - Friday</span>
            <span class="time">10:00 AM - 8:00 PM</span>
          </div>
          <div class="hours-item">
            <span class="day">Saturday</span>
            <span class="time">10:00 AM - 9:00 PM</span>
          </div>
          <div class="hours-item">
            <span class="day">Sunday</span>
            <span class="time">11:00 AM - 7:00 PM</span>
          </div>
        </div>
        <p class="note">Hours may vary by location. Please call ahead to confirm.</p>
      `
    }
  };

  $: pageContent = content[slug] || {
    title: 'Page Not Found',
    body: '<p>The page you are looking for does not exist.</p>'
  };
</script>

<svelte:head>
  <title>{pageContent.title} - House of Le Pallevon</title>
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
          <a href="/auth/login" class="nav-link">Account</a>
        </div>
      </nav>
    </div>
  </header>

  <main class="info-page">
    <div class="container">
      <div class="content-wrapper">
        <h1 class="page-title">{pageContent.title}</h1>
        <div class="page-content">
          {@html pageContent.body}
        </div>
        <a href="/" class="back-link">← Back to Home</a>
      </div>
    </div>
  </main>

  <Footer />
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

  .info-page {
    flex: 1;
    padding: 140px 0 80px;
    background: #fafafa;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .content-wrapper {
    background: white;
    padding: 64px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .page-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 42px;
    margin: 0 0 32px 0;
    color: #1a1a1a;
    letter-spacing: 1px;
  }

  .page-content {
    font-size: 16px;
    line-height: 1.8;
    color: #444;
  }

  .page-content :global(p) {
    margin: 0 0 20px 0;
  }

  .page-content :global(h3) {
    font-family: 'Libre Baskerville', serif;
    font-size: 22px;
    margin: 32px 0 16px 0;
    color: #1a1a1a;
  }

  .page-content :global(.contact-info) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px;
    margin: 32px 0;
  }

  .page-content :global(.contact-item) {
    padding: 24px;
    background: #fafafa;
    border-radius: 4px;
  }

  .page-content :global(.contact-item h3) {
    margin: 0 0 12px 0;
    font-size: 18px;
    color: #c58e46;
  }

  .page-content :global(.contact-item p) {
    margin: 0;
    color: #666;
  }

  .page-content :global(.locations),
  .page-content :global(.hours) {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 24px 0;
  }

  .page-content :global(.location),
  .page-content :global(.hours-item) {
    padding: 24px;
    background: #fafafa;
    border-radius: 4px;
  }

  .page-content :global(.location h3) {
    margin: 0 0 8px 0;
    color: #c58e46;
    font-size: 20px;
  }

  .page-content :global(.hours-item) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .page-content :global(.day) {
    font-weight: 600;
    color: #1a1a1a;
  }

  .page-content :global(.time) {
    color: #666;
  }

  .page-content :global(.note) {
    font-size: 14px;
    color: #999;
    font-style: italic;
    margin-top: 16px;
  }

  .back-link {
    display: inline-block;
    margin-top: 40px;
    color: #c58e46;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .back-link:hover {
    color: #b57d35;
  }

  @media (max-width: 768px) {
    .logo {
      font-size: 14px;
      letter-spacing: 1px;
    }

    .nav-links {
      gap: 16px;
    }

    .nav-link {
      font-size: 12px;
    }

    .info-page {
      padding: 100px 0 60px;
    }

    .content-wrapper {
      padding: 40px 24px;
    }

    .page-title {
      font-size: 32px;
      margin-bottom: 24px;
    }

    .page-content {
      font-size: 15px;
    }

    .page-content :global(.contact-info) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  @media (max-width: 480px) {
    .page-title {
      font-size: 26px;
    }

    .content-wrapper {
      padding: 32px 20px;
    }
  }
</style>
