import { JSDOM } from 'jsdom'
import { getHtml, fulltime } from './core.mjs'

let replace_regexp = /[\n\t]/g
/**
 * Teams looks up the teams registered for a league provided
 * and then returns the results in an array
 * 
 * @param {*} team - The UID of the league to return teams of
 * @returns Array of teams belonging to a league
 */
 export async function fixtures( season, team ){

    // build the URL
    let html = await getHtml( { 'season': season, 'team': team })
    let dom = new JSDOM( html )
    let result = []
    dom.window.document.querySelectorAll( '.fixtures-table tbody tr' )
        .forEach( item => {
            let data = item.querySelectorAll( 'td a' )
            let fixture = {}
            fixture['type'] = getType( data[0].textContent.replace(replace_regexp,'') )
            let date_delimited = data[1].textContent.replace(replace_regexp,'').split('/')
            fixture['date'] = new Date( parseInt( '20'+ date_delimited[2]), parseInt( date_delimited[1] ) - 1, parseInt( date_delimited[0] )) 
            fixture['home'] = data[2].textContent.replace(replace_regexp,'') 
            fixture['away'] = data[6].textContent.replace(replace_regexp,'') 
            fixture['venue'] = data[7].textContent.replace(replace_regexp,'')
            fixture['league'] = data[8].textContent.replace(replace_regexp,'')
            try {
                fixture['status'] = data[9].textContent.replace(replace_regexp,'')
            } catch ( e ){
                fixture['status'] = 'Active'
            }
            result.push( fixture )
        })
    return result
}

function getType( code ){
    let result
    switch ( code ){
        case fulltime.fixture.type.Cup.code:
            result = fulltime.fixture.type.Cup.display
            break
        case fulltime.fixture.type.CountyCup.code:
            result = fulltime.fixture.type.CountyCup.display
            break
        default:
            return fulltime.fixture.type.League.display
    }
    return result
}