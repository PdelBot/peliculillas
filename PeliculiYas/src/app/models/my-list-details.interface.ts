export interface myListDetailsResponse {
    created_by: string
    description: string
    favorite_count: number
    id: number
    iso_639_1: string
    item_count: number
    items: filmList[]
    name: string
    page: number
    poster_path: any
    total_pages: number
    total_results: number
  }

  export interface filmList{
      adult: boolean
      backdrop_path: string
      genre_ids: number[]
      id: number
      media_type: string
      original_language: string
      original_title: string
      overview: string
      popularity: number
      poster_path: string
      release_date: string
      title: string
      video: boolean
      vote_average: number
      vote_count: number
  }