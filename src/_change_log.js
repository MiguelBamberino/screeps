
/*
 
===================================
= Version 19.2.0 
===================================
- patched some bugs with spelling mistake variables
- added tempCode for auto-building a room for RCL 1 > RCL 6
- rooms RCL 1-3 will now spawn extra harvesters per source
- room will not spawn too many builders if E surplus is low
- added server config for different deployments
- mapbook now support non-vision rooms again, by storing data in mem
- changed worked to prioritise fast fill stores over random exts
- fixed bug where mb.getControllerRoom() throws error for corridor rooms
- changed tankers to wait near controller when bored and < rcl 4

===================================
= Version 19.1.2 
===================================
- added rKeeper role to manage in-room hauling; replace tankers+tempCode hauler
- moved imports and exports config to be stored in roomNodes
- rKeeper hauls for imports & exports
- moved mapBook to heap for rooms with vision
- moved roomNode setup to _shard_config.js
- added more CPU watches to GUI summary

===================================
= Version 19.1.1
===================================
- adding labComplex prototype

===================================
= Version 19.1 
===================================
- Pulling code from season for shard3

===================================
= Version 19.0 
===================================
- Moving to rooms being top level object


===================================
= Version 18.4 
===================================
- first record of change log
- copy of word branch from 28/05/2023
- uses spawn as the top level object


*/