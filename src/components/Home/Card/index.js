import React from 'react'
import "../../../styles/card.scss"

export default function Card({data}) {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-title">{data.league}</p>
                <div>
                    <p className="club-name">{data.home}</p>
                    <p className="card-subtitle mb-2 text-muted">Home</p>
                </div>

                <div>
                    <p className="club-name">{data.away}</p>
                    <p className="card-subtitle mb-2 text-muted">Away</p>
                </div>

                <hr />

                <div>
                    <p className="time">{data.time}</p>
                    <p className="card-subtitle mb-2 text-muted">Time</p>
                </div>

                <div>
                    <p className="stadium">{data.stadium}</p>
                    <p className="card-subtitle mb-2 text-muted">Stadium</p>
                </div>
            </div>
        </div>
    );
}
