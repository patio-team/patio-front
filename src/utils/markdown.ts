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

import marked from "marked";
import { sanitize } from "dompurify";
import hljs from "highlight.js";

import "highlight.js/styles/railscasts.css";

marked.setOptions({ highlight: (code, lang, callback) => {
  try {
    return hljs.highlight(lang, code).value;
  } catch (e) {
    // Disabled auto mode, to enable it:
    //
    //   return hljs.highlightAuto(code).value;
    //
    return code;
  }
}});

export const fromMarkdownToHtml = (input: string) =>
  sanitize(marked(input));
