<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref, watch, watchEffect} from "vue";


import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";


const route = useRoute()


const userList = ref([])
const isMatchMode = ref<boolean>(false);
const loading = ref(true);
/**
 * @param加数
 */
const loadData = async () => {
  let userListData: any[];
  loading.value = true;
  //心动模式
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num
      },
    }).then(function (response) {
      console.log('/user/match 成功', response);
      return response?.data;
    }).catch(function (error) {
      console.error('/user/match  失败', error);
    })
  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    }).then(function (response) {
      console.log('/user/recommend 成功', response);
      return response?.data?.records;
    }).catch(function (error) {
      console.error('/user/recommend  失败', error);
    })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

//监听变量的变化
watchEffect(() => {
  loadData();
})

</script>

<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"></user-card-list>
  <van-empty v-if="!userList||userList.length<1" description="数据为空"></van-empty>
</template>

<style scoped>

</style>
