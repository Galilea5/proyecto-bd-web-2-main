import express from 'express'
import passport from 'passport'
import { ObjectId } from 'mongoose'
import MovieService from '../services/movie.services'
import { Movie } from '../types/movie.type'

const router = express.Router()
const service = new MovieService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const product: Movie = req.body
    const newMovie = await service.create(product, req.body.category as ObjectId)
    res.status(201).json(newMovie)
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      if (req.query.name) {
        const movie = await service.findByName(req.query.name as string)
        res.status(200).json(movie)
      } else if (req.query.category) {
        const movie = await service.findByCategory(
          req.query.category as string
        )
        res.status(200).json(movie)
      } else if (req.query.id) {
        const movie = await service.findById(req.query.id as string)
        res.status(200).json(movie)
      }else if(req.query.description){
        const movie = await service.findByDescripcion(req.query.description as string)
        res.status(200).json(movie)
      }
      const movie = await service.findAll()
      res.status(200).json(movie)
    } catch (error) {
      next(error)
    }
  }
)

export default router