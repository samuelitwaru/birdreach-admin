<template>
  <div class="q-pa-sm">
    <q-toolbar-title>Suppliers</q-toolbar-title>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="supplier in suppliers" :key="supplier.id">
          <td class="text-left">{{ supplier.id }}</td>
          <td class="text-left">
            {{ supplier.user?.first_name }}
            {{ supplier.user?.last_name }}
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
      suppliers: [],
    };
  },
  created() {
    this.getSuppliers();
  },
  methods: {
    getSuppliers() {
      this.$api.get("suppliers/").then((res) => {
        this.suppliers = res.data;
      });
    },
  },
};
</script>
