import { JSDOM } from 'jsdom'
import { getHtml } from './core.mjs'

/**
 * Teams looks up the teams registered for a league provided
 * and then returns the results in an array
 * 
 * @param {*} league - The UID of the league to return teams of
 * @returns Array of teams belonging to a league
 */
 export async function teams( league, season, club ){

    // build the URL
    let html = await getHtml( { 'season': season, 'league': league, 'club': club })
    let dom = new JSDOM( html )
    let result = []
    dom.window.document.querySelectorAll( '#form1_selectedTeam option' )
        .forEach( item => {
            if ( item.value ) result.push({ 'id': item.value, 'name': item.textContent })
        })
    return result
}