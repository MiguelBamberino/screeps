require('./mocks/Global')

// load in test class
const roomNode = require('../src/class.roomNode');
const {ERR_RCL_NOT_ENOUGH, ERR_NOT_FOUND, ERR_NOT_ENOUGH_ENERGY} = require("@screeps/common/lib/constants");


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


describe('rn.2 > runLinkSend()',()=>{

    // RCL too low:
    it.todo('rn.2.1 > RCL 1 EXPECT : ERR_RCL_NOT_ENOUGH')
    it.todo('rn.2.2 > RCL 2 EXPECT : ERR_RCL_NOT_ENOUGH')
    it.todo('rn.2.3 > RCL 3 EXPECT : ERR_RCL_NOT_ENOUGH')
    it.todo('rn.2.4 > RCL 4 EXPECT : ERR_RCL_NOT_ENOUGH')

    // RCL5 not enough links:
    it.todo('rn.2.5 > RCL 5, no links in room EXPECT: ERR_NOT_FOUND');
    it.todo('rn.2.5 > RCL 5, only storage link EXPECT : ERR_NOT_FOUND & no calls to link.send()');
    it.todo('rn.2.5 > RCL 5, only source links EXPECT : ERR_NOT_FOUND & no calls to link.send()');
    it.todo('rn.2.5 > RCL 5, all 3 links built after boot-up EXPECT : ERR_NOT_ENOUGH_ENERGY & no calls to link.send()');

    // RCL5 1 link, 1 storage, all capacity checks
    it.todo('rn.2.5 > RCL 5, 1 full source link & 1 empty storage link EXPECT OK & src.link.send()');
    it.todo('rn.2.5 > RCL 5, 1 source link becomes full over X ticks & 1 empty storage link EXPECT OK & src.link.send() on FULL tick');
    it.todo('rn.2.5 > RCL 5, 1 part-full source link & 1 empty storage link EXPECT ERR_NOT_ENOUGH_ENERGY & no calls of link.send()');
    it.todo('rn.2.5 > RCL 5, 1 full source link & 1 full storage link EXPECT ERR_FULL & no calls of src.link.send()');
    it.todo('rn.2.5 > RCL 5, 1 full source link & 1 part full storage link EXPECT ERR_FULL & no calls of src.link.send()');
    it.todo('rn.2.5 > RCL 5, 1 400/800 source link & 1 storage link, 400/800 EXPECT ERR_NOT_ENOUGH_ENERGY & no calls of src.link.send()');

    // RCL5 cool down checks
    it.todo('rn.2.5 > RCL 5, 1 TIRED but full source link & 1 storage link EXPECT ERR_TIRED no calls of src.link.send()');
    it.todo('rn.2.5 > RCL 5, 2 TIRED but full source links & 1 storage link EXPECT ERR_TIRED no calls of src.link.send()');
    it.todo('rn.2.5 > RCL 5, 1 full source link & 1 tired storage link EXPECT OK & src.link.send() because storage can receive');
    it.todo('rn.2.5 > RCL 5, 2 full source links(1st tired) & 1 storage link EXPECT OK & src.link.send() from 2nd');
    it.todo('rn.2.5 > RCL 5, 2 full source links(2nd tired) & 1 storage link EXPECT OK & src.link.send() from 1st');

    // RCL5 2 src links, 1 storage
    it.todo('rn.2.5 > RCL 5, 2 full source links & 1 storage link EXPECT OK & src.link.send() from 1st');
    it.todo('rn.2.5 > RCL 5, 2 source links(1st empty,2nd full) & 1 storage link EXPECT OK & src.link.send() from 2nd');

    // RCL6 basic prefer active controller over storage
    it.todo('rn.2.5 > RCL 6, 2 full source links & 1 empty  storage link & no controller link EXPECT OK & src.link.send() from 1st');
    it.todo('rn.2.5 > RCL 6, 1 full source link & 1 empty  storage link & 1 controller link(1 upgrader) built after boot-up EXPECT OK & src.link.send(controller) from 1st');
    it.todo('rn.2.5 > RCL 6, 1 full source link & 1 empty storage link & 1 empty controller link(1 upgrader) EXPECT OK & src.link.send(controller.link) from 1st');
    it.todo('rn.2.5 > RCL 6, 1 full source link & 1 empty storage link & 1 empty controller link(0 upgrader) EXPECT OK & src.link.send(storage) from 1st');
    it.todo('rn.2.5 > RCL 6, 1 full source link & 1 empty storage link & 1 part full controller link(1 upgrader) EXPECT OK & src.link.send(storage) from 1st');
    it.todo('rn.2.5 > RCL 6, 1 full source link & 1 empty storage link & 1  full controller link(1 upgrader) EXPECT OK & src.link.send(storage) from 1st');
    it.todo('rn.2.5 > RCL 6, 2 full source links & 1 empty storage link & 1  empty controller link(1 upgrader) EXPECT OK & src.link.send(storage,controller) from 1st & 2nd');
    it.todo('rn.2.5 > RCL 6, 2 full source links & 1 full storage link & 1  full controller link(1 upgrader) EXPECT ERR_FULL & no src.link.send() from 1st or 2nd');
    // RCL6 relay from storage to controller
    it.todo('rn.2.5 > RCL 6, 2 empty source link & 1 full storage link & 1  empty controller link(1 upgrader) EXPECT OK &  storage.link.send(controller)');
    it.todo('rn.2.5 > RCL 6, 1 790/800 source link & 1 full storage link & 1  empty controller link(1 upgrader) EXPECT OK & storage.link.send(controller)');
    it.todo('rn.2.5 > RCL 6, 1 399/800 source link & 1 empty storage link & 1  empty controller link(1 upgrader) EXPECT ERR_NOT_ENOUGH_ENERGY & storage.link.setToRelay()');
    it.todo('rn.2.5 > RCL 6, 1 400/800 source link & 1 empty storage link & 1  empty controller link(1 upgrader) EXPECT ERR_NOT_ENOUGH_ENERGY & storage.link.setToRelay()');
    it.todo('rn.2.5 > RCL 6, 1 401/800 source link & 1 empty storage link & 1  empty controller link(1 upgrader) EXPECT ERR_NOT_ENOUGH_ENERGY & storage.link.setToReceive()');
    it.todo('rn.2.5 > RCL 6, 2 source links(401 & 399/800) & 1 empty storage link & 1  empty controller link(1 upgrader) EXPECT ERR_NOT_ENOUGH_ENERGY & storage.link.setToReceive()');



});