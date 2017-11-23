// external
import * as Throttle from 'superagent-throttle'

// internal
import CacheCall from './helpers/cache'

/**
 * Define the application from a very high perspective here..
 */
export const apiBase : string = 'https://jsonplaceholder.typicode.com'
export const port    : number = 3000

/**
 * To use this, add it to 'superagent' (request) like the following
 *  e.g.:
 *   request
 *      .get( url )
 *      .use(throttle.plugin())
 *      [.end()]
 */
export const throttle = new Throttle({
  active     : false,
  rate       : 6,
  ratePer    : 10000,
  concurrent : 6
})

/**
 * To cache our calls
 */
export const cacheCalls = new CacheCall({
  seconds : 0,
  minutes : 2,
  hours   : 0,
  days    : 0,
  months  : 0
})
