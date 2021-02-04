<template>
  <div class="p-5 w-50">
    <label for="">Select menu</label>
    <b-form-select class="mb-3" v-model="menuid">
      <b-form-select-option
        v-for="menu in menus"
        :key="menu.id"
        :value="menu.id"
        >{{ menu.name }}</b-form-select-option
      >
    </b-form-select>
    <label for=""> Submenu Name</label>
    <b-form-input
      class=""
      v-model="submenu"
      placeholder="Enter your name"
    ></b-form-input>
    <button class="btn btn-info mx-auto mt-3" @click="addSubmenu">
      Submit
    </button>
    <hr />
    <b-list-group class="mt-5">
      <b-list-group-item
        variant="success"
        v-for="select in selectMenu"
        :key="select.id"
        >{{ select.name }}
        <button
          @click="deleteSubmenu(select.id)"
          class="btn btn-dark text-white float-right"
        >
          Delete
        </button></b-list-group-item
      >
    </b-list-group>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { db } from "../../store/fireInit";
export default {
  data: () => ({
    menuid: "",
    submenu: "",
  }),
  computed: {
    ...mapGetters(["menus", "submenus"]),
    selectMenu() {
      return this.submenus.filter((e) => e.menuid == this.menuid);
    },
  },
  methods: {
    async addSubmenu() {
      if (!this.menuid || !this.submenu) {
        alert("Please Fill all Field");
        return;
      }
      await db
        .firestore()
        .collection("submenu")
        .add({ name: this.submenu, menuid: this.menuid })
        .then(() => {
          this.menuid = "";
          this.submenu = "";
        })
        .catch((err) => console.log(err));
    },
    async deleteSubmenu(id) {
      await db
        .firestore()
        .collection("submenu")
        .doc(id)
        .delete()
        .then(() => {
          this.menuid = "";
          this.submenu = "";
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
