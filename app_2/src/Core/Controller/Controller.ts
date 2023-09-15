export abstract class Controller {
  connect(...args: unknown[]) {
    args;
    throw new Error("connect controller is not implemented ");
  }
  disconnect() {
    throw new Error("disconnect controller is not implemented ");
  }
}
