<script lang="ts">
  import { onMount } from 'svelte';
  import ky from './lib/ky';
  import type { Quote } from 'src/models/Quote';
  import QuoteList from './components/QuoteList.svelte';
  import QuoteForm from './components/QuoteForm.svelte';
  import type { HTTPError } from 'ky';
  import { isLoading, storedQuotes } from './stores';

  let loading = false;
  let error: HTTPError;
  let quotes: Quote[] = [];

  isLoading.subscribe((value) => {
    loading = value;
  });

  storedQuotes.subscribe((value) => {
    quotes = value;
  });

  onMount(async () => {
    try {
      isLoading.set(true);
      quotes = (await ky.get('quotes').json()) as Quote[];
      quotes = quotes.reverse();
      storedQuotes.set(quotes);
      isLoading.set(false);
    } catch (e) {
      isLoading.set(false);
      error = e as HTTPError;
      console.log('Could not connect to NestJS server 😞');
      console.log(error);
    }
  });
</script>

<main>
  <div class="img-wrapper">
    <div class="img" />
  </div>
  <QuoteForm />
  {#if !error}
    <QuoteList />
  {:else}
    <p>Hubo un error buscando las frases (╯°□°）╯︵ ┻━┻</p>
  {/if}
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=Poppins:wght@400;500;700&display=swap');
  :root {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 16px;
    --svelte-orange: rgb(255, 62, 0);
    --svelte-orange-hex: 255, 62, 0;
    --svelte-gray: rgb(103, 103, 120);
  }

  :global(*) {
    font: inherit;
  }

  :global(html) {
    margin: 0;
    padding: 0;
  }

  main {
    display: grid;
    place-content: center;
    padding: 2rem 1rem;
  }

  .img-wrapper {
    aspect-ratio: 16 / 9;
    position: relative;
    width: 343.73333px;
    border-radius: 0.25rem;
    overflow: hidden;
    box-sizing: border-box;
    margin: 1rem 1rem 0rem 1rem;
  }

  .img {
    background-image: url('/images/doge.jpg');
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  p {
    text-align: center;
  }
</style>
