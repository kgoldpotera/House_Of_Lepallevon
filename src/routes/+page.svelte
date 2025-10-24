<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import { onMount } from 'svelte';

  export let data: PageData;

  let currentSlide = 0;
  const slides = [
    {
      title: 'The House Reigns',
      subtitle: 'Luxury Handbags Collection',
      image: 'https://pqylccqvrhdphidyzbfl.supabase.co/storage/v1/object/public/bag-images/Hero_image_1.jpeg'
    },
    {
      title: 'Elegance Redefined',
      subtitle: 'Crafted to Perfection',
      image: 'https://pqylccqvrhdphidyzbfl.supabase.co/storage/v1/object/public/bag-images/Hero_image_2.jpeg'
    },
    {
      title: 'Timeless Beauty',
      subtitle: 'For the Modern Woman',
      image: 'https://pqylccqvrhdphidyzbfl.supabase.co/storage/v1/object/public/bag-images/Hero_image_4.jpeg'
    },
    {
      title: 'The Statement',
      subtitle: 'Where Presence Speaks Louder Than Words',
      image: 'https://pqylccqvrhdphidyzbfl.supabase.co/storage/v1/object/public/bag-images/Statement.jpeg'
    },
    {
      title: 'Our Collection',
      subtitle: 'A Symphony of Craftsmanship and Luxury',
      image: 'https://pqylccqvrhdphidyzbfl.supabase.co/storage/v1/object/public/bag-images/Collection.jpeg'
    },
    {
      title: 'By Appointment Only',
      subtitle: 'An Exclusive Experience Awaits You',
      image: 'https://pqylccqvrhdphidyzbfl.supabase.co/storage/v1/object/public/bag-images/Appointment.jpeg'
    },
    {
      title: 'Love Language His Promises',
      subtitle: 'Inspired by Devotion, Defined by Grace',
      image: 'https://pqylccqvrhdphidyzbfl.supabase.co/storage/v1/object/public/bag-images/Lovelangauge2.jpeg'
    },
    {
      title: 'House of Lepallevon in Elegance',
      subtitle: 'Where Every Design Whispers Sophistication',
      image: 'https://pqylccqvrhdphidyzbfl.supabase.co/storage/v1/object/public/bag-images/Elegance.jpeg'
    }
  ];

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  }

  let autoPlayInterval: ReturnType<typeof setInterval>;

  onMount(() => {
    autoPlayInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlayInterval);
  });
</script>

<svelte:head>
  <title>House of Le Pallevon - Luxury Handbags</title>
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
          {#if data.profile?.role === 'admin'}
            <a href="/admin" class="nav-link">Admin Dashboard</a>
          {/if}
          {#if data.session}
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

  <main>
    <section class="hero">
      {#each slides as slide, i}
        <div class="hero-slide" class:active={currentSlide === i} style="background-image: url({slide.image})">
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <h1 class="hero-title">{slide.title}</h1>
            <p class="hero-subtitle">{slide.subtitle}</p>
            <a href="#products" class="btn-primary">Discover</a>
          </div>
        </div>
      {/each}

      <button class="slider-btn slider-btn-prev" on:click={prevSlide} aria-label="Previous slide">
        &#8249;
      </button>
      <button class="slider-btn slider-btn-next" on:click={nextSlide} aria-label="Next slide">
        &#8250;
      </button>

      <div class="slider-dots">
        {#each slides as _, i}
          <button
            class="dot"
            class:active={currentSlide === i}
            on:click={() => currentSlide = i}
            aria-label="Go to slide {i + 1}"
          ></button>
        {/each}
      </div>
    </section>

    <section class="featured-section">
      <div class="container">
        <h2 class="section-title">The Statement</h2>
        <p class="section-description">Where presence speaks louder than words. Each piece is crafted to make an unforgettable impression, embodying confidence and refined sophistication.</p>
        <div class="image-slider">
          <div class="image-track">
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="The Statement 1" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="The Statement 2" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="The Statement 3" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="The Statement 4" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-section alt">
      <div class="container">
        <h2 class="section-title">By Appointment Only</h2>
        <p class="section-description">An exclusive experience tailored to you. Discover our collection in an intimate setting where every detail is curated for your personal journey.</p>
        <div class="image-slider">
          <div class="image-track">
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="By Appointment 1" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="By Appointment 2" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="By Appointment 3" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="By Appointment 4" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-section">
      <div class="container">
        <h2 class="section-title">Love Language His Promises</h2>
        <p class="section-description">Inspired by devotion, defined by grace. Every design tells a story of commitment and timeless beauty, crafted to honor the promises that matter most.</p>
        <div class="image-slider">
          <div class="image-track">
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Love Language 1" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Love Language 2" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Love Language 3" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Love Language 4" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="featured-section alt">
      <div class="container">
        <h2 class="section-title">House of Lepallevon in Elegance</h2>
        <p class="section-description">Where every design whispers sophistication. A celebration of artistry and refinement, where tradition meets contemporary luxury in perfect harmony.</p>
        <div class="image-slider">
          <div class="image-track">
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Elegance 1" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Elegance 2" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Elegance 3" />
            </div>
            <div class="slide-image">
              <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Elegance 4" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="products" class="products">
      <div class="container">
        <h2 class="section-title">Our Collection</h2>

        <div class="products-grid">
          {#each data.bags as bag}
            <div class="product-card">
              <div class="product-image-wrapper">
                <img src={bag.image_url || 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={bag.name} class="product-image" />
                {#if !bag.in_stock}
                  <div class="out-of-stock-badge">Out of Stock</div>
                {/if}
              </div>
              <div class="product-info">
                <h3 class="product-name">{bag.name}</h3>
                <p class="product-description">{bag.description}</p>
                <p class="product-price">${bag.price}</p>
              </div>
            </div>
          {:else}
            <div class="no-products">
              <p>No products available at the moment.</p>
              <p class="coming-soon">New arrivals coming soon...</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
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

  .btn-logout {
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }

  main {
    flex: 1;
    padding-top: 80px;
  }

  .hero {
    position: relative;
    height: 600px;
    overflow: hidden;
  }

  .hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .hero-slide.active {
    opacity: 1;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  }

  .hero-content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: 0 24px;
    animation: fadeInUp 1s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 64px;
    font-weight: 700;
    margin: 0 0 16px 0;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-subtitle {
    font-size: 20px;
    font-weight: 300;
    margin: 0 0 40px 0;
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  .btn-primary {
    display: inline-block;
    padding: 16px 48px;
    background: #c58e46;
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-radius: 2px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(197, 142, 70, 0.3);
  }

  .btn-primary:hover {
    background: #b57d35;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(197, 142, 70, 0.4);
  }

  .slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid white;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 32px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
  }

  .slider-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
  }

  .slider-btn-prev {
    left: 32px;
  }

  .slider-btn-next {
    right: 32px;
  }

  .slider-dots {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .dot.active {
    background: white;
    width: 32px;
    border-radius: 6px;
  }

  .featured-section {
    padding: 80px 0;
    background: white;
  }

  .featured-section.alt {
    background: #fafafa;
  }

  .section-description {
    font-size: 16px;
    line-height: 1.8;
    color: #666;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 48px auto;
    letter-spacing: 0.3px;
  }

  .image-slider {
    overflow: hidden;
    position: relative;
    padding: 24px 0;
  }

  .image-track {
    display: flex;
    gap: 24px;
    animation: scroll 30s linear infinite;
  }

  .image-track:hover {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-25% - 24px));
    }
  }

  .slide-image {
    flex: 0 0 calc(25% - 18px);
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
  }

  .slide-image:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .slide-image::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .slide-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .slide-image:hover img {
    transform: scale(1.05);
  }

  .products {
    padding: 96px 0;
    background: #fafafa;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .section-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 42px;
    text-align: center;
    margin: 0 0 64px 0;
    color: #1a1a1a;
    letter-spacing: 1px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 40px;
  }

  .product-card {
    background: white;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .product-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    background: #f5f5f5;
  }

  .product-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .product-card:hover .product-image {
    transform: scale(1.05);
  }

  .out-of-stock-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 2px;
  }

  .product-info {
    padding: 24px;
  }

  .product-name {
    font-family: 'Libre Baskerville', serif;
    font-size: 20px;
    margin: 0 0 12px 0;
    color: #1a1a1a;
  }

  .product-description {
    font-size: 14px;
    color: #666;
    margin: 0 0 16px 0;
    line-height: 1.5;
  }

  .product-price {
    font-size: 18px;
    font-weight: 600;
    color: #c58e46;
    margin: 0;
  }

  .no-products {
    grid-column: 1 / -1;
    text-align: center;
    padding: 64px 24px;
  }

  .no-products p {
    font-size: 18px;
    color: #666;
    margin: 0 0 8px 0;
  }

  .coming-soon {
    font-size: 14px;
    color: #999;
    font-style: italic;
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

    main {
      padding-top: 60px;
    }

    .hero {
      height: 500px;
    }

    .hero-title {
      font-size: 36px;
    }

    .hero-subtitle {
      font-size: 16px;
    }

    .btn-primary {
      padding: 12px 32px;
      font-size: 12px;
    }

    .slider-btn {
      width: 40px;
      height: 40px;
      font-size: 24px;
    }

    .slider-btn-prev {
      left: 16px;
    }

    .slider-btn-next {
      right: 16px;
    }

    .featured-section {
      padding: 56px 0;
    }

    .section-description {
      font-size: 14px;
      margin-bottom: 32px;
    }

    .slide-image {
      flex: 0 0 calc(50% - 12px);
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-50% - 24px));
      }
    }

    .products {
      padding: 64px 0;
    }

    .section-title {
      font-size: 32px;
      margin-bottom: 40px;
    }

    .products-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }

  @media (max-width: 480px) {
    .hero {
      height: 400px;
    }

    .hero-title {
      font-size: 28px;
    }

    .hero-subtitle {
      font-size: 14px;
    }

    .featured-section {
      padding: 48px 0;
    }

    .section-title {
      font-size: 26px;
    }

    .section-description {
      font-size: 13px;
      line-height: 1.6;
    }

    .slide-image {
      flex: 0 0 calc(70% - 12px);
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-70% - 24px));
      }
    }
  }
</style>
