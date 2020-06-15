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

<template src='./Vote.pug' lang='pug'></template>
<style src='./Vote.css' scoped></style>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import VoteForm from "./VoteForm/VoteForm.vue";

import { Group, Voting } from "@/domain";
import { formatToDate } from "@/utils/datetime";
import Smiley from "../../components/shared/Smiley/Smiley.vue";
import Snap from "snapsvg";
import Loader from "../../components/shared/Loader/Loader.vue";
const VotingsStore = namespace("voting");

@Component({
  components: {
    "dw-vote-form": VoteForm,
    "dw-smiley": Smiley,
    "dw-loader": Loader,
  },
})
export default class Vote extends Vue {
  public initScore = 3;
  public voteScore = 3;
  public landscape = false;
  public isLoaded = false;
  public voteSelected = false;
  public animationTrue = false;

  @Prop(Object)
  private readonly group!: Group;

  @VotingsStore.Getter("voting")
  private voting!: Voting;

  @VotingsStore.Getter("getVotingIsLoading")
  private isLoading!: boolean;

  @VotingsStore.Getter("getVotingError")
  private error!: boolean | string;

  @VotingsStore.Action("getVoting")
  private getVoting: any;

  public created() {
    if (this.$route.query.vote) {
      this.initScore = Number(this.$route.query.vote);
      this.voteScore = Number(this.$route.query.vote);
    }
    this.isLandscape();
  }

  public async mounted() {
    const input = {
      id: this.$route.params.votingId,
    };
    const voting = await this.getVoting(input);
    this.$emit("set-subtitle", formatToDate(voting.createdAtDateTime));
    this.isLoaded = true;
    this.animateScore(this.voteScore, true);
    window.addEventListener("resize", () => {
      this.isLandscape();
    });
  }

  public isLandscape() {
    if (window.innerHeight > window.innerWidth) {
      this.landscape = false;
    } else {
      this.landscape = true;
    }
  }

  public getVoteClasses(vote: number) {
    return [
      // v1 v2 v3 v4 v5
      `mood${ this.voteScore }`,
    ];
  }

  public activateAnimation() {
    this.animationTrue = true;
    setTimeout(() => {
      this.animationTrue = false;
    }, 500);
  }

  public improveMood(moodScoreChange: number) {
    if ( this.voteScore !== 5 && this.voteSelected === false) {
      this.activateAnimation();
      this.setMood(this.voteScore + moodScoreChange);
      this.animateScore(this.voteScore);
      this.getVoteClasses(this.voteScore);
    }
  }

  public worsenMood(moodScoreChange: number) {
    if ( this.voteScore !== 1 && this.voteSelected === false) {
      this.activateAnimation();
      this.setMood(this.voteScore - moodScoreChange);
      this.animateScore(this.voteScore);
      this.getVoteClasses(this.voteScore);
    }
  }

  public animateScore(score: number, instant?: boolean) {
    let speed = 500;
    if (instant === true) {
      speed = 0;
    }
    const svg: any = this.$el.querySelector(".voting-smile .gsap-smile");
    const s = Snap(svg);
    const gsapMouth = Snap.select(".gsap-mouth");
    const gsapMouthPoints = gsapMouth.node.getAttribute("d");

    if ( score === 1) {
      const gsapMood1 = Snap.select(".gsap-mood-one");
      const gsapMood1Points = gsapMood1.node.getAttribute("d");
      gsapMouth.animate({ d: gsapMood1Points }, speed, mina.bounce);
    } else if ( score === 2) {
      const gsapMood2 = Snap.select(".gsap-mood-two");
      const gsapMood2Points = gsapMood2.node.getAttribute("d");
      gsapMouth.animate({ d: gsapMood2Points }, speed, mina.easein);
    } else if ( score === 3) {
      const gsapMood3 = Snap.select(".gsap-mood-three");
      const gsapMood3Points = gsapMood3.node.getAttribute("d");
      gsapMouth.animate({ d: gsapMood3Points }, speed, mina.easein);
    } else if ( score === 4) {
      const gsapMood4 = Snap.select(".gsap-mood-four");
      const gsapMood4Points = gsapMood4.node.getAttribute("d");
      gsapMouth.animate({ d: gsapMood4Points }, speed, mina.easein);
    } else if ( score === 5) {
      const gsapMood5 = Snap.select(".gsap-mood-five");
      const gsapMood5Points = gsapMood5.node.getAttribute("d");
      gsapMouth.animate({ d: gsapMood5Points }, speed, mina.bounce);
    }

  }

  public toggleMoodSelected() {
    this.activateAnimation();
    this.voteSelected = !this.voteSelected;
  }

  public moodSelected() {
    this.activateAnimation();
    this.voteSelected = true;
  }

  public moodDeselected() {
    this.activateAnimation();
    this.voteSelected = false;
  }

  public setMood(mood: number) {
    this.voteScore = mood;
  }

  private swipeHandler(direction: any) {
    if ( direction === "left") {
      this.improveMood(1);
    }
    if ( direction === "right") {
      this.worsenMood(1);
    }
    if ( direction === "top") {
      this.moodSelected();
    }
    if ( direction === "bottom") {
      this.moodDeselected();
    }
  }
}
</script>
