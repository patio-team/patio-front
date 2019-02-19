abstract class AbstractStorageManager {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public get(key: string) {
    return JSON.parse(this.storage.getItem(key) || "");
  }

  public set(key: string, newValue?: {}) {
    this.storage.setItem(
      key,
      JSON.stringify(newValue),
    );

    return newValue;
  }

  public remove(key: string) {
    this.storage.removeItem(key);

    return true;
  }

  public clear() {
    this.storage.clear();

    return true;
  }
}

class LocalStorageManager extends AbstractStorageManager {
  constructor() {
    super(window.localStorage);
  }
}

class SessionStorageManager extends AbstractStorageManager {
  constructor() {
    super(window.sessionStorage);
  }
}

export const localStorage = new LocalStorageManager();
export const sessionStorage = new SessionStorageManager();
