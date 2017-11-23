// external
import * as express    from 'express'
import * as bodyParser from 'body-parser'

// internal
import { port } from './config'
import routes   from './routes'

const app = express()

// Boot up the app on port 3000, woho.
app.listen( port, (): void => {} )

// Allow POST params to be parsed
app.use( bodyParser.json() )

// Routes
app.use( '/', routes )
