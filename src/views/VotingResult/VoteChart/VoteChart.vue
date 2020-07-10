<!--
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

<template lang="pug" src="./VoteChart.pug"></template>
<style src="./VoteChart.css" scoped></style>
<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from "vue-property-decorator";

import Echarts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/axisPointer";
import "echarts/lib/component/axis";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import votingChartStore from "@/store/modules/result/VotingChartStore";
import { DateTime } from "luxon";
import { VotingStats, Voting } from "@/domain";
import { TimeWindow, ChartState } from "@/store/modules/result/VotingChartStoreTypes";
import { EchartsData, VotingPoint } from "@/views/VotingResult/VoteChart/types";
import { options } from "@/views/VotingResult/VoteChart/chart";

@Component({
  components: {
    Echarts,
  },
})
export default class VoteChart extends Vue {

  @Prop(String)
  public groupId!: string;

  @Prop(Object)
  public voting!: Voting;

  @Ref("chart")
  private chart!: any;

  public get chartOptions() {
    return {
      dataset: {
        source: this.chartDataset,
      },
      series: [{
          type: "line",
          smooth: 0.3,
          lineStyle: {
            width: 4,
          },
          connectNulls: false,
          markPoint: {
            animation: false,
            symbol: "circle",
            symbolSize: 18,
            symbolOffset: [0, 0],
            data: this.selectedPoint,
            itemStyle: {
                color: this.selectedLineItemColor,
                borderColor: "#FFFFFF",
                borderWidth: "7",
                shadowColor: "#EBEBEB",
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowBlur: 2,
                opacity: 0.9,
            },
          },
          markLine: {
            symbol: "none",
            lineStyle: {
              type: "solid",
              color: " #34314C",
              width: 2,
            },
            label: {
              show: false,
            },
            data: this.selectedLine,
          },
          emphasis: {
            itemStyle: {
              borderWidth: 6,
            },
          },
          symbolSize: 8,
          encode: {
            x: "createdAtDateTime",
            y: "average",
          },
        }, {
          type: "line",
          smooth: 0.3,
          showSymbol: false,
          symbol: "none",
          connectNulls: true,
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
      ...options,
    };
  }

  public get selectedPoint() {
    if (this.stats && this.stats.average && this.stats.createdAtDateTime) {
      return [{
        xAxis: this.$d(this.voting.createdAtDateTime.toJSDate()),
        yAxis: this.stats.average,
      }];
    } else {
      return [{}];
    }
  }

  public get selectedLine() {
    if (this.stats && this.stats.average && this.stats.createdAtDateTime) {
      const xAxis = this.$d(this.voting.createdAtDateTime.toJSDate());

      return [
        [{ xAxis, yAxis: 1 }, { xAxis, yAxis: 5 }],
      ];
    } else {
      return [];
    }
  }

  public get selectedLineItemColor() {
    if (this.stats && this.stats.createdAtDateTime) {
      const avg = this.stats.average || 0;

      if (avg > 0 && avg <= 1) {
          return "#fe346e";
      } else if (avg > 1 && avg <= 2) {
          return "#ff7473";
      } else if (avg > 2 && avg <= 3) {
          return "#ffc952";
      } else if (avg > 3 && avg <= 4) {
          return "#98ddab";
      } else if (avg > 4 && avg <= 5) {
          return "#3fe3d2";
      } else {
        return "";
      }
      return "";
    } else {
      return "";
    }
  }

  public get chartDataset() {
    return this.stats ? votingChartStore
      .chartState
      .data
      .map((next: VotingStats) => ({
        votingId: next.voting ? next.voting.id : undefined,
        movingAverage: next.movingAverage,
        average: next.average,
        createdAtDateTime: next.voting ? this.$d(next.voting.createdAtDateTime.toJSDate()) : null,
      })) : [];
  }

  public get next() {
    return votingChartStore.chartState.next;
  }

  public get previous() {
    return votingChartStore.chartState.previous;
  }

  public get canGoBackwards() {
    return !this.emptyChart && votingChartStore.chartState.hasPrev;
  }

  public get canGoForwards() {
    return !this.emptyChart && votingChartStore.chartState.hasNext;
  }

  public get emptyChart() {
    if (this.stats && this.stats.voteCount) {
        return this.stats.voteCount === 0 && this.chartDataset.length === 0;
    }

    return true;
  }

  public get stats() {
    return this.voting ? this.voting.stats : null;
  }

  public mounted() {
    this.loadData();
    window.addEventListener("resize", () => this.handleResize());
  }

  public destroy() {
    window.removeEventListener("resize", () => this.handleResize());
  }

  @Watch("groupId")
  public onGroupIdChanged(val: string, old: string) {
    if (val !== old) {
      this.loadData();
    }
  }

  public handleClick(value: EchartsData) {
    this.$router.push({
      name: "team:result",
      params: {
        groupId: this.groupId,
        votingId: value.data.votingId,
      },
    });
  }

  public handleResize() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  public handleGoBackwards() {
    this.loadData(this.previous);
  }

  public handleGoForwards() {
    this.loadData(this.next);
  }

  public async handleGotoLast() {
    await this.loadData();
    const lastVoting = await votingChartStore.getLastVoting(this.groupId);
    this.$router.push({
      name: "team:result",
      params: {
        groupId: this.groupId,
        votingId: lastVoting.id,
      },
    });
  }

  public loadData(offset: number = 0) {
      votingChartStore.fetchVotingStats({ groupId: this.groupId, offset });
  }
}
</script>
