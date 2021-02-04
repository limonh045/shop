<template>
  <div class="p-5 w-50">
    <label for=""> Menu Name</label>
    <b-form-input
      v-model="menu"
      class=""
      placeholder="Enter your name"
    ></b-form-input>
    <button class="btn btn-info mx-auto mt-3" @click="menuAdded">Submit</button>
    <hr />
    <b-list-group class="mt-5">
      <b-list-group-item
        variant="success"
        class="text-capitalize"
        v-for="menu in menus"
        :key="menu.id"
        >{{ menu.name }}
        <button
          @click="deleteMenu(menu.id)"
          class="btn btn-dark text-white h-25 float-right"
        >
          Delete
        </button></b-list-group-item
      >
    </b-list-group>
  </div>
</template>
<script>
import { db } from "../../store/fireInit";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    menu: "",
  }),
  computed: {
    ...mapGetters(["menus"]),
  },
  methods: {
    menuAdded() {
      if (!this.menu) {
        alert("Please Fill Menu Field");
        return;
      }
      db.firestore()
        .collection("menu")
        .add({ name: this.menu })
        .then((res) => {
          this.menu = "";
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    deleteMenu(id) {
      db.firestore()
        .collection("menu")
        .doc(id)
        .delete();
    },
  },
};
</script>
