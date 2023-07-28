<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//   id: 1,
//   username: '张三',
//   userAccount: '123456',
//   avatarUrl: 'https://img9.doubanio.com/icon/ul182680303-4.jpg',
//   gender: '男',
//   phone: '123456',
//   email: '260@163.com',
//   tags: ['java', 'python'],
//   createTime: new Date,
// }
const user = ref();

onMounted(async () => {
  user.value= await getCurrentUser();
})

const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>

<template>
  <template v-if="user">
    <van-cell title="用户名" :value="user.username" is-link to="/user/edit"
              @click="toEdit('username','用户名',user.username)"/>
    <van-cell title="账号" :value="user.userAccount" value="内容"/>
    <van-cell title="头像" is-link to="/user/edit" arrow-direction="down" value="内容">
      <img style=height:48px :src=user.avatarUrl alt="">
    </van-cell>
    <van-cell title="性别" :value="user.gender" is-link to="/user/edit" arrow-direction="down"
              @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" :value="user.phone" is-link to="/user/edit" arrow-direction="down"
              @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" :value="user.email" is-link to="/user/edit" arrow-direction="down"
              @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="注册时间" :value="user.createTime" arrow-direction="down" value="内容"/>

  </template>

</template>

<style scoped>

</style>