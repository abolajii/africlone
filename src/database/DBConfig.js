export const DBConfig = {
  name: 'TimeLineDb',
  version: 1,
  objectStoresMeta: [{
      store: 'event',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'event', keypath: 'event', options: { unique: false } },
      ]
    },
    {
      store: 'playerMatchEvents',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'matchId', keypath: 'matchId', options: { unique: false } },
        { name: 'player_id', keypath: 'playerId', options: { unique: true } },
        { name: 'first_name', keypath: 'name', options: { unique: false } },
        { name: 'last_name', keypath: 'name', options: { unique: false } },
        { name: 'playerPosition', keypath: 'position', options: { unique: false } },
        { name: 'playerDob', keypath: 'dob', options: { unique: false } },
        { name: 'playerNumber', keypath: 'number', options: { unique: false } },
        { name: 'start', keypath: 'start', options: { unique: false } },
        { name: 'minutes', keypath: 'minutes', options: { unique: false } },
        { name: 'bench', keypath: 'bench', options: { unique: false } },
      ]
    },
  ]
};