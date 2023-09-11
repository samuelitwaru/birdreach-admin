<template>
  <div>
    <q-list>
      <q-img
        src="~/assets/logo-3.png"
        spinner-color="primary"
        spinner-size="82px"
      />
      <div v-for="item in menuItems" :key="item.name">
        <router-link :to="item.route" block>
          <q-btn
            color="black"
            class="full-width"
            align="left"
            :icon="item.icon"
            flat
          >
            <span class="q-px-md">{{ item.name }}</span>
          </q-btn>
        </router-link>
      </div>
    </q-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { name: "Products", icon: "arrow_right", route: "/products" },
        { name: "New Product", icon: "arrow_right", route: "/products/create" },
        { name: "Images", icon: "arrow_right", route: "/images" },
        { name: "Customers", icon: "arrow_right", route: "/customers" },
        { name: "Suppliers", icon: "arrow_right", route: "/suppliers" },
        { name: "Quotations", icon: "arrow_right", route: "/quotations" },
      ],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
