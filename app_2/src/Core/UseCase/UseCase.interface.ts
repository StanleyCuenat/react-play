export default interface UseCase {
  invoke: (...args: never[]) => unknown;
}
