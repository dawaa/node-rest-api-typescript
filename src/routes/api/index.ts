// external
import * as express from 'express'

// internal
import * as posts      from './posts'
import * as users      from './users'
import * as albums     from './albums'
import * as collection from './collection'

const ApiRouter = express.Router({ mergeParams: true })

/**
 * Posts
 */
ApiRouter.get( '/posts', posts.listAll )
ApiRouter.post( '/posts', posts.create )
ApiRouter.put( '/posts/:id', posts.update )
ApiRouter.delete( '/posts/:id', posts.remove )

/**
 * Users
 */
ApiRouter.get( '/users', users.listAll )

/**
 * Albums
 */
ApiRouter.get( '/albums', albums.listAll )

/**
 * Collection
 */
ApiRouter.get( '/collection', collection.listAll )

export default ApiRouter
