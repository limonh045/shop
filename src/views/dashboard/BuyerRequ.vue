<template>
  <div>
    <b-list-group class="mt-5">
      <b-list-group-item
        class="w-75 mx-auto d-flex justify-content-between font-weight-bold"
        variant="secondary"
      >
        <div class="name">Name</div>
        <div class="number">Phone Number</div>
        <div class="total">Total</div>
        <div>Buyer Details</div>
      </b-list-group-item>
      <b-list-group-item
        class="w-75 mx-auto d-flex text-capitalize justify-content-between"
        variant="secondary"
        v-for="(buy, i) in buys"
        :key="i"
      >
        <div class="name">{{ buy.name }}</div>
        <div class="number">{{ buy.number }}</div>
        <div class="total">&#2547; {{ buy.total }}</div>
        <router-link :to="`buyer-requ/${buy.id}`">
          <button class="btn btn-primary">Details</button>
        </router-link>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("buyerderails");
  },
  computed: {
    ...mapGetters(["buys"]),
  },
};
</script>
