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
import votingChartStore from "@/store/modules/result/VotingChartStore";
import { DateTime } from "luxon";
import { VotingStats } from "@/domain";
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

  @Prop(DateTime)
  public votingDateTime!: DateTime;

  @Ref("chart")
  private chart!: any;

  public get chartOptions() {
    return {
      dataset: {
        source: this.chartDataset,
      },
      ...options,
    };
  }

  public get chartDataset() {
    return votingChartStore
      .chartState
      .data
      .map((next: VotingStats) => ({
        votingId: next.voting ? next.voting.id : undefined,
        movingAverage: next.movingAverage,
        average: next.average,
        createdAtDateTime: this.$d(next.createdAtDateTime.toJSDate()),
      }));
  }

  public get nextPage() {
    return votingChartStore.chartState.nextPage;
  }

  public get previousPage() {
    return votingChartStore.chartState.prevPage;
  }

  public get canGoBackwards() {
    return votingChartStore.chartState.hasPrev;
  }

  public get canGoForwards() {
    return votingChartStore.chartState.hasNext;
  }

  public mounted() {
    this.loadData();
    window.addEventListener("resize", () => this.handleResize());
  }

  public destroy() {
    window.removeEventListener("resize", () => this.handleResize());
  }

  /**
   * Every time group changes we need to recalculate initial
   * window frame
   */

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
    this.chart.resize();
  }

  public handleGoBackwards() {
    this.loadData(this.previousPage);
  }

  public handleGoForwards() {
    this.loadData(this.nextPage);
  }

  /**
   * Request the next/previous chart dataset for a given time window
   *
   * @param w the time window to add data from
   */
  public loadData(page: number = 0) {
      votingChartStore.fetchVotingStats({
        groupId: this.groupId,
        page,
      });
  }
}
</script>
