type Func = (...args: unknown[]) => void;
class TimeTask {
	protected timeout = 1000;
	protected tasks: Func[] = [];
	protected running: boolean = false;
	private timer: number | null = null;
	constructor(timeout: number) {
		this.timeout = timeout;
	}
	addTask(task: Func) {
		this.tasks.push(task);
		return this;
	}
	removeTask(task: Func) {
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
	protected step() {
		this.perform();
		this.timer = window.setTimeout(() => {
			this.step();
		}, this.timeout);
	}
	start() {
		if (this.running) return;
		this.running = true;
		this.step();
		return this;
	}
	stop() {
		if (!this.running) return;
		this.running = false;
		this.timer && window.clearTimeout(this.timer);
		return this;
	}

	destroy() {
		this.stop();
		this.clearTask();
	}
}

export default TimeTask