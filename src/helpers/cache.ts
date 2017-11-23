interface ICache {
  calls: ICachedCall[]
}

interface ICachedCall {
  url      : string
  cachedAt : number
  body     : object
}

interface ICacheOptions {
  seconds : number
  minutes : number
  hours   : number
  days    : number
  months  : number
}

export default class CacheCall {
  _options;
  _cached;

  constructor(opts: ICacheOptions) {
    this._options = {
      seconds : opts.seconds,
      minutes : (opts.minutes * 60),
      hours   : (opts.hours * 60 * 60),
      days    : (opts.days * 60 * 60 * 24),
      months  : (opts.months * 60 * 60 * 30)
    }
    this._cached = {}
  }

  cache(url: string, body: object): void {
    if ( this._cached.hasOwnProperty( url ) === false ) {
      this._cached[ url ] = { cachedAt: this.getUnixTimestamp(), body }
    } else {
      this._cached[ url ]
    }
  }

  checkCache(url: string): object | boolean {
    // If we have the url cached, return same result
    if ( this._cached.hasOwnProperty( url ) ) {
      const cachedAt = this._cached[ url ].cachedAt
      const now      = this.getUnixTimestamp()

      const cacheLimit = cachedAt +
        (this._options.seconds !== undefined ? this._options.seconds : 0) +
        (this._options.minutes !== undefined ? this._options.minutes : 0) +
        (this._options.hours   !== undefined ? this._options.hours : 0) +
        (this._options.days    !== undefined ? this._options.days : 0) +
        (this._options.months  !== undefined ? this._options.months : 0)

      if ( now > cacheLimit ) {
        this._cached[ url ] = { cachedAt: now }
        return false
      } else {
        return this._cached[ url ].body
      }
    }
  }

  getUnixTimestamp(): number {
    return Math.round((new Date()).getTime() / 1000)
  }
}
