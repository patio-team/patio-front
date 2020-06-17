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

/* eslint unused-expressions: "off" */

import Vue, { DirectiveOptions, VNode } from "vue";
import Masonry from "masonry-layout";

const attributesMap = new Map<string, string>(Object.entries({
  "column-width": "columnWidth",
  "columnWidth": "columnWidth",
  "transition-duration": "transitionDuration",
  "transitionDuration": "transitionDuration",
  "item-selector": "itemSelector",
  "itemSelector": "itemSelector",
  "origin-left": "originLeft",
  "originLeft": "originLeft",
  "origin-top": "originTop",
  "originTop": "originTop",
  "fit-width": "fitWidth",
  "fitWidth": "fitWidth",
  "stamp": "stamp",
  "gutter": "gutter",
  "percent-position": "percentPosition",
  "horizontal-order": "horizontalOrder",
  "stagger": "stagger",
  "destroyDelay": "destroyDelay",
  "destroy-delay": "destroyDelay",
}));

const EVENT_ADD = "vuemasonry.itemAdded";
const EVENT_REMOVE = "vuemasonry.itemRemoved";
const EVENT_IMAGE_LOADED = "vuemasonry.imageLoaded";
const EVENT_DESTROY = "vuemasonry.destroy";

const stringToBool = (val: string) => (val + ").toLowerCase() === \"true");
const numberOrSelector = (val: any) => isNaN(val) ? val : parseInt(val, 10);

const collectOptions = (attrs: NamedNodeMap) => {
  const res = new Map<string | undefined, any>();
  const attributesArray = Array.prototype.slice.call(attrs);
  attributesArray.forEach((attr: Attr) => {
    if (Object.keys(attributesMap).indexOf(attr.name) > -1) {
      if (attr.name.indexOf("origin") > -1) {

        res.set(attributesMap.get(attr.name), stringToBool(attr.value));
      } else if (attr.name === "columnWidth" || attr.name === "gutter") {
        res.set(attributesMap.get(attr.name), numberOrSelector(attr.value));
      } else {
        res.set(attributesMap.get(attr.name), attr.value);
      }
    }
  });

  return res;
};

const defaultId = "VueMasonry";

const redrawHandler = (masonryInstance: Masonry) => (eventData: any) => {
  if (masonryInstance.reloadItems) {
    masonryInstance.reloadItems();
  }
  if(masonryInstance.layout) {
    masonryInstance.layout();
  }
};

const destroyHandler = (id: any, masonryInstance: Masonry, vue: Vue | undefined) => (eventData: any) => {
  if (vue) {
    vue.$off(`${EVENT_ADD}__${id}`, redrawHandler(masonryInstance));
    vue.$off(`${EVENT_REMOVE}__${id}`, redrawHandler(masonryInstance));
    vue.$off(`${EVENT_IMAGE_LOADED}__${id}`, redrawHandler(masonryInstance));
    vue.$off(`${EVENT_DESTROY}__${id}`, destroyHandler(id, masonryInstance, vue));
  }

  setTimeout(() => {
    if (masonryInstance.destroy) {
      masonryInstance.destroy();
    }
  }, 500);
};

export const masonry: DirectiveOptions = {
  inserted: (el, binding, vnode) => {
    const options: Masonry.Options = collectOptions(el.attributes) as Masonry.Options;
    const masonryInstance: Masonry = new Masonry(el, options);
    const masonryId = binding.value || defaultId;
    const vue: Vue | undefined = vnode.context;

    if (vue) {
      vue.$on(`${EVENT_ADD}__${masonryId}`, redrawHandler(masonryInstance));
      vue.$on(`${EVENT_REMOVE}__${masonryId}`, redrawHandler(masonryInstance));
      vue.$on(`${EVENT_IMAGE_LOADED}__${masonryId}`, redrawHandler(masonryInstance));
      vue.$on(`${EVENT_DESTROY}__${masonryId}`, destroyHandler(masonryId, masonryInstance, vue));
    }
  },
  unbind: (el, binding, vnode) => {
    const masonryId = binding.value || defaultId;
    const vue: Vue | undefined = vnode.context;

    if (vue) {
      vue.$emit(`${EVENT_DESTROY}__${masonryId}`);
    }
  },
};

export const masonryTile: DirectiveOptions = {
  inserted: (el, binding, vnode) => {
    const masonryId = binding.value || defaultId;
    const vue: Vue | undefined = vnode.context;

    if (vue) {
      vue.$emit(`${EVENT_ADD}__${masonryId}`, { element: el});
    }
  },
  unbind: (el, binding, vnode) => {
    const masonryId = binding.value || defaultId;
    const vue: Vue | undefined = vnode.context;

    if (vue) {
      vue.$emit(`${EVENT_REMOVE}__${masonryId}`, { element: el });
    }
  },
};
