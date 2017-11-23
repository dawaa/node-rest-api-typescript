/**
 * Checks for necessary authorization header.
 *
 * @return next|501
 */
export default (req, res, next): void => {
  if ( req.get( 'authorization' ) ) return next()

  res.status( 501 )
  res.send( 'You\'re not privileged enough to see this page..' )
}
