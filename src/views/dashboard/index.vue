<template>
  <div class="d-flex overflow-hidden">
    <dash-navbar></dash-navbar>
    <div class="routeview"><router-view /></div>
  </div>
</template>
<style scoped>
.routeview {
  flex: 1;

  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
