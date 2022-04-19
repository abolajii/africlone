const TAG = 'AddEvent';
const AddEvent = require('./addEvent');
const addEvent = new AddEvent();

test(TAG, async (done) => {
    function callback(data) {
        try {
          expect(data).not.toBeUndefined();
            done();
        } catch (error) {
            done(error);
        }
      }

    //   addEvent
    //   exe().then(callback).catch(callback)
}, 2000);