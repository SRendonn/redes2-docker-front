import { writable } from 'svelte/store'
import type { Quote } from 'src/models/Quote'

export const isLoading = writable(false)
export const lastCreated = writable('')
export const storedQuotes = writable<Quote[]>([])
