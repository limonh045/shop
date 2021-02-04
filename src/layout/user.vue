<template>
  <div id="app">
    <my-navbar
      @sidebartoggle="sidebar = !sidebar"
      @carttoggle="cartbar = !cartbar"
    ></my-navbar>
    <div class="d-flex all-content">
      <my-sidebar class="side" :sidebar="sidebar"></my-sidebar>
      <div class="main-content">
        <router-view />
      </div>
      <my-cart class="cart" :cartbar="cartbar"></my-cart>
    </div>
  </div>
</template>
<script>
import "../assets/style.css";
import MyNavbar from "../components/MyNavbar";
export default {
  data: () => ({
    sidebar: true,
    cartbar: true,
  }),
  components: { MyNavbar },
};
</script>
<style>
.main-content {
  flex: 1;
  height: calc(100vh - 66px);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.all-content {
  overflow: hidden;
}

.cart {
  width: 25rem;
}
.side {
  width: 20rem;
  border-right: 1px solid #ebebeb;
  height: calc(100vh - 66px);
}

.main-content::-webkit-scrollbar {
  display: none;
}
</style>
