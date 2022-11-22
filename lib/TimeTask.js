"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeTask {
    constructor(timeout) {
        this.timeout = 1000;
        this.tasks = [];
        this.running = false;
        this.timer = null;
        this.timeout = timeout;
    }
    addTask(task) {
        this.tasks.push(task);
        return this;
    }
    removeTask(task) {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
        return this;
    }
    clearTask() {
        this.tasks.length = 0;
    }
    perform() {
        this.tasks.slice().forEach((task) => task());
        return this;
    }
    step() {
        this.perform();
        this.timer = window.setTimeout(() => {
            this.step();
        }, this.timeout);
    }
    start() {
        if (this.running)
            return;
        this.running = true;
        this.step();
        return this;
    }
    stop() {
        if (!this.running)
            return;
        this.running = false;
        this.timer && window.clearTimeout(this.timer);
        return this;
    }
    destroy() {
        this.stop();
        this.clearTask();
    }
}
exports.default = TimeTask;
