<template>
  <div>
    <div class="w-50 p-5">
      <label for="">Item name</label>
      <b-form-input
        v-model="name"
        class="mb-2"
        placeholder="Enter your name"
      ></b-form-input>
      <label for="">Item menu</label>
      <b-form-select class="mb-3" v-model="menu">
        <b-form-select-option
          v-for="menu in menus"
          :key="menu.id"
          :value="menu"
          >{{ menu.name }}</b-form-select-option
        >
      </b-form-select>

      <label for="">Item submenu</label>
      <b-form-select class="mb-3" v-model="subname">
        <b-form-select-option
          v-for="sub in selectSub"
          :key="sub.id"
          :value="sub.name"
          >{{ sub.name }}</b-form-select-option
        >
      </b-form-select>
      <label>item photo</label>
      <input class="d-block mb-2" @change="addImgFile" type="file" />

      <img v-if="imageUrl !== ''" :src="imageUrl" class="w-25" />

      <label class="d-block mt-3" for="">Item price</label>
      <b-form-input
        v-model="price"
        placeholder="Enter your name"
      ></b-form-input>
      <button class="btn btn-info d-block mx-auto mt-3" @click="addItem">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../../store/fireInit";
export default {
  data: () => ({
    name: "",
    menu: "",
    subname: "",
    images: "",
    price: "",
    imageUrl: "",
    image:''
  }),
  computed: {
    ...mapGetters(["menus", "submenus"]),
    selectSub() {
      return this.submenus.filter((e) => e.menuid == this.menu.id);
    },
  },
  methods: {
    addImgFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.images = e.target.result;
        this.imageUrl = vm.images;
      };
      reader.readAsDataURL(file);
      this.image = file;
    },
    async addItem() {
      var key;
      console.log('start');
      await db
        .firestore()
        .collection("items")
        .add({
          name: this.name,
          menu: this.menu.name,
          sub: this.subname,
          price: this.price,
        })
        .then((res) => {
          console.log(res.id);
          key = res.id;
          return key;
        })
        .then((key) => {
          console.log('storeage');
          return db.storage()
            .ref(key)
            .put(this.image);
        })
        .then((fileData) => {
          console.log('filedata');
          fileData.ref.getDownloadURL().then((url) => {
            console.log('url here');
            console.log(url);
            db.firestore()
              .collection("items")
              .doc(key)
              .update({ imgUrl: url });
          });
        })
        .then(()=>{
          this.name=''
          this.menu=''
          this.subname=''
          this.images=''
          this.imageUrl=''
          this.price=''
        })
    },
  },
};
</script>
