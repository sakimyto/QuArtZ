const DEBUG_MODE = true;

export default function trace(...args: unknown[]): void {
  if (DEBUG_MODE && window.console && typeof window.console.log !== 'undefined') {
    let str = '';
    if (args.length > 0) str = args.join(', ');

    console.log(str);
  }
}
