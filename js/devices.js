function Key() {
    this.init();
}
Key.prototype = {
    pressState: false,
    init: function () {},
    destroy: function () {},
    isPressed: function () {
        return this.pressState;
    },
    press: function() {
        this.pressState = true;
    },
    release: function() {
        this.pressState = false;
    }
}

function Device() {
    this.init();
}
Device.prototype = {
    keys: {},
    init: function () {},
    destroy: function () {},
    key: function (keyCode) {
        if(!(keyCode in this.keys)) {
            this.keys[keyCode] = Key();
        }
        
        return this.keys[keyCode];
    }
}

// API:
// devices.mouse.key('left').press()
// devices.mouse.key('left').isPressed()
// true
// devices.mouse.key('left').release()
// devices.mouse.key('left').isPressed()
// false

// TODO: replace key access with [] (ie. ['left'])
function Devices() {
    this.init();
}
Devices.prototype = {
    init: function () {
        this.mouse = Device();
        this.keyboard = Device();
    },
    destroy: function () {},
    initMouse: function () {
        this.mouse = {};
        mouseButtons = ['left', 'middle', 'right'];

        for(var i = 0; i < mouseButtons.length; i++) {
            mouseButton = mouseButtons[i];

            this.mouse[mouseButton] = {'pressed': false};
        }
    },
    initKeyboard: function () {
        this.keyboard = {};
        // String.fromCharCode();
    }
}
