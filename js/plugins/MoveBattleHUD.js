//=============================================================================
// MoveBattleHUD.js
//=============================================================================
 
/*:
 * @plugindesc Adjust the location of the Battle windows.
 * @author Hugh Bagan
 *
 * @help Place this plugin at the bottom of the Plugin list.
 * It may override any other plugins that change the Battle system.
 * 
 * This plugin will move all of the windows of the Battle Scene to below the visible screen.
 */


Scene_Battle.prototype.update = function() {
    var active = this.isActive();

    this._logWindow.y = Graphics.height;
    this._statusWindow.y = Graphics.height;
    this._partyCommandWindow.y = Graphics.height;
    this._actorCommandWindow.y = Graphics.height;
    this._helpWindow.y = Graphics.height;
    this._skillWindow.y = Graphics.height;
    this._itemWindow.y = Graphics.height;
    this._actorWindow.y = Graphics.height;
    this._enemyWindow.y = Graphics.height;

    $gameTimer.update(active);
    $gameScreen.update();
    this.updateStatusWindow();
    this.updateWindowPositions();
    if (active && !this.isBusy()) {
        this.updateBattleProcess();
    }
    Scene_Base.prototype.update.call(this);
};