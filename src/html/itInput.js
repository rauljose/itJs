
/**
 * Attach an event listener that will run once to a given element
 * @usage one("id", "click", functionName); function functionName(clickEvent) {}
 *
 * @param {string|object} elementOrId - The id, or dom element, of the element to attach the event listener to
 * @param {string} event - The event type to listen for
 * @param {Function} callback - The callback function to execute when the event is fired
 */
function one(elementOrId, event, callback) {
    let element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
    element.addEventListener(event, function handler(ev) {
        ev.currentTarget.removeEventListener(ev.type, handler);
        callback(ev);
    });
}

/**
 * The listener's callback will only be called once every delayMilliSeconds,
 * repeated events will be ignored until delayMilliseconds have elapsed
 *
 * @param {string|object} elementOrId - The ID or dom object of the element to attach the event listener to.
 * @param {string} event - The event type to listen for.
 * @param {function} callback - The callback function to be called when the event is triggered.
 * @param {number} [delayMilliSeconds=500] - The delay in milliseconds before invoking the callback function.
 */
function eventListenerThrottled(elementOrId, event, callback, delayMilliSeconds = 500) {
    let element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
    let throttledCallback = this.throttle(callback, delayMilliSeconds);
    element.addEventListener(event, throttledCallback);
}

/**
 * Retrieves or sets the value of a radio button with the specified name.
 *
 * @param {string} name - The name of the radio button group.
 * @param {string} [value] - The value to set for the radio button, if defined.
 * @returns {*} If no value is provided, returns the value of the selected radio button.
 *               If a value is provided, returns undefined.
 */
function radioButtonValue(name, value) {
    if(typeof value === 'undefined')
        return (document.querySelector(`input[name='${name}']:checked`) || {}).value || undefined;
    (document.querySelector(`input[name='${name}'][value='${value}']`) || {}).checked=true;
}


function registerTextInputHandlers() {
    let textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(input) {
        input.removeEventListener('keydown', textInputHandler, true);
        input.addEventListener('keydown', textInputHandler, true);
    });
}
/*
    // type: email, color, number, ....
    switch(el.type) {
        case 'text':
            e.stopPropagation();
            // special cases: autonumeric
            el.value = el.defaultValue;
        case 'radio':
            e.stopPropagation();
            const radios = document.getElementsByName(el.name);
            radios.forEach(radio => { radio.checked = radio.defaultChecked; });
            break;
        case 'checkbox':
            e.stopPropagation();
            el.checked = el.defaultChecked;
            break;
    }
 */
function textInputHandler(e) {
    let el = e.target;
    switch(e.key) {
        case 'Escape':
            if(typeof el.defaultValue === 'string') {
                e.stopPropagation();
                el.value = el.defaultValue;
                return;
            }
        break;
        case 'Enter':
            e.preventDefault();
            e.stopPropagation();
            let allFocusableElements = Array.from(document.querySelectorAll('input,select,textarea,button,[tabindex="0"]'));
            let currentIndex = allFocusableElements.indexOf(el);
            if(e.shiftKey) {
                if(currentIndex > 0)
                    allFocusableElements[currentIndex - 1].focus();
            } else {
                if(currentIndex >= 0 && currentIndex < allFocusableElements.length - 1)
                    allFocusableElements[currentIndex + 1].focus();
            }
    }
}
