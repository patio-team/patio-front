<template src="./App.pug" lang="pug"></template>
<style src="./App.css"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header/Header.vue";

@Component({
  components: {
    "dw-header": Header,
  },
})
export default class App extends Vue {}
</script>
