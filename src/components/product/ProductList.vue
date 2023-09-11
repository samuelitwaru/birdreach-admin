<template>
  <div class="q-pa-md">
    <q-toolbar-title class="flex justify-between q-my-sm">
      Products
      <router-link to="/products/create">
        <q-btn color="primary" icon="">
          <span class="q-px-md">Add Product</span>
        </q-btn>
      </router-link>
    </q-toolbar-title>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left" colspan="2">ID</th>
          <th class="text-left">Name</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="text-left">{{ product.id }}</td>
          <td class="text-left">
            <img
              width="25"
              height="25"
              :src="product.image?.file"
              alt=""
              style="border: 1px solid #004970"
            />
          </td>
          <td class="text-left">{{ product.name }}</td>
          <td class="text-left">
            <router-link :to="`/products/${product.id}`">
              <q-icon name="edit" />
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
      products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.$api.get("products/").then((res) => {
        this.products = res.data;
        console.log(this.products);
      });
    },
  },
};
</script>
