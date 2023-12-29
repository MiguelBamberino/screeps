
// Build global state
global.Memory = {}
global.Game = require("./Game.js")
const constants = require('@screeps/common/lib/constants');
// Append each attribute from the module to the global scope
Object.assign(global, constants);

// monkey-patch in additional prototypes
require('../../src/prototype.structure.store.js');
