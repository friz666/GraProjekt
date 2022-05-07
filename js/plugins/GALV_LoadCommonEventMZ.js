//-----------------------------------------------------------------------------
//  Galv's Load Common Event MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_LoadCommonEventMZ.js
//-----------------------------------------------------------------------------
//  2020-10-18 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_LoadCommonEvent = true;

var Galv = Galv || {};              // Galv's main object
Galv.LCE = Galv.LCE || {};          // Galv's object

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Run a common event when the player loads a save file
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param loadEventId
 * @text Load Common Event Id
 * @desc The common event id ran after a saved game is loaded
 * @default 0
 *
 * @help
 *   Galv's Load Common Event MZ
 * ----------------------------------------------------------------------------
 * Just a simple plugin that allows you to set a common event that is run
 * every time the player loads a save file.
 *
 * The plugin setting 'Load Common Event Id' can be used to set the default id
 * for the common event you want to run every time the player loads their game.
 * Using conditional branches in that common event, you can control what the
 * player sees in that event, or you can change the common event (below).
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT CALL
 * ----------------------------------------------------------------------------
 * You can change the common event id during the game by using script call:
 *
 *     Galv.LCE.id(x);   // x being the new common event id to use.
 * 
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.LCE.cEventId = Number(PluginManager.parameters('Galv_LoadCommonEventMZ')["loadEventId"]);
Galv.LCE.id = function(id) {
		$gameSystem._loadCommonEventId = id;
};


// GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.LCE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.LCE.Game_System_initialize.call(this);
	this._loadCommonEventId = Galv.LCE.cEventId;
};


// SCENE LOAD
//-----------------------------------------------------------------------------

Galv.LCE.Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function() {
	Galv.LCE.Scene_Load_onLoadSuccess.call(this);
	if ($gameSystem._loadCommonEventId) $gameTemp.reserveCommonEvent($gameSystem._loadCommonEventId); // run common event
};