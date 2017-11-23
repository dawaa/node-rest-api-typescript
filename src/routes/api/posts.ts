// external
import * as request from 'superagent'

// internal
import { apiBase } from '../../config'

// The base url for this resource
export const baseUrl = `${ apiBase }/posts`

/**
 * Lists everything from `posts` resource
 *  [GET] /api/posts
 */
export const listAll = async (req, res) => {
  const response = await request.get( baseUrl )

  res.json( response.body )
}

/**
 * Creates a new post
 *  [POST] /api/posts
 */
export const create = async (req, res) => {
  const { title, body, userId } = req.body

  const response = await request
                          .post( baseUrl )
                          .send({ title, body, userId })

  res.json( response.body )
}

/**
 * Updates an already existing post by URL param:
 * e.g:
 *  [PUT] /api/posts/:id
 *
 */
export const update = async (req, res) => {
  const { title, body, userId } = req.body
  const { id }                  = req.params

  const response = await request
                          .put( `${ baseUrl }/${ id }` )
                          .send({ id, title, body, userId })

  res.json( response.body )
}

/**
 * Deletes a post by URL param:
 * e.g:
 *  [DELETE] /api/posts/:id
 */
export const remove = async (req, res) => {
  const { id } = req.params

  console.log(  `${ baseUrl }/${ id }` )
  const response = await request.delete( `${ baseUrl }/${ id }` )

  res.json( response.body )
}
