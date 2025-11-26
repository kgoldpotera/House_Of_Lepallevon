<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;

  // State for tab navigation
  let activeTab: 'products' | 'users' = 'products'; 

  // State for form/modal
  let showForm = false;
  let editingBag: any = null;
  let formData = {
    name: '',
    description: '',
    price: '',
    image_url: '',
    in_stock: true
  };
  let selectedFile: File | null = null;
  let fileInput: HTMLInputElement;
  let previewUrl = '';

  // --- Helper Functions ---

  function openCreateForm() {
    editingBag = null;
    formData = {
      name: '',
      description: '',
      price: '',
      image_url: '',
      in_stock: true
    };
    selectedFile = null;
    previewUrl = '';
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
    selectedFile = null;
    previewUrl = bag.image_url || '';
    showForm = true;
  }

  function closeForm() {
    showForm = false;
    editingBag = null;
    selectedFile = null;
    previewUrl = '';
  }

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle form submission completion (used for both product and user actions)
  const handleEnhance = () => {
    return async ({ result }) => {
      if (result.type === 'success') {
        closeForm();
        await invalidateAll();
      }
      if (result.type === 'failure' && result.data?.error) {
        // Simple error feedback: log to console or display a toast notification
        console.error("Action Failed:", result.data.error);
        alert(`Error: ${result.data.error}`); 
      }
    };
  };

</script>

<svelte:head>
  <title>Admin Dashboard - House of Le Pallevon</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<main class="admin-page">
  <div class="container">
    <div class="admin-header">
      <h1 class="page-title">{activeTab === 'products' ? 'Bag Management' : 'User Management'}</h1>
      <div class="header-actions">
          <div class="tab-controls">
              <button class="tab-btn" class:active={activeTab === 'products'} on:click={() => activeTab = 'products'}>Products</button>
              <button class="tab-btn" class:active={activeTab === 'users'} on:click={() => activeTab = 'users'}>Users</button>
          </div>
          {#if activeTab === 'products'}
              <button on:click={openCreateForm} class="btn-primary">Add New Bag</button>
          {/if}
      </div>
    </div>
    
    {#if activeTab === 'products'}
      <div class="table-wrapper">
        <div class="bags-table">
          <div class="bag-row table-header">
            <div class="bag-image-cell">Image</div>
            <div class="bag-info-cell">Product Details</div>
            <div class="bag-price-cell">Price</div>
            <div class="bag-stock-cell">Stock</div>
            <div class="bag-actions-cell">Actions</div>
          </div>

          {#each data.bags as bag}
            <div class="bag-row">
              <div class="bag-image-cell" data-label="Image">
                <img
                  src={bag.image_url || 'https://via.placeholder.com/80/f5f5f5?text=No+Image'}
                  alt={bag.name}
                  class="bag-thumbnail"
                />
              </div>
              <div class="bag-info-cell" data-label="Details">
                <h3 class="bag-name">{bag.name}</h3>
                <p class="bag-description">{bag.description}</p>
              </div>
              <div class="bag-price-cell" data-label="Price">
                <span class="bag-price">${bag.price}</span>
              </div>
              <div class="bag-stock-cell" data-label="Stock">
                <span class="stock-badge" class:in-stock={bag.in_stock} class:out-of-stock={!bag.in_stock}>
                  {bag.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div class="bag-actions-cell" data-label="Actions">
                <button on:click={() => openEditForm(bag)} class="btn-edit">Edit</button>
                <form method="POST" action="?/delete" use:enhance={handleEnhance()}>
                  <input type="hidden" name="id" value={bag.id} />
                  <input type="hidden" name="image_url" value={bag.image_url} />
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
    {/if}

    {#if activeTab === 'users'}
        <div class="table-wrapper">
            <div class="bags-table user-table">
                <div class="user-row table-header">
                    <div class="user-email-cell">Email</div>
                    <div class="user-role-cell">Role</div>
                    <div class="user-date-cell">Joined</div>
                    <div class="user-actions-cell">Action</div>
                </div>

                {#each data.users as user}
                    <div class="user-row">
                        <div class="user-email-cell" data-label="Email">
                            <span class="bag-name">{user.email}</span>
                            {#if user.email === data.userEmail}
                                <span class="current-user-badge">(You)</span>
                            {/if}
                        </div>
                        <div class="user-role-cell" data-label="Role">
                            <span class="stock-badge" class:in-stock={user.role === 'admin'}>
                                {user.role.toUpperCase()}
                            </span>
                        </div>
                        <div class="user-date-cell" data-label="Joined">
                            {new Date(user.created_at).toLocaleDateString()}
                        </div>
                        <div class="user-actions-cell" data-label="Action">
                            {#if user.email !== data.userEmail}
                                <form method="POST" action="?/promoteUser" use:enhance={handleEnhance()}>
                                    <input type="hidden" name="user_id" value={user.id} />
                                    <input type="hidden" name="current_role" value={user.role} />
                                    <button 
                                        type="submit" 
                                        class="btn-secondary btn-sm"
                                        onclick="return confirm(`Are you sure you want to ${user.role === 'admin' ? 'DEMOTE' : 'PROMOTE'} ${user.email}?`)"
                                    >
                                        {user.role === 'admin' ? 'Demote' : 'Promote'}
                                    </button>
                                </form>
                            {:else}
                                <span class="no-action-text">N/A</span>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
    
  </div>
</main>

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
        enctype="multipart/form-data"
        use:enhance={handleEnhance()}
      >
        {#if editingBag}
          <input type="hidden" name="id" value={editingBag.id} />
          <input type="hidden" name="existing_image_url" value={editingBag.image_url} />
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
          <label for="image" class="form-label">
            Bag Image {editingBag ? '(Leave empty to keep current image)' : ''}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            bind:this={fileInput}
            on:change={handleFileSelect}
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            class="form-input-file"
            required={!editingBag}
          />

          {#if previewUrl}
            <div class="image-preview">
              <img src={previewUrl} alt="Preview" class="preview-img" />
            </div>
          {/if}
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
  /* Base styles should be in +layout.svelte, but keeping page styles here for clarity */

  /* Removed .page-wrapper and .header styles as they conflict with +layout.svelte */

  .admin-page {
    flex: 1;
    padding: 60px 24px; /* Reduced top padding as header is handled by layout */
    background: #fafafa;
    min-height: calc(100vh - 80px); /* Ensure page fills viewport below header */
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
    flex-wrap: wrap; /* Added for responsiveness */
    gap: 20px;
  }
  
  .header-actions {
      display: flex;
      gap: 24px;
      align-items: center;
      flex-wrap: wrap;
  }

  .page-title {
    font-family: 'Libre Baskerville', serif;
    font-size: 36px;
    margin: 0;
    color: #1a1a1a;
  }
  
  /* TAB CONTROLS */
  .tab-controls {
      display: flex;
      border-bottom: 2px solid #e0e0e0;
  }
  
  .tab-btn {
      background: none;
      border: none;
      padding: 10px 15px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      color: #666;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
      margin-bottom: -2px; /* Pulls button down to cover border */
  }
  
  .tab-btn:hover {
      color: #1a1a1a;
  }

  .tab-btn.active {
      color: #c58e46;
      border-bottom-color: #c58e46;
      font-weight: 600;
  }

  .btn-primary, .btn-secondary, .btn-edit, .btn-delete, .btn-cancel, .btn-submit {
      /* Shared button base styles */
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
  }

  .btn-primary, .btn-submit {
    background: #c58e46;
    color: white;
    border: none;
  }

  .btn-primary:hover, .btn-submit:hover {
    background: #b57d35;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(197, 142, 70, 0.3);
  }

  .btn-secondary {
    background: white;
    color: #c58e46;
    border: 2px solid #c58e46;
  }

  .btn-secondary:hover {
    background: #c58e46;
    color: white;
  }
  
  /* TABLE STYLES - Mobile-first grid layout */

  .table-wrapper {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  .bags-table {
    display: grid;
    /* Define desktop grid columns */
    grid-template-columns: 1fr;
  }
  
  .bag-row, .user-row {
    border-bottom: 1px solid #f0f0f0;
    padding: 15px 24px;
    display: grid;
    /* Default to single column mobile layout */
    grid-template-columns: 1fr; 
    gap: 10px;
  }

  .bag-row:last-child, .user-row:last-child {
    border-bottom: none;
  }

  /* Desktop View */
  @media (min-width: 1024px) {
    .bags-table, .user-table {
        /* Add table header row styles */
        grid-template-columns: 1fr;
    }
    
    .bag-row, .user-row {
        /* Define responsive columns for desktop */
        grid-template-columns: 80px 1.5fr 120px 100px 180px; 
        gap: 24px;
        align-items: center;
        padding: 20px 24px;
    }
    
    .user-table .user-row {
        grid-template-columns: 1.5fr 120px 150px 120px; 
    }
    
    .bag-row > div::before, .user-row > div::before {
        /* Hide mobile labels on desktop */
        content: none;
    }
    
    .table-header {
        font-weight: 600;
        background: #f9f9f9;
        color: #333;
        font-size: 14px;
        padding: 12px 24px;
        border-bottom: 1px solid #e0e0e0;
        /* Ensure table header uses same grid as rows */
        display: grid; 
    }
  }

  /* Mobile View - Specific cell styling */
  @media (max-width: 1023px) {
      .bag-row > div, .user-row > div {
          /* Hide grid display of table header on mobile */
          display: block; 
          padding: 5px 0;
      }
      
      .table-header {
          display: none !important; /* Hide explicit header row on small screens */
      }
      
      .bag-row > div::before, .user-row > div::before {
          content: attr(data-label);
          font-weight: 700;
          display: inline-block;
          width: 80px;
          min-width: 80px;
          color: #666;
          font-size: 13px;
          margin-right: 10px;
      }
      
      .bag-image-cell, .bag-actions-cell, .user-actions-cell {
          /* Make image and action cells take full width in mobile */
          grid-column: 1 / -1; 
      }
      
      .bag-actions-cell, .user-actions-cell {
          display: flex;
          gap: 10px;
          padding-top: 15px;
          border-top: 1px dashed #eee;
      }
      
      .btn-edit, .btn-delete, .btn-secondary {
          flex: 1;
      }
      
      .bag-price-cell, .bag-stock-cell {
          /* Center content alignment fix */
          text-align: left !important;
      }
  }
  
  /* PRODUCT SPECIFIC CELLS */

  .bag-image-cell {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    overflow: hidden;
    background: #f5f5f5;
  }
  
  @media (max-width: 1023px) {
      .bag-image-cell {
          /* In mobile view, the image cell is inline with the label */
          width: 60px;
          height: 60px;
          display: inline-block;
          margin-left: 90px;
      }
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
  
  /* USER SPECIFIC CELLS */
  
  .user-table .bag-name {
      font-size: 16px;
      font-family: 'DM Sans', sans-serif;
  }

  .current-user-badge {
      font-size: 12px;
      color: #c58e46;
      font-weight: 600;
      margin-left: 8px;
  }
  
  .no-action-text {
      color: #999;
      font-style: italic;
      font-size: 14px;
  }

  /* MODAL STYLES (Kept as is for functionality) */
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
  
  /* ... rest of your modal styles ... */
  
  .modal {
    background: white;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
  
  /* ... (Include all other modal styles: modal-header, form-group, etc.) ... */
  
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

  .form-input-file {
    width: 100%;
    padding: 12px 16px;
    border: 2px dashed #e0e0e0;
    border-radius: 4px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .form-input-file:hover {
    border-color: #c58e46;
    background: #fafafa;
  }

  .image-preview {
    margin-top: 16px;
    border-radius: 8px;
    overflow: hidden;
    max-width: 300px;
  }

  .preview-img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
</style>