<template>
  <div class="mb-3">
    <label>{{ label }}</label>
    <b-form-input
      :state="isError"
      @input="$emit('input', $event)"
      :value="value"
      :placeholder="placeholder"
      ref="inputfield"
      :type="type"
    ></b-form-input>
    <b-form-invalid-feedback>
      {{ errMsg }}
    </b-form-invalid-feedback>
  </div>
</template>
<script>
export default {
  data: () => ({
    isError: null,
    errMsg: "",
  }),
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {},
    minLength: {},
    type: {
      type: String,
      default: "text",
    },
    validwith: {},
  },
  methods: {
    errorControl() {
      var re = /\S+@\S+\.\S+/;

      if (this.minLength && this.minLength > this.value.length) {
        this.isError = false;
        this.errMsg = `This Field Must Be ${this.minLength} Caracters`;
        this.$refs.inputfield.focus();
      } else if (this.type && this.type === "email" && !re.test(this.value)) {
        this.isError = false;
        this.errMsg = "This Email Not Valid";
        this.$refs.inputfield.focus();
      } else if (this.validwith && this.validwith == !this.value) {
        this.isError = false;
        this.errMsg = "Re-password Not Matching";
        this.$refs.inputfield.focus();
      } else {
        this.isError = true;
      }
    },
  },
};
</script>
<style scoped>
.form-control {
  width: 20rem;
}
</style>
