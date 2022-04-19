export default function eventReducer(event, action) {
    switch (action.type) {
        case 'empty':
            return {};

        case 'add_player_event': {
            console.log('nna oo');
            console.log(action);
            let keys = Object.keys(action);
            console.log(keys);
            let value = Object.values(action);
            console.log(value);
            const { _id } = action;


            keys.map((key) => {

                let newEvent = {
                    match: {

                    },
                    players: [
    
                    ]
                }
                
            })

            let newEvent = {
                match: {

                },
                players: [

                ]
            }

          

            newEvent.players.push(_id);
            return {...event, newEvent};
        }
            
        
           
        case 'add_match_event': {
            console.log('nna oo');
            console.log(action);
            const { _id } = action

            let newEvent = {
                match: {
                    
                },
                players: [

                ]
            }
            newEvent.players.push(_id);
            return {...event, newEvent};
        }
              

        default:
            throw new Error("Unhandled action " + action.type)
    }
}