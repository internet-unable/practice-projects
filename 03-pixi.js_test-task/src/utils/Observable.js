import { EventEmitter } from "pixi.js";

export default class Observable extends EventEmitter {
    subscribe(event, listener) {
        this.on(event, listener);
    }

    unsubscribe(event, listener) {
        this.off(event, listener);
    }

    notify(event, data) {
        this.emit(event, data);
    }
}