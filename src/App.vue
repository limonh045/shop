<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>
<script>
// import "../src/assets/style.css";
import user from "./layout/user";
import Default from './layout/Default'
import Dashboard from './layout/Dashboard'
export default {
  data: () => ({
    
  }),
  components:{
    user,
    Default,
    Dashboard
  },
  computed: {
    layout() {
      let layoutname = "default";
      if (this.$route.meta && this.$route.meta.layout) {
        layoutname = this.$route.meta.layout;
      }
      return layoutname;
    },
    
  },
  mounted(){
    this.$store.dispatch('getmenu')
  }
};
</script>
<style></style>
