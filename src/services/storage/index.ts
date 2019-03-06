/*!
 * Copyright (C) 2019 Kaleidos Open Source SL
 *
 * This file is part of Dont Worry Be Happy (DWBH).
 * DWBH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DWBH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
 */

abstract class AbstractStorageManager {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public get(key: string) {
    try {
      return JSON.parse(this.storage.getItem(key) || "");
    } catch (error) {
      return undefined;
    }
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
