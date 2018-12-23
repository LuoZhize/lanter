<template>
      <div class="home">
        <h2 class="text">主页</h2>
        <div class="fun-set">
          <input type="text" ref="newTitle" v-model="newadd"/>
          <button class="btn-set" @click="newAdd()">新增</button>
          <p class="hint"
             v-if="this.newadd.length < 1 || this.newadd.length > 20">请输入1-20位数字、英文</p>
        </div>
        <div class="list-wrapper">
          <ul class="memorandum">
            <li class="item" v-for="(item, index) in this.datas" :key="index">
              <p class="title">{{item.title}}</p>
              <p class="id">{{item.id}}</p>
              <button :name="[item.id, item.title]"
                      class="remove-btn" @click="removeItem($event)">删除</button>
              <button :name="[item.id, item.title]"
                      class="remove-btn" @click="changeItem($event)">修改</button>
            </li>
          </ul>
        </div>
      </div>
</template>

<script>
const token = window.localStorage.getItem('TOKEN');
export default {
  name: 'home-page',
  data() {
    return {
      newadd: '',
      datas: [],
    };
  },
  beforeCreate() {
    const userArr = [];
    this.$axios({
      method: 'get',
      url: 'https://todo.lanternfish.ai/todo',
      headers: {
        Authorization: token,
      },
    }).then((rsp) => {
      this.datas = rsp.data;
      // for (let i = 0; i < this.datas.length; i += 1) {
      //   userArr.push(rsp.data[i].user.id);
      // }
    }).catch((err) => {
      console.log(err);
    });
    // this.useId = userArr;
  },
  methods: {
    newAdd() {
      const NEW_TITLE = this.$refs.newTitle.value;
      this.$axios({
        method: 'post',
        url: 'https://todo.lanternfish.ai/todo',
        data: {
          title: NEW_TITLE,
        },
        headers: {
          Authorization: token,
        },
      }).then((rsp) => {
        console.log(rsp);
      }).catch((err) => {
        console.log(err);
      });
    },
    removeItem(e) {
      const TITLE = e.target.name.split(',')[1];
      const TITLE_ID = e.target.name.split(',')[0];
      this.$axios({
        method: 'DELETE',
        url: 'https://todo.lanternfish.ai/todo/:id' + TITLE_ID,
        headers: {
          Authorization: token,
        },
      }).then((rsp) => {
        console.log(rsp);
      }).catch((err) => {
        console.log(err);
      });
    },
    changeItem(e) {
      const TITLE = e.target.name.split(',')[1];
      const TITLE_ID = e.target.name.split(',')[0];
      this.$axios({
        method: 'PUT',
        url: 'https://todo.lanternfish.ai/todo/:id' + TITLE_ID,
        data: {
          title: TITLE,
        },
        headers: {
          Authorization: token,
        },
      }).then((rsp) => {
        console.log(rsp);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
  .home {
    text-align: center;
  }
  .item {
    width: 80%;
    height: 100%;
    text-align: left;
    margin: 0 auto;
    list-style: none;
  }
  .title {
    width: 30%;
    overflow: hidden;
    display: inline-block;
  }
  .id {
    width: 50%;
    display: inline-block;
    overflow: hidden;
  }
  .remove-btn {
    overflow: hidden;
    float: right;
    margin: 16px;
  }
  .hint {
    text-align: center;
    font-size: 10px;
    color: red;
    margin: 0;
    padding-right: 10px;
  }
</style>
