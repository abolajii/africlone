import { base_url } from "../config/config";

export async function getCompetitions() {
    return fetch(`${base_url}/competition/all-comp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
      })
      
}

export async function createCompetition(comp) {
    return fetch(`${base_url}/competition/create-comp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
        body: JSON.stringify(comp)
      })
      
}

export async function getCompetitionWithSeason() {
  return fetch(`${base_url}/competition/all-comp-season`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      },
    })
    
}