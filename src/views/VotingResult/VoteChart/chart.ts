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
  autoresize: true,
  grid: {
    backgroundColor: "white",
    height: "82%",
    width: "95%",
    left: "3%",
  },
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
          "rgba(254, 52, 110, 0.5)",
          "rgba(255, 116, 115, 0.5)",
          "rgba(255, 201, 82, 0.5)",
          "rgba(152, 221, 171, 0.5)",
          "rgba(63, 227, 210, 0.5)",
        ],
      },
  }],
  xAxis: [{
    axisPointer: {
      show: true,
    },
    axisTick: {
      show: false,
      interval: 1,
    },
    axisLine: {
      lineStyle: {
        color: "#c3c1d7",
      },
    },
    axisLabel: {
      color: "#34314C",
    },
    splitLine: {show: true},
    type: "category",
  }, {
      axisPointer: {
      show: false,
    },
    type: "category",
    show: false,
  }],
  yAxis: [{
    splitLine: {show: true},
    axisLine: {
      lineStyle: {
        color: "#c3c1d7",
      },
    },
    min: 1,
    data: [0, 1, 2, 3, 4, 5],
    axisLabel: {
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
    axisTick: {
      show: false,
    },
  }],
  series: [{
      type: "line",
      smooth: true,
      lineStyle: {
        width: 4,
      },
      emphasis: {
        itemStyle: {
          borderWidth: 4,
        },
      },
      symbolSize: 8,
      encode: {
        x: "createdAtDateTime",
        y: "average",
      },
    }, {
      type: "line",
      smooth: true,
      showSymbol: false,
      symbol: "none",
      lineStyle: {
        type: "dotted",
        color: "#98ddab",
        width: 4,
      },
      encode: {
        x: "createdAtDateTime",
        y: "movingAverage",
      },
  }],
};
