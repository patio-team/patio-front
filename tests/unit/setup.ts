import Vue from "vue";

// Load custom filters
import "@/filters";

// vue-i18n: Mock $t in all components
import { config } from "@vue/test-utils";
config.mocks!.$t = (key: string) => key;

// vue-thin-modal: Initialize modal
import VueThinModal from "vue-thin-modal";
Vue.use(VueThinModal);

// Notify: Initialize notify
import Notify from "@/plugins/notifications";
Vue.use(Notify);

