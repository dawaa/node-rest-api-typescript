// external
import * as chai from 'chai'
import * as request   from 'supertest'

console.log(request )

const app = request( 'http://localhost:3000' )

describe( 'Try accessing non-existing routes', () => {

  describe( 'Failing endpoints or requests', () => {
    it ( '/ => 404', done => {
      app
        .get( '/' )
        .expect( 404, done )
    } )

    it( '/doesnt-exist => 404', done => {
      app
        .get( '/doesnt-exist' )
        .expect( 404, done )
    } )

    it ( '/api/posts => 501 (NO AUTHORIZATION)', done => {
      app
        .get( '/api/posts' )
        .expect( 501, done )
    } )
  } )


  describe( 'Posts', () => {
    describe( 'No authorization token', () => {
      it ( '/api/posts GET => 501 (UNAUTHORIZED)', done => {
        app.get( '/api/posts' ).expect( 501, done )
      } )

      it ( '/api/posts POST => 501 (UNAUTHORIZED)', done => {
        app
          .post( '/api/posts' )
          .send({ title: 'Random title', body: 'Body...', userId: 92 })
          .expect( 501, done )
      } )

      it ( 'api/posts/20 PUT => 501 (UNAUTHORIZED)', done => {
        app
          .put( '/api/posts/20' )
          .send({ title: 'Updated new title', body: 'Hello there!', userId: 92 })
          .expect( 501, done )
      } )

      it ( 'api/posts/20 DELETE => 501 (UNAUTHORIZED)', done => {
        app
          .put( '/api/posts/20' )
          .expect( 501, done )
      } )
    } )

    describe( 'With authorization token', () => {
      it ( '/api/posts GET => 200 (AUTHORIZED)', done => {
        app
          .get( '/api/posts' )
          .set( 'authorization', 'Bearer af24353tdsfw' )
          .expect( 200, done )
      } )

      it ( '/api/posts POST => 200 (AUTHORIZED)', done => {
        app
          .post( '/api/posts' )
          .set( 'authorization', 'Bearer af24353tdsfw' )
          .send({ title: 'Random title', body: 'Body...', userId: 92 })
          .expect( 200 )
          .end((error, response) => {
            if ( error ) return done( error )

            chai.assert.deepEqual(
              response.body,
              {
                title  : 'Random title',
                body   : 'Body...',
                userId : 92,
                id     : 101
              }
            )
            done()
          })

      } )

      it ( 'api/posts/20 PUT => 200 (AUTHORIZED)', done => {
        app
          .put( '/api/posts/20' )
          .set( 'authorization', 'Bearer af24353tdsfw' )
          .send({ title: 'Updated new title', body: 'Hello there!', userId: 92 })
          .expect( 200 )
          .end((error, response) => {
            if ( error ) return done( error )

            chai.assert.deepEqual(
              response.body,
              {
                title  : 'Updated new title',
                body   : 'Hello there!',
                userId : 92,
                id     : 20
              }
            )
            done()
          })
      } )

      it ( 'api/posts/20 DELETE => 200 (AUTHORIZED)', done => {
        app
          .put( '/api/posts/20' )
          .set( 'authorization', 'Bearer af24353tdsfw' )
          .expect( 200 )
          .end((error, response) => {
            if ( error ) return done( error )

            chai.assert.deepEqual( response.body, { id: 20 } )
            done()
          })
      } )
    } )
  } )


  describe( 'Users', () => {
    describe( 'No authorization token', () => {
      it ( 'api/users GET => 501 (UNAUTHORIZED)', done => {
        app.get( '/api/users' ).expect( 501, done )
      } )
    })

    describe( 'With authorization token', () => {
      it ( 'api/users GET => 200 (AUTHORIZED)', done => {
        app
          .get( '/api/users' )
          .set( 'authorization', 'Bearer af24353tdsfw' )
          .expect( 200, done )
      } )
    })
  } )


  describe( 'Albums', () => {
    describe( 'No authorization token', () => {
      it ( 'api/albums GET => 501 (UNAUTHORIZED)', done => {
        app.get( '/api/albums' ).expect( 501, done )
      } )
    })

    describe( 'With authorization token', () => {
      it ( 'api/albums GET => 200 (AUTHORIZED)', done => {
        app
          .get( '/api/albums' )
          .set( 'authorization', 'Bearer af24353tdsfw' )
          .expect( 200, done )
      } )
    })
  } )

  describe( 'Collections', () => {
    describe( 'No authorization token', () => {
      it ( 'api/collection GET => 501 (UNAUTHORIZED)', done => {
        app
          .get( '/api/colleciton' )
          .expect( 501, done )
      } )
    } )

    describe( 'With authorization token', () => {
      it( 'api/collection GET => 200 (AUTHORIZATION)', done => {
        app
          .get( '/api/collection' )
          .set( 'authorization', 'Bearer af24353tdsfw' )
          .expect( 200 )
          .end((error, res) => {
            if ( error ) return done( error )

            chai.assert.lengthOf( res.body.albums, 30, '30x Albums' )
            chai.assert.lengthOf( res.body.posts, 30, '30x Posts' )
            chai.assert.lengthOf( res.body.users, 10, '10x Users' )
            done()
          })
      } )
    } )
  } )

} )
