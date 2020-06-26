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

import { Vue } from "vue-property-decorator";

/**
 * A component extending this class will have available a function
 * able to update a loading flag `isLoading` that can be used during
 * rendering to update a loader component
 */
export default class LoaderAware extends Vue {
  private isLoading: boolean = false;

  /**
   * This function receives another function as parameter. It sets the
   * isLoading flag to true before executing the function and it set its
   * to false once the execution has finished.
   *
   * @param fn the function executed
   */
  public execWithLoaderAwareness(fn: () => any) {
    this.isLoading = true;
    try {
      fn();
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
}
