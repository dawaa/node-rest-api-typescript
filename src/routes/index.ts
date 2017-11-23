// external
import * as express from 'express'

// internal
import authorization from './middlewares/authorization'
import ApiRouter     from './api'


/**
 * Initializing our main router
 */
const Router = express.Router()



// middlewares
Router.use( '/api', authorization)

// routes
Router.use( '/api', ApiRouter )

// 404, nothing found
Router.use((req, res) => res.status( 404 ).send( 'I\'m just as lost as you are..' ))

export default Router
