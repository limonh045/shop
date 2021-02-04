<template>
  <div class="my-cart" :class="{ 'cart-toggle': cartbar }">
    <div class=" mt-5 pt-5 d-flex" v-if="cartitems.length === 0">
      <h3 class="mx-auto mt-5 pt-5">No Item Added In The Cart</h3>
    </div>
    <div v-else>
      <h3 class="p-2">Cart Catagory</h3>
      <hr />
      <div
        class="cart-item mb-3 d-flex"
        v-for="(cartitem, i) in cartitems"
        :key="i"
      >
        <img :src="cartitem.imgUrl" class="cart-img my-auto" />
        <div>
          <div class="cart-name ">{{ cartitem.name }}</div>
          <div class="cart-price">&#2547; {{ cartitem.price }}</div>
        </div>
        <div class="d-flex">
          <button
            class="h-50 my-auto px-2 mx-1"
            @click="$store.commit('cartqyntitycontrol', [cartitem.id, -1])"
          >
            -
          </button>
          <div class="my-auto mx-1">{{ cartitem.qyn }}</div>
          <button
            class="h-50 my-auto px-2 mx-1"
            @click="$store.commit('cartqyntitycontrol', [cartitem.id, 1])"
          >
            +
          </button>
        </div>
        <button
          class="h-75 my-auto ml-3 mr-2"
          @click="$store.commit('removetocart', cartitem.id)"
        >
          <font-icon icon="times" />
        </button>
      </div>
      <div class="total-price text-white bg-dark font-weight-bold py-2 pl-2">
        Total Price
        <div class="d-inline-block float-right mr-4">
          &#2547; {{ gettotalprice }}
        </div>
      </div>
      <hr />
      <div class="customer-info ml-3">
        <label class="font-weight-bold">Enter your name</label>
        <b-form-input
          v-model="name"
          class="w-75"
          placeholder="Search Product"
        ></b-form-input>
        <label class="font-weight-bold mt-1">Enter your name</label>
        <b-form-input
          v-model="number"
          class="w-75"
          placeholder="Search Product"
        ></b-form-input>
      </div>
      <button class="btn btn-info d-block mt-3 mx-auto" @click="buyNow">
        Buy Now
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { db } from "../store/fireInit";
export default {
  data: () => ({
    name: "",
    number: "",
  }),
  props: {
    cartbar: {
      default: true,
    },
  },
  computed: {
    ...mapGetters(["cartitems", "gettotalprice"]),
  },
  methods: {
    async buyNow() {
      if (!this.name || !this.number) {
        alert("input your info");
        return;
      }
      await db
        .firestore()
        .collection("buy")
        .add({
          name: this.name,
          number: this.number,
          item: this.cartitems,
          total: this.gettotalprice,
        });
      this.name = "";
      this.number = "";
      this.$store.commit("clearcart");
    },
  },
};
</script>
<style>
.my-cart {
  border: 1px solid;
  margin-right: 0rem;
  height: calc(100vh - 66px);
  transition: 300ms;
}

.cart-img {
  width: 80px;
  margin: 0 10px;
  height: 48px;
}

.cart-name {
  text-transform: capitalize;
  font-size: 14px;
  width: 9rem;
}

.cart-toggle {
  margin-right: -25rem;
}
</style>
