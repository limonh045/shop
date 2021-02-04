<template>
  <div>
    <div class="text-center h1 mt-5" v-if="getItems().length === 0">
      This page has no item
    </div>
    <div v-else class="d-flex ff flex-wrap m-2">
      <div class="item m-2" v-for="(item, i) in getItems()" :key="i">
        <div class="card p-1 m-2">
          <img :src="item.imgUrl" class="w-100 item-img" />
          <div class="item-name text-capitalize p-2">
            {{ item.name }}
          </div>
          <div class="item-price px-2">&#2547; {{ item.price }}</div>
          <div class="cart-added">
            <button
              @click="$store.commit('cartqyntityadded', item)"
              class="btn btn-primary w-100 my-2"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["items", "cartitems"]),
  },
  mounted() {
    this.$store.dispatch("getitem");

    this.getItems();
  },
  methods: {
    addToCart(id, i) {
      this.$store.commit("cartqyntity", [id, i]);
    },
    getItems() {
      if (this.$route.params.menu && this.$route.params.sub) {
        return this.items.filter((e) => e.sub === this.$route.params.sub);
      } else if (
        this.$route.params.menu &&
        this.$route.params.sub === undefined
      ) {
        return this.items.filter((e) => e.menu === this.$route.params.menu);
      }
    },
  },
  watch: {
    $route() {
      this.getItems();
    },
  },
};
</script>
<style scoped>
.item {
  width: 16rem;
  transition: 300ms;
}
.item-img {
  width: 15rem;
  height: 15rem;
}
.qyntity-control button {
  width: 40px;
  height: 40px;
  font-size: 24px;
  background: #6c6c6c;
  color: white;
  border-left: 1px solid;
  border-right: 1px solid;
}
.qyntity-control {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  background: #6c6c6c;
  color: white;
}
.item:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
}
.ff {
}
/* Hide scrollbar for Chrome, Safari and Opera */
.ff::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.ff {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
