<script lang="ts">
  const footerLinks = [
    { name: 'About', href: '/info/about' },
    { name: 'Contact Us', href: '/info/contact-us' },
    { name: 'Customer Service', href: '/info/customer-service' },
    { name: 'Stores Locations', href: '/info/stores-locations' },
    { name: 'Working Hours', href: '/info/working-hours' }
  ];
</script>

<footer class="footer">
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-brand">
        <h3 class="footer-logo">HOUSE OF LE PALLEVON</h3>
        <p class="footer-tagline">Luxury Handbags Collection</p>
      </div>

      <nav class="footer-nav">
        <h4 class="footer-nav-title">Information</h4>
        <ul class="footer-links">
          {#each footerLinks as link}
            <li>
              <a href={link.href} class="footer-link">{link.name}</a>
            </li>
          {/each}
        </ul>
      </nav>

      <div class="footer-newsletter">
        <h4 class="footer-nav-title">Stay Connected</h4>
        <p class="newsletter-text">Subscribe to receive updates about new collections</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copyright">&copy; {new Date().getFullYear()} House of Le Pallevon. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #1a1a1a;
    color: #ffffff;
    padding: 64px 0 24px;
    margin-top: auto;
  }

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 48px;
    margin-bottom: 48px;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-logo {
    font-family: 'Libre Baskerville', serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0;
    color: #ffffff;
  }

  .footer-tagline {
    font-size: 14px;
    color: #999;
    margin: 0;
  }

  .footer-nav-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0 0 20px 0;
    color: #c58e46;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-link {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #c58e46;
  }

  .newsletter-text {
    font-size: 14px;
    color: #999;
    line-height: 1.6;
    margin: 0;
  }

  .footer-bottom {
    padding-top: 32px;
    border-top: 1px solid #333;
    text-align: center;
  }

  .copyright {
    font-size: 13px;
    color: #666;
    margin: 0;
  }

  @media (max-width: 768px) {
    .footer {
      padding: 48px 0 24px;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 32px;
      margin-bottom: 32px;
    }

    .footer-bottom {
      padding-top: 24px;
    }
  }
</style>
