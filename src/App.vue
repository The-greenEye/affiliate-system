<template>
  <div class="d-flex boss">
    <SideBar />
    <router-view class="w-100" />
  </div>
</template>

<script>
import SideBar from "@/components/global/SideBar.vue";
export default {
  components: {
    SideBar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: #f3f3f3;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  overflow-x: hidden;
}
@media (max-width: 919px) {
  .boss {
    flex-wrap: wrap;
  }
}
</style>
