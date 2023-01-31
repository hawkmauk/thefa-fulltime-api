import { teams, clubs, fixtures } from './src/api.mjs'
import data from './test/data/data.json'

function toExcelDate( date ){
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
}

teams( data.league.id, data.season.id, data.club.id )
    .then( async teams => {
        let index = 0
        teams.forEach( (team) => {
            setTimeout(function(){
                fixtures( data.season.id, team.id )
                    .then( async fixtures => {
                        fixtures.forEach( fixture => {
                            // don't bother with postponed games
                            if ( fixture.status != 'Postponed' ){
                                // work out if a home match
                                let home_fixture
                                if ( fixture.home == team.name ) {
                                    home_fixture = true
                                } else if ( fixture.away == team.name ){
                                    home_fixture = false
                                } else if ( fixture.home != team.name && fixture.home.includes( team.name ) ){
                                    home_fixture = true
                                } else {
                                    home_fixture = false
                                }
                                console.log( `"${ toExcelDate(fixture.date) }","${ fixture.type }","${ ( isNaN(team.agegroup) ) ? 12 : team.agegroup }","${ team.name.replace( data.club.name, '').trim() }","${ home_fixture ? 'home' : 'away'}","${ home_fixture ? fixture.away.replace(/U\d+/,"") : fixture.home.replace(/ U\d+/,"")}"` )
                            }
                        })
                    })
                })
            }, 3000 * index)
        index++
    })