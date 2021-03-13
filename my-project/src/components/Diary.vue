<template>
  <div class="main_box">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Diary",
  props: ["title", "sub_title"]
};
</script>
<style src="@/assets/css/style.css"></style>
