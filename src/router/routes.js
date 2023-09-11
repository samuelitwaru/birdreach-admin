const routes = [
  {
    path: "/login",
    component: () => import("layouts/IndexLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("components/index/LoginForm.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "products",
        component: () => import("components/product/ProductList.vue"),
      },
      {
        path: "products/:id",
        component: () => import("components/product/UpdateProduct.vue"),
      },
      {
        path: "products/create",
        component: () => import("components/product/CreateProduct.vue"),
      },

      {
        path: "images",
        component: () => import("components/image/ImageUploader.vue"),
      },

      {
        path: "customers",
        component: () => import("components/customer/CustomerList.vue"),
      },

      {
        path: "suppliers",
        component: () => import("components/supplier/SupplierList.vue"),
      },

      {
        path: "quotations",
        component: () => import("components/quotation/QuotationList.vue"),
      },
      {
        path: "quotations/:id",
        component: () => import("components/quotation/QuotationDetail.vue"),
      },
      // { path: '', component: () => import('components/ProductList.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
