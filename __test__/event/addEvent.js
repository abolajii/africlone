
// function exe(playerObj, timeLineObj, eventObj){
//     return DBApi.addEvent(playerObj, timeLineObj, eventObj)
// }

import { useIndexedDB } from 'react-indexed-db';
export default class DataBaseApi {
useIndexedDBInstance = useIndexedDB();
playerMatchEvents = this.useIndexedDBInstance;
playerMatchEventsTimeLine = this.useIndexedDBInstance;
timeline = this.useIndexedDBInstance;
pass = this.useIndexedDBInstance;
blocks = this.useIndexedDBInstance;
freekick = this.useIndexedDBInstance;
crosses = this.useIndexedDBInstance;
dribbles = this.useIndexedDBInstance;
shots = this.useIndexedDBInstance;
goals = this.useIndexedDBInstance;
assists = this.useIndexedDBInstance;
chance_created = this.useIndexedDBInstance;
fouls = this.useIndexedDBInstance;
interceptions = this.useIndexedDBInstance;
tackles = this.useIndexedDBInstance;
ball_progression = this.useIndexedDBInstance;
clearance = this.useIndexedDBInstance;
duels = this.useIndexedDBInstance;
saves = this.useIndexedDBInstance;
card = this.useIndexedDBInstance;
catches = this.useIndexedDBInstance;

constructor(){
    this.playerMatchEventsTimeLine = useIndexedDB('playerMatchEventsTimeLine');
    this.playerMatchEvents = useIndexedDB('playerMatchEvents');
    this.timeline = useIndexedDB('timeline');
    this.goals = useIndexedDB('goals');
    this.pass = useIndexedDB('pass');
    this.saves = useIndexedDB('saves');
    this.shots = useIndexedDB('shots');
    this.duels = useIndexedDB('duels');
    this.dribbles = useIndexedDB('dribbles');
    this.card = useIndexedDB('card');
    this.ball_progression = useIndexedDB('ball_progression');
    this.fouls = useIndexedDB('fouls');
    this.clearance = useIndexedDB('clearance');
    this.assists = useIndexedDB('assists');
    this.penalty = useIndexedDB('penalty');
    this.freekick = useIndexedDB('freekick');
    this.tackles = useIndexedDB('tackles');
    this.blocks = useIndexedDB('blocks');
    this.crosses = useIndexedDB('crosses');
    this.chance_created = useIndexedDB('chance_created');
    this.interceptions = useIndexedDB('interceptions');
    this.catches = useIndexedDB('catches');
}

addNewPlayerMatchEvent(matchId, playerObject){
    this.clearDb();
    this.playerMatchEvents.clear().then(()=>{
        const newPlayerMatchEvent = {matchId:matchId, team:playerObject.team, playerId:playerObject._id, 
            playerName:playerObject.name, playerPosition:playerObject.position,
            playerDob:playerObject.dob, playerNumber:playerObject.number,
            start:0, minutes:0, bench:0};
        this.playerMatchEvents.add(newPlayerMatchEvent);
    });
}

clearDb(){
    this.playerMatchEventsTimeLine.clear();
    this.timeline.clear();
    this.goals.clear();
    this.pass.clear();
    this.saves.clear();
    this.shots.clear();
    this.duels.clear();
    this.dribbles.clear();
    this.card.clear();
    this.ball_progression.clear();
    this.fouls.clear();
    this.clearance.clear();
    this.assists.clear();
    this.penalty.clear();
    this.freekick.clear();
    this.tackles.clear();
    this.blocks.clear();
    this.crosses.clear();
    this.chance_created.clear();
    this.interceptions.clear();
    this.catches.clear();
}

deleteEventById(eventObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            const eventTypes = ['Goal', 'Pass', 'Saves', 'Shot', 'Duel', 'Dribble', 'Cards', 
            'Ball Progression', 'Foul', 'Clearance', 'Assist', 'Penalty', 'Freekick', 'Catch', 'Block']
            const otherTypes = ['Tackle', 'Cross', 'Chances created'];

            await this.deleteEventTimeLineAndTimeLine(eventObject.eventId)
            switch(eventObject.type){
                case eventTypes[0]:
                    resolved(await this.goals.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[1]:
                    resolved(await this.pass.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[2]:                    
                    resolved(await this.saves.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[3]:
                    resolved(await this.shots.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[4]:
                    resolved(await this.duels.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[5]:
                    resolved(await this.dribbles.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[6]:
                    resolved(await this.card.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[7]:
                    resolved(await this.ball_progression.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[8]:
                    resolved(await this.fouls.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[9]:
                    resolved(await this.clearance.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[10]:
                    resolved(await this.assists.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[11]:
                    resolved(await this.penalty.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[12]:
                    resolved(await this.freekick.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[13]:
                    resolved(await this.catches.deleteRecord(eventObject.eventId));
                    break;
                case eventTypes[14]:
                    resolved(await this.blocks.deleteRecord(eventObject.eventId));
                    break;
            }

            if(eventObject.event === 'Others'){
            switch(eventObject.type){
                case otherTypes[0]:
                    resolved(await this.tackles.deleteRecord(eventObject.eventId));
                    break;
                case otherTypes[1]:
                    resolved(await this.crosses.deleteRecord(eventObject.eventId));
                    break;
                case otherTypes[2]:
                    resolved(await this.chance_created.deleteRecord(eventObject.eventId));
                    break;
                }
            }

        } catch (error) {
            rejected(error);
        }
    });
}

async deleteEventTimeLineAndTimeLine(eventId){
    const _eventTimeLine = await this.playerMatchEventsTimeLine.getByIndex('eventId', eventId);
    if(!_eventTimeLine) return;

    await this.playerMatchEventsTimeLine.deleteRecord(_eventTimeLine.id);

    const _timeline = await this.timeline.getByIndex('eventId', eventId);
    if(!_timeline) return;

    await this.timeline.deleteRecord(_timeline.id);
}

getAllTimeLines(){
    return new Promise((resolved, rejected)=>{
        try {
            this.playerMatchEventsTimeLine.getAll().then((res)=>{
                if(res) resolved(res);
            }).catch((error)=>{
                rejected(error);
            });
        } catch (error) {
            rejected(error);
        }
    });
}

addPlayerMatchEventsTimeLine(eventTimeLineObject){
    return new Promise(async (resolved, rejected)=>{
        try{
        const id = await this.playerMatchEventsTimeLine.add(eventTimeLineObject);
        if(id) resolved(eventTimeLineObject);
        }catch(ex){
            rejected(ex);
        }
    });
}

addEvent(activePlayer, timeLineObject, eventObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            const types = ['Goal', 'Pass', 'Saves', 'Shot', 'Duel', 'Dribble', 'Cards', 
            'Ball Progression', 'Foul', 'Clearance', 'Assist', 'Penalty', 'Freekick', 
            'Catch', 'Block', 'Tackle', 'Cross', 'Chances created']
            switch(eventObject.type){
                case types[0]:
                    resolved(await this.addGoal(activePlayer, timeLineObject, eventObject));
                    break;
                case types[1]:
                    resolved(await this.addPass(activePlayer, timeLineObject, eventObject));
                    break;
                case types[2]:
                    resolved(await this.addSaves(activePlayer, timeLineObject, eventObject));
                    break;
                case types[3]:
                    resolved(await this.addShots(activePlayer, timeLineObject, eventObject));
                    break;
                case types[4]:
                    resolved(await this.addDuels(activePlayer, timeLineObject, eventObject));
                    break;
                case types[5]:
                    resolved(await this.addDribbles(activePlayer, timeLineObject, eventObject));
                    break;
                case types[6]:
                    resolved(await this.addCard(activePlayer, timeLineObject, eventObject));
                    break;
                case types[7]:
                    resolved(await this.addProgression(activePlayer, timeLineObject, eventObject));
                    break;
                case types[8]:
                    resolved(await this.addFoul(activePlayer, timeLineObject, eventObject));
                    break;
                case types[9]:
                    resolved(await this.addClearance(activePlayer, timeLineObject, eventObject));
                    break;
                case types[10]:
                    resolved(await this.addAssists(activePlayer, timeLineObject, eventObject));
                    break;
                case types[11]:
                    resolved(await this.addPenalty(activePlayer, timeLineObject, eventObject));
                    break;
                case types[12]:
                    resolved(await this.addFreekick(activePlayer, timeLineObject, eventObject));
                    break;
                case types[13]:
                    resolved(await this.addCatches(activePlayer, timeLineObject, eventObject));
                    break;
                case types[14]:
                    resolved(await this.addBlocks(activePlayer, timeLineObject, eventObject));
                    break;
                case types[15]:
                    resolved(await this.addTackles(activePlayer, timeLineObject, eventObject));
                    break;
                case types[16]:
                    resolved(await this.addCrosses(activePlayer, timeLineObject, eventObject));
                    break;
                case types[17]:
                    resolved(await this.addChancesCreated(activePlayer, timeLineObject, eventObject));
                    break;
            }
        } catch (error) {
            rejected(error);
        }
    });
}

updateEvent(eventObject, newObject){
        const types = ['Goal', 'Pass', 'Saves', 'Shot', 'Duel', 'Dribble', 'Cards', 
            'Ball Progression', 'Foul', 'Clearance', 'Assist', 'Penalty', 'Freekick',
            'Catch', 'Block', 'Tackle', 'Cross', 'Chances created']
    return new Promise(async (resolved, rejected)=>{
        try {
            switch(eventObject.type){
                case types[0]:
                    resolved(await this.updateGoal(eventObject, newObject));
                    break;
                case types[1]:
                    resolved(await this.updatePass(eventObject, newObject));
                    break;
                case types[2]:
                    resolved(await this.updateSaves(eventObject, newObject));
                    break;
                case types[3]:
                    resolved(await this.updateShots(eventObject, newObject));
                    break;
                case types[4]:
                    resolved(await this.updateDuels(eventObject, newObject));
                    break;
                case types[5]:
                    resolved(await this.updateDribbles(eventObject, newObject));
                    break;
                case types[6]:
                    resolved(await this.updateCard(eventObject, newObject));
                    break;
                case types[7]:
                    resolved(await this.updateProgression(eventObject, newObject));
                    break;
                case types[8]:
                    resolved(await this.updateFoul(eventObject, newObject));
                    break;
                case types[9]:
                    resolved(await this.updateClearance(eventObject, newObject));
                    break;
                case types[10]:
                    resolved(await this.updateAssists(eventObject, newObject));
                    break;
                case types[11]:
                    resolved(await this.updatePenalty(eventObject, newObject));
                    break;
                case types[12]:
                    resolved(await this.updateFreekick(eventObject, newObject));
                    break;
                case types[13]:
                    resolved(await this.updateCatches(eventObject, newObject));
                    break;
                case types[14]:
                    resolved(await this.updateBlocks(eventObject, newObject));
                    break;
                case types[15]:
                    resolved(await this.updateTackles(eventObject, newObject));
                    break;
                case types[16]:
                    resolved(await this.updateCrosses(eventObject, newObject));
                    break;
                case types[17]:
                    resolved(await this.updateChancesCreated(eventObject, newObject));
                    break;
            }
        } catch (error) {
            rejected(error);
        }
    });
}


//=================||==========================
async updateTimeLineAndEvent(previousEventObject, newObject){
    const editabelEventTimeLine = await this.playerMatchEventsTimeLine.getByIndex('eventId', previousEventObject.eventId);
    const timeLineResp = await this.timeline.getByIndex('eventId', previousEventObject.eventId);

    const editableTimeLine = timeLineResp;

    editableTimeLine.start_time = newObject.start_time;
    editableTimeLine.stop_time = newObject.stop_time;

    this.timeline.update(editableTimeLine);
    // console.log("@editableTimeLine", editableTimeLine);

    editabelEventTimeLine.playerId = newObject.playerId;
    editabelEventTimeLine.playerName = newObject.playerName;
    editabelEventTimeLine.start_time = newObject.start_time;
    editabelEventTimeLine.stop_time = newObject.stop_time;
    editabelEventTimeLine.type = newObject.type;
    editabelEventTimeLine.event = newObject.event;
    editabelEventTimeLine.outcome = newObject.outcome;

    this.playerMatchEventsTimeLine.update(editabelEventTimeLine);
    // console.log("@editabelEventTimeLine", editabelEventTimeLine);

}
//=================||==========================


//=================||==========================
addGoal(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveable= {playerId:activePlayer._id, 
                header:0,oneVone:0, inside_box_shot_goal:0, 
                outside_box_shot_goal:0};

            const typesOfEvent = ['Header', 'Inside box', '1 V 1', 'Outside box']
            
            if(goalObject.event===typesOfEvent[0]){
                saveable.header=1;
            }

            if(goalObject.event===typesOfEvent[1]){
                saveable.inside_box_shot_goal=1;
            }

            if(goalObject.event===typesOfEvent[2]){
                saveable.oneVone=1;
            }

            if(goalObject.event===typesOfEvent[3]){
                saveable.outside_box_shot_goal=1;
            }

            const id = await this.goals.add(saveable);
            const res = await this.addToTimeLineAndEvents(id, activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateGoal(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.goals.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            const eventTypes = ['Header', 'Inside box', '1 V 1', 'Outside box'];
            if(newObject.event === eventTypes[0]){
                editableEvent.header = 1;
                editableEvent.inside_box_shot_goal = 0;
                editableEvent.oneVone = 0;
                editableEvent.outside_box_shot_goal = 0;
            }
            
            if(newObject.event === eventTypes[1]){
                editableEvent.header = 0;
                editableEvent.inside_box_shot_goal = 1;
                editableEvent.oneVone = 0;
                editableEvent.outside_box_shot_goal = 0;
            }
            
            if(newObject.event === eventTypes[2]){
                editableEvent.header = 0;
                editableEvent.inside_box_shot_goal = 0;
                editableEvent.oneVone = 1;
                editableEvent.outside_box_shot_goal = 0;
            }

            if(newObject.event === eventTypes[3]){
                editableEvent.header = 0;
                editableEvent.inside_box_shot_goal = 0;
                editableEvent.oneVone = 0;
                editableEvent.outside_box_shot_goal = 1;
            }

            await this.goals.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error);
        }
    });
}
//=================||==========================


//=================||==========================
addPass(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                long:0,line_break:0, short:0};

            const typesOfEvent = ['Long', 'Line break', 'Short']
            
            if(goalObject.event===typesOfEvent[0]){
                saveablePass.long=1;
            }

            if(goalObject.event===typesOfEvent[1]){
                saveablePass.line_break=1;
            }

            if(goalObject.event===typesOfEvent[2]){
                saveablePass.short=1;
            }

            const id = await this.pass.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id, activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updatePass(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.pass.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            const typesOfEvent = ['Long', 'Short', 'Line break']
            
            if(newObject.event === typesOfEvent[0]){
                editableEvent.long = 1;
                editableEvent.short = 0;
                editableEvent.line_break = 0;
            }
            
            if(newObject.event === typesOfEvent[1]){
                editableEvent.long = 0;
                editableEvent.short = 1;
                editableEvent.line_break = 0;
            }

            if(newObject.event === typesOfEvent[2]){
                editableEvent.long = 0;
                editableEvent.short = 0;
                editableEvent.line_break = 1
            }

            await this.pass.update(editableEvent);

            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addSaves(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                oneVone:0,inside_box:0, outside_box:0};

            const typesOfEvent = ['Inside box', 'Outside box', '1 V 1']
            
            if(goalObject.event===typesOfEvent[0]){
                saveablePass.inside_box=1;
            }

            if(goalObject.event===typesOfEvent[1]){
                saveablePass.outside_box=1;
            }

            if(goalObject.event===typesOfEvent[2]){
                saveablePass.oneVone=1;
            }

            const id = await this.saves.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id, activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateSaves(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.saves.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            const typesOfEvent = ['Inside box', 'Outside box', '1 V 1']

            if(newObject.event === typesOfEvent[0]){
                editableEvent.oneVone = 0;
                editableEvent.inside_box = 1;
                editableEvent.outside_box = 0;
            }
            
            if(newObject.event === typesOfEvent[1]){
                editableEvent.oneVone = 0;
                editableEvent.inside_box = 0;
                editableEvent.outside_box = 1;
            }

            if(newObject.event === typesOfEvent[2]){
                editableEvent.oneVone = 1;
                editableEvent.inside_box = 0;
                editableEvent.outside_box = 0;
            }

            await this.saves.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addShots(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, outsidebox_ontarget:0, outsidebox_offtarget:0, 
                insidebox_ontarget:0, insidebox_offtarget:0};

            const typesOfEvent = ['Long range', 'Short range'];
            const typesOfOutcome = ['Successful', 'Unsuccessful'];

            if(goalObject.event===typesOfEvent[0] && goalObject.outcome === typesOfOutcome[0]){
                saveablePass.outsidebox_ontarget=1;
            }

            if(goalObject.event===typesOfEvent[0] && goalObject.outcome === typesOfOutcome[1]){
                saveablePass.outsidebox_offtarget=1;
            }

            if(goalObject.event===typesOfEvent[1] && goalObject.outcome === typesOfOutcome[0]){
                saveablePass.insidebox_ontarget=1;
            }

            if(goalObject.event===typesOfEvent[1] && goalObject.outcome === typesOfOutcome[1]){
                saveablePass.insidebox_offtarget=1;
            }

            const id = await this.shots.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateShots(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.shots.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;

            const typesOfEvent = ['Long range', 'Short range']
            const successful = 'Successful';
            const unSuccessful = 'Unsuccessful';
            if(newObject.event===typesOfEvent[0] && newObject.outcome === successful){
                editableEvent.outsidebox_ontarget=1;
                editableEvent.outsidebox_offtarget=0;
                editableEvent.insidebox_ontarget=0;
                editableEvent.insidebox_offtarget=0;
            }

            if(newObject.event===typesOfEvent[0] && newObject.outcome === unSuccessful){
                editableEvent.outsidebox_offtarget=1;
                editableEvent.outsidebox_ontarget=0;
                editableEvent.insidebox_ontarget=0;
                editableEvent.insidebox_offtarget=0;
            }

            if(newObject.event===typesOfEvent[1] && newObject.outcome === successful){
                editableEvent.insidebox_ontarget=1;
                editableEvent.outsidebox_offtarget=0;
                editableEvent.outsidebox_ontarget=0;
                editableEvent.insidebox_offtarget=0;
            }


            if(newObject.event===typesOfEvent[1] && newObject.outcome === unSuccessful){
                editableEvent.insidebox_offtarget=1;
                editableEvent.insidebox_ontarget=0;
                editableEvent.outsidebox_offtarget=0;
                editableEvent.outsidebox_ontarget=0;
            }

            await this.shots.update(editableEvent);

            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addDuels(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                won_aerial:0,won_ground:0, total_duels:0};

            const typesOfEvent = ['Aerial', 'Ground']
            
            if(goalObject.event===typesOfEvent[0]){
                saveablePass.won_aerial=1;
            }

            if(goalObject.event===typesOfEvent[1]){
                saveablePass.won_ground=1;
            }

            const id = await this.duels.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id, activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateDuels(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.duels.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            const typesOfEvent = ['Aerial', 'Ground']

            if(newObject.event === typesOfEvent[0]){
                editableEvent.won_aerial = 1;
                editableEvent.won_ground = 0;
            }else{
                editableEvent.won_aerial = 0;
                editableEvent.won_ground = 1;
            }

            await this.duels.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addDribbles(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                skill_moves:0, nut_megs:0, completed:0, failed:0, attempts:0};

            const typesOfEvent = ['Skill move Successful', 'Skill move Unsuccessful', 'Nutmeg Successful', 'Nutmeg Unsuccessful']

            const eventType = `${goalObject.event} ${goalObject.outcome}`;
            if(eventType===typesOfEvent[0]){
                saveablePass.skill_moves=1;
                saveablePass.completed+=1;
            }

            if(eventType===typesOfEvent[1]){
                saveablePass.skill_moves=-1;
                saveablePass.failed+=1;
            }

            if(eventType===typesOfEvent[2]){
                saveablePass.nut_megs=1;
                saveablePass.completed+=1;
            }

            if(eventType===typesOfEvent[3]){
                saveablePass.nut_megs=-1;
                saveablePass.failed+=1;
            }

            const id = await this.dribbles.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateDribbles(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.dribbles.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            const typesOfEvent = ['Skill move', 'Nutmeg']
            const typesOfOutCome = ['Successful', 'Unsuccessful'];

            if(newObject.event === typesOfEvent[0] && newObject.outcome===typesOfOutCome[0]){
                editableEvent.skill_moves=1;
                editableEvent.nut_megs=0;
            }

            if(newObject.event === typesOfEvent[0] && newObject.outcome===typesOfOutCome[1]){
                editableEvent.skill_moves=-1;
                editableEvent.nut_megs=0;
            }

            if(newObject.event === typesOfEvent[1] && newObject.outcome===typesOfOutCome[0]){
                editableEvent.skill_moves=0;
                editableEvent.nut_megs=1;
            }

            if(newObject.event === typesOfEvent[1] && newObject.outcome===typesOfOutCome[1]){
                editableEvent.skill_moves=0;
                editableEvent.nut_megs=-1;
            }

            await this.dribbles.update(editableEvent);
            resolved(editableEvent);

        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addCard(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                yellow_dissent:0,yellow_foul:0, red_dissent:0, red_foul:0};

            const typesOfEvent = ['Dissent', 'Foul'];
            const typesOfOutcome = ['Yellow', 'Red'];
            
            if(goalObject.event===typesOfEvent[0] && goalObject.outcome === typesOfOutcome[0]){
                saveablePass.yellow_dissent=1;
            }

            if(goalObject.event===typesOfEvent[0] && goalObject.outcome === typesOfOutcome[1]){
                saveablePass.red_dissent=1;
            }

            if(goalObject.event===typesOfEvent[1] && goalObject.outcome === typesOfOutcome[0]){
                saveablePass.yellow_foul=1;
            }

            if(goalObject.event===typesOfEvent[1] && goalObject.outcome === typesOfOutcome[1]){
                saveablePass.red_foul=1;
            }

            const id = await this.card.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id, activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateCard(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.card.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;

            const typesOfEvent = ['Dissent', 'Foul'];
            const typesOfOutcome = ['Yellow', 'Red'];
            
            if(newObject.type===typesOfEvent[0] && newObject.outcome === typesOfOutcome[0]){
                editableEvent.yellow_dissent=1;
                editableEvent.red_dissent=0;
                editableEvent.yellow_foul=0;
                editableEvent.red_foul=0;
            }

            if(newObject.type===typesOfEvent[0] && newObject.outcome === typesOfOutcome[1]){
                editableEvent.red_dissent=1;
                editableEvent.yellow_dissent=0;
                editableEvent.yellow_foul=0;
                editableEvent.red_foul=0;
            }

            if(newObject.type===typesOfEvent[1] && newObject.outcome === typesOfOutcome[0]){
                editableEvent.yellow_foul=1;
                editableEvent.red_dissent=0;
                editableEvent.yellow_dissent=0;
                editableEvent.red_foul=0;
            }

            if(newObject.type===typesOfEvent[1] && newObject.outcome === typesOfOutcome[1]){
                editableEvent.red_foul=1;
                editableEvent.yellow_foul=0;
                editableEvent.red_dissent=0;
                editableEvent.yellow_dissent=0;
            }

            await this.card.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addProgression(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                own_half:0, opp_half:0};

                const typesOfEvent = ['Ownhalf', 'Opponents half']
            
            if(goalObject.event===typesOfEvent[0]){
                saveablePass.own_half=1;
            }

            if(goalObject.event===typesOfEvent[1]){
                saveablePass.opp_half=1;
            }

            const id = await this.ball_progression.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id, activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateProgression(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.ball_progression.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            const typesOfEvent = ['Ownhalf', 'Opponents half']

            if(newObject.event === typesOfEvent[0]){
                editableEvent.own_half = 1;
                editableEvent.opp_half = 0;
            }else{
                editableEvent.own_half = 0;
                editableEvent.opp_half = 1;
            }

            await this.ball_progression.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addFoul(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, won_in_opp_half:0, won_in_own_half:0, conceded_in_own_half:0, conceded_in_opp_half:0};

            const typesOfEvent = ['Ownhalf', 'Opponents half'];
            const typesOfOutCome = ['Successful', 'Unsuccessful'];

            if(goalObject.event === typesOfEvent[0] && goalObject.outcome===typesOfOutCome[0]){
                saveablePass.won_in_own_half=1;
            }

            if(goalObject.event === typesOfEvent[0] && goalObject.outcome===typesOfOutCome[1]){
                saveablePass.conceded_in_own_half=1;
            }

            if(goalObject.event === typesOfEvent[1] && goalObject.outcome===typesOfOutCome[0]){
                saveablePass.won_in_opp_half=1;
            }

            if(goalObject.event === typesOfEvent[1] && goalObject.outcome===typesOfOutCome[1]){
                saveablePass.conceded_in_opp_half=1;
            }

            const id = await this.fouls.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateFoul(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.fouls.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;

             const typesOfEvent = ['Ownhalf', 'Opponents half'];
            const typesOfOutCome = ['Successful', 'Unsuccessful'];

            if(newObject.event === typesOfEvent[0] && newObject.outcome===typesOfOutCome[0]){
                editableEvent.won_in_own_half=1;
                editableEvent.conceded_in_own_half=0;
                editableEvent.won_in_opp_half=0;
                editableEvent.conceded_in_opp_half=0;
            }

            if(newObject.event === typesOfEvent[0] && newObject.outcome===typesOfOutCome[1]){
                editableEvent.won_in_own_half=0;
                editableEvent.conceded_in_own_half=1;
                editableEvent.won_in_opp_half=0;
                editableEvent.conceded_in_opp_half=0;
            }

            if(newObject.event === typesOfEvent[1] && newObject.outcome===typesOfOutCome[0]){
                editableEvent.won_in_own_half=0;
                editableEvent.conceded_in_own_half=0;
                editableEvent.won_in_opp_half=1;
                editableEvent.conceded_in_opp_half=0;
            }

            if(newObject.event === typesOfEvent[1] && newObject.outcome===typesOfOutCome[1]){
                editableEvent.won_in_own_half=0;
                editableEvent.conceded_in_own_half=0;
                editableEvent.won_in_opp_half=0;
                editableEvent.conceded_in_opp_half=1;
            }

            await this.fouls.update(editableEvent);

            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================

//=================||==========================
addClearance(activePlayer, timeLineObject, goalObject){
return new Promise(async (resolved, rejected)=>{
    try {
        let saveablePass = {playerId:activePlayer._id, 
            goal_line:0, under_pressure:0};

        const typesOfEvent = ['Goal line', 'Under pressure']
        
        if(goalObject.event===typesOfEvent[0]){
            saveablePass.goal_line=1;
        }

        if(goalObject.event===typesOfEvent[1]){
            saveablePass.under_pressure=1;
        }

        const id = await this.clearance.add(saveablePass);
        const res = await this.addToTimeLineAndEvents(id, activePlayer._id, goalObject, timeLineObject);
        resolved(res);
    } catch (exception) {
        rejected(exception);
    }
});
}

updateClearance(goalObject, newObject){
return new Promise(async (resolved, rejected)=>{
    try {
        let editableEvent = await this.clearance.getByID(goalObject.eventId);

        await this.updateTimeLineAndEvent(goalObject, newObject);

        editableEvent.playerId = newObject.playerId;
        const typesOfEvent = ['Goal line', 'Under pressure']

        if(newObject.event === typesOfEvent[0]){
            editableEvent.goal_line = 1;
            editableEvent.under_pressure = 0;
        }else{
            editableEvent.goal_line = 0;
            editableEvent.under_pressure = 1;
        }

        await this.clearance.update(editableEvent);
        resolved(editableEvent);
    } catch (error) {
        rejected(error)
    }
});
}
//=================||==========================


//=================||==========================
addAssists(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, total:1};
            const id = await this.assists.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateAssists(goalObject, newObject){
return new Promise(async (resolved, rejected)=>{
    try {
        let editableEvent = await this.assists.getByID(goalObject.eventId);

        await this.updateTimeLineAndEvent(goalObject, newObject);
        editableEvent.playerId = newObject.playerId;
        await this.assists.update(editableEvent);
        resolved(editableEvent);
    } catch (error) {
        rejected(error)
    }
});
}
//=================||==========================


//=================||==========================
addPenalty(activePlayer, timeLineObject, goalObject){
return new Promise(async (resolved, rejected)=>{
    try {
        let saveablePass = {playerId:activePlayer._id, missed:0, scored:0};

        const typesOfOutcome = ['Missed', 'Score'];
        
        if(goalObject.outcome===typesOfOutcome[0]){
            saveablePass.missed=1;
        }

        if(goalObject.outcome===typesOfOutcome[1]){
            saveablePass.scored=1;
        }

        const id = await this.penalty.add(saveablePass);
        const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
        resolved(res);
    } catch (exception) {
        rejected(exception);
    }
});
}

updatePenalty(goalObject, newObject){
return new Promise(async (resolved, rejected)=>{
    try {
        let editableEvent = await this.penalty.getByID(goalObject.eventId);

        await this.updateTimeLineAndEvent(goalObject, newObject);

        editableEvent.playerId = newObject.playerId;
        const typesOfOutcome = ['Missed', 'Score'];

        if(newObject.outcome === typesOfOutcome[0]){
            editableEvent.missed = 1;
            editableEvent.scored = 0;
        }

        if(newObject.outcome === typesOfOutcome[1]){
            editableEvent.missed = 0;
            editableEvent.scored = 1;
        }

        await this.penalty.update(editableEvent);

        resolved(editableEvent);
    } catch (error) {
        rejected(error)
    }
});
}
//=================||==========================


//=================||==========================
addFreekick(activePlayer, timeLineObject, goalObject){
return new Promise(async (resolved, rejected)=>{
    try {
        let saveablePass = {playerId:activePlayer._id, on_target:0, off_target:0};

        const typesOfEvent = ['On Target', 'Off Target']

        if(goalObject.outcome===typesOfEvent[0]){
            saveablePass.on_target=1;
        }

        if(goalObject.outcome===typesOfEvent[1]){
            saveablePass.off_target=1;
        }

        const id = await this.freekick.add(saveablePass);
        const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
        resolved(res);
    } catch (exception) {
        rejected(exception);
    }
});
}

updateFreekick(goalObject, newObject){
return new Promise(async (resolved, rejected)=>{
    try {
        let editableEvent = await this.freekick.getByID(goalObject.eventId);

        await this.updateTimeLineAndEvent(goalObject, newObject);

        editableEvent.playerId = newObject.playerId;
        const typesOfEvent = ['On Target', 'Off Target']

        if(newObject.outcome === typesOfEvent[0]){
            editableEvent.on_target = 1;
            editableEvent.off_target = 0;
        }

        if(newObject.outcome === typesOfEvent[1]){
            editableEvent.on_target = 0;
            editableEvent.off_target = 1;
        }

        await this.freekick.update(editableEvent);

        resolved(editableEvent);
    } catch (error) {
        rejected(error)
    }
});
}
//=================||==========================


//=================||==========================
addTackles(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                successful:0, unsuccessful:0};
            
            saveablePass.successful=1;

            const id = await this.tackles.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateTackles(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.tackles.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            
            await this.tackles.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addBlocks(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                total:0};

            saveablePass.total=1;

            const id = await this.blocks.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateBlocks(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.blocks.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;

            await this.blocks.update(editableEvent);

            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addCrosses(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                total:0};

            saveablePass.total=1;

            const id = await this.crosses.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateCrosses(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.crosses.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;

            await this.crosses.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addChancesCreated(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, total_chances:0};

            saveablePass.total_chances=1;

            const id = await this.chance_created.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateChancesCreated(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.chance_created.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;

            await this.chance_created.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addInterceptions(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, opponents_half:0, own_half:0};

            const typesOfEvent = ['Opponents Half', 'Own Half']
            
            if(goalObject.event===typesOfEvent[0]){
                saveablePass.opponents_half=1;
            }

            if(goalObject.event===typesOfEvent[1]){
                saveablePass.own_half=1;
            }

            const id = await this.interceptions.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id,activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateInterceptions(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.interceptions.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            const typesOfEvent = ['Opponents Half', 'Own Half']

            if(newObject.event === typesOfEvent[0]){
                editableEvent.opponents_half = 1;
                editableEvent.own_half = 0;
            }else{
                editableEvent.opponents_half = 0;
                editableEvent.own_half = 1;
            }

            await this.interceptions.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
addCatches(activePlayer, timeLineObject, goalObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let saveablePass = {playerId:activePlayer._id, 
                simple:0,complex:0};

            const typesOfEvent = ['Simple', 'Complex']
            
            if(goalObject.event===typesOfEvent[0]){
                saveablePass.simple=1;
            }

            if(goalObject.event===typesOfEvent[1]){
                saveablePass.complex=1;
            }

            const id = await this.catches.add(saveablePass);
            const res = await this.addToTimeLineAndEvents(id, activePlayer._id, goalObject, timeLineObject);
            resolved(res);
        } catch (exception) {
            rejected(exception);
        }
    });
}

updateCatches(goalObject, newObject){
    return new Promise(async (resolved, rejected)=>{
        try {
            let editableEvent = await this.catches.getByID(goalObject.eventId);

            await this.updateTimeLineAndEvent(goalObject, newObject);

            editableEvent.playerId = newObject.playerId;
            const typesOfEvent = ['Simple', 'Complex']

            if(newObject.event === typesOfEvent[0]){
                editableEvent.simple = 1;
                editableEvent.complex = 0;
            }else{
                editableEvent.simple = 0;
                editableEvent.complex = 1;
            }

            await this.catches.update(editableEvent);
            resolved(editableEvent);
        } catch (error) {
            rejected(error)
        }
    });
}
//=================||==========================


//=================||==========================
marshallPostableObject(){
    return new Promise(async (resolved, rejected)=>{
        try {
            let allData = {players:[], match:{corners:0,freeKick:0, passes:0, team_A_Posession:0, team_B_Posession:0, 
                team_A_Scoreline:0, team_B_Scoreline:0, yellow_cards_team_A:0, yellow_cards_team_B:0, red_cards_team_A:0,
                red_cards_team_B:0, shots_team_A:0, shots_team_B:0, shots_ontarget_team_A:0, shots_ontarget_team_B:0}};

            const allPlayerMatchEvents = await this.playerMatchEvents.getAll();
            if(!allPlayerMatchEvents) return resolved(allData);

            if(allPlayerMatchEvents.length>0) allData.match.match_id = allPlayerMatchEvents[0].matchId;

            for(var i=0; i<allPlayerMatchEvents.length; i++){
                const player = allPlayerMatchEvents[i];
                
                const successful_shortpassList = await this.getSuccessful_shortpassList(player.playerId);
                const successful_longpassList = await this.getSuccessful_longpass(player.playerId);
                const line_break_passList = await this.getLine_break_pass(player.playerId);
                const goalsList = await this.getGoals(player.playerId);
                const savesList = await this.getSaves(player.playerId);
                const shotsList = await this.getShots(player.playerId);
                const duelsList = await this.getDuels(player.playerId);
                const dribblesResult = await this.getDribbles(player.playerId);
                const cardList = await this.getCard(player.playerId);
                const ball_progressionList = await this.getBallProgression(player.playerId)
                const foulsList = await this.getFouls(player.playerId);
                const clearanceList = await this.getClearance(player.playerId);
                const assistsList = await this.getAssists(player.playerId);
                const penaltyList = await this.getPenalty(player.playerId);
                const freeKick = await this.getFreeKicks(player.playerId);
                const tacklesList = await this.getTackles(player.playerId);
                const blocksList = await this.getBlocksList(player.playerId);
                const crossesList = await this.getCrosses(player.playerId);
                const chance_createdList = await this.getChanceCreated(player.playerId);
                const interceptionsList = await this.getInterceptions(player.playerId);
                const catchesList = await this.getCatches(player.playerId);

                const playerResult = {match:player.matchId, player_id:player.playerId, start:1, minutes:88, bench:0,
                successful_shortpass:successful_shortpassList, successful_longpass:successful_longpassList,
                line_break_pass:line_break_passList, dribbles:dribblesResult, shots:shotsList, crosses:crossesList,
                goals:goalsList, assists:assistsList, chance_created:chance_createdList, penalty:penaltyList,
                fouls:foulsList, interceptions:interceptionsList, tackles:tacklesList, ball_progression:ball_progressionList,
                blocks:blocksList, clearance:clearanceList, duels:duelsList, saves:savesList, card:cardList,
                catches:catchesList, freeKick:freeKick}

                allData.players.push(playerResult);

                if(crossesList){
                    allData.match.corners += crossesList.timeline.length;
                }

                
                if(freeKick){
                    allData.match.freeKick += freeKick.timeline.length;
                }


                if(successful_shortpassList){
                    allData.match.passes += successful_shortpassList.timeline.length;
                }

                if(successful_longpassList){
                    allData.match.passes += successful_longpassList.timeline.length;
                }

                if(line_break_passList){
                    allData.match.passes += line_break_passList.timeline.length;
                }


                if(ball_progressionList && player.team === 'A'){
                    allData.match.team_A_Posession += ball_progressionList.timeline.length;
                }

                if(ball_progressionList && player.team === 'B'){
                    allData.match.team_B_Posession += ball_progressionList.timeline.length;
                }


                if(goalsList && player.team === 'A'){
                    allData.match.team_A_Scoreline += goalsList.timeline.length;
                }

                if(goalsList && player.team === 'B'){
                    allData.match.team_B_Scoreline += goalsList.timeline.length;
                }


                if(cardList && player.team === 'A' && (cardList.yellow_dissent>0 || cardList.yellow_foul>0)){
                    allData.match.yellow_cards_team_A += cardList.timeline.length;
                }

                if(cardList && player.team === 'B' && (cardList.yellow_dissent>0 || cardList.yellow_foul>0)){
                    allData.match.yellow_cards_team_B += cardList.timeline.length;
                }


                if(cardList && player.team === 'A' && (cardList.red_dissent>0 || cardList.red_foul>0)){
                    allData.match.red_cards_team_A += cardList.timeline.length;
                }

                if(cardList && player.team === 'B' && (cardList.red_dissent>0 || cardList.red_foul>0)){
                    allData.match.red_cards_team_B += cardList.timeline.length;
                }


                if(shotsList && player.team === 'A'){
                    allData.match.shots_team_A += shotsList.timeline.length;
                }

                if(shotsList && player.team === 'B'){
                    allData.match.shots_team_B += shotsList.timeline.length;
                }


                if(shotsList && player.team === 'A' && (shotsList.insidebox_ontarget>0 || shotsList.outsidebox_ontarget)){
                    allData.match.shots_ontarget_team_A += shotsList.timeline.length;
                }

                if(shotsList && player.team === 'B' && (shotsList.insidebox_ontarget>0 || shotsList.outsidebox_ontarget)){
                    allData.match.shots_ontarget_team_B += shotsList.timeline.length;
                }

                if(i===(allPlayerMatchEvents.length-1)) resolved(allData);
            }

        } catch (error) {
            rejected(error);
        }
    });
}
//=================||==========================

/**
 * It returns a marshalled object(i.e both the total Successful_shortpassList commited and the list of timelines) of all Successful_shortpassList commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getSuccessful_shortpassList(playerId){
    let result = {timeline:[], total:0};

    const passes = await this.pass.getAll();
    const mPasses = passes.filter((mPass)=>mPass.playerId===playerId);

    if(!mPasses) return result;

    const successful_shortpass = mPasses.filter((mPass)=>mPass.short===1);
    result.total=successful_shortpass.length;

    for(let i=0; i<successful_shortpass.length; i++){
        const _pass = successful_shortpass[i];
        const timelineObject = await this.timeline.getByIndex("eventId", _pass.id);
        result.timeline.push(timelineObject); 

        if(i===(successful_shortpass.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Successful_longpass commited and the list of timelines) of all Successful_longpass commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getSuccessful_longpass(playerId){
    let result = {timeline:[], total:0};

    const passes = await this.pass.getAll();
    const mPasses = passes.filter((mPass)=>mPass.playerId===playerId);

    if(!mPasses) return result;

    const successful_longpass = mPasses.filter((mPass)=>mPass.long===1);
    result.total=successful_longpass.length;

    for(let i=0; i<successful_longpass.length; i++){
        const mPass = successful_longpass[i];
        const timelineObject = await this.timeline.getByIndex("eventId", mPass.id);
        result.timeline.push(timelineObject); 

        if(i===(successful_longpass.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Line_break_pass commited and the list of timelines) of all Line_break_pass commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getLine_break_pass(playerId){
    let result = {timeline:[], total:0};

    const passes = await this.pass.getAll();
    const mPasses = passes.filter((mPass)=>mPass.playerId===playerId);

    if(!mPasses) return result;

    const successful_linebreakpass = mPasses.filter((mPass)=>mPass.line_break===1);
    result.total=successful_linebreakpass.length;

    for(let i=0; i<successful_linebreakpass.length; i++){
        const mPass = successful_linebreakpass[i];
        const timelineObject = await this.timeline.getByIndex("eventId", mPass.id);
        result.timeline.push(timelineObject); 

        if(i===(successful_linebreakpass.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Dribbles commited and the list of timelines) of all Dribbles commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getDribbles(playerId){
    let result = {timeline:[], attempts:0, completed:0, skill_moves:0, nut_megs:0, failed:0, total:0};

    const all_dribbles = await this.dribbles.getAll();
    const dribbles = all_dribbles.filter((item)=>{return item.playerId == playerId});

    if(!dribbles) return result;
    result.total= dribbles.length;

    for(let i=0; i<dribbles.length; i++){
        const element = dribbles[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        result.attempts+=1;

        if(element.completed===1){
            result.completed+=1;
        }

        if(element.skill_moves===1){
            result.skill_moves+=1;
        }
        
        if(element.nut_megs===1){
            result.nut_megs+=1;
        }

        if(element.failed===1){
            result.failed+=1;
        }

        if(i===(dribbles.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Blocks commited and the list of timelines) of all Blocks commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getBlocksList(playerId){
    let result = {timeline:[], total:0};

    const blocks = await this.blocks.getAll();
    const mBlocks = blocks.filter((block)=>block.playerId === playerId);
    
    if(!mBlocks) return result;

    const totalBlocks = mBlocks.filter((_block)=>_block.total===1);
    result.total=totalBlocks.length;
    
    for(let i=0; i<totalBlocks.length; i++){
        const element = totalBlocks[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(i===(totalBlocks.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Shots commited and the list of timelines) of all Shots commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getShots(playerId){
    let result = {timeline:[], outsidebox_ontarget:0, outsidebox_offtarget:0, insidebox_offtarget:0, insidebox_ontarget:0, total:0};

    const all_shots = await this.shots.getAll();
    const shots = all_shots.filter((item)=>{return item.playerId == playerId});
    
    if(!shots) return result;
    result.total= shots.length;
    
    for(let i=0; i<shots.length; i++){
        const element = shots[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.outsidebox_ontarget===1){
            result.outsidebox_ontarget+=1;
        }
        
        if(element.outsidebox_offtarget===1){
            result.outsidebox_offtarget+=1;
        }
        
        if(element.insidebox_offtarget===1){
            result.insidebox_offtarget+=1;
        }
        
        if(element.insidebox_ontarget===1){
            result.insidebox_ontarget+=1;
        }

        if(i===(shots.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Crosses commited and the list of timelines) of all Crosses commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getCrosses(playerId){
    let result = {timeline:[], total:0};

    const crosses = await this.crosses.getAll();
    const mCrosses = crosses.filter((cross)=>cross.playerId === playerId);

    if(!mCrosses) return result;

    const successfullyCrosses = mCrosses.filter((_successfullyCrosses)=>_successfullyCrosses.total===1);
    result.total = successfullyCrosses.length;

    for(let i=0; i<successfullyCrosses.length; i++){
        const element = successfullyCrosses[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(i===(successfullyCrosses.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Goals commited and the list of timelines) of all Goals commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getGoals(playerId){
    let result = {timeline:[], header:0, oneVone:0, inside_box_shot_goal:0, outside_box_shot_goal:0, total:0};

    const all_goals = await this.goals.getAll();
    const goals = all_goals.filter((item)=>{return item.playerId == playerId});
    
    if(!goals) return result;
    result.total = goals.length;

    for(let i=0; i<goals.length; i++){
        const element = goals[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.header===1){
            result.header++;
        }
        
        if(element.oneVone===1){
            result.oneVone++;
        }
        
        if(element.inside_box_shot_goal===1){
            result.inside_box_shot_goal++;
        }
        
        if(element.outside_box_shot_goal === 1){
            result.outside_box_shot_goal++;
        }

        if(i===(goals.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Assists commited and the list of timelines) of all Assists commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getAssists(playerId){
    let result = {timeline:[], total:0};

    const mAssists = await this.assists.getAll();
    const assists = mAssists.filter((assist)=>assist.playerId = playerId);
    
    if(!assists) return result;

    const succesfullAssists = assists.filter((_assist)=>_assist.total===1);
    result.total = succesfullAssists.length;
    
    for(let i=0; i<succesfullAssists.length; i++){
        const mSuccesfullAssists = succesfullAssists[i];
        const timelineObject = await this.timeline.getByIndex("eventId", mSuccesfullAssists.id);
        result.timeline.push(timelineObject);

        if(i===(succesfullAssists.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total ChanceCreated commited and the list of timelines) of all ChanceCreated commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getChanceCreated(playerId){
    let result = {timeline:[], total:0};

    const chance_created = await this.chance_created.getAll();
    
    const allChance_created = chance_created.filter((_chance_created)=>_chance_created.playerId === playerId);
    const successfullChancesCreate = allChance_created.filter((_allChance_created)=>_allChance_created.total_chances === 1);

    if(!successfullChancesCreate) return result;

    result.total = successfullChancesCreate.length;

    for(let i=0; i<successfullChancesCreate.length; i++){
        const mChance_created = successfullChancesCreate[i];

        const timelineObject = await this.timeline.getByIndex("eventId", mChance_created.id);
        result.timeline.push(timelineObject);

        if(i===(successfullChancesCreate.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Penalty commited and the list of timelines) of all Penalty commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getPenalty(playerId){
    let result = {timeline:[], missed:0, scored:0, total:0};

    const all_penalty = await this.penalty.getAll();
    const penalties = all_penalty.filter((item)=>{return item.playerId == playerId});

    if(!penalties) return result;
    result.total = penalties.length;

    for(let i=0; i<penalties.length; i++){
        const mPenalties = penalties[i];
        const timelineObject = await this.timeline.getByIndex("eventId", mPenalties.id);
        result.timeline.push(timelineObject);

        if(mPenalties.missed===1){
            result.missed++;
        }
        
        if(mPenalties.scored===1){
            result.scored++;
        }

        if(i===(penalties.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Fouls commited and the list of timelines) of all Fouls commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getFouls(playerId){
    let result = {timeline:[], won_in_opp_half:0, won_in_own_half:0, conceded_in_own_half:0, conceded_in_opp_half:0, total:0};

    const all_fouls = await this.fouls.getAll();
    const fouls = all_fouls.filter((item)=>{return item.playerId == playerId});
    
    if(!fouls) return result;
    result.total = fouls.length;

    for(let i=0; i<fouls.length; i++){
        const element = fouls[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.won_in_opp_half===1){
            result.won_in_opp_half++;
        }
        
        if(element.won_in_own_half===1){
            result.won_in_own_half++;
        }
        
        if(element.conceded_in_own_half===1){
            result.conceded_in_own_half++;
        }
        
        if(element.conceded_in_opp_half===1){
            result.conceded_in_opp_half++;
        }

        if(i===(fouls.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total Interceptions commited and the list of timelines) of all Interceptions commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getInterceptions(playerId){
    let result = {timeline:[], opponents_half:0, own_half:0, total:0};

    const all_interceptions= await this.interceptions.getAll();
    const interceptions = all_interceptions.filter((item)=>{return item.playerId == playerId});
    
    if(!interceptions) return result;
    result.total = interceptions.length;

    for(let i=0; i<interceptions.length; i++){
        const element = interceptions[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.won_in_opp_half===1){
            result.won_in_opp_half++;
        }
        
        if(element.won_in_own_half===1){
            result.won_in_own_half++;
        }
        
        if(element.conceded_in_own_half===1){
            result.conceded_in_own_half++;
        }
        
        if(element.conceded_in_opp_half===1){
            result.conceded_in_opp_half++;
        }

        if(i===(interceptions.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total tackles commited and the list of timelines) of all tackles commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getTackles(playerId){
    let result = {timeline:[], successful:0, unsuccessful:0, total:0};

    const all_tackles= await this.tackles.getAll();
    const tackles = all_tackles.filter((item)=>{return item.playerId == playerId});
    
    if(!tackles) return result;

    const successfulTackles = tackles.filter((succTackle)=>succTackle.successful===1);
    const unSuccessfulTackles = tackles.filter((unSuccTackle)=>unSuccTackle.unsuccessful===1);
    
    result.successful = successfulTackles.length;
    result.unsuccessful = unSuccessfulTackles.length;

    result.total = tackles.length;

    for(let i=0; i<tackles.length; i++){
        const mTackles = tackles[i];
        const timelineObject = await this.timeline.getByIndex("eventId", mTackles.id);
        result.timeline.push(timelineObject);

        if(i===(tackles.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total progression commited and the list of timelines) of all progression commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getBallProgression(playerId){
    let result = {timeline:[], own_half:0, opp_half:0, total:0};

    const all_ball_progression= await this.ball_progression.getAll();
    const ball_progression = all_ball_progression.filter((item)=>{return item.playerId == playerId});

    if(!ball_progression) return result;

    result.total = ball_progression.length;
    for(let i=0; i<ball_progression.length; i++){
        const element = ball_progression[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.own_half===1){
            result.own_half++;
        }
        
        if(element.opp_half===1){
            result.opp_half++;
        }

        if(i===(ball_progression.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total clearance commited and the list of timelines) of all clearance commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getClearance(playerId){
    let result = {timeline:[], goal_line:0, under_pressure:0, total:0};

    const all_clearance= await this.clearance.getAll();
    const clearance = all_clearance.filter((item)=>{return item.playerId == playerId});

    if(!clearance) return result;
    result.total = clearance.length;

    for(let i=0; i<clearance.length; i++){
        const element = clearance[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.goal_line===1){
            result.goal_line++;
        }
        
        if(element.under_pressure===1){
            result.under_pressure++;
        }

        if(i===(clearance.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total duels commited and the list of timelines) of all duels commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getDuels(playerId){
    let result = {timeline:[], won_aerial:0, won_ground:0, total:0};

    const all_duels= await this.duels.getAll();
    const duels = all_duels.filter((item)=>{return item.playerId == playerId});

    if(!duels) return result;
    result.total = duels.length;

    for(let i=0; i<duels.length; i++){
        const element = duels[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.won_aerial===1){
            result.won_aerial++;
        }
        
        if(element.won_ground===1){
            result.won_ground++;
        }

        if(i===(duels.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total saves commited and the list of timelines) of all saves commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getSaves(playerId){
    let result = {timeline:[], oneVone:0, inside_box:0, outside_box:0, total:0};

    const all_saves= await this.saves.getAll();
    const saves = all_saves.filter((item)=>{return item.playerId == playerId});

    if(!saves) return result;
    result.total = saves.length;

    for(let i=0; i<saves.length; i++){
        const element = saves[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.oneVone===1){
            result.oneVone+=1;
        }
        
        if(element.inside_box===1){
            result.inside_box+=1;
        }
        
        if(element.outside_box===1){
            result.outside_box+=1;
        }

        if(i===(saves.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total card commited and the list of timelines) of all card commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getCard(playerId){
    let result = {timeline:[], yellow_dissent:0, yellow_foul:0, red_dissent:0, red_foul:0, total:0};

    const all_card = await this.card.getAll();
    const cards = all_card.filter((item)=>{return item.playerId == playerId});

    if(!cards) return result;
    result.total = cards.length;

    for(let i=0; i<cards.length; i++){
        const element = cards[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.yellow_dissent===1){
            result.yellow_dissent++;
        }
        
        if(element.yellow_foul===1){
            result.yellow_foul++;
        }
        
        if(element.red_dissent===1){
            result.red_dissent++;
        }
        
        if(element.red_foul===1){
            result.red_foul++;
        }

        if(i===(cards.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total catches commited and the list of timelines) of all catches commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getCatches(playerId){
    let result = {timeline:[], simple:0, complex:0, total:0};

    const all_catches = await this.catches.getAll();
    const catches = all_catches.filter((item)=>{return item.playerId == playerId});

    if(!catches) return result;
    result.total = catches.length;

    for(let i=0; i<catches.length; i++){
        const element = catches[i];
        const timelineObject = await this.timeline.getByIndex("eventId", element.id);
        result.timeline.push(timelineObject);

        if(element.simple===1){
            result.simple+=1;
        }
        
        if(element.complex===1){
            result.complex+=1;
        }
        
        if(i===(catches.length-1)) return result;
    }
}

/**
 * It returns a marshalled object(i.e both the total freekick commited and the list of timelines) of all freeKicks commited by a specifit player.
 * @param playerId (The player that commits the event)
 **/
async getFreeKicks(playerId){
    let result = {timeline:[], on_target:0, off_target:0, total:0};

    const all_freeKicks = await this.freekick.getAll();
    const freeKicks = all_freeKicks.filter((freekick)=>freekick.playerId === playerId);
    
    if(!freeKicks) return result;
    result.total = freeKicks.length;

    for(let i=0; i<freeKicks.length; i++){
        const mFreeKicks = freeKicks[i];

        if(mFreeKicks.on_target === 1){
            result.on_target+=1;
        }

        if(mFreeKicks.off_target === 1){
            result.off_target+=1;
        }

        const timelineObject = await this.timeline.getByIndex("eventId", mFreeKicks.id);
        result.timeline.push(timelineObject);
        
        if(i===(freeKicks.length-1)) return result;
    }
}

/**
 * It persists the timeline that displays as a visual representation of the event happening time interval to the local db,
 * either this operation is succesfully or not, it also persists the event which is the snippet of the actual event
 * to the local storage
 * @param eventId (The Id of the actual event persisted in the localstorage)
 * @param playerId (The player that commits the event)
 * @param eventObject (The event Json Object)
 * @param timeLineObject (The event time line (aka time interval))
 **/
addToTimeLineAndEvents(eventId, playerId, eventObject, timeLineObject){
    return new Promise((resolved, rejected)=>{
        try{
            const preObj = eventObject;
            let switchTypeForEvent = {...eventObject, type: preObj.type, event: preObj.event}

            const saveableTimelineEvent = {eventId:eventId, ...switchTypeForEvent};
            const saveableTimeline = {playerId:playerId, eventId:eventId, ...timeLineObject}

            this.timeline.add(saveableTimeline).then((id)=>{
                this.addPlayerMatchEventsTimeLine(saveableTimelineEvent).then((res)=>{
                    resolved(res);
                })
            })
        }catch(error){
            rejected(error)
        }
    });
}

}

// module.exports = exe;