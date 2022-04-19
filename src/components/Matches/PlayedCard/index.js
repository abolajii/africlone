import React from "react";
import "../../../styles/card.scss";

export default function Card({ data }) {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-title">{data.league}</p>
                <div>
                    <p className="name">{data.home}</p>
                    <p className="subtitle mb-2 text-muted">Home</p>
                    <span>{data.home_score && data.home_score}</span>
                </div>

                <div>
                    <p className="name">{data.away}</p>
                    <p className="subtitle mb-2 text-muted">Away</p>
                    <span>{data.away_score && data.away_score}</span>
                </div>

                <hr />

                <div>
                    <p className="name">{data.time}</p>
                    <p className="subtitle mb-2 text-muted">Time</p>
                </div>

                <div>
                    <p className="name">{data.date}</p>
                    <p className="subtitle mb-2 text-muted">Date</p>
                </div>

                <div>
                    <p className="name">{data.stadium}</p>
                    <p className="subtitle mb-2 text-muted">Stadium</p>
                </div>
            </div>
        </div>
    );
}
