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
  user.value = await getCurrentUser();
})

const router = useRouter();
</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username"/>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
  </template>

</template>

<style scoped>

</style>