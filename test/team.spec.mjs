import { data } from  '../data/data.json' assert { type: 'json' }
import { teams } from '../src/team.mjs'

describe('thefa fulltime api',function(){
    describe('teams',function(){
        it('allows you to generate a list of teams for a league',function(){
            expect(teams( data.league )).toEqual(expectArrayContains( data.team ))
            done()
        })
    })
})