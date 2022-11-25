import data from '../spec/data/data.json' assert { type: 'json' }
import { clubs } from '../src/club.mjs'

describe('thefa fulltime api',function(){
    describe('clubs',function(){
        it('allows you to generate a list of clubs for a league',function(){
            expect(clubs( data.league )).toEqual(expectArrayContains( data.club ))
            done()
        })
    })
})