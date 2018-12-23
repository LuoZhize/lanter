<template>
  <div class="login-wrapper">
    <div class="input">
      <label>用户名:</label>
      <input type="text"
             placeholder="请输入用户名"
             v-model="uName" />
      <p class="hint"
         v-if="this.uName !== this.$route.params.name">请输入5-12位汉子、英文</p>
    </div>
    <div class="input">
      <label>密码:</label>
      <input type="password"
             placeholder="请输入密码"
             v-model="pw" />
      <p class="hint"
         v-if="this.pw !== this.$route.params.id">请输入8-20位数字、英文</p>
    </div>
    <div class="login">
      <input type="button" value="登录" @click="loginBtn" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'auth',
  data() {
    return {
      uName: '',
      pw: '',
    };
  },
  methods: {
    loginBtn() {
      if (this.uName === this.$route.params.name && this.pw === this.$route.params.id) {
        this.$axios.post('https://todo.lanternfish.ai/auth', {
          username: 'lanternfish',
          password: 'lanternfish',
        }).then(res => {
          window.localStorage.setItem('TOKEN', res.data.token);
        });
        this.$router.push({
          name: 'todo',
        });
      }
    },
  },
};
</script>

<style scoped>
  .login-wrapper {
    position: fixed;
    width: 320px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .input {
    width: 100%;
    height: 100%;
    padding: 5px 0;
  }
  label {
    display: inline-block;
    width: 80px;
    text-align: right;
    overflow: hidden;
  }
  input {
    width: 190px;
    height: 30px;
    margin: 10px 5px 10px 10px;
    padding: 3px 10px;
    font-size: 16px;
    border: 0 solid transparent;
  }
  .hint {
    text-align: right;
    font-size: 10px;
    color: red;
    margin: 0;
    padding-right: 10px;
  }
  .login input {
    width: 300px;
    height: 40px;
  }
</style>
