<template lang="">
  <div>
    <q-btn
      color="primary"
      icon="image"
      :label="buttonLabel"
      flat
      @click="imageUploaderDialog = true"
    />
    <q-dialog v-model="imageUploaderDialog" full-width full-height>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ buttonLabel }}</div>
        </q-card-section>

        <q-separator />
        <q-card-section style="min-height: 80vh" class="scroll">
          <image-uploader @image-selected="imageSelected($event)" />
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn color="primary" label="Done" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      imageUploaderDialog: false,
    };
  },

  computed: {
    buttonLabel() {
      return this.multiple ? "Select Images" : "Select Image";
    },
  },

  methods: {
    imageSelected(event) {
      console.log(event);
      this.$emit("image-selected", event);
    },
  },
};
</script>
<style lang=""></style>
