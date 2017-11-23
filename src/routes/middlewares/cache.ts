import { cacheCalls } from '../../config'

/**
 * Checks if we can use cache of an API call
 *
 * @return next|object
 */
export default (req, res, next): void => {
  const url = req.originalUrl

  const isCached = cacheCalls.checkCache( url )

  if ( isCached === false ) {
    return next()
  }

  res.json( isCached )
}
