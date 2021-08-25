<script lang="ts">
  import ky from '../lib/ky';

  import { createEventDispatcher } from 'svelte/internal';
  import type { HTTPError } from 'ky';
  import type { Quote } from 'src/models/Quote';
  import { storedQuotes } from '../stores';

  let quotes: Quote[] = [];
  let quote = '';
  let author = '';

  storedQuotes.subscribe((value) => {
    quotes = value;
  });

  const dispatch = createEventDispatcher();

  const handleOnSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    if (!author || !quote) return;

    try {
      const result: Quote = await ky
        .post('quotes/create', {
          json: { author, quote },
        })
        .json();
      dispatch('created', result);
      quote = '';
      author = '';
    } catch (e: unknown) {
      dispatch('error', e as HTTPError);
    }
  };

  const deleteAll = async () => {
    try {
      await ky.delete('quotes/delete');
      storedQuotes.set([]);
    } catch (error) {}
  };
</script>

<div class="form-wrapper">
  <form on:submit|preventDefault={handleOnSubmit}>
    <div class="input-container">
      <label for="quote">Frase</label>
      <textarea
        id="quote"
        type="text"
        class="input"
        bind:value={quote}
        required
      />
    </div>
    <div class="input-container">
      <label for="author">Autor</label>
      <input
        id="author"
        type="text"
        class="input"
        bind:value={author}
        required
      />
    </div>
    <button class="submit-btn" type="submit">Añade esta frase</button>
  </form>
  <button
    class="delete-btn"
    type="button"
    disabled={!quotes.length}
    on:click={deleteAll}>Elimina todas las frases</button
  >
</div>

<style>
  label {
    color: var(--svelte-gray);
    display: block;
  }

  textarea {
    resize: vertical;
    font-family: inherit;
  }

  .submit-btn {
    display: block;
    margin: 1rem auto;
    width: 100%;
    transition: all linear 0.1s;
    border: 1px solid white;
    background-color: var(--svelte-orange);
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
    border-radius: 0.25rem;
  }

  .submit-btn:hover {
    background-color: rgba(var(--svelte-orange-hex), 0.8);
  }

  .delete-btn {
    font-size: 0.75rem;
    display: block;
    margin: 1rem auto;
    width: 100%;
    transition: all linear 0.1s;
    border: 1px solid var(--svelte-orange);
    background-color: transparent;
    padding: 0.3rem 1rem;
    color: var(--svelte-orange);
    cursor: pointer;
    border-radius: 0.25rem;
  }

  .delete-btn:hover:not(:disabled) {
    background-color: rgba(var(--svelte-orange-hex), 0.1);
  }

  .delete-btn:disabled {
    color: #676778;
    border-color: #676778;
    cursor: auto;
  }

  .input {
    border: 1px solid var(--svelte-gray);
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  .input:focus {
    outline: transparent;
    box-shadow: 0px 0px 1px 2px var(--svelte-orange);
  }

  .form-wrapper {
    padding: 2rem 1rem;
  }
</style>
