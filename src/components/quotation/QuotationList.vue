<template>
  <div class="q-pa-sm">
    <q-toolbar-title>Quotations</q-toolbar-title>
    <q-markup-table dense>
      <thead>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quotation in quotations" :key="quotation.id">
          <td class="text-left">{{ quotation.created_at }}</td>
          <td class="text-left">
            <router-link :to="`/quotations/${quotation.id}`">
              <q-btn
                color="primary"
                dense
                flat
                icon="edit"
                label="Quote"
                @click="onClick"
              />
            </router-link>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quotations: [],
    };
  },
  created() {
    this.getQuotations();
  },
  methods: {
    getQuotations() {
      this.$api.get("quotations/?status=PENDING").then((res) => {
        this.quotations = res.data;
      });
    },
  },
};
</script>
