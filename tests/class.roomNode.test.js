require('./mocks/Global')

// load in test class
const roomNode = require('../src/class.roomNode');


describe('rn.1 > auto safe mode',()=>{

    // key buildings damaged triggers
    it.todo('rn.1.1 > 1st spawn has taken damage')
    it.todo('rn.1.2 > 2nd spawn has taken damage')
    it.todo('rn.1.3 > 3rd spawn has taken damage')
    it.todo('rn.1.4 > a spawn has been destroyed')
    it.todo('rn.1.5 > all spawns have been destroyed')
    it.todo('rn.1.6 > the storage took damage')
    it.todo('rn.1.7 > the storage was destroyed')
    it.todo('rn.1.8 > the terminal took damage')
    it.todo('rn.1.9 > the terminal was destroyed')

// claim attack pending triggers
    it.todo('rn.1.10 > controller has active walls & enemy claimer adjacent(range=1)')
    it.todo('rn.1.11 > controller has active walls & enemy claimer nearby(range=2)')
    it.todo('rn.1.12 > controller has active walls & enemy claimer too far(range=3)')
    it.todo('rn.1.13 > controller has no walls & enemy claimer nearby(range=2)')
    it.todo('rn.1.14 > controller has no walls & enemy claimer nearby(range=2)') // Note: Duplicate Test Case
    it.todo('rn.1.15 > controller has a missing wall & enemy claimer nearby(range=2)')
    it.todo('rn.1.16 > controller has no walls & ally claimer nearby(range=2)')
    it.todo('rn.1.17 > controller has no walls & my claimer nearby(range=2)')
    it.todo('rn.1.18 > controller has no walls & my claimer nearby(range=2)') // Note: Duplicate Test Case

// cpu savings
    it.todo('rn.1.19 > all triggers true, safe-mode already active, dont call again')



});