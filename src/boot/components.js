import appMenu from "components/AppMenu.vue";
import imageList from "components/image/ImageList.vue";
import imageUploader from "components/image/ImageUploader.vue";
import modalImageUploader from "components/image/ModalImageUploader.vue";
import revertQuotation from "components/quotation/RevertQuotation.vue";
import loadingComponent from "components/utils/LoadingComponent.vue";
const components = {
  "app-menu": appMenu,
  "image-list": imageList,
  "image-uploader": imageUploader,
  "modal-image-uploader": modalImageUploader,
  "revert-quotation": revertQuotation,
  "loading-component": loadingComponent,
};

export default async ({ app }) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};
