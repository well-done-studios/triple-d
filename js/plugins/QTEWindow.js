//=============================================================================
// QTEWindow
// by Astfgl
// Date: 03/11/2016
// Build: 26/11/2016
// Release build 02
// Bug fixes + New parameters.
// TERMS OF USE:
// Free to use both commercially and non commercially.
// For commercial games, you must provide me with a free copy of the game.
// For non commercial games, tell me about it! I'd love to see what you were able
// to do with my plugin.
// Credits required, in a visible place:
// any of Astfgl/ Pierre MATEO/ Pierre MATEO (Astfgl)
// Edits allowed, with the caveat that you must keep the edited product under the
// same license and you must clearly indicate it is an edit, and what part you
// did edit.
// You must keep this header intact.
//
// For information, time spent developping this + addons: 30hours.
//=============================================================================
 
/*:
 * @plugindesc v1.0; Basic QTE setup
 * @author Astfgl
 *
 * @param BaseDuration
 * @desc The base duration of the QTE Window, in frames.
 * @default 60
 *
 * @param EndingDuration
 * @desc The duration when the sequence is completed before closing the window for free QTEs, in frames.
 * @default 30
 *
 * @param IconArray
 * @desc The index of each icon to use for the display. [up,down,left,right,ok,cancel]
 * @default [12,13,14,15,28,29]
 *
 * @param Width
 * @desc Number of icons to show in the QTE Window
 * @default 6
 *
 * @param Height
 * @desc The height in pixels of the QTE Window
 * @default 100
 *
 * @param PlaySound
 * @desc Whether to play any sound or not
 * @default true
 *
 * @param SuccessSoundName
 * @desc The name of the SE to be played on succesfull input. If 0, no sound will be played.
 * @default Cursor2
 *
 * @param ResultSuccessSound
 * @desc The name of the SE to be played when the QTE is completed succesfully. 0 = no sound.
 * @default Decision1
 *
 * @param ResultFailureSound
 * @desc The name of the SE to be played when the QTE fails. 0 = no sound.
 * @default Buzzer1
 *
 * @param CanFail
 * @desc Whether or not the player can make wrong inputs. If false, a wrong input will end the QTE as a failure.
 * @default false
 *
 * @param ShowTime
 * @desc Show The remaining time or not, can be: gauge, number, both or no
 * @default gauge
 *
 * @param TextAlign
 * @desc Where to put the countdown number: can be left right or center
 * @default right
 *
 * @param GaugeFilling
 * @desc The color of the gauge gradient 1 in [r,g,b] format
 * @default [255,255,255]
 *
 * @param GaugeBack
 * @desc The color of the gauge gradient 2, in [r,g,b] format
 * @default [0,0,0]
 *
 * @param DisplayFailText
 * @desc true = display a message in the log window upon QTE failure, false = don't
 * @default true
 *
 * @param FailText
 * @desc The message shown when a QTE fails.
 * @default Wrong input ot time ran out.
 *
 * @param DisplayNoMatchText
 * @desc true = display a message in the log window when no match is found, false = don't
 * @default true
 *
 * @param NoMatchText
 * @desc The message shown when no match is found for a free QTE.
 * @default No skill found matching that sequence.
 *
 * @param OcarinaSounds
 * @desc The array of each sound name, in that order [up,down,left,right,ok,cancel]
 * @default ["ocarina1","ocarina2","ocarina3","ocarina4","ocarina5","ocarina1",]
 *
 * @param OcarinaNotePosition
 * @desc The position of each note on the music sheet [up,down,left,right,ok,cancel]
 * @default [36*1+18+3,4*36+3,3*36+3,2*36+18+3,5*36+3,0]
 *
 * @help
 * ===================================================================
 * PLUGIN SETUP:
 * Set the parameters before use, notably the icon indexes or the 
 * inputs won't show.
 * If you want to use the ocarina mode, you'll have to specify 
 * the file names in the ocarina sounds parameter.
 * If you want accurate note display you'll have to modify the note
 * position array too, 36 is one full space, 18 a half space, 3 is
 * just for correct spacing.
 *
 * ===================================================================
 * SUGGESTED PLUGINS FOR BATTLE USE: 
 * Yanfly Core Engine, Battle Engine Core, Action sequence 1
 * This is for battle use through action sequences. You can call the QTE
 * using common events or another plugin providing action sequences if you want.
 * I just haven't tried it. I make almost no battle modifications though
 * so another plugin should work too.
 *
 * Look at the examples in the thread for ideas on how to use them in action 
 * sequences.
 *
 * ==================================================================
 * How to call a QTE:
 * $gameMap.QTE(mode,duration,sequence,visible,x*,y*,opacity*,
 * width*,height*,wrongInput*,showTime*)
 * 
 * =================
 * NORMAL QTE
 * mode = ["normal"]
 * duration = duration wanted in frames
 * sequence = sequence (see at the end of the help file how to provide sequences)
 * visible = whether you want to show the qte window or not, true or false
 *
 * All the following parameters marked with an * are not required, but the window
 * will use them instead of the plugin parameters if they are present.
 * x = x position of the qte window
 * y = y position of the qte window
 * opacity = opacity of the back of the qte window, not the icons 
 * or time remaining gauge
 * width = the width as in number of icons you want to show at once
 * height = the height in pixels
 * wrongInput = whether a wrong input will end the QTE as a failure or not, 
 * can be true or false
 * showTime = the mode to show time, "number", "gauge", "both" or "no"
 *
 * ex: $gameMap.QTE(["normal"],300,["ok","up","left"],true)
 *
 *==================
 * To set one QTE window option in particular:
 *
 * $gameMap.setQTEpos(x,y) = sets the x and y position of the QTE window.
 * $gameMap.setQTEdim(width,height) = sets the width and height of the QTE window
 * $gameMap.setQTEfail(boolean) = either true or false, whether a wrong
 * Input makes the QTE stops as a failure.
 * $gameMap.setQTEopacity(number) from 0 transparent to 255 opaque, 
 * the opacity of the QTE window, not the contents.
 * $gameMap.setQTEtime(mode) sets which mode to display time, same options 
 * as the parameter.
 * $gameMap.setQTEsound(bool) true or false, whether to play sounds or not.
 * Note that this will only stop the system sounds from playing, the ocarina
 * sounds will be played if applicable.
 * $gameMap.setOcarina(bool,bool2) if bool = true each input will play the sound
 * defined in the parameters, if bool2 = true it will switch the display mode
 * of the sequence to look like a music sheet.
 * ================
 * 
 * Every QTE window option is reset at the end of each action in battle.
 * On the map, the QTE window is reset each time the map is entered,
 * like going in the menuand then back.
 * This goes for all QTE modes.
 * Reset all QTE options: $gameMap.clearQTE();
 *
 * ===============
 * FREE QTE a QTE that registers player input
 * The script call is the same as above, however the mode argument differs
 * mode = ["free",maxInput,cancelButton]
 * maxInput = the maximum numberof recorded keys
 * cancelButton = a button to end the input.
 * If you have several skills with different sequence length
 * set the maxInput to the maximum sequence length. Ie fire is up up down, 
 * spark up up up up, set max Input to 4.
 * If you want to cast spark just press up 4 times, because maxInput is reached 
 * the qte will end automatically. But if you want to cast Fire you'll gave to 
 * press up up down and then cancelButton.
 * It will ignore the sequence argument, so just put [].
 *
 * ex: $gameMap.QTE(["free",4,"cancel"],300,[],true). This will produce a 
 * QTE window asking for 4 inputs, ending when running out of time or 
 * on the first "cancel" button press.
 *================
 *
 * RYTHMIC QTE: ie a qte progressing by itself and you need to press each
 * button in its timeframe
 * The sequence is setup like this: 
 * [[button,duration],[button2,duration2],...,[buttonN,durationN]]
 * In addition to the inputs below you can use "no", and it will wait and 
 * return a failure if any button is pressed during the wait.
 * The mode argument is also changed mode = ["rythm",increment*]
 * Increment is not mandatory, it is by how much at each frame the duration
 * will diminish.
 * If not set it will use 1.
 * Ex: duration = 300 frame, increment 1 -> actual duration 300 frame
 * duration = 300 frames, increment 5 -> actual duration 60 frames. It will make 
 * the qte move faster.
 * Call example:
 * var seq = [["ok",100],["no",50],["up",100],["down",100]]
 * $gameMap.QTE(["rythm",5],300,seq,true);
 *
 *
 * ========================================================
 * How to get a QTE result: $gameMap.getQTEResult()
 *
 * =================
 * Important:
 * Please note that due to the way this works you have to use the 
 * getQTEResult() script call in another script event command, not in 
 * the same as the one where you launch the qte or it won't work.
 * 
 * =================
 * The result function has 4 possibilities:
 * pending: qte not started
 * start: qte currently running
 * success: qte ended succesfully
 * failure: qte ended in failure
 *
 * ex: $gameMap.getQTEResult() === "success" in a condition script will return true
 * if the QTE was a success, and false for any other option.
 *
 * ================
 * In case of a free QTE the result function will return the sequence.
 * To get the skills that match the sequence entered, use the call:
 * $gameMap.getSkillMatch(actorId)
 * This will look through all skills of the actor, and if any of the
 * sequences in their note <qteSeq:> matches that of the skill, will return
 * their id.
 *
 * ex: $gameMap.getSkillMatch(1) will look through actor 1 skills.
 *
 * If you want to return the name of a skill from a match, use
 * $gameMap.getSkillNameFromMatch(skillId)
 *
 * ex: $gameMap.getSkillNameFromMatch($getSkillMatch(1))
 * That call will try to match the qte result to a skill id, and return their
 * name. Assign it to a variable and you can display it.
 *
 * ============================================================
 * DEFINING SEQUENCES:
 * ============================================================
 * 
 * Normal mode :
 * Provide sequences as an array 
 * ["button1", button2",...,"buttonN"].
 *
 *
 * Free mode:
 * The defined sequence doesn't matter just use [].
 *
 *
 * Rythm mode:
 * Provide sequences as an array:
 * [[button,duration],[button2,duration2],...[buttonN,durationN]]
 * You can use "no" instead of a button if you want to make a pause
 * in the QTE.
 *
 * ============================================================
 * Use a free input QTE to cast a spell for each input:
 * $gameMap.castSequence(user,target,actionAr)
 * IMPORTANT This command won't work without yanfly's battle engine
 * core and will crash your game if used without.
 * The user and target must be the objects themselves, not the ID
 * or index.
 * ActionAr is the array of action to match the input in that order:
 * [up,down,left,right,ok,cancel]
 *
 * ex: eval: $gameMap.castSequence(user,target,[30,31,32,33,34,35])
 * For an input: up down left right ok
 * This will make the user cast skills 30,31,32,33,34 in succession
 *
 * You can use v(id) inside the action array, to refer to the value
 * of variable id, so you are able to modify the combos in game.
 *
 * ============================================================
 * Use a free input QTE to cast a skill that matches its sequence.
 * $gameMap.castSkillMatch(user,target,failActionId)
 * This will make the user cast the matching action on target,
 * if there was no match it will instead make it cast failActionId.
 * If failActionId is 0, it won't do anything instead.
 *
 * ============================================================
 * Cast both the sequence and the skill match:
 * $gameMap.castSandSM(user,target,actionAr,failActionId)
 * This will first go through the actions via the cast sequence
 * command and then attempt to cast a match from that sequence.
 * The arguments are the same as the functions described above.
 *
 * =============================================================
 * Cast every skill match found within the sequence:
 * $gameMap.trySequence(user,target,minInputs*,maxInputs*)
 * Okay, this one is a bit complicated, let's take an example:
 * the free QTE result is ["ok","ok","down","down"]
 * Let's say min and max Inputs aren't given as instructions.
 * It will cast the skills the actor know with the notetags
 * <qteSeq:["ok"]> and <qteSeq:["down"]> in that order:
 * ok, ok, down, down.
 * Then it will move to look for matches in 2 length.
 * So it will cast the spells okok, okdown and downdown
 * Then do it for 3:
 * okokdown, okdowndown
 * Then do it for 4:
 * okokdowndown
 * If the actor doesn't have any skills that match those notetags
 * it simply will ignore them.
 * What do min Input and max Input do: they will start or end
 * the process at those number.
 * So if min inputs was 2 , it wouldn't have cast the skills
 * that matched only 1 input. And if max Inputs was 3 it wouldn't
 * have cast the final sequence of 4.
 *
 * =============================================================
 * MAKE A RANDOM SEQUENCE
 * ONLY FOR NORMAL MODE
 * Use $gameMap.randomSequence(length)
 * It will generate a random QTE sequence of that length, using
 * all inputs available, except those you put after length
 * example: $gameMap.randomSequence(5,"up") will return a 5 
 * input long sequence that doesn't contain the up key.
 * $gameMap.randomSequence(5,"up","down") will do the same 
 * but without the down key too.
 * example:
 * $gameMap.QTE(["normal",0],500,$gameMap.randomSequence(5),true)
 *
 *
 *
 *
 *
 * ===========================================================
 * KEY LIST
 * ===========================================================
 * You can find the list of keys here: 
 *   0: 'ok',        // A
 *   1: 'cancel',    // B Used as cancel key in examples.
 *   2: 'shift',     // X Not supported
 *   3: 'menu',      // Y Not supported
 *   4: 'pageup',    // LB Not suppoted
 *   5: 'pagedown',  // RB Not supported
 *   12: 'up',       // D-pad up
 *   13: 'down',     // D-pad down
 *   14: 'left',     // D-pad left
 *   15: 'right',    // D-pad right
 *
 */
 
 
//Creating the QTE window object prototype
function Window_QTE() {
    this.initialize.apply(this, arguments);
}

Window_QTE.prototype = Object.create(Window_Selectable.prototype);
Window_QTE.prototype.constructor = Window_QTE;

Window_QTE.prototype.initialize = function(duration) {
	var parameters = PluginManager.parameters('QTEWindow');
	this._duration = duration || Number(parameters.BaseDuration);
	var width = Number(parameters.Width) * 48 + 20;
    var height = Number(parameters.Height);
	var x = Graphics.boxWidth/2 - width/2;
	var y = Graphics.boxHeight/2 - height/2;
    Window_Selectable.prototype.initialize.call(this, x, y, 1000, 1000);
	this.width = width;
	this.height = height;
	var a = eval(PluginManager.parameters('QTEWindow').GaugeBack);
	var b = eval(PluginManager.parameters('QTEWindow').GaugeFilling);
	this._gaugeBack = Utils.rgbToCssColor(a[0],a[1],a[2])
	this._gaugeFilling = Utils.rgbToCssColor(b[0],b[1],b[2])
	this._result = "pending";
	this._sequence = [];
	this._seqIndex = 0;
	this._currentB = 0;
	this._frozen = true;
	this._maxDuration = 0;
	this._mode = ["normal",0];
	this._currInputs = 0;
	this._wrongInput = eval(parameters.CanFail)
	this._itemNumber = Number(parameters.Width);
	this._increment = 1;
	this._inputs = [];
	this._sound = eval(parameters.PlaySound);
	this._ocarina = [false,false];
	this._notePos = eval(parameters.OcarinaNotePosition)
	this._endDur = eval(parameters.EndingDuration)
	this._ending = false;
    this.update();
}

Window_QTE.prototype.update = function() {
	if (!this._frozen) {
		var wrongInput = this._wrongInput;
		this.contents.clear();
		var showTime = PluginManager.parameters('QTEWindow').ShowTime;
		if (this._ending === true) { //Show the sequence when the QTE has ended
			this.contents.clear();
			if (this._mode[0] === "normal" || this._mode[0] === "rythm") {
				this._endDur = 0;
			}
			if (this._mode[0] === "free") {
				if (!this._ocarina[1]) {
					this.drawSequence();
				} else {
					this.drawOcarina();
				}
				this.drawTime(showTime);
				this._endDur -= 1;
			}
			if (this._endDur <= 0) {
				//this._ending = false;
				this._frozen = true;
				this.hide();
				this.end();
			}
		}
		if (this._mode[0] === "normal" && !this._ending) { //update normal QTE mode
			if (!this._ocarina[1]) {
				this.drawSequence();
			} else {
				this.drawOcarina();
			}
			this.setCurrentB();
			this.setDuration(-1);
			this.drawTime(showTime);
			var check = true;
			if (Input.isTriggered(this._currentB)) {
				if (this._currentB === "cancel") {check = false}
				this._seqIndex += 1;
				this.playInput();
				if (this._ocarina[0]) {
					this.playOcarina();
				}
			}
			if (this.getSeqIndex() >= this._sequence.length) {
				this.setResult("success");
				this.playSuccessSound();
				this._ending = true;
			};
			if (this.getResult() === "start" && !this.checkFailure() && !wrongInput && check) {
				this.setResult("failure");
			}
			if (this._duration <= 0 && this.getResult() === "start") {
				this.setResult("failure");
			}
			if (this.getResult() === "failure") {
				this.playFailureSound();
				this.displayFailure();
				/*this.hide();
				this._frozen = true;*/
				this._ending = true;
			}
			if (this.getResult() === "success") {
				/*this.hide();
				this._frozen = true;*/
				this.playSuccessSound();
				this._ending = true;
			}
		}
		
		if (this._mode[0] === "free" && !this._ending) {// update free input QTE mode
			if (!this._ocarina[1]) {
				this.drawSequence();
			} else {
				this.drawOcarina();
			}
			this.setCurrentB();
			this._seqIndex = 0;
			this.setDuration(-1);
			this.drawTime(showTime);
			var maxInputs = this._mode[1];
			var endButton = this._mode[2];
			if (this._currInputs >= maxInputs) {
				//finished inputting, > max inputs
				this.playSuccessSound();
				this.endFreeQTE();
			}
			if (Input.isTriggered(endButton)) {
				//player presses the finish button
				this.playSuccessSound();
				this.endFreeQTE();
			}
			if (this.checkInput(endButton) !== 0 && !this._ending) {
				//register inputs
				this._sequence.push(this.checkInput(endButton));
				this._currInputs += 1;
				this.playInput();
				if (this._ocarina[0]) {
					this.playOcarina();
				}
			}
			if (this._duration <= 0 && this.getResult() === "start") {
				this.setResult("failure");
			}
			if (this.getResult() === "failure") {
				this.playFailureSound();
				this.displayFailure();
				//this.hide();
				//this._frozen = true;
				this._ending = true;
			}
		}
	
		if (this._mode[0] === "rythm" && !this._ending) {//update rythm mode
			var increment = this._increment || 1;
			this.setDuration(-increment);
			if (!this._ocarina[1]) {
				this.drawRythm();
			} else {
				this.drawRythmOcarina();
			}
			this.drawTime(showTime);
			this._currentB = this.getRythmCurrInput();
			var index = this.getRythmIndex()
			if (!this._inputs[index] && this._sequence[index][0] === "no") { //for a waiting period
				this._inputs[index] = true;
				this._seqIndex +=1;
			}
			if (this._inputs[index]) {
				this._currentB = ""
			}
			if (Input.isTriggered(this._currentB) && !this._inputs[index]) {
				this._inputs[index] = true;
				this._seqIndex += 1;
				this.playInput();
				if (this._ocarina[0]) {
					this.playOcarina();
				}
			}
			if (this.getResult() === "start" && !this.checkFailure() && !wrongInput) {
				this.setResult("failure");
			}
			if (index > this.getSeqIndex()) { //If player missed a note, the sequence index will be < to the expected index
				this.setResult("failure");
			}
			if (this.getSeqIndex() >= this._sequence.length) { //If end music reached
				this.setResult("success")
			}
			if (this._duration <= 0) {
				this.setResult("failure");
			}
			if (this.getResult() === "failure") {
				this.playFailureSound();
				this.displayFailure();
				/*this.hide();
				this._frozen = true;*/
				this._ending = true;;
			}
			if (this.getResult() === "success") {
				/*this.hide();
				this._frozen = true;*/
				this.playSuccessSound();
				this._ending = true
			}
			
		}
	}
}

Window_QTE.prototype.setDuration = function(duration) {
	if (duration === undefined) {return this._duration}
	this._duration += duration;
}

Window_QTE.prototype.getResult = function() {
	return this._result
}

Window_QTE.prototype.setResult = function(result) {
	this._result = result
}

Window_QTE.prototype.setSequence = function(seq) {
	this._sequence = seq;
}

Window_QTE.prototype.getSeqIndex = function() {
	return this._seqIndex
}

Window_QTE.prototype.setCurrentB = function(index) {
	this._currentB = this._sequence[this.getSeqIndex()]
}

Window_QTE.prototype.playInput = function() {
	var filename = PluginManager.parameters('QTEWindow').SuccessSoundName
	var sound = {
		name: filename, 
		volume: 90, 
		pitch: 100, 
		pan: 0 }
	if (filename !== "0" && this._sound) {
		AudioManager.playSe(sound);
	}
}

Window_QTE.prototype.playSuccessSound = function() {
	var filename = PluginManager.parameters('QTEWindow').ResultSuccessSound
	var sound = {
		name: filename, 
		volume: 90, 
		pitch: 100, 
		pan: 0 }
	if (filename !== "0" && this._sound) {
		AudioManager.playSe(sound);
	}
}

Window_QTE.prototype.playFailureSound = function() {
	var filename = PluginManager.parameters('QTEWindow').ResultFailureSound
	var sound = {
		name: filename, 
		volume: 90, 
		pitch: 100, 
		pan: 0 }
	if (filename !== "0" && this._sound) {
		AudioManager.playSe(sound);
	}
}

Window_QTE.prototype.drawSequence = function() {
	var max = Math.min(this._itemNumber,this._sequence.length - this.getSeqIndex());
	for (var i = 0; i < max; i++) {
		this.drawIcon(this.getIconIndex(this._sequence[i + this.getSeqIndex()]) ,48 * i, 0)
	}
}

Window_QTE.prototype.startSequence = function(mode) {
	this._frozen = false;
	this._seqIndex = 0;
	this.setResult("start")
	this._mode = mode
}

Window_QTE.prototype.getIconIndex = function(string) {
	var iconar = eval(PluginManager.parameters('QTEWindow').IconArray);
	switch (string) {
		case "ok":
			return iconar[4];
			break;
		case "cancel":
			return iconar[5];
			break;
		case "up":
			return iconar[0];
			break;
		case "down":
			return iconar[1];
			break;
		case "left":
			return iconar[2];
			break;
		case "right":
			return iconar[3];
			break;
		default:
			return 0;
			break;
	}
}

Window_QTE.prototype.checkFailure = function() {
	if (Input.isTriggered("up") && this._currentB !== "up") {
		return false
	} else if (Input.isTriggered("down") && this._currentB !== "down") {
		return false
	} else if (Input.isTriggered("left") && this._currentB !== "left") {
		return false
	} else if (Input.isTriggered("right") && this._currentB !== "right") {
		return false
	} else if (Input.isTriggered("ok") && this._currentB !== "ok") {
		return false
	} else if ((Input.isTriggered("cancel") || Input.isTriggered("escape")) && this._currentB !== "cancel") {
		return false
	} else if (Input.isTriggered("shift") && this._currentB !== "shift") {
		return false
	} else if (Input.isTriggered("menu") && this._currentB !== "menu") {
		return false
	} else if (Input.isTriggered("pageup") && this._currentB !== "pageup") {
		return false
	} else if (Input.isTriggered("pagedown") && this._currentB !== "pagedown") {
		return false
	} else {
		return true
	}
}

Window_QTE.prototype.end = function() {
	this.deactivate();
}

Window_QTE.prototype.clear = function() {
	this._result = "pending"
	this._sequence = [];
	this._seqIndex = 0;
	this._currentB = 0;
	this._frozen = true;
	this.opacity = 255;
	var parameters = PluginManager.parameters('QTEWindow')
	var width = Number(parameters.Width) * 48 + 20;
    var height = Number(parameters.Height);
	this.width = width;
	this.height = height;
	var x = Graphics.boxWidth/2 - width/2;
	var y = Graphics.boxHeight/2 - height/2;
	this.x = x;
	this.y = y;
	this._wrongInput = eval(parameters.CanFail);
	this._itemNumber = Number(parameters.Width);
	this._mode = ["normal",0];
	this._currInputs = 0;
	this._inputs = [];
	this._increment = 1;
	this._sound = eval(parameters.PlaySound);
	this._ocarina = [false,false];
	this._ending= false;
	this._endDur = eval(parameters.EndingDuration)
}

Window_QTE.prototype.drawTime = function(mode) {
	var align = PluginManager.parameters('QTEWindow').TextAlign
	var x;
	var y;
	var width = this.width - 40
	//var height = this.height - 58;
	var rate = this._duration/this._maxDuration;
	if (mode === "gauge") {
		x = 0;
		y = 20;
		if (this._ocarina[1]) {
			y = this.height - 54 - 30
		}
		this.drawGauge(x,y,width,rate,this._gaugeBack,this._gaugeFilling);
	}
	if (mode === "number") {
		x = 0;
		y = 34;
		if (this._ocarina[1]) {
			y = this.height - 34 - 30
		}
		var txt = ""
		txt += Math.floor(this._duration/60)
		txt += "/"
		txt += Math.floor(this._maxDuration/60)
		this.drawText(txt,x,y,width,align)
	}
	if (mode === "both") {
		x = 0;
		y = 20;
		if (this._ocarina[1]) {
			y = this.height - 54 - 30
		}
		this.drawGauge(x,y,width,rate,this._gaugeBack,this._gaugeFilling);
		x = 0;
		y = 34;
		if (this._ocarina[1]) {
			y = this.height - 34 - 30
		}
		var txt = ""
		txt += Math.floor(this._duration/60)
		txt += "/"
		txt += Math.floor(this._maxDuration/60)
		this.drawText(txt,x,y,width,align)
	}
	if (mode === "no") {};
}

Window_QTE.prototype.checkInput = function(endButton) {
	if (Input.isTriggered("up") && (endButton !== "up")) {
		return "up"
	} else if (Input.isTriggered("down") && (endButton !== "down")) {
		return "down"
	} else if (Input.isTriggered("left") && (endButton !== "left")) {
		return "left"
	} else if (Input.isTriggered("right") && (endButton !== "right")) {
		return "right"
	} else if (Input.isTriggered("ok") && (endButton !== "ok")) {
		return "ok"
	} else if (Input.isTriggered("cancel") && (endButton !== "cancel")) {
		return "cancel"
	} else if (Input.isTriggered("shift") && (endButton !== "shift")) {
		return "shift"
	} else if (Input.isTriggered("menu") && (endButton !== "menu")) {
		return "menu"
	} else if (Input.isTriggered("pageup") && (endButton !== "pageup")) {
		return "pageup"
	} else if (Input.isTriggered("pagedown") && (endButton !== "pagedown")) {
		return "pagedown"
	} else {
		return 0
	}
}

Window_QTE.prototype.endFreeQTE = function() {
	if (this._sequence[0] === undefined) {
		this.setResult("failure");
	} else {
		this.setResult(this._sequence);
	};
	this._ending = true;
	/*this.hide();
	this._frozen = true;
	this.end();*/
}

Window_QTE.prototype.getRythmCurrInput = function() {
	return this._sequence[this.getRythmIndex()][0]
}

Window_QTE.prototype.getRythmIndex = function() {
	var curTime = this._maxDuration - this._duration;
	var sum1 = 0;
	var sum2 = this._sequence[0][1]
	var index = 0;

	for (var i = 0; i < this._sequence.length; i++) {
		if (curTime >= sum1 && curTime <= sum2) {
			index = i
		}
		if (i === (this._sequence.length-1)) {break}
		sum1 += this._sequence[i][1];
		sum2 += this._sequence[i+1][1];
	}
	return index
}

Window_QTE.prototype.drawRythm = function() {
	var width = this.width;
	var height = 36
	var color1 = Utils.rgbToCssColor(188,64,64);
	var color1Bis = Utils.rgbToCssColor(255,0,0);
	var color2 = Utils.rgbToCssColor(64,64,188);
	var color2Bis = Utils.rgbToCssColor(0,0,255);
	var color, colorBis
	var sum = 0;
	var sum2 = this._sequence[0][1];
	var currTime = this._maxDuration - this._duration
	for (var i = 0; i < this._sequence.length; i++) {
		var x = sum - currTime;
		if (x < currTime + width) {
			if (i%2 === 0) {
				color = color1;
				colorBis = color1Bis
			} else {
				color = color2
				colorBis = color2Bis
			};
			if (this._sequence[i][0] !== "no") {
				this.contents.gradientFillRect(x,0,this._sequence[i][1],height,color,colorBis, false);
				this.contents.clearRect (x + 5 , 5 , this._sequence[i][1] - 10 , height - 10 )
				this.drawText(this._sequence[i][0], x, 0, this._sequence[i][1], "center")
			}
		}
		if (i === (this._sequence.length -1)) {
			break;
		}
		sum += this._sequence[i][1]
		sum2 += this._sequence[i+1][1]
	}
	
}

Window_QTE.prototype.displayFailure = function() {
	if (SceneManager._scene instanceof Scene_Battle) {
		SceneManager._scene._logWindow.displayQTEFailure();
	}
}

Window_QTE.prototype.playOcarina = function(endButton) {
	var input = this.checkInput(endButton);
	var ocarina = eval(PluginManager.parameters("QTEWindow").OcarinaSounds);
	var filename = "0";
	if (input === "up") {
		var filename = ocarina[0];
	} else if (input === "down") {
		var filename = ocarina[1];
	} else if (input === "left") {
		var filename = ocarina[2];
	} else if (input === "right") {
		var filename = ocarina[3];
	} else if (input === "ok") {
		var filename = ocarina[4];
	} else if (input === "cancel") {
		var filename = ocarina[5];
	}
	var sound = {
		name: filename, 
		volume: 90, 
		pitch: 100, 
		pan: 0 
	};
	if (filename !== "0") {
		AudioManager.playSe(sound);
	}
}

Window_QTE.prototype.drawOcarina = function() {
	var max = Math.min(this._itemNumber,this._sequence.length - this.getSeqIndex());
	for (var i = 0; i < 5; i++) {
		this.drawHorzLine(36 + 36 * i);
	}
	for (var i = 0; i < max; i++) {
		if (this._sequence[i+this.getSeqIndex()] === "ok") {
			var y = this._notePos[4];
		} else 	if (this._sequence[i+this.getSeqIndex()] === "up") {
			var y = this._notePos[0];
		} else	if (this._sequence[i+this.getSeqIndex()] === "down") {
			var y = this._notePos[1];
		} else 	if (this._sequence[i+this.getSeqIndex()] === "right") {
			var y = this._notePos[3];
		} else if (this._sequence[i+this.getSeqIndex()] === "left") {
			var y = this._notePos[2];
		} else {
			var y = 0;
		}
		this.drawIcon(this.getIconIndex(this._sequence[i + this.getSeqIndex()]) ,48 * i, y)
	}
}

Window_QTE.prototype.drawHorzLine = function(y) {
    var lineY = y;
    this.contents.paintOpacity = 120;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
};

Window_QTE.prototype.lineColor = function() {
    return this.normalColor();
};

Window_QTE.prototype.drawRythmOcarina = function() {
	var width = this.width;
	var height = 33
	var color1 = Utils.rgbToCssColor(188,64,64);
	var color1Bis = Utils.rgbToCssColor(255,0,0);
	var color2 = Utils.rgbToCssColor(64,64,188);
	var color2Bis = Utils.rgbToCssColor(0,0,255);
	var color, colorBis
	var sum = 0;
	var sum2 = this._sequence[0][1];
	var currTime = this._maxDuration - this._duration
	for (var i = 0; i < 5; i++) {
		this.drawHorzLine(36 + 36 * i);
	}
	for (var i = 0; i < this._sequence.length; i++) {
		var x = sum - currTime;
		if (x < currTime + width) {
			if (i%2 === 0) {
				color = color1;
				colorBis = color1Bis
			} else {
				color = color2
				colorBis = color2Bis
			};
			if (this._sequence[i][0] !== "no") {
				if (this._sequence[i][0] === "ok") {
					var y = this._notePos[4];
				} else 	if (this._sequence[i][0] === "up") {
					var y = this._notePos[0];
				} else	if (this._sequence[i][0] === "down") {
					var y = this._notePos[1];
				} else 	if (this._sequence[i][0] === "right") {
					var y = this._notePos[3];
				} else if (this._sequence[i][0] === "left") {
					var y = this._notePos[2];
				} else {
					var y = 0;
				}
				this.contents.gradientFillRect(x, y, this._sequence[i][1], height, color, colorBis, false);
				this.contents.clearRect (x + 5 , y + 5 , this._sequence[i][1] - 10 , height - 10 )
				this.drawText(this._sequence[i][0], x, y, this._sequence[i][1], "center")
			}
		}
		if (i === (this._sequence.length -1)) {
			break;
		}
		sum += this._sequence[i][1]
		sum2 += this._sequence[i+1][1]
	}
	
}


//Scene Battle Modifications to handle QTE input
var _Astfgl_newSBCAW = Scene_Battle.prototype.createAllWindows
Scene_Battle.prototype.createAllWindows = function() {
	_Astfgl_newSBCAW.call(this)
	this.createQTEWindow()
};

Scene_Battle.prototype.createQTEWindow = function() {
	this._QTEWindow = new Window_QTE;
	this._QTEWindow.visible = false;
    this.addWindow(this._QTEWindow);
}

var _Astfgl_newSBIAIWA = Scene_Battle.prototype.isAnyInputWindowActive
Scene_Battle.prototype.isAnyInputWindowActive = function() {
	return _Astfgl_newSBIAIWA.call(this) || this._QTEWindow.active
};

//BattleManager modifications
var _Astfgl_newBMIB = BattleManager.isBusy
BattleManager.isBusy = function() {
	return _Astfgl_newBMIB.call(this) || (SceneManager._scene._QTEWindow.getResult() === "start")
};

var _Astfgl_newBMEA = BattleManager.endAction
BattleManager.endAction = function() {
	_Astfgl_newBMEA.call(this);
	$gameMap.clearQTE();
};

//Scene_Map modifications
var _Astfgl_newSMCAW = Scene_Map.prototype.createAllWindows
Scene_Map.prototype.createAllWindows = function() {
	_Astfgl_newSMCAW.call(this);
	this.createQTEWindow();
};

Scene_Map.prototype.createQTEWindow = function() {
	this._QTEWindow = new Window_QTE;
	this.addChild(this._QTEWindow);
	//this._QTEWindowIndex = this.children.length - 1;
	this._QTEWindow.visible = false;
}

var _Astfgl_newSMIB = Scene_Map.prototype.isBusy
Scene_Map.prototype.isBusy = function() {
	return _Astfgl_newSMIB.call(this) || this._QTEWindow.getResult() === "start"
};

//GameMap call to start QTE
Game_Map.prototype.QTE = function(mode,duration,sequence,visible,x,y,opacity,width,height,wrongInput,showTime) {
	var qte = SceneManager._scene._QTEWindow
	if (mode[0] === "free") {
		sequence = [];
		qte._currInputs = 0;
		width = mode[1];
		qte._itemNumber = width;
	}
	if (mode[0] === "rythm") {
		var b = 0;
		qte._inputs=[]
		for (var i = 0; i < sequence.length; i++) {
			b += sequence [i][1]
			qte._inputs.push(false)
		}
		duration = b;
		qte._increment = mode[1];
	}
	qte.setSequence(sequence);
	qte._duration = duration;
	qte._maxDuration = duration;
	qte._endDur = eval(PluginManager.parameters("QTEWindow").EndingDuration);
	qte._ending = false;
	if (visible) {
		qte.show()
	};
	qte.startSequence(mode);
	if (SceneManager._scene instanceof Scene_Battle) {
		qte.activate();
	}
	if (x !== undefined) {qte.x = x};
	if (y !== undefined) {qte.y = y};
	if (width !== undefined) {qte.width = width * 48 + 20; qte._itemNumber = width};
	if (height !== undefined) {qte.height = height}
	if (wrongInput !== undefined) {qte._wrongInput = wrongInput}
	if (showTime !== undefined) {qte._showTime = showTime}
	if (opacity !== undefined) {qte.opacity = opacity};
	//if (SceneManager._scene instanceof Scene_Map) {}
}

Game_Map.prototype.clearQTE = function() {
	var qte = SceneManager._scene._QTEWindow
	qte.clear();
}

Game_Map.prototype.getQTEResult = function() {
	var qte = SceneManager._scene._QTEWindow
	return qte.getResult()
}

//GameMap calls to set options
Game_Map.prototype.setQTEpos = function(x,y) {
	var qte = SceneManager._scene._QTEWindow;
	qte.x = x;
	qte.y = y;
}

Game_Map.prototype.setQTEopacity = function(x) {
	var qte = SceneManager._scene._QTEWindow;
	qte.opacity = x;
}

Game_Map.prototype.setQTEdim = function(width,height) {
	var qte = SceneManager._scene._QTEWindow;
	qte.width = width;
	qte.height = height;
}

Game_Map.prototype.setQTEfail = function(bool) {
	var qte = SceneManager._scene._QTEWindow;
	qte._wrongInput = bool;
}

Game_Map.prototype.setQTEtime = function(mode) {
	var qte = SceneManager._scene._QTEWindow;
	qte._showTime = mode;
}

Game_Map.prototype.setQTEsound = function(bool) {
	var qte = SceneManager._scene._QTEWindow;
	qte._sound = bool
}

Game_Map.prototype.setOcarina = function(bool,bool2) {
	var qte = SceneManager._scene._QTEWindow;
	qte._ocarina = [bool,bool2];
	if (bool2) {
		qte.height = 8 * 36;
	}
}

//GameMap call to match qte input to skill sequence meta
Game_Map.prototype.getSkillMatch = function(actorId,seq) {
	var actor = $gameActors.actor(actorId);
	var sequence = seq || $gameMap.getQTEResult();
	var skills = actor.skills()
	var qteSkills = [[]];
	var meta;
	for (var i = 0; i < skills.length; i ++) {
		if (skills[i].meta.qteSeq) {
			qteSkills[0].push(skills[i])
		}
	}

	for (var ii = 0; ii < sequence.length; ii++) { //for the length of the sequence
		qteSkills.push([])
		for (i = 0; i < qteSkills[ii].length; i++) {
			if (eval(qteSkills[ii][i].meta.qteSeq)[ii] === sequence[ii]) {
			qteSkills[ii+1].push(qteSkills[ii][i]);
			}
		}
	}
	var result = []
	for (i = 0; i < qteSkills[qteSkills.length-1].length; i++) {
		if (eval(qteSkills[qteSkills.length-1][i].meta.qteSeq).length === sequence.length) {
		result.push(qteSkills[qteSkills.length-1][i])
		}
	}
	if (result[0]) {
		return result[0].id
	} else {
		if (SceneManager._scene instanceof Scene_Battle) {
			SceneManager._scene._logWindow.displayNoMatch()
		}
		return "no match found"
	}

}

Game_Map.prototype.getSkillNameFromMatch = function(id) {
	if (id !== "no match found") {
		return $dataSkills[id].name
	} else {
		return " "
	}
}

Game_Map.prototype.castSkillMatch = function(user,target,id) {
	var targetIndex
	if (target instanceof Game_Actor) {
		targetIndex = $gameParty.battleMembers().indexOf(target)
	} else if (target instanceof Game_Enemy) {
		targetIndex = $gameTroop.members().indexOf(target)
	}
	var match = $gameMap.getSkillMatch(user._actorId)
	if (match !== "no match found") {
		user.forceAction(match, target);
	} else if (id !== 0) {
		user.forceAction(id, target);
	}
}

Game_Map.prototype.castSandSM = function(user,target,actionAr,actionId) { //This command Requires YEP Battle Engine Core
	var seq = $gameMap.getQTEResult();
	$gameMap.castSequence(user,target,actionAr);
	SceneManager._scene._QTEWindow._result = seq
	var targetIndex
	if (target instanceof Game_Actor) {
		targetIndex = $gameParty.battleMembers().indexOf(target)
	} else if (target instanceof Game_Enemy) {
		targetIndex = $gameTroop.members().indexOf(target)
	}
	var match = $gameMap.getSkillMatch(user._actorId)
	if (match !== "no match found") {
		BattleManager.queueForceAction(user, match, target);
	} else if (actionId !== 0) {
		BattleManager.queueForceAction(user, actionId, target);
	}
}

Game_Map.prototype.trySequence = function(user,target,minInputs,maxInputs) { //This command Requires YEP Battle Engine Core
	var seq = $gameMap.getQTEResult();
	var maxIndex = seq.length - 1;
	minInputs = minInputs || 1;
	maxInputs = maxInputs || seq.length;
	var start = minInputs;
	var length = seq.length
	var start = minInputs;
	var matches = [];
	var match = 0
	for (start; start <= maxInputs; start ++) {
		for (var i = 0; i < length; i++) {
			var curSeq = [];
			for (var ii = 0; ii < start; ii++) {
				if (ii + i <= maxIndex) {
					curSeq.push(seq[ii + i]);
				} else {
					break;
				}
			}
			if (curSeq.length === start) {
				matches.push(curSeq);
			}
		}
	}
	for (i = 0; i < matches.length; i++) {
		match = $gameMap.getSkillMatch(user._actorId,matches[i])
		if (match !== "no match found") {
			BattleManager.queueForceAction(user, match, target);
		}
	}
}

//Game Map call to make a random sequence
Game_Map.prototype.randomSequence = function(length) {
	var inputs = ["up","down","left","right","ok","cancel"]
	for (var i = 1; i < arguments.length; i++) {
		for (var ii = 0; ii < inputs.length; ii++) {
			if (inputs[ii] === arguments[i]) {
				inputs.splice(ii,1)
			}
		}
	}
	var seq = []
	for (i = 0; i < length; i++) {
		var rand = Math.floor(Math.random()*(inputs.length));
		seq.push(inputs[rand]);
	}
	return seq
}


//Game Map call to cast a sequence by input
Game_Map.prototype.castSequence = function(user,target,actionAr) { //This command Requires YEP Battle Engine Core
	var v = function(id) {
		return $gameVariables.value(id);
	}
	var actionUp = eval(actionAr[0]);
	var actionDw = eval(actionAr[1]);
	var actionLe = eval(actionAr[2]);
	var actionRi = eval(actionAr[3]);
	var actionOk = eval(actionAr[4]);
	var actionCa = eval(actionAr[5]);
	var seq = $gameMap.getQTEResult();
	var actionId = 0;
	var targetIndex = 0;
	var actions = [];
	for (var i = 0; i < seq.length; i ++) {
		if (seq[i] === "up") {
			actionId = actionUp
		} else if (seq[i] === "down") {
			actionId = actionDw;
		} else if (seq[i] === "left") {
			actionId = actionLe
		} else if (seq[i] === "right") {
			actionId = actionRi
		} else if (seq[i] === "ok") {
			actionId = actionOk
		} else if (seq[i] === "cancel") {
			actionId = actionCa
		}
		if (target instanceof Game_Actor) {
			targetIndex = $gameParty.battleMembers().indexOf(target)
		} else if (target instanceof Game_Enemy) {
			targetIndex = $gameTroop.members().indexOf(target)
		}
		BattleManager.queueForceAction(user, actionId, target); //this doesn't exist outside the battle core
	}
}

//Game Interpreter Modifications to wait for the QTE to finish
var _Astfgl_newGIUWM = Game_Interpreter.prototype.updateWaitMode
Game_Interpreter.prototype.updateWaitMode = function() {
	return _Astfgl_newGIUWM.call(this) || (SceneManager._scene._QTEWindow.getResult() === "start") 
	//start = qte window running, we don't want game interpreter to progress until qte is finished
}

//Battle Log window modification to show no match found and wrong Input.
Window_BattleLog.prototype.displayQTEFailure = function(target) {
	if (eval(PluginManager.parameters("QTEWindow").DisplayFailText)) {
		var failText = PluginManager.parameters("QTEWindow").FailText
		this.push('addText', failText);
	}
}

Window_BattleLog.prototype.displayNoMatch = function(target) {
	if (eval(PluginManager.parameters("QTEWindow").DisplayNoMatchText)) {
		var failText = PluginManager.parameters("QTEWindow").NoMatchText
		this.push('addText', failText);
	}
}

//End