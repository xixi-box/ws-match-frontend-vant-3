<script setup lang="ts">
//跳转到
import {useRouter} from "vue-router";

import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";

const router = useRouter();

const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}
//tab栏
const active = ref('public');
//搜索功能
const searchText = ref('');
/**
 * @param
 * @param name
 */
const onTabChange = (name) => {
  if (name === 'public') {
    listTeam(searchText.value, 0)
  } else {
    listTeam(searchText.value, 2)
  }
}
//搜索功能
/**
 *
 * @param val
 * @param status
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
    Toast.success("刷新成功");
  } else {

    Toast.fail('刷新失败');
  }
}

const teamList = ref([]);
//页面加载只触发一次
onMounted(async () => {
      await listTeam('');
    }
)

const onSearch = async (val) => {
  await listTeam(val)
}

</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <div style="margin-bottom: 16px"/>
    <van-button type="primary" icon="plus" class="add-button" @click=doJoinTeam></van-button>
    <team-card-list :teamList="teamList">
    </team-card-list>
    <van-empty v-if="!teamList||teamList.length<1" description="搜索结果为空"></van-empty>
  </div>

</template>

<style scoped>
#teamPage {

}
</style>
