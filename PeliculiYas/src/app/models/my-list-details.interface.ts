import { FilmDetailsResponse } from "./film-details.interface"

export interface myListDetailsResponse {
    created_by: string
    description: string
    favorite_count: number
    id: number
    iso_639_1: string
    item_count: number
    items: FilmDetailsResponse[]
    name: string
    page: number
    poster_path: any
    total_pages: number
    total_results: number
  }