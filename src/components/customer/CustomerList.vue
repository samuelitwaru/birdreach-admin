<template>
  <div class="q-pa-sm">
    <q-toolbar-title class="flex justify-between q-my-sm"
      >Customers</q-toolbar-title
    >
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td class="text-left">{{ customer.id }}</td>
          <td class="text-left">
            {{ customer.user?.first_name }}
            {{ customer.user?.last_name }}
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
      customers: [],
    };
  },
  created() {
    // this.getCustomers();
  },
  created() {
    this.getCustomers();
  },
  methods: {
    getCustomers() {
      this.$api.get("customers/").then((res) => {
        this.customers = res.data;
      });
    },
  },
};
</script>
