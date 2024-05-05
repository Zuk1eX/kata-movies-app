import axios from 'axios'

export default class MovieService {
  constructor() {
    this._apiUrl = 'https://api.themoviedb.org/3'
    this._posterUrl = 'https://image.tmdb.org/t/p/w500'
    this._apiToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzJhMTYzODE3N2EzNmNmNTZmYzQ2ODE3MjUzOGRkNyIsInN1YiI6IjY2MzQ3ZjM5OTU5MGUzMDEyY2JiNWM2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tXis_4Z6bnrjmRk6BlIt6QMZwCrXKOZwVVjmsC_waOE'
    this._headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this._apiToken}`,
    }
    this._api = axios.create({
      baseURL: this._apiUrl,
      headers: this._headers,
    })
  }

  async fetchData(url, params) {
    const response = await this._api.get(url, { params })
    return response.data
  }

  async searchMovies(query, page = 1) {
    if (!query) return

    try {
      const data = await this.fetchData('/search/movie', {
        query,
        page,
      })

      // if (includeGenres) {
      //   const genres = await this.getMovieGenres()
      //   return this.convertMoviesData({ results: data.results, genres })
      // }

      return this.convertMoviesData(data)
    } catch (e) {
      throw new Error(`[${e.response.status}] Failed to fetch movies. Try again later.`)
    }
  }

  async getMovieGenres() {
    const data = await this.fetchData('/genre/movie/list')
    return data.genres
  }

  convertMoviesData({ results, ...data }) {
    return {
      results: results.map((movie) => {
        const posterUrl = movie.poster_path && this._posterUrl + movie.poster_path
        // const movieGenres =
        //   genres &&
        //   movie.genre_ids.map((id) => {
        //     return genres.find((genre) => genre.id === id)
        //   })

        return {
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date,
          description: movie.overview,
          // genres: movieGenres,
          posterImageUrl: posterUrl,
        }
      }),
      page: data.page,
      totalResults: data.total_results,
    }
  }
}
