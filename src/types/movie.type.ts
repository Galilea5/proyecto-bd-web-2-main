
import { Model } from 'mongoose'
import { Category } from './category.type'

export type Movie = {
  id?: string
  name: string,
  description?: string
  category: Category
}

export type MovieModel = Model<Movie>