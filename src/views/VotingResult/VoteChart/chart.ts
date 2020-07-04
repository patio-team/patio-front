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


/**
 * Y axis common attributes
 */
const commonYAxisStyle = {
  align: "center",
  verticalAlign: "middle",
  fontSize: 24,
  fontFamily: "Lato",
  fontWeight: "normal",
  borderRadius: 20,
  height: 10,
  padding: 3,
  width: 10,
};

export const options = {
  visualMap: [{
      type: "continuous",
      show: false,
      min: 1,
      dimension: 2,
      max: 5,
      seriesIndex: 0,
      symbolSize: [30, 100],
      inRange: {
        color: [
          "#fe346e",
          "#ff7473",
          "#ffc952",
          "#98ddab",
          "#3fe3d2",
        ],
      },
  }],
  grid: {
    backgroundColor: "white",
    height: "90%",
    width: "105%",
    left: "-3%",
    top: "2%",
    bottom: "0%",
  },
  xAxis: [{
    splitLine: {
      show: true,
    },
    axisPointer: {
      show: true,
      lineStyle: {
        width: 2,
        color: "#948FB7",
      },
      label: {
        backgroundColor: "#948FB7",
        color: "#FFFFFF",
        fontFamily: "Lato",
        fontSize: 16,
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "#c3c1d7",
      },
    },
    axisLabel: {
      color: "#34314C",
      fontFamily: "Lato",
      fontSize: 16,
      showMinLabel: false,
      showMaxLabel: false,
    },
    boundaryGap: false,
    type: "category",
  }, {
      axisPointer: {
      show: false,
    },
    type: "category",
    show: false,
  }],
  yAxis: [{
    minInterval: 1,
    maxInterval: 1,
    axisTick: {
      show: false,
    },
    min: 1,
    max: 5,
    axisLabel: {
      fontFamily: "Lato",
      formatter: (value: number) => {
        return value < 1 ? "" : "{" + value + "|" + value + "}";
      },
      color: "#34314C",
      rich: {
        1: {
          backgroundColor: "rgba(254, 52, 110, 0.5)",
          ...commonYAxisStyle,
        },
        2: {
          backgroundColor: "rgba(255, 116, 115, 0.5)",
          ...commonYAxisStyle,
        },
        3: {
          backgroundColor: "rgba(255, 201, 82, 0.5)",
          ...commonYAxisStyle,
        },
        4: {
          backgroundColor: "rgba(152, 221, 171, 0.5)",
          ...commonYAxisStyle,
        },
        5: {
          backgroundColor: "rgba(63, 227, 210, 0.5)",
          ...commonYAxisStyle,
        },
      },
    },
  }, {}],
};
