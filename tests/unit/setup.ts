import { config } from "@vue/test-utils";

// vue-i18n: Mock $t in all components
config.mocks!.$t = (key: string) => key;
