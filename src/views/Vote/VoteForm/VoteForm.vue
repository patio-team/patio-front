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

<template src="./VoteForm.pug" lang="pug"></template>
<style src="./VoteForm.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { namespace } from "vuex-class";

import Markdown from "@/components/shared/Markdown/Markdown.vue";

import { CreateVoteInput } from "@/services/api/types";
import { Voting } from "@/domain";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import VoteCard from "@/components/shared/VoteCard/VoteCard.vue";
import { Editor } from "@toast-ui/vue-editor";

const Votings = namespace("votings");

@Component({
  components: {
    "dw-markdown": Markdown,
    Editor,
    VoteCard,
  },
})
export default class VoteForm extends Vue {
  private showPreview = false;

  private defaultOptions = {
    useCommandShortcut: true,
    useDefaultHTMLSanitizer: true,
    usageStatistics: false,
    hideModeSwitch: false,
    initialEditType: "WYSIWYG",
    minHeight: "2000px",
    toolbarItems: [
        "bold",
        "italic",
        "strike",
        "divider",
        "ul",
        "ol",
        "divider",
        "image",
        "link",
    ],
};

  @Prop(Number)
  private readonly voteScore!: number;

  @Prop(String)
  private readonly groupId!: string;

  @Prop(Object)
  private voting!: Voting;

  @Prop(Number)
  private initScore!: number;

  @Votings.Getter("createVoteIsLoading")
  private isLoading!: boolean;

  @Votings.Getter("createVoteError")
  private error!: boolean | string;

  @Votings.Action("createVote")
  private createVote: any;

  @Ref("toastuiEditor")
  private editor!: Editor;

  @Ref("editorContainer")
  private editorContainer!: any;

  private input = {
    score: (this.voteScore) ? this.voteScore : 3,
    comment: "",
    anonymous: false,
    votingId: "",
    hueMood: "",
  } as CreateVoteInput;

  private editorContent: any;

  public handleClickPreviewButton() { this.showPreview = true; }

  public handleClickEditButton() { this.showPreview = false; }

  public mounted() {
    if (this.editor) {
      this.editor.invoke("changeMode", "wysiwyg");
      this.editor.invoke("addHook", "pasteBefore", (event)=> {
        return null;
      });
    }
    if (this.initScore) {
      this.input.score = this.initScore;
    }
  }

  private async handleSubmit() {
    if (this.voteScore) {
      this.input.score = this.voteScore;
    }
    let editorContent: any;
    if (this.editor) {
      editorContent = this.editor.invoke("getMarkdown");
    }
    const isCreated = await this.createVote({
      ...this.input,
      comment: editorContent,
      votingId: this.voting.id,
    });
    if(isCreated) {
      this.$router.push({
        name: "team:result",
        params: {
          groupId: this.groupId,
          votingId: this.voting.id,
        },
      });
    }
  }
}
</script>
