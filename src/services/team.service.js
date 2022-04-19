import { base_url } from "../config/config";

export async function CreateTeam(team) {
    return fetch(`${base_url}/team/create-team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
        body: JSON.stringify(team)
      })
      
}

export async function getTeams() {
  return fetch(`${base_url}/team/all-team`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      },
    })
    
}

export async function getTeamsWithSeason() {
  return fetch(`${base_url}/team/team-season`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      },
    })
    
}


export async function getTeamsWithSeasons() {
  return fetch(`${base_url}/team/team-seasons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      },
    })
    
}