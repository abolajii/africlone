import { base_url } from "../config/config";

export async function CreateMatch(match) {
  console.log(match)
    return fetch(`${base_url}/match/create-match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
        body: JSON.stringify(match)
      })
      
}

export async function getLineUps(seasonId) {
    return fetch(`${base_url}/team/squad/${seasonId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
      })
      
}

export async function addLineUp(lineup) {
    return fetch(`${base_url}/match/lineup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
        body: JSON.stringify(lineup)
      })
      
}

export async function addSubs(subs) {
  return fetch(`${base_url}/match/lineup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      },
      body: JSON.stringify(subs)
    })
    
}

export async function getMatch(matchId) {
  return fetch(`${base_url}/match/view-match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
    body: JSON.stringify(matchId)
  })
}


export async function PostMatchResult(matchResult) {
  return fetch(`${base_url}/player/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    },
    body: JSON.stringify(matchResult)
  })
}

export async function GetFormationPositioning(payload) {  
  // return fetch(`https://secure-gorge-25608.herokuapp.com/generate?formation=${formation}`, {
  return fetch(`http://localhost:8082/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  }) 
}