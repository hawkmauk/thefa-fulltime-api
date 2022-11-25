import { teams, clubs, fixtures } from './src/api.mjs'
import data from './test/data/data.json'

teams( data.league.id, data.season.id, data.club.id )
    .then( async teams => {
        let index = 0
        teams.forEach( (team) => {
            setTimeout(function(){
                fixtures( data.season.id, team.id )
                    .then( async fixtures => {
                        fixtures.forEach( fixture => {
                            if ( team.name == fixture.home ) console.log( `${ team.name } are playing at home on ${ fixture.date } against ${ fixture.away }` )
                        })
                    })
                })
            }, 3000 * index)
        index++
    })