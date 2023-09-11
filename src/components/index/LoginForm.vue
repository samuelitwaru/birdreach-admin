<template>
  <q-page padding>
    <div class="text-h6" align="center">
      <q-img
        src="~/assets/logo-3.png"
        style="width: 200px"
        spinner-color="primary"
        spinner-size="82px"
      />
      <div class="text-h6">Login Here</div>
    </div>
    <div class="flex justify-evenly items-center">
      <div>
        <q-card class="my-card" style="min-width: 300px">
          <q-card-section>
            <q-form @submit="login" @reset="resetForm" class="q-gutter-md">
              <q-input
                v-model="formData.username"
                type="text"
                label="Email"
                hint="e.g example@gmail.com"
                required
              />
              <q-input
                v-model="formData.password"
                type="password"
                label="Password"
                required
              />
              <div class="flex justify-between">
                <q-btn
                  style="display: block"
                  label="Signin"
                  type="submit"
                  color="primary"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      indexRoutes: {
        dos: "/",
        head_teacher: "/",
        teacher: "/class-rooms",
      },
      formData: {
        username: null,
        password: null,
      },
    };
  },

  methods: {
    login() {
      this.$utilsStore.setLoading(true);
      console.log(this.formData);
      this.$api
        .post(`/accounts/login/`, this.formData)
        .then((res) => {
          const token = res.data.token;
          const user = res.data.user;
          this.$authStore.setUserAndToken(user, token);
          this.$utilsStore.setLoading(false);
          var _next = this.$route.query._next || "/";
          this.$router.push(_next);
        })
        .catch((err) => {
          this.$utilsStore.setLoading(false);
          this.errorResponse = err.response;
        });
    },
    setFormData() {
      this.formData = { email: "samuelitwaru@gmail.com", password: "bratz123" };
    },

    resetForm() {
      this.formData.username = null;
      this.formData.password = null;
    },
  },
};
</script>

<style></style>
