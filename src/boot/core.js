import { boot } from "quasar/wrappers";
import { authStore } from "stores/auth";
import { utilsStore } from "stores/utils";

export default boot(({ app }) => {
  const useAuthStore = authStore();
  const useUtilsStore = utilsStore();
  app.config.globalProperties.$authStore = useAuthStore;
  app.config.globalProperties.$utilsStore = useUtilsStore;
});
