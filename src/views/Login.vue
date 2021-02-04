<template>
  <div class="login d-flex">
    <div class="card m-auto p-5">
      <h3 class="text-center py-2">Login</h3>
      <b-alert v-if="errMsg" show dismissible>
        {{ errMsg }}
      </b-alert>
      <atext
        label="Enter Email"
        v-model="email"
        placeholder="Enter Email"
        ref="emailname"
        type="email"
      ></atext>
      <atext
        label="Enter Password"
        v-model="password"
        placeholder="Enter Password"
        ref="pass"
        type="password"
        min-length="6"
      ></atext>
      <button class="btn btn-primary d-block m-auto" @click="loginHandel">
        Login
      </button>
      <br />
      <button class="btn btn-info d-block m-auto" @click="loginWithGoogle">
        Login With Google
      </button>
    </div>
  </div>
</template>
<script>
import { db ,provider} from "../store/fireInit";
export default {
  data: () => ({
    email: "",
    password: "",
    errMsg: "",
  }),
  methods: {
    loginHandel() {
      this.$refs.emailname.errorControl();
      this.$refs.pass.errorControl();
      if (!this.$refs.emailname.isError || !this.$refs.pass.isError) {
        console.log("error");
        return;
      }
      db.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log(res);
          this.$router.replace("/dashboard/item");
        })
        .catch((err) => (this.errMsg = err.message));
    },
    loginWithGoogle() {
      
      db.auth()
        .signInWithPopup(provider)
        .then((res) => {
          console.log(res);
          this.$router.replace("/dashboard/item");
        })
        .catch((err) => (this.errMsg = err.message));
    },
  },
};
</script>
<style scoped>
.login {
  height: 100vh;
  width: 100vw;
  background: #00cec9;
}
</style>
