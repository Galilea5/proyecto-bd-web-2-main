import { Schema, model } from 'mongoose'
import { Movie, MovieModel,  } from '../types/movie.type'
import { CATEGORY_REFENCE } from '../types/category.type'

const Movies = new Schema<Movie, MovieModel>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: CATEGORY_REFENCE
  }
})

export default model('Movie', Movies)