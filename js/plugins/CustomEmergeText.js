//=============================================================================
// CustomEmergeText.js
//=============================================================================
 
/*:
 * @plugindesc Modifies the emerge messages for specific enemies.
 * @author Hugh Bagan
 *
 * @help There are no plugin commands.
 * 
 */

/*  Taken straight from the source and redefined here.
 *
 */
BattleManager.displayStartMessages = function() {

    $gameTroop.enemyNames().forEach(function(name) {
        // Execute this function on each enemy name in the troop.
        // Put your chosen emerge text for an enemy here.
        if (name == "Frosty") {
            $gameMessage.add("A snowman is rolling towards you.")
        }
        else if (name == "Richard") {
            $gameMessage.add("Teaching Assistant Richard is haranguing \nyou for homework!");
        }
        else {
            // Failsafe
            $gameMessage.add(TextManager.emerge.format(name));
        }
    });
    if (this._preemptive) { 
        $gameMessage.add(TextManager.preemptive.format($gameParty.name())); 
    } else if (this._surprise) { 
        $gameMessage.add(TextManager.surprise.format($gameParty.name())); 
    }
};