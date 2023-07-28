<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute()
const userList = ref([])
import myAxios from "../plugins/myAxios.ts";

import qs from "qs";
import UserCardList from "../components/UserCardList.vue";

const {tags} = route.query
onMounted(async () => {

  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  }).then(function (response) {
    console.log('/user/search/tags', response);
    console.log('请求成功')
    return response?.data;
  }).catch(function (error) {
    console.error('/user/search/tags', error);
    console.log('请求失败');
  })
  console.log("----------------")
  console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }

})


const mockUser = {
  id: 1,
  username: '张三',
  userAccount: 123,
  profile: '个人简介',
  avatarUrl: 'https://img9.doubanio.com/icon/ul182680303-4.jpg',
  gender: 0,
  phone: '123456',
  email: '260@163.com',
  userRoles: 0,
  tags: ['java', 'python', 'c++'],
  createTime: new Date,
}

</script>

<template>
  <user-card-list :user-list="userList"></user-card-list>
  <van-empty v-if="!userList||userList.length<1" description="搜索结果为空"></van-empty>
</template>

<style scoped>

</style>