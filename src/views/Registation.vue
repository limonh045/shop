<template>
  <div class="login d-flex">
    <div class="card m-auto p-5">
      <h3 class="text-center py-2">Registation</h3>
 <b-alert v-if="errMsg" show dismissible>
    {{errMsg}} 
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
      <atext
        label="Enter Re-Password"
        v-model="repassword"
        placeholder="Enter Re-Password"
        ref="repass"
        type="password"
        min-length="6"
        validwith="password"
      ></atext>
      <button class="btn btn-primary d-block m-auto" @click="regHandel">
        Registation
      </button>
    </div>
  </div>
</template>
<script>
import { db } from "../store/fireInit";
export default {
  data: () => ({
    email: "",
    password: "",
    repassword: "",
    errMsg:''
  }),
  methods: {
    regHandel() {
      this.$refs.emailname.errorControl();
      this.$refs.pass.errorControl();
      this.$refs.repass.errorControl();
      if (
        !this.$refs.emailname.isError ||
        !this.$refs.pass.isError ||
        !this.$refs.repass.isError
      ) {
        console.log("error");
        return;
      }
      db.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          console.log(res);
          this.$router.replace('/dashboard/item')
        })
        .catch((err) => 
        this.errMsg = err.message
       );
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
