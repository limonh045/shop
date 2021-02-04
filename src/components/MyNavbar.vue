<template>
  <div class="my-navbar d-flex">
    <button class="sidebar-toggle" @click="$emit('sidebartoggle')">
      <font-icon icon="bars" />
    </button>
    <h4 class="my-auto ml-5">Shoping Here</h4>
    <b-form-input
      class="w-50 ml-5 my-auto"
      placeholder="Search Product"
    ></b-form-input>
    <router-link
      to="/login"
      class="btn my-auto mt-0 btn-primary ml-auto text-white"
      >Login</router-link
    >
    <router-link
      to="/reg"
      class="btn my-auto mt-0 btn-primary ml-auto text-white"
      >Registation</router-link
    >
    <router-link
      to="/dashboard/item"
      class="btn my-auto mt-0 btn-primary ml-auto text-white"
      >Dashboard</router-link
    >
    <h6 class="my-auto ml-2 text-white font-weight-bold">
      &#2547; {{ gettotalprice }}
    </h6>
    <button class="cart-toggle ml-auto mr-5" @click="$emit('carttoggle')">
      <font-icon icon="cart-plus" />
    </button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["gettotalprice"]),
  },
};
</script>
<style scoped>
.my-navbar {
  height: 66px;
  width: 100%;
  background: #00cec9;
}

.sidebar-toggle {
  width: 45px;
  height: 45px;
  font-size: 30px;
  background: transparent;
  margin: 9px 3px 2px 36px;
  transition: 0.5s;
}

.sidebar-toggle:hover {
  background: rgba(0, 0, 0, 0.1);
}

.cart-toggle {
  background: transparent;
  font-size: 28px;
  color: white;
}
</style>
