//=============================================================================
// DisableMouseInput.js
//=============================================================================

/*:
 * @plugindesc Disables the mouse or touch input.
 * @author Hugh Bagan
 *
 * @help There are no plugin commands.
 * 
 * 
 */

(function() {

    var _TouchInput_initialize = TouchInput.initialize;
    TouchInput.initialize = function() {
        _TouchInput_initialize.call(this);
        this._touchEnabled = false;
    }

    var _TouchInput_update = TouchInput.update;
    TouchInput.update = function() {
        if (this._touchEnabled) {
            _TouchInput_update.call(this);
        }
    }

})();