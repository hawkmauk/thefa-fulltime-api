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
            fixture['date'] = data[1].textContent.replace(replace_regexp,'') 
            fixture['home'] = data[2].textContent.replace(replace_regexp,'') 
            fixture['away'] = data[6].textContent.replace(replace_regexp,'') 
            fixture['venue'] = data[7].textContent.replace(replace_regexp,'')
            result.push( fixture )
        })
    return result
}

function getType( code ){
    let result
    switch ( code ){
        case fulltime.fixture.type.Cup:
            result = fulltime.fixture.type.Cup
            break
        case fulltime.fixture.type.CC:
            result = fulltime.fixture.type.CC
            break
        default:
            return fulltime.fixture.type.L
    }
    return result
}