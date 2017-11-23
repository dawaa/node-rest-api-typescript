// external
import * as request from 'superagent'

// internal
import shuffle                  from '../../helpers/shuffleArray'
import { baseUrl as albumsUrl } from './albums'
import { baseUrl as postsUrl }  from './posts'
import { baseUrl as usersUrl }  from './users'

/**
 * Lists everything from `albums`, `posts`, `users` resource
 */
export const listAll = async (req, res) => {
  const albums = await request.get( albumsUrl )
  const posts  = await request.get( postsUrl )
  const users  = await request.get( usersUrl )

  res.json({
    albums : shuffle( albums.body ).splice( 0, 30 ),
    posts  : shuffle( posts.body ).splice( 0, 30 ),
    users  : shuffle( users.body ).splice( 0, 10 )
  })
}
