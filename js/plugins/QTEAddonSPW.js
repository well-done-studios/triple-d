
//=============================================================================
// QTE Addon: Skill possibilities window
// by Astfgl
// Date: 09/11/2016
// Revision: 11/11/2016
// Added help and TOU info.
// Made to work with the QTEWindow plugin by Astfgl.
// Please refer to that plugin for the terms of use.
// If you credit me for the QTE window I don't require additional credit for the
// use of this plugin.
//=============================================================================
 
 
/*:
 * @plugindesc v1.0; Creates a window to display the skill possibilities and their sequence, to use with the QTEWindow plugin.
 * @author Astfgl
 *
 * @param x
 * @desc The default x coordinate of the window
 * @default 0  
 *
 * @param y
 * @desc the default y coordinate of the window
 * @default 0
 *
 * @param width
 * @desc The default width of the window in pixels
 * @default 300
 *
 * @param height
 * @desc The default height of the window in lines
 * @default 5
 *
 * @param textWidth
 * @desc The width of the text area in pixels
 * @default 100
 *
 * @param iconWidth
 * @desc The width of the icon area in pixels
 * @default 200
 *
 * @param maxInputs
 * @desc The default number of max Inputs
 * @default 5
 *
 * @param minInputs
 * @desc The default number of minimum inputs
 * @default 1
 *
 * @help
 * =========================================
 * Skill possibilities Window
 * =========================================
 * REQUIREMENTS:
 * This plugins requires that the QTEWindow plugin is installed and
 * placed above it in the plugin list.
 * SETUP:
 * Setup each parameter to your liking, alhtough none is required.
 *
 * USAGE:
 * This window will display the skill possibilities of an actor
 * for a free input QTE based on three parameters:
 * - The actor Id
 * - The minimum number of input
 * - The maximum number of input
 * If an actor has five skills but only three of them have a <qteSeq:>
 * notetag, skillA 3 inputs, skillB 4 inputs, skillC 5 inputs.
 * minInputs = 5, will display only skillC
 * maxInputs = 3, will display only skillA
 * maxInputs = minInputs = 4, will display only skill B
 *
 * Creating a SPW:
 * $gameMap.createSPW(actorId,maxInputs,minInputs)
 *
 * You can then set the window parameters using the following:
 * Window coordinates:
 *  - $gameMap.setSPWCoord(x,y)
 *
 * Window size :
 * - $gameMap.setSPWSize(width,height)
 *
 * Text and Icon area repartition:
 * - $gameMap.setSPWText(textAreaWidth,iconAreaWidth)
 *
 * Remove SPW window:
 * - $gameMap.removeSPW()
 *
 */
 
function Window_SPW() {
    this.initialize.apply(this, arguments);
}
 
Window_SPW.prototype = Object.create(Window_Base.prototype);
Window_SPW.prototype.constructor = Window_SPW;
 
Window_SPW.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this,0,0,1000,1000);
    var parameters = PluginManager.parameters('QTEAddonSPW');
    this.x = eval(parameters.x);
    this.y = eval(parameters.y);
    this.width = eval(parameters.width);
    this.height = eval(parameters.height) * this.lineHeight();
    this._txtWidth = eval(parameters.textWidth);
    this._iconWidth = eval(parameters.iconWidth);
    this._maxInputs = eval(parameters.maxInputs);
    this._minInputs = eval(parameters.minInputs);
    this._actor = $gameActors.actor(1);
    this._lineHeight = this.lineHeight();
    this.update();
}
 
Window_SPW.prototype.update = function() {
    this.contents.clear();
    if (this._actor !== 0) {
        var list = this.createSkillList();
        var i, ii, index, txt
        for (i = 0; i < list.length; i++) {
            txt = "";
            txt+= list[i].name;
            txt+= ":";
            this.drawText(txt, 0, this._lineHeight * i, this._txtWidth, "left");
            for (ii = 0; ii < eval(list[i].meta.qteSeq).length; ii++) {
                index = SceneManager._scene._QTEWindow.getIconIndex(eval(list[i].meta.qteSeq)[ii])
                this.drawIcon(index, this._txtWidth + 36 * ii, this._lineHeight * i)
            }
        }
    }
}
 
Window_SPW.prototype.clear = function() {
    this.initialize();
}
 
Window_SPW.prototype.createSkillList = function() {
    var list = []
    if (this._actor !== 0) {
        var skills = this._actor.skills();
        for (var i = 0; i < skills.length; i++) {
            if (skills[i].meta.qteSeq) {
                if (eval(skills[i].meta.qteSeq).length <= this._maxInputs && eval(skills[i].meta.qteSeq).length >= this._minInputs) {
                    list.push(skills[i]);
                }
            }
        }
    }
    return list
}
 
Game_Map.prototype.createSPW = function(actorId, maxInputs, minInputs) {
    var scene = SceneManager._scene
    var win = new Window_SPW
    scene._SPWindow = win
    scene._SPWindow._actor = $gameActors.actor(actorId);
    if (maxInputs) {scene._SPWindow._maxInputs = maxInputs};
    if (minInputs) {scene._SPWindow._minInputs}
    scene.addChild(scene._SPWindow);
    scene._SPWindow.show();
}
 
Game_Map.prototype.removeSPW = function() {
    SceneManager._scene.removeChild(SceneManager._scene._SPWindow);
    SceneManager._scene._SPWindow.clear()
}
 
Game_Map.prototype.setSPWCoord = function(x,y) {
    SceneManager._scene._SPWindow.x = x;
    SceneManager._scene._SPWindow.y = y;
}
 
Game_Map.prototype.setSPWSize = function(x,y) {
    SceneManager._scene._SPWindow.width = x;
    SceneManager._scene._SPWindow.height = (y+1) * SceneManager._scene._SPWindow._lineHeight;
}
 
Game_Map.prototype.setSPWText = function(x,y) {
    SceneManager._scene._SPWindow._txtWidth = x;
    SceneManager._scene._SPWindow._iconWidth = y;

    }