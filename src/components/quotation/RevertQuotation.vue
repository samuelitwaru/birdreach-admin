<template>
  <div>
    <!-- Your logout button here -->
    <q-btn
      color="primary"
      @click="showConfirmationDialog"
      label="Revert Quotation"
    />
    <!-- Confirmation Dialog -->
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section class="q-pa-md">
          <span class="q-body1"
            >Are you sure you want to revert this Quotation?</span
          >
        </q-card-section>
        <q-card-actions align="right">
          <q-btn dense flat @click="cancel" color="primary">Cancel</q-btn>
          <q-btn @click="revertQuotation" color="primary" class="q-ml-md"
            >Yes, Revert</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showDialog: false,
    };
  },
  methods: {
    showConfirmationDialog() {
      this.showDialog = true;
    },
    cancel() {
      this.showDialog = false;
    },
    revertQuotation() {
      this.$emit("revertQuotation");
      this.cancel();
    },
  },
};
</script>
