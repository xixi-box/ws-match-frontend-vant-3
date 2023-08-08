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


//搜索功能
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
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

//搜索功能
const searchText = ref('');
const onSearch = async (val) => {
  await listTeam(val)
}

</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <team-card-list :teamList="teamList">
    </team-card-list>
    <van-empty v-if="!teamList||teamList.length<1" description="暂时没有创建队伍"></van-empty>
  </div>

</template>

<style scoped>
#teamPage {

}
</style>
