import axios from 'axios'

export default class MovieService {
  constructor() {
    this._apiUrl = 'https://api.themoviedb.org/3'
    this._apiToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzJhMTYzODE3N2EzNmNmNTZmYzQ2ODE3MjUzOGRkNyIsInN1YiI6IjY2MzQ3ZjM5OTU5MGUzMDEyY2JiNWM2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tXis_4Z6bnrjmRk6BlIt6QMZwCrXKOZwVVjmsC_waOE'
    this._apiKey = 'a32a1638177a36cf56fc468172538dd7'
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
    try {
      const response = await this._api.get(url, params)
      return response.data
    } catch (error) {
      // if (error.response) {
      // console.log(error.response.data)
      // console.log(error.response.status)
      // console.log(error.response.headers)
      // } else if (error.request) {
      // console.log(error.request)
      // } else {
      // console.log('Error', error.message)
      // }
      return error
    }
  }

  async searchMovies(query) {
    const data = await this.fetchData('/search/movie', {
      params: {
        query,
      },
    })
    return data
  }
}
