<template>
  <div>
    <div v-if="images.length === 0" class="text-center">
      No images to display.
    </div>
    <div v-else class="flex">
      <div v-for="(image, index) in images" :key="index">
        <q-btn
          class="square-image-remove-button"
          color="red"
          dense
          icon="close"
          size="xs"
          @click="deleteImage(image.id)"
        />
        <div
          class="square-image-container"
          @click="addOrRemoveImage(image.id)"
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
  </div>
</template>

<script>
export default {
  props: {
    getImagesTrigger: {
      type: Boolean,
    },
  },

  data() {
    return {
      selectedImages: [],
      images: [],
    };
  },

  created() {
    this.getImages();
  },

  methods: {
    getImages() {
      this.$api.get("photos/").then((res) => {
        this.images = res.data;
      });
    },
    addOrRemoveImage(imageId) {
      // this.selectedImages = [9];
      const index = this.selectedImages.indexOf(imageId);

      if (index === -1) {
        // Number doesn't exist in the array, so add it
        this.selectedImages.push(imageId);
      } else {
        // Number exists in the array, so remove it
        this.selectedImages.splice(index, 1);
      }
      this.$emit("image-selected", this.selectedImages);
    },

    deleteImage(imageId) {
      if (confirm("Are you sure you want to delete this image?")) {
        this.$api.delete(`photos/${imageId}/`).then((res) => {
          if (res.status == 204) {
            this.getImages();
          }
        });
      }
    },
  },

  watch: {
    getImagesTrigger(newVal) {
      // this.selectedImages = [];
      // this.selectedImages = newVal.map((item) => item.id);
      // console.log(this.selectedImages);
      this.getImages();
    },
  },
};
</script>
