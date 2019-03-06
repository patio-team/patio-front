#!/usr/bin/env python

import os
import sys
from pathlib import Path


TS_LICENSE = """/*!
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

{data}"""
TS_CONTAIN_TEXT = "This file is part of Dont Worry Be Happy (DWBH)."

VUE_LICENSE = """<!--
 Copyright (C) 2019 Kaleidos Open Source SL

 This file is part of Dont Worry Be Happy (DWBH).
 DWBH is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 DWBH is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
-->

{data}"""
VUE_CONTAIN_TEXT = "This file is part of Dont Worry Be Happy (DWBH)."

CSS_LICENSE = """/*
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

{data}"""
CSS_CONTAIN_TEXT = "This file is part of Dont Worry Be Happy (DWBH)."

PUG_LICENSE = """//-
  Copyright (C) 2019 Kaleidos Open Source SL

  This file is part of Dont Worry Be Happy (DWBH).
  DWBH is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  DWBH is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with DWBH.  If not, see <https://www.gnu.org/licenses/>.

{data}"""
PUG_CONTAIN_TEXT = "This file is part of Dont Worry Be Happy (DWBH)."


BASE_DIR = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
DIRS = [
    os.path.join(BASE_DIR, "src"),
]


def proccess_dirs(path, FILE_EXT, LICENSE, CONTAIN_TEXT):
    exit = 0

    print(f' > Checking license prephace for "{FILE_EXT}" files.')
    for root, dirs_list, files_list in os.walk(path):
        for file_name in filter(lambda f: f.endswith(FILE_EXT), files_list):
            file_path = os.path.join(root, file_name)

            with open(file_path, "r") as fr:
                data = fr.read()

                if CONTAIN_TEXT not in data:
                    relative_path = Path(file_path).relative_to(BASE_DIR)
                    with open(file_path, "w") as fw:
                        fw.seek(0)
                        fw.write(LICENSE.format(data=data))
                    print(f'    \033[1;31m!! ERROR\033[0;0m Added license prephace to {relative_path}')
                    exit = 1
    return exit


if __name__ == "__main__":
    ex_status = 0
    for dir_path in DIRS:
        ex_status += proccess_dirs(dir_path, '.ts', TS_LICENSE, TS_CONTAIN_TEXT)
        ex_status += proccess_dirs(dir_path, '.vue', VUE_LICENSE, VUE_CONTAIN_TEXT)
        ex_status += proccess_dirs(dir_path, '.pug', PUG_LICENSE, PUG_CONTAIN_TEXT)
        ex_status += proccess_dirs(dir_path, '.css', CSS_LICENSE, CSS_CONTAIN_TEXT)

    sys.exit(ex_status)
