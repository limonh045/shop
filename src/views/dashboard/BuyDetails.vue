<template>
  <div>
    <div v-for="(detail, i) in item" :key="i">
      <div class="m-4 text-capitalize">
        <h2>{{ detail.name }}</h2>
        <h2>{{ detail.number }}</h2>
        <h2>Total &#2547;{{ detail.total }}</h2>
        <button class="btn btn-info" @click="complete(detail.id)">
          Complete Order
        </button>
      </div>

      <div>
        <b-list-group class="mt-5">
          <b-list-group-item
            class="w-75 mx-auto d-flex font-weight-bold justify-content-between"
            variant="secondary"
          >
            <div>Item Image</div>
            <div class="name">Item Name</div>
            <div class="number">Item Price</div>
            <div class="total">Quyntity</div>
          </b-list-group-item>
          <b-list-group-item
            class="w-75 mx-auto d-flex font-weight-bold justify-content-between"
            variant="secondary"
            v-for="(item, i) in detail.item"
            :key="i"
          >
            <img style="height:70px" :src="item.imgUrl" />
            <div class="name">{{ item.name }}</div>
            <div class="number">{{ item.price }}</div>
            <div class="total">{{ item.qyn }}</div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../store/fireInit";
export default {
  data: () => ({
    item: [],
  }),
  methods: {
    async complete(id) {
      console.log(id);
      await db
        .firestore()
        .collection("buy")
        .doc(this.$route.params.id)
        .delete()
        .then((res) => {
          console.log(res);
          this.$router.replace("/dashboard/buyer-requ");
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    console.log(" this.item");
    db.firestore()
      .collection("buy")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        var itemdata = doc.data();
        itemdata.id = doc.id;
        this.item.push(itemdata);
      })
      .catch((err) => console.log(err));
  },
};
</script>
