<template>
  <div class="q-pa-sm">
    <q-toolbar-title class="flex justify-between q-my-sm"
      >New Product</q-toolbar-title
    >
    <loading-component :loading="loading" />
    <q-form @submit="createProduct">
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
            <div>
              <label>Short Description</label>
              <q-editor
                dense
                class="q-my-sm"
                v-model="formData.short_description"
                label="Short Description"
                required
              />
            </div>
            <div>
              <label>Long Description</label>
              <q-editor
                class="q-my-sm"
                dense
                v-model="formData.long_description"
                label="Long Description"
                type="textarea"
                required
              />
            </div>

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
                <div class="flex" v-if="selectedImage">
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
                    style="margin-bottom: -3.5rem; margin-right: -4.5rem"
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

        <q-card-actions align="right">
          <q-btn color="primary" label="Create Product" type="submit" />
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
      selectedImages: [],
      selectedImage: 0,
      loading: false,
      formData: {
        name: "",
        short_description: "",
        long_description: "",
        price: null,
        stock: 1,
        image_id: null,
        images: [],
      },
    };
  },
  created() {
    if (process.env.DEBUG) {
      this.setFormData();
    }
  },
  methods: {
    createProduct() {
      this.$utilsStore.setLoading(true);
      this.$api
        .post("products/", this.formData)
        .then((res) => {
          this.$router.push("/products");
          this.$utilsStore.setLoading(false);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response);
        });
    },

    getImages() {
      var stringIds = this.formData.images.toString();
      this.$api.get(`/photos/?id__in=${stringIds}`).then((res) => {
        this.selectedImages = res.data;
      });
    },

    getImage() {
      console.log(`/photos/${this.formData.image_id}/`);
      this.$api.get(`/photos/${this.formData.image_id}/`).then((res) => {
        this.selectedImage = res.data;
      });
    },

    removeImage(imageId) {
      console.log(imageId);
      this.formData.images = this.formData.images.filter(
        (item) => item !== imageId
      );
      this.getImages();
    },

    setFormData() {
      this.formData = {
        name: "Capsicums Red",
        short_description: "Short description",
        long_description: "long description",
        price: 10000,
        stock: 1,
        image: null,
        images: [],
      };
    },
  },
};
</script>
