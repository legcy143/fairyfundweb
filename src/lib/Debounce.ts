type DebounceFunction = (...args: any[]) => void;

export default function Debounce<T extends (...args: any[]) => void>(func: T, delay: number = 1000): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
