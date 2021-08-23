<script lang="ts">
  import { onMount } from 'svelte';
  import ky from 'ky';
  import logo from './assets/svelte.png';
  import Counter from './lib/Counter.svelte';

  let text = 'Connecting to NestJS server...';

  onMount(async () => {
    try {
      text = await ky.get('http://localhost:8000/').text();
    } catch (error) {
      text = 'Could not connect to NestJS server 😞';
    }
  });
</script>

<main>
  <img src={logo} alt="Svelte Logo" />
  <h1>Hello Typescript!</h1>
  <Counter />
  {#if text}
    <p>{text}</p>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
