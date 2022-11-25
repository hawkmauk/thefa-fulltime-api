import { JSDOM } from 'jsdom'
import { getHtml } from './core.mjs'

/**
 * Clubs looks up those registered for a league provided
 * and then returns the results in an array
 * 
 * @param {*} league - The UID of the league to return teams of
 * @returns Array of teams belonging to a league
 */
 export async function clubs( league ){

    // build the URL
let html = await getHtml( { 'league': league })
let dom = new JSDOM( html )
let result = []
dom.window.document.querySelectorAll( '#form1_selectedClub option' )
    .forEach( item => {
        result.push({ 'id': item.value, 'name': item.textContent })
    })
    return result
}
