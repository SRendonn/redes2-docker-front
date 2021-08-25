<script lang="ts">
  import ky from '../lib/ky'

  import type { Quote } from 'src/models/Quote'
  import { lastCreated } from '../stores'
  import LikeSvg from './LikeSvg.svelte'
  import TrashSvg from './TrashSvg.svelte'
  import { createEventDispatcher } from 'svelte'
  import type { HTTPError } from 'ky'

  let lastCreatedId = null
  lastCreated.subscribe((value) => {
    lastCreatedId = value
  })

  const dispatch = createEventDispatcher()

  const deleteQuote: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (e) => {
    try {
      const result = ky.delete(`quotes/delete/${quote._id}`)
      dispatch('deleted', quote)
    } catch (error) {
      dispatch('error', error as HTTPError)
    }
  }

  export let quote: Quote = null
  let liked = false
</script>

<div
  class={lastCreatedId === quote._id ? 'new-quote quote-card' : 'quote-card'}
>
  <p class="quote-quote">"{quote.quote}"</p>
  <div class="quote-footer">
    <div>
      <button
        class="icon-button like-button"
        aria-label="Like this quote"
        on:click={() => (liked = !liked)}
      >
        <LikeSvg {liked} />
      </button>
      <button class="icon-button delete-button" on:click={deleteQuote}>
        <TrashSvg />
      </button>
    </div>
    <p class="quote-author">{quote.author}</p>
  </div>
</div>

<style>
  p {
    margin: 0;
  }

  .quote-card {
    transition: box-shadow 300ms linear;
    padding: 1.5rem;
    box-shadow: 1px 1px 4px hsl(0, 0%, 15%, 0.2);
    border-radius: 6px;
    background-color: white;
    max-width: 768px;
    word-wrap: break-word;
  }

  .quote-quote {
    font-weight: 500;
    color: hsl(0, 0%, 15%);
    font-family: 'Playfair Display', serif;
    font-style: italic;
    letter-spacing: 0.5px;
    padding-bottom: 1.5rem;
  }

  .quote-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .quote-author {
    font-size: 0.75rem;
    color: var(--svelte-orange);
    text-align: right;
  }

  .icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-radius: 50%;
    transition: background-color 100ms linear;
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
  }

  .icon-button:hover {
    background-color: rgba(var(--svelte-orange-hex), 0.1);
  }

  .new-quote {
    box-shadow: 1px 1px 10px rgba(var(--svelte-orange-hex), 0.5);
  }
</style>
