//=============================================================================
// PhoneMenu.js
//=============================================================================

/*:
 * @plugindesc This plugin sets the custom cell phone menu.
 * @author Hugh Bagan
 *
 * @help There are no plugin commands.
 * 
 */

(function() {

    Scene_Menu.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);

        this.createForeground();

        this.createCommandWindow();
        this.createGoldWindow();
        this.createStatusWindow();
        
        /*
        this._commandWindow
        this._goldWindow
        this._statusWindow
        */
        this._goldWindow.hide();
        this._statusWindow.hide();
        this._commandWindow.x = 290;
        this._commandWindow.y = 90;
        this._commandWindow.width = 260;
        this._commandWindow.height = 450;
        this._commandWindow.opacity = 255;
    };

    Scene_Menu.prototype.createCommandWindow = function() {
        this._commandWindow = new Window_MenuCommand(0, 0);
        this._commandWindow.setHandler('item',      this.commandItem.bind(this));
        this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
        this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
        this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
        this._commandWindow.setHandler('save',      this.commandSave.bind(this));
        this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
        this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    /*Scene_MenuBase.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("Phone2");
        this.addChild(this._backgroundSprite);
    };*/
    
    Scene_Menu.prototype.createForeground = function() {
        this._foregroundSprite = new Sprite();
        this._foregroundSprite.bitmap = ImageManager.loadPicture("iphone");
        this.addChild(this._foregroundSprite);
    };

    /*
    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth - 240;
    };
    
    Window_MenuStatus.prototype.windowHeight = function() {
        return Graphics.boxHeight / 2;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 2;
    };

    Window_MenuStatus.prototype.maxCols = function() {
        // Rewritten from the inherited Window_Selectable (parent of MenuStatus)
        return 1;
    };*/

    Window_MenuCommand.prototype.windowWidth = function() {
        return 240;
    };
    
    Window_MenuCommand.prototype.numVisibleRows = function() {
        return this.maxItems();
    };

    /********************************************************
     * Texting menu
     *******************************************************/
    // Borrowed some functionality from YEP_GabWindow

    

})();