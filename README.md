# PLAYER TAGGING DOCUMENTATION
> The idea is to have a table that records data in this format:

| Player   | Event          | Type/ Location | Outcome | Start time | End Time | 
| -------- | -------------- | -------------- | ------- | ---------- | -------- |

    EVENTS PANEL 
    EVENT - TYPE/LOCATION - OUTCOME

    PASS - LONG/LINEBREAK/SHORT - SUCCESSFUL/UNSUCCESSFUL
    DRIBBLE - NUTMEG/SKILLMOVE - SUCCESSFUL/UNSUCCESSFULL
    SHOT - LONGRANGE/SHORTRANGE - ON-TARGET/OFF-TARGET
    CROSS - NONE - SUCCESSFUL/UNSUCCESSFUL
    GOALS - HEADER/INSIDEBOX/OUTSIDEBOX - NONE
    ASSISTS
    FREEKICKS - NONE - LEDTOCHANCE/LEDTOGOAL/LEDTONOTHING
    PENALTIES - NONE -  MISSED/SCORED
    FOULS - OPPONENTSHALF/OWNHALF - WON/CONCEDED
    INTERCEPTIONS - OWNHALF/OPPONENTHALF - NONE
    TACKLES -  NONE - SUCCESSFUL/UNSUCCESSFUL
    BALL PROGRESSION - OWNHALF/OPPONENTSHALF - NONE
    BLOCKS - NONE - NONE
    CLEARANCE - GOALLINE/UNDERPRESSURE - NONE
    DUELS - AERIAL/GROUND - WON
    SAVES - INSIDEBOX/OUTSIDEBOX/1V1 - NONE
    CARD - DISSENT/FOUL - RED/YELLOW
      

### EVENTS TO BE SENT AFTER MATCH
    {
        match: {
            match events
        },
        players: [
            {
                player events
            }
        ]
    }

### Match Events
    {
        competition_id: { type: mongoId },
        team_A: { type: mongoId },
        team_B: { type: mongoId },
        playerEvents: [],
        location: { type: String },
        time: { type: String },
        fans: { type: String },
        refree: { type: String },
        corners: { type: Number },
        freeKicks: { type: Number },
        passes: { type: Number },
        team_A_posession: { type: Number },
        team_B_posession: { type: Number },
        team_A_scoreline: { type: Number },
        team_B_scoreline: { type: Number },
        yellow_cards_team_A: { type: Number },
        yellow_cards_team_B: { type: Number },
        red_cards_team_A: { type: Number },
        red_cards_team_B: { type: Number },
        shots_team_A: { type: Number },
        shots_team_B: { type: Number },
        shots_ontarget_team_A: { type: Number },
        shots_ontarget_team_B: { type: Number },
    }

### PLAYER EVENTS
    {
            matchId: { type: mongoId },
            playerId: { type: mongoId }
            start: { type: Number },
            minutes: { type: Number },
            bench: { type: Number },
            successful_shortpass: { type: Number },
            successful_longpass: { type: Number },
            line_break_pass: {
            total: { type: Number },
            timeline: [{
                start_time: { type: Number },
                stop_time: { type: Number }
                }]
            },
            dribbles: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                attempts: { type: Number },
                completed: { type: Number, default: 0 },
                skill_moves: { type: Number },
                nut_megs: { type: Number },
                failed: { type: Number }
            },
            shots: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                outsidebox_ontarget: { type: Number },
                outsidebox_offtarget: { type: Number },
                insidebox_offtarget: { type: Number },
                insidebox_ontarget: { type: Number },
                total_shot: { type: Number }
            },
            crosses: { type: Number },
            goals: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                header: { type: Number },
                oneVone: { type: Number },
                inside_box_shot_goal: { type: Number },
                outside_box_shot_goal: { type: Number }
            },
            assists: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                total_assist: { type: Number }
            },
            chance_created: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                total_chances: { type: Number }
            },
            penalty: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                missed: { type: Number },
                scored: { type: Number }
            },
            fouls: {
                won_in_opp_half: { type: Number },
                won_in_own_half: { type: Number },
                conceded_in_own_half: { type: Number },
                conceded_in_opp_half: { type: Number }
            },
            interceptions: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                opponents_half: { type: Number },
                own_half: { type: Number },
                total_interceptions: { type: Number }
            },
            tackles: {
                successful: { type: Number },
                unsuccessful: { type: Number }
            },
            ball_progression: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                own_half: { type: Number },
                opp_half: { type: Number },
                bp_total: { type: Number }
            },
            blocks: { type: Number },
            clearance: {
                goal_line: { type: Number },
                under_pressure: { type: Number },
                total_clearances: { type: Number }
            },
            duels: {
                won_aerial: { type: Number },
                won_ground: { type: Number },
                total_duels: { type: Number }
            },
            saves: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                oneVone: { type: Number },
                inside_box: { type: Number },
                outside_box: { type: Number },
                total_saves: { type: Number }
            },
            card: {
                yellow_dissent: { type: Number },
                yellow_foul: { type: Number },
                red_dissent: { type: Number },
                red_foul: { type: Number }
            },
            catches: {
                timeline: [{
                    start_time: { type: Number },
                    stop_time: { type: Number }
                }],
                simple: { type: Number },
                complex: { type: Number },
                total_catches: { type: Number }
            }
    }

### TIMELINE (in seconds)

    timeline: {
        startTime:
        stopTime: 
    }
### PLAYER 

    player: {
        teams: [],
        name: { type: String },
        position: { type: String },
        number: {type: Number },
        playerMatchEvents: [],
    }


### Team 

    team: {
        name: { type: String },
        squad: [],
        season: { type: String }
    }
    
### Competition

     {
        id
        type: {type: String}
        abbrev: {type: String}
        name: {type: String}
        country: {type: String}
        season: {type: String}
    }

