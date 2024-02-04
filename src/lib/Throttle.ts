type ThrottleFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

export default function Throttle<T extends (...args: any[]) => void>(func: T, interval: number): ThrottleFunction<T> {
  let lastExecutionTime = 0;
  let inThrottle = false;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now();

    if (!inThrottle) {
      func.apply(this, args);
      lastExecutionTime = now;
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, interval);
    } else if (now - lastExecutionTime >= interval) {
      func.apply(this, args);
      lastExecutionTime = now;
    }
  };
}
