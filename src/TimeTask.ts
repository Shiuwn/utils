type Func = (...args: unknown[]) => void;
export interface TaskUnit {
  context: any,
  callback: (context: any) => void
}
const isObject = (target: any) => Object.prototype.toString.call(target) === '[object Object]'
class TimeTask {
  protected timeout = 1000;
  protected tasks: (Func | TaskUnit)[] = [];
  protected running: boolean = false;
  private timer: number | null = null;
  constructor(timeout: number) {
    this.timeout = timeout;
  }
  addTask(task: Func | TaskUnit) {
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
    this.tasks.slice().forEach((task) => {
      if (typeof task === 'function') {
        task()
      } else if (isObject(task)) {
        task.callback?.(task.context)
      }
    });
    return this;
  }
  protected step() {
    this.perform();
    this.timer = setTimeout(() => {
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