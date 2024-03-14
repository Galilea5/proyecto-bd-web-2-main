import { Schema, model } from 'mongoose'
import { Category, CategoryModel } from '../types/category.type'
import { USER_REFERENCE } from './user.model'

import { Schema, model } from 'mongoose';

export const MOVIE_REFERENCE = 'MovieList';

// Esquema para las películas
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  //Asociar las películas a usuarios
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_REFERENCE
  }
});

// Exporta el modelo de película
export default model(MOVIE_REFERENCE, MovieSchema);
