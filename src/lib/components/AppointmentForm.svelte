<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';

	// ---- FORM STATE ----
	let name = '';
	let email = '';
	let phone = '';
	let preferredDate = '';
	let preferredTime = '';
	let message = '';

	let isLoading = false;

	let submissionMessage: {
		text: string;
		type: 'success' | 'error' | '';
	} = {
		text: '',
		type: ''
	};

	// ---- FIXED TYPED HANDLER ----
	const handleSubmit = () => {
		isLoading = true;
		submissionMessage = { text: '', type: '' };

		return async (event: {
			result: { type: string; data?: unknown };
			update: () => void;
		}) => {
			const { result, update } = event;

			isLoading = false;

			if (result.type === 'success') {
				submissionMessage = {
					text: 'Appointment request sent successfully! We will contact you soon.',
					type: 'success'
				};

				// Reset form
				name = '';
				email = '';
				phone = '';
				preferredDate = '';
				preferredTime = '';
				message = '';
			} else if (result.type === 'error') {
				const errorMessage =
					(result.data as { message?: string })?.message ??
					'Failed to send appointment request. Please try again.';

				submissionMessage = {
					text: errorMessage,
					type: 'error'
				};
			} else if (result.type === 'invalid') {
				submissionMessage = {
					text: 'Please check the form for errors.',
					type: 'error'
				};
			}

			update();
		};
	};
</script>

<form
	method="POST"
	action="/api/appointment"
	use:enhance={handleSubmit}
	class="appointment-form"
>
	<div class="form-grid">
		<div class="form-group">
			<label for="name">Name **(Required)**</label>
			<input type="text" id="name" name="name" bind:value={name} required />
		</div>

```
	<div class="form-group">
		<label for="email">Email **(Required)**</label>
		<input type="email" id="email" name="email" bind:value={email} required />
	</div>

	<div class="form-group">
		<label for="phone">Phone</label>
		<input type="tel" id="phone" name="phone" bind:value={phone} />
	</div>

	<div class="form-group">
		<label for="preferredDate">Preferred Date</label>
		<input type="date" id="preferredDate" name="preferredDate" bind:value={preferredDate} />
	</div>

	<div class="form-group">
		<label for="preferredTime">Preferred Time</label>
		<input type="time" id="preferredTime" name="preferredTime" bind:value={preferredTime} />
	</div>
</div>

<div class="form-group full-width">
	<label for="message">Message / Specific Requests</label>
	<textarea id="message" name="message" bind:value={message}></textarea>
</div>

{#if submissionMessage.text}
	<p
		class="submission-message"
		class:success={submissionMessage.type === 'success'}
		class:error={submissionMessage.type === 'error'}
		transition:fly={{ y: 10, duration: 300 }}
	>
		{submissionMessage.text}
	</p>
{/if}

<button type="submit" class="btn-primary form-submit-btn" disabled={isLoading}>
	{isLoading ? 'Sending Request...' : 'Book Appointment'}
</button>
```

</form>

<style>
	.appointment-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 0;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.full-width {
		grid-column: 1 / -1;
	}

	label {
		font-weight: 500;
		color: #333;
		font-size: 14px;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	input,
	textarea {
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 16px;
		transition: border-color 0.3s;
		font-family: 'DM Sans', sans-serif;
	}

	input:focus,
	textarea:focus {
		border-color: #c58e46;
		outline: none;
		box-shadow: 0 0 0 2px rgba(197, 142, 70, 0.1);
	}

	textarea {
		min-height: 120px;
		resize: vertical;
	}

	.form-submit-btn {
		align-self: center;
		width: auto;
		padding: 12px 36px;
		cursor: pointer;
		font-size: 16px;
	}

	.form-submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.submission-message {
		padding: 15px;
		border-radius: 4px;
		font-size: 16px;
		text-align: center;
	}

	.submission-message.success {
		background-color: #e6ffed;
		color: #38a169;
		border: 1px solid #38a169;
	}

	.submission-message.error {
		background-color: #ffebe6;
		color: #e53e3e;
		border: 1px solid #e53e3e;
	}
</style>
