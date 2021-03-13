<template>
  <div class="sb2">
    <img class="logoani" src="@/assets/img/logo.png" />
    <div id="remain">
      <img id="not" src="@/assets/img/not.png" />
      <input type="text" class="input_info" placeholder="id" v-model="id" />
      <input
        type="password"
        class="input_info"
        placeholder="password"
        v-model="password"
      />
      <button class="but_log_reg" @click="login">로그인</button>
      <button
        class="but_log_reg"
        style="background-color: black; color: white;"
      >
        <router-link to="/register">회원가입</router-link>
      </button>
      <img id="cop" src="@/assets/img/cop.png" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      id: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post("", {
          id: this.id,
          password: this.password
        })
        .then(res => {});
    }
  }
};
</script>
<style src="@/assets/css/login.css"></style>
