// external
import * as request from 'superagent'

// internal
import { apiBase } from '../../config'

// The base url for this resource
export const baseUrl = `${ apiBase }/users`

export const listAll = async (req, res) => {
  const response = await request.get( baseUrl )

  res.json( response.body )
}
