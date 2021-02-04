<template>
  <div class="dash-navbar mt-4">
     <router-link to="/">
      <div class="menu">
       Home
      </div>
    </router-link>
    <router-link to="/dashboard/item">
      <div class="menu">
        Add Item
      </div>
    </router-link>
    <router-link to="/dashboard/menu">
      <div class="menu">
        Add Menu
      </div>
    </router-link>
    <router-link to="/dashboard/submenu">
      <div class="menu">
        Add Submenu
      </div>
    </router-link>
    <router-link to="/dashboard/buyer-requ">
      <div class="menu">
        Buyer Request
      </div>
    </router-link>
    <div @click="logout" class="menu">
      Log Out
    </div>
  </div>
</template>
<script>
import { db } from "../../store/fireInit";
export default {
  methods: {
    logout() {
      db.auth()
        .signOut()
       
        .catch((error) => {
         console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.dash-navbar {
  width: 20rem;
  border-right: 1px solid #ebebeb;
  height: 95vh;
}
.menu {
  text-transform: capitalize;
  font-size: 20px;
  background: #ebebeb;
  padding: 7px 20px 10px;
  margin: 1px 0;
  cursor: pointer;
}
</style>
