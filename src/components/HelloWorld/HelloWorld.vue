<template src="./HelloWorld.pug" lang="pug"></template>
<style src="./HelloWorld.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>
