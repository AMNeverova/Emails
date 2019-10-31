class EventHandler {
    constructor() {
        this.handlers = {};
    }
    on(event, fn) {
        if (!this.handlers[event]) {
            this.handlers[event] = new Array(fn);
        } else if (this.handlers[event].indexOf(fn) == -1) {
            this.handlers[event].push(fn)
        }
    }
    off(event, fn) {
        if (this.handlers[event] && this.handlers[event].length === 1) {
            delete this.handlers[event];
        } else {
            this.handlers[event].splice(this.handlers[event.indexOf(fn)], 1)
        }
    }
    trigger(event, ...args) {
        if (!this.handlers[event]) {
            return;
        }
        this.handlers[event].forEach(handler => {
            handler.call(...args)
        })
    }
}

export default EventHandler;
