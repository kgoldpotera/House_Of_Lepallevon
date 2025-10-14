<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;

  let showForm = false;
  let editingBag: any = null;
  let formData = {
    name: '',
    description: '',
    price: '',
    image_url: '',
    in_stock: true
  };

  function openCreateForm() {
    editingBag = null;
    formData = {
      name: '',
      description: '',
      price: '',
      image_url: '',
      in_stock: true
    };
    showForm = true;
  }

  function openEditForm(bag: any) {
    editingBag = bag;
    formData = {
      name: bag.name,
      description: bag.description,
      price: bag.price.toString(),
      image_url: bag.image_url,
      in_stock: bag.in_stock
    };
    showForm = true;
  }

  function closeForm() {
    showForm = false;
    editingBag = null;
  }

  async function handleLogout() {
    await fetch('/auth/logout', { method: 'POST' });
    window.location.href = '/';
  }
</script>

<svelte:head>
  <title>Admin Dashboard - House of Le Pallevon</title>
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
          <span class="nav-text">Admin: {data.profile?.email}</span>
          <button on:click={handleLogout} class="nav-link btn-logout">Logout</button>
        </div>
      </nav>
    </div>
  </header>

  <main class="admin-page">
    <div class="container">
      <div class="admin-header">
        <h1 class="page-title">Bag Management</h1>
        <button on:click={openCreateForm} class="btn-primary">Add New Bag</button>
      </div>

      <div class="bags-table">
        {#each data.bags as bag}
          <div class="bag-row">
            <div class="bag-image-cell">
              <img
                src={bag.image_url || 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200'}
                alt={bag.name}
                class="bag-thumbnail"
              />
            </div>
            <div class="bag-info-cell">
              <h3 class="bag-name">{bag.name}</h3>
              <p class="bag-description">{bag.description}</p>
            </div>
            <div class="bag-price-cell">
              <span class="bag-price">${bag.price}</span>
            </div>
            <div class="bag-stock-cell">
              <span class="stock-badge" class:in-stock={bag.in_stock} class:out-of-stock={!bag.in_stock}>
                {bag.in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div class="bag-actions-cell">
              <button on:click={() => openEditForm(bag)} class="btn-edit">Edit</button>
              <form method="POST" action="?/delete" use:enhance={() => {
                return async ({ result }) => {
                  if (result.type === 'success') {
                    await invalidateAll();
                  }
                };
              }}>
                <input type="hidden" name="id" value={bag.id} />
                <button type="submit" class="btn-delete" onclick="return confirm('Are you sure you want to delete this bag?')">
                  Delete
                </button>
              </form>
            </div>
          </div>
        {:else}
          <div class="no-bags">
            <p>No bags in the collection yet.</p>
            <button on:click={openCreateForm} class="btn-secondary">Add Your First Bag</button>
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>

{#if showForm}
  <div class="modal-overlay" on:click={closeForm}>
    <div class="modal" on:click|stopPropagation>
      <div class="modal-header">
        <h2 class="modal-title">{editingBag ? 'Edit Bag' : 'Add New Bag'}</h2>
        <button on:click={closeForm} class="btn-close">&times;</button>
      </div>

      <form
        method="POST"
        action={editingBag ? '?/update' : '?/create'}
        use:enhance={() => {
          return async ({ result }) => {
            if (result.type === 'success') {
              closeForm();
              await invalidateAll();
            }
          };
        }}
      >
        {#if editingBag}
          <input type="hidden" name="id" value={editingBag.id} />
        {/if}

        <div class="form-group">
          <label for="name" class="form-label">Bag Name</label>
          <input
            type="text"
            id="name"
            name="name"
            bind:value={formData.name}
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            bind:value={formData.description}
            class="form-textarea"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="price" class="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            bind:value={formData.price}
            class="form-input"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div class="form-group">
          <label for="image_url" class="form-label">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            bind:value={formData.image_url}
            class="form-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="form-group-checkbox">
          <input
            type="checkbox"
            id="in_stock"
            name="in_stock"
            bind:checked={formData.in_stock}
            value="true"
          />
          <label for="in_stock" class="checkbox-label">In Stock</label>
        </div>

        <div class="modal-actions">
          <button type="button" on:click={closeForm} class="btn-cancel">Cancel</button>
          <button type="submit" class="btn-submit">
            {editingBag ? 'Update Bag' : 'Create Bag'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

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
    background: #fafafa;
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
    gap: 24px;
    align-items: center;
  }

  .nav-text {
    font-size: 14px;
    color: #c58e46;
    font-weight: 600;
  }

  .btn-logout {
    background: none;
    border: none;
    padding: 8px 16px;
    color: #666;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .btn-logout:hover {
    color: #c58e46;
  }

  .admin-page {
    flex: 1;
    padding: 120px 24px 60px;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .page-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 36px;
    margin: 0;
    color: #1a1a1a;
  }

  .btn-primary {
    padding: 12px 32px;
    background: #c58e46;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    background: #b57d35;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(197, 142, 70, 0.3);
  }

  .bags-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }

  .bag-row {
    display: grid;
    grid-template-columns: 100px 1fr 120px 120px 180px;
    gap: 24px;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #f0f0f0;
  }

  .bag-row:last-child {
    border-bottom: none;
  }

  .bag-image-cell {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .bag-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bag-info-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .bag-name {
    font-family: 'Libre Baskerville', serif;
    font-size: 18px;
    margin: 0;
    color: #1a1a1a;
  }

  .bag-description {
    font-size: 14px;
    color: #666;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bag-price-cell {
    text-align: right;
  }

  .bag-price {
    font-size: 18px;
    font-weight: 600;
    color: #c58e46;
  }

  .bag-stock-cell {
    text-align: center;
  }

  .stock-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .in-stock {
    background: #e8f5e9;
    color: #2e7d32;
  }

  .out-of-stock {
    background: #ffebee;
    color: #c62828;
  }

  .bag-actions-cell {
    display: flex;
    gap: 8px;
  }

  .btn-edit {
    padding: 8px 16px;
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .btn-edit:hover {
    background: #1976d2;
  }

  .btn-delete {
    padding: 8px 16px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .btn-delete:hover {
    background: #d32f2f;
  }

  .no-bags {
    padding: 80px 24px;
    text-align: center;
  }

  .no-bags p {
    font-size: 18px;
    color: #666;
    margin: 0 0 24px 0;
  }

  .btn-secondary {
    padding: 12px 32px;
    background: white;
    color: #c58e46;
    border: 2px solid #c58e46;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    background: #c58e46;
    color: white;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 24px;
  }

  .modal {
    background: white;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #f0f0f0;
  }

  .modal-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 24px;
    margin: 0;
    color: #1a1a1a;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 32px;
    color: #999;
    cursor: pointer;
    line-height: 1;
    transition: color 0.3s ease;
  }

  .btn-close:hover {
    color: #333;
  }

  .modal form {
    padding: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.3s ease;
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #c58e46;
    box-shadow: 0 0 0 3px rgba(197, 142, 70, 0.1);
  }

  .form-textarea {
    resize: vertical;
  }

  .form-group-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  }

  .form-group-checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .checkbox-label {
    font-size: 15px;
    color: #333;
    cursor: pointer;
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;
  }

  .btn-cancel {
    padding: 12px 24px;
    background: white;
    color: #666;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-cancel:hover {
    background: #f5f5f5;
    border-color: #ccc;
  }

  .btn-submit {
    padding: 12px 24px;
    background: #c58e46;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-submit:hover {
    background: #b57d35;
  }

  @media (max-width: 1024px) {
    .bag-row {
      grid-template-columns: 80px 1fr 100px 100px 160px;
      gap: 16px;
      padding: 16px 20px;
    }

    .bag-image-cell {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 768px) {
    .logo {
      font-size: 14px;
      letter-spacing: 1px;
    }

    .admin-page {
      padding: 100px 16px 40px;
    }

    .admin-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .page-title {
      font-size: 28px;
    }

    .bag-row {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .bag-image-cell {
      width: 100%;
      height: 200px;
    }

    .bag-price-cell,
    .bag-stock-cell {
      text-align: left;
    }

    .bag-actions-cell {
      width: 100%;
    }

    .btn-edit,
    .btn-delete {
      flex: 1;
    }
  }
</style>
