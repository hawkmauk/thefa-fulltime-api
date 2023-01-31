import { JSDOM } from 'jsdom'
import { getHtml } from './core.mjs'

/**
 * Teams looks up the teams registered for a league provided
 * and then returns the results in an array
 * 
 * @param {*} league - The UID of the league to return teams of
 * @returns Array of teams belonging to a league
 */
const agegroup_pattern = /^.*[Uu]([0-9]+).*$/
const teamSortCallback = ( team1, team2 ) => {
    if ( team1.agegroup < team2.agegroup ) return -1
    if ( team1.agegroup > team2.agegroup ) return 1
    return 0
}
export async function teams( league, season, club ){

    // build the URL
    let html = await getHtml( { 'season': season, 'league': league, 'club': club })
    let dom = new JSDOM( html )
    let result = []
    dom.window.document.querySelectorAll( '#form1_selectedTeam option' )
        .forEach( item => {
            let agegroup = parseInt( item.textContent.replace(agegroup_pattern,(match, group) => { return group } ) )
            console.log( `Age group is ${ agegroup }: ${ item.textContent }`)
            if ( item.value && item.agegroup != 'All' ) result.push({ 'id': item.value, 'name': item.textContent, 'agegroup': agegroup })
        })
    result.sort( teamSortCallback )
    return result
}