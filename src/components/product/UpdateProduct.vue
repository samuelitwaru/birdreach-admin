<template>
  <div class="q-pa-sm">
    <q-toolbar-title class="flex justify-between q-my-sm">{{
      product?.name
    }}</q-toolbar-title>
    <q-form @submit="updateProduct">
      <q-card>
        <q-card-section>
          <div>
            <q-input
              dense
              class="q-my-sm"
              v-model="formData.name"
              label="Product Name"
              required
            />
            <q-editor
              dense
              class="q-my-sm"
              v-model="formData.short_description"
              label="Short Description"
              required
            />
            <q-editor
              class="q-my-sm"
              dense
              v-model="formData.long_description"
              label="Long Description"
              type="textarea"
              required
            />

            <div class="row">
              <div class="col q-mr-sm">
                <q-input
                  dense
                  class="q-my-sm"
                  v-model.number="formData.price"
                  label="Price"
                  type="number"
                  required
                />
              </div>
              <div class="col">
                <q-input
                  class="q-my-sm"
                  dense
                  v-model.number="formData.stock"
                  label="Stock"
                  type="number"
                  required
                />
              </div>
            </div>
          </div>

          <div class="row q-gutter-xs">
            <!-- #image -->
            <div class="col-md-3">
              <div class="flex q-py-sm">
                <div class="q-my-auto q-px-sm">Product Image</div>
                <modal-image-uploader
                  :multiple="false"
                  @image-selected="
                    formData.image_id = $event[$event.length - 1];
                    getImage();
                  "
                />
              </div>
              <q-card style="min-height: 10rem">
                <div v-if="selectedImage">
                  <div v-for="(image, index) in [selectedImage]" :key="index">
                    <q-btn
                      class="square-image-remove-button"
                      color="red"
                      dense
                      icon="close"
                      size="xs"
                      @click="
                        this.formData.image_id = 0;
                        this.selectedImage = 0;
                      "
                    />
                    <div class="square-image-container">
                      <img
                        :src="image.file"
                        :alt="'Image ' + (index + 1)"
                        class="image-preview"
                        width="100"
                        height="100"
                      />
                    </div>
                  </div>
                </div>
              </q-card>
            </div>

            <!-- #gallery -->
            <div class="col-md-9">
              <div class="flex q-py-sm">
                <div class="q-my-auto q-px-sm">Image Gallery</div>
                <modal-image-uploader
                  :multiple="true"
                  @image-selected="
                    this.formData.images = $event;
                    getImages();
                  "
                />
              </div>
              <q-card style="min-height: 10rem" class="flex">
                <div v-for="(image, index) in selectedImages" :key="index">
                  <q-btn
                    class="square-image-remove-button"
                    color="red"
                    dense
                    icon="close"
                    size="xs"
                    @click="removeImage(image.id)"
                  />
                  <div
                    class="square-image-container"
                    :class="{
                      'square-image-container-selected':
                        selectedImages.indexOf(image.id) != -1,
                    }"
                  >
                    <img
                      :src="image.file"
                      :alt="'Image ' + (index + 1)"
                      class="image-preview"
                      width="100"
                      height="100"
                    />
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn color="primary" label="Save" type="submit" />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUploaderDialog: false,
      product: null,
      selectedImages: [],
      selectedImage: null,
      formData: {
        name: "Tomatoes - 10 Kilograms",
        short_description: "These are nice tomatoes",
        long_description:
          "This is a longer description for the very nice tomatoes",
        price: 30000,
        stock: 1,
        images: [],
      },
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.$utilsStore.setLoading(true);
      this.$api.get(`/products/${this.$route.params.id}/`).then((res) => {
        this.product = res.data;
        this.formData = {
          name: this.product.name,
          short_description: this.product.short_description,
          long_description: this.product.long_description,
          price: this.product.price,
          stock: this.product.stock,
          images: this.product.images,
          image_id: this.product.image_id,
        };
        this.getImages();
        this.getImage();
        this.$utilsStore.setLoading(false);
      });
    },
    updateProduct() {
      this.$utilsStore.setLoading(true);
      this.$api
        .put(`products/${this.$route.params.id}/`, this.formData)
        .then((res) => {
          this.$utilsStore.setLoading(false);
          this.$router.push("/products");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    getImage() {
      console.log(this.formData);
      this.$api.get(`/photos/${this.formData.image_id}/`).then((res) => {
        this.selectedImage = res.data;
      });
    },

    getImages() {
      var stringIds = this.formData.images.toString();
      this.$api.get(`/photos/?id__in=${stringIds}`).then((res) => {
        this.selectedImages = res.data;
      });
    },

    removeImage(imageId) {
      console.log(imageId);
      this.formData.images = this.formData.images.filter(
        (item) => item !== imageId
      );
      this.getImages();
    },
  },
};
</script>
