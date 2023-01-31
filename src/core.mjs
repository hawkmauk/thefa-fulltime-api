import fetch from 'node-fetch'

export const fulltime = {
    protocol: 'https',
    baseUrl: 'fulltime.thefa.com',
    paths: {
        fixtures: 'fixtures.html'
    },
    options: {
        season: 'selectedSeason',
        league: 'league',
        team: 'selectedTeam',
        club: 'selectedClub',
        agegroup: 'selectedFixtureGroupAgeGroup',
        fixturegroup: 'selectedFixtureGroupKey'
    },
    fixture: {
        type: {
            League: {
                code: 'L',
                display: 'League'
            },
            Cup: {
                code: 'Cup',
                display: 'Cup'
            },
            CountyCup: {
                code: 'CC',
                display: 'County Cup'
            }
        }
    }
}

export function buildUrl( options ){
    let url = `${ fulltime.protocol }://${ fulltime.baseUrl }/${ fulltime.paths.fixtures }`
    url = `${ url }?${ fulltime.options.club}=${ options.club ? options.club : '' }`
    url = `${ url }&${ fulltime.options.team }=${ options.team ? options.team : '' }`
    url = `${ url }&${ fulltime.options.season }=${ options.season ? options.season : '' }`
    url = `${ url }&${ fulltime.options.agegroup }=${ options.agegroup ? options.agegroup : '' }` // required
    url = `${ url }&${ fulltime.options.fixturegroup }=${ options.fixturegroup ? options.fixturegroup : '' }` // required
    if ( options.league ) url = `${ url }&${ fulltime.options.league }=${ options.league }`
    return url
}

export async function getHtml( options ){
    let url = buildUrl( options )
    console.log( url )
    let result = await fetch( url )
        .then( async res => {
            if ( res.ok ){
                return res
            } else {
                throw new Error( res.statusText )
            }
        })
        .then( async res => {
            let html = await res.text()
            if ( html.includes( 'captcha' )){
                throw new Error( 'Requires captcha')
            }
            return html
        })
        .catch( error => {
            console.error( error )
        })
    return result
}