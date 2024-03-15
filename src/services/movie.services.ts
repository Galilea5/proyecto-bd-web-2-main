import boom from '@hapi/boom'
import { ObjectId } from 'mongoose'
import Movies from '../models/movies.model'
import Categories from '../models/category.model'
import { Movie } from '../types/movie.type'

class MovieService {
  async create(product: Movie, categoryId: ObjectId) {
    const newMovie = await Movies.create({
      ...product,
      category: categoryId
    }).catch((error) => {
      console.log('Could not save product', error)
    })

    const existingMovies = await this.findById((newMovie as any)._id)

    return existingMovies.populate([
      { path: 'category', strictPopulate: false }
    ])
  }

  async findAll() {
    const movies = await Movies.find()
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!movies) {
      throw boom.notFound('There are not products')
    }
    return movies
  }

  async findByDescripcion(description: string) {
    const movies = await Movies.findOne({description})
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!movies) {
      throw boom.notFound('Product not found')
    }
    return movies
  }

  async findById(id: string) {
    const movies = await Movies.findById(id)
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!movies) {
      throw boom.notFound('Product not found')
    }
    return movies
  }

  async findByName(name: string) {
    const movies = await Movies.findOne({ name })
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
      })

    if (!movies) {
      throw boom.notFound('Product not found')
    }

    return movies
  }

  async findByCategory(category: string) {
    const categories = await Categories.findOne({ name: category }).catch(
      (error) => {
        console.log('Error while connecting to the DB', error)
        throw boom.badImplementation('Error while connecting to the DB')
      }
    )

    if (!categories) {
      throw boom.notFound('Category not found')
    }

    // Buscar los productos que pertenecen a la categoría encontrada
    const movies = await Movies.find({ category: categories._id})
      .populate([{ path: 'category', strictPopulate: false }])
      .catch((error) => {
        console.log('Error while connecting to the DB', error)
        throw boom.badImplementation('Error while connecting to the DB')
      })

    if (!movies || movies.length === 0) {
      throw boom.notFound('Products not found for the given category')
    }

    return movies
  }
}

export default MovieService