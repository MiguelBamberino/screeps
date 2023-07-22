
Main Ideas
A) Redo builders to stay put at construction
B) statistics logger
c) Spawn queue
d) DataSource querying
e) record uptime of roles; i.e. is role X ever 0/2 for a while
f) extension clusters
g) Harvester & upgraders ext filling
h) tower repair queue
i) E collected per source
j) on mapTick, check if creep died, then check last known pos for dropped E
k) workers to rescue dropped E if its on/near a road and TTL is over distance
L) income/outgoings for room/node
k) merge builder & waller into same role
L) If fillers have died, then worker needs to fill spawn, so unlock the spawn and exts. 
M) when worker logic sets reserve_id for extension, its pulled back by c1. it thinks its a depot on tick 2
N) workers seem to travel to container to only drop 4e off


A) Redo Builders
- if the site is a rampart, then repair after
- big CARRY & big work
- move about map, empty
- stay at construction site and build
- require a tanker to being E to site
- have a flag/dump spot near constructions, for E
- builders have big carry and act as container/depot

B) Stats logger
- a numerical log over time of a stat
- e.g. tracking CPU usage over X ticks
- Set how many ticks worth of data to keep
- calculate a rolling avg, min, max, curr value
- good for tracking if a number is growing/shrinking
- track CPU, E2Collect, Emined, ECollected, EonController, TimeSpawning

C) Spawn Queue
- push a spawning request onto a wish list
- provide spawn time target; ASAP/on-tick X
- support high priority/ queue jump
- spreading spawn load between 2-3 spawns

d) DataSource Querying
- set a SELECT for the columns in table/ js array of objects
- set order of columns
- set column headings
- set column width
- set filters for rows
- set column to sum
- set avg, min, max?
- set a group by 

f) extension clusters
- group extensions together into one logical container
- plug into spawning code, to empty a full cluster in one go
- creeps will visit a cluster and fill all at all in one trip
- extensions laid of so can all be filled from 1 road spot


g) harvester ext filling
- to reduce move intents, have harvester & upgrader own a few exts
- harvester & upgrader will manage filling these
. quicker, because they are already sat there
- automatically create construction sites, as long as they dont block roads
- do harvester & upgrader efficiency report first but maybe this can be before spawn fast fillers


h) tower repair queue
- toweers will repair closest
- towers will not repair same item

L) income/out
group = Alpha/Beta
type = mined / loss / in / spent
sub-type ::
mined = mined
loss = death
in = collected? picked-up? 
out = build, repair, tow-repair, waller, upgrade, spawn creep


