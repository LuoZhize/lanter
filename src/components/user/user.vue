<template>
    <div class="register-wrapper">
      <div class="input">
        <label>用户名:</label>
        <input type="text"
               placeholder="请输入用户名"
               v-model="uName" />
        <p class="hint"
              v-if="this.uName.length < 5 || this.uName.length > 12">请输入5-12位汉子、英文</p>
      </div>
      <div class="input">
        <label>密码:</label>
        <input type="password"
               placeholder="请输入密码"
               v-model="pw" />
        <p class="hint"
              v-if="this.pw.length < 8 || this.pw.length > 20">请输入8-20位数字、英文</p>
      </div>
      <div class="input">
        <label>确认密码:</label>
        <input type="password"
               placeholder="请重新输入密码"
               :input="cgPass()"
               v-model="cg" />
        <p class="hint" v-if="this.cg.length > 0">{{cgText}}</p>
      </div>
      <div class="register">
        <input type="button" value="注册" @click="register" />
      </div>
    </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      uName: '',
      pw: '',
      cg: '',
      cgText: '',
      passCg: false,
    };
  },
  methods: {
    cgPass() {
      this.$nextTick(() => {
        if (this.cg !== this.pw) {
          this.cgText = '两次密码不一致，请重新输入';
        } else {
          this.cgText = '';
          this.passCg = true;
        }
      });
    },
    register() {
      if (this.uName.length >= 5 && this.passCg) {
        this.$axios.post('https://todo.lanternfish.ai/user', {
          username: this.uName,
          password: this.pw,
          name: 'lanternLzz',
        }).then(res => {
          console.log(res.data.id);
        });
        this.$router.push({
          name: 'auth',
          params: {
            name: this.uName,
            id: this.pw,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
  .register-wrapper {
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
  .register input {
    width: 300px;
    height: 40px;
  }
</style>
