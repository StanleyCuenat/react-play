export type Callback<T> = (data: T) => void;

export class Presenter<T> {
  private _data: T;
  private listener?: Callback<T>;
  constructor(source: T) {
    this._data = source;
  }

  set(data: T) {
    this._data = data;
    this.listener && this.listener(this._data);
  }

  get(): T {
    return this._data;
  }

  setListener(cb: Callback<T>) {
    this.listener = cb;
    this.listener(this._data);
  }

  removeListener() {
    this.listener = undefined;
  }
}
