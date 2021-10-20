/* MULTIFUNCTIONAL NUMPAD
 * Can be used for simply typing a number or for entering a PIN-code without a keyboard.
 * The value typed by the user gets stored as the value of the invisible input element with the id 'numpad-input'
 * If you want to use only one of the possible functions, simply exclude the parts of the code that contains the other one.
 * Includes functions for disabling/enabling the numpad buttons
 * Note: in normal mode, zero won't be displayed if it is the first number. You can delete this functionality if you need zeros at the beginning of a number.
 */

var numpad = {
	mode: 'normal',
	
	generate() {
	/* this function puts the numpad in the designated div */
		var html=`
			<div id='numpad-wrapper'>
				<div class='num_row'>
					<div class='num_btn num_btn_num' id='btn_1' onclick="numpad.num('1')">1</div>
					<div class='num_btn num_btn_num' id='btn_2' onclick="numpad.num('2')">2</div>
					<div class='num_btn num_btn_num' id='btn_3' onclick="numpad.num('3')">3</div>
				</div>
				<div class='num_row'>
					<div class='num_btn num_btn_num' id='btn_4' onclick="numpad.num('4')">4</div>
					<div class='num_btn num_btn_num' id='btn_5' onclick="numpad.num('5')">5</div>
					<div class='num_btn num_btn_num' id='btn_6' onclick="numpad.num('6')">6</div>
				</div>
				<div class='num_row'>
					<div class='num_btn num_btn_num' id='btn_7' onclick="numpad.num('7')">7</div>
					<div class='num_btn num_btn_num' id='btn_8' onclick="numpad.num('8')">8</div>
					<div class='num_btn num_btn_num' id='btn_9' onclick="numpad.num('9')">9</div>
				</div>
				<div class='num_row'>
					<div class='num_btn' id='btn_clr' onclick="numpad.clear()">C</div>
					<div class='num_btn num_btn_num' id='btn_0' onclick="numpad.num('0')">0</div>
					<div class='num_btn' id='btn_bck' onclick="numpad.backspace()">&#8592</div>
				</div>
				<div class='num_row'>
					<div class='num_btn' id='btn_ok' onclick='numpad.submit()'>OK</div>
				</div>
			</div>
		`;
		
		document.querySelector('#numpad').insertAdjacentHTML('beforeend', html);
		document.querySelector('#numpad-input').value = '';
	},
	
	hide() {
	/* this function hides the numpad but does not reset the hidden input that stores the entered value */
		document.querySelector('#numpad').removeChild(document.querySelector('#numpad-wrapper'));
	},
	
	num(btn) {
		//adding the number to the value
		var num_string = document.querySelector('#numpad-input').value.toString();
	
		if(numpad.mode === 'normal') {
			//in normal mode
			if(document.querySelector('#numpad-input').value.length > 0 || btn != '0') {
				document.querySelector('#numpad-input').value = num_string + btn;
			}
		} else if(numpad.mode === 'pin') {
			//in PIN mode
			if(document.querySelector('#numpad-input').value.length < 4) {
				document.querySelector('#numpad-input').value = num_string + btn;
			}
		}
		
		//refreshing the display
		numpad.refreshDisplay();
	
		numpad.btnPushed();
	},
	
	backspace() {
		//removing the last character from the end of the value
		var num_string = document.querySelector('#numpad-input').value.toString();
		document.querySelector('#numpad-input').value = num_string.substring(0, num_string.length - 1);
		
		//refreshing the display
		numpad.refreshDisplay();
	
		//triggering the 'button pushed' function
		numpad.btnPushed();
	},
	
	clear() {
		//removing the value
		document.querySelector('#numpad-input').value = '';
		
		//refreshing the display
		numpad.refreshDisplay();
	},
	
	refreshDisplay() {
	/* rendering the display up-to-date after the value has changed */
		var display = '';
		
		if(numpad.mode === 'normal') {
			display = document.querySelector('#numpad-input').value;
		} else if(numpad.mode === 'pin') {
			for (i = 0; i < document.querySelector('#numpad-input').value.length; i++) {
				display += '*';
			}
		}
		document.querySelector('#numpad-display').innerHTML = display;
	},
	
	disable() {
	/* if you need to temporarily disable the numpad but still keep it on the screen */
		document.querySelector('.numpad-num').setAttribute('onclick', '');
		document.querySelector('.numpad-bck').setAttribute('onclick', '');
		document.querySelector('.numpad-btn').classList.add('numpad_frozen-btn');
		document.querySelector('.numpad-bck').classList.add('numpad_frozen-bck');
	},
	
	enable() {
		//enabling numpad buttons 
		for(i = 0; i < 10; i++) {
			document.querySelector(`#btn_${i}`).setAttribute('onclick', `numpad.num(${i})`);
		}
		document.querySelector('.numpad-bck').setAttribute('onclick', 'numpad.backspace()');
		
		document.querySelector('.numpad-btn').classList.remove('numpad_frozen-btn');
		document.querySelector('.numpad-bck').classList.remove('numpad_frozen-bck');
	},
	
	btnPushed() {
	/* put functionality here if you want to render a function to the event of pushing a button - e.g. restoring a timer to the initial value */
	},
	
	submit() {
	/* put functionality here if you want the confirmation of the number to trigger a function */
	},
	
	changeMode() {
	/* switching back and fortg between the normal and PIN modes */
		var radios = document.getElementsByName('mode');
		
		radios.forEach(function(el) {
			if(el.checked) {
				numpad.mode = el.getAttribute('value');
			}
		});
		
		numpad.clear();
	}
};