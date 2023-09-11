<template>
  <div class="q-pa-sm">
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      multiple
      @change="handleFileInputChange"
    />
    <div
      class="uploader"
      :class="{ 'drag-over': isDragging }"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      style="height: 100%"
    >
      <div class="upload-icon">
        <q-icon name="cloud_upload" size="50px" color="primary" />
      </div>
      <div class="upload-text">
        <p>Drag and drop images here</p>
        <p>or</p>
        <p><q-btn @click="openFileInput" label="Select Images" /></p>
      </div>

      <image-list
        @image-selected="handleImageSelected($event)"
        :getImagesTrigger="getImagesTrigger"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      images: [],
      getImagesTrigger: false,
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileInputChange(event) {
      const files = event.target.files;
      this.uploadFiles(files);
    },
    handleDragOver(event) {
      event.preventDefault();
      this.isDragging = true;
    },
    handleDragLeave() {
      this.isDragging = false;
    },
    handleDrop(event) {
      event.preventDefault();
      this.isDragging = false;

      const files = event.dataTransfer.files;
      this.uploadFiles(files);
    },
    uploadFiles(files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadFile(files[i]);
      }
      // Here you can implement the logic to upload the files to the server
      console.log("Uploading files:", files);

      // Reset the input value to allow uploading the same files again
      this.$refs.fileInput.value = "";
    },

    uploadFile(file) {
      const formData = new FormData();
      formData.append("file", file);
      this.$api
        .post("photos/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Image uploaded successfully", response.data);
          this.getImagesTrigger = !this.getImagesTrigger;
        })
        .catch((error) => {
          console.error("Error uploading image", error);
          // Handle error response
        });
    },

    getImages() {
      this.$api.get("photos/").then((res) => {
        this.images = res.data;
      });
    },

    handleImageSelected(selectedImages) {
      this.$emit("image-selected", selectedImages);
    },
  },
};
</script>

<style scoped>
.uploader {
  border: 2px dashed #ccc;
  background-color: #f9f9f9;
  text-align: center;
  padding: 20px;
  cursor: pointer;
}
.drag-over {
  border-color: #2196f3;
}
.upload-icon {
  margin-bottom: 10px;
}
.upload-text {
  font-size: 14px;
}
</style>
