<script lang="ts">
  import { slide } from 'svelte/transition'
  import type { Quote } from 'src/models/Quote'
  import QuoteCard from './QuoteCard.svelte'
  import { isLoading, storedQuotes } from '../stores/index'
  import Spinner from './Spinner.svelte'

  let loading = false
  let quotes: Quote[] = []

  isLoading.subscribe((value) => {
    loading = value
  })

  storedQuotes.subscribe((value) => {
    quotes = value
  })

  const handleOnDeleted = (e: CustomEvent<Quote>) => {
    const filtered = quotes.filter(({ _id }) => {
      return _id !== e.detail._id
    })
    storedQuotes.set([...filtered])
  }
</script>

<div>
  <ul>
    {#each quotes as quote (quote._id)}
      <li transition:slide>
        <QuoteCard {quote} on:deleted={handleOnDeleted} />
      </li>
    {/each}
  </ul>
  {#if loading}
    <Spinner />
  {/if}
  {#if !loading && !quotes.length}
    <p>No hay frases. ¡Agrega una ⊂(◉‿◉)つ!</p>
  {/if}
</div>

<style>
  li {
    list-style: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0;
  }

  p {
    text-align: center;
  }
</style>
