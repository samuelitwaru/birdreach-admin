<template>
  <q-layout view="hHh Lpr fFf">
    <loading-component />
    <q-page-container>
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title> Birdreach App </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  // name: 'LayoutName',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
