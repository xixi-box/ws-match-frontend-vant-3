<template>
  <van-nav-bar :title="title" left-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>


  <div id="content">
    <router-view/>
  </div>


  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>
<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";
import routes from "../config/route.ts";


const router = useRouter();
const title = ref('伙伴匹配');
const route = useRoute();
const DEFAULT_TITLE = "伙伴匹配";
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;

})


const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  router.push('/search')
}
ref('index');


//默认高亮
const onChange = (index) => Toast(`标签 ${index}`);
</script>


<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
