declare const allowedLogLevel: readonly ['log', 'warn', 'error'];
type LogLevel = (typeof allowedLogLevel)[number];
type Next = (action: ReduxAction) => void;
interface DefaultOptions {
  fatal: boolean;
  logLevel: LogLevel;
  payloadKey: string;
}
interface ReduxAction {
  target?: string;
  [key: string]: unknown;
}
interface Store {
  getState: () => State;
}
interface State {
  [key: string]: unknown;
}
declare const checkDuplicateDispatch: (
  options: DefaultOptions | boolean
) => (store: Store) => (next: Next) => (action: ReduxAction) => void;
export default checkDuplicateDispatch;
