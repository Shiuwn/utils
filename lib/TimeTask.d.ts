declare type Func = (...args: unknown[]) => void;
declare class TimeTask {
    protected timeout: number;
    protected tasks: Func[];
    protected running: boolean;
    private timer;
    constructor(timeout: number);
    addTask(task: Func): this;
    removeTask(task: Func): this;
    clearTask(): void;
    perform(): this;
    protected step(): void;
    start(): this | undefined;
    stop(): this | undefined;
    destroy(): void;
}
export default TimeTask;
