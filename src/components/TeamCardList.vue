<script setup lang="ts">


import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import defaultTeam from "../assets/defaultTeam.jpg"
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType[],
});

//加入队伍
const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join', {
    teamId: id,
  });
  if (res?.code === 0) {
    Toast.success('加入成功');
  } else {
    Toast.fail('加入失败' + (res.description ? `, ${res.description}` : ''));
  }
}
//

const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const router = useRouter();

//更新队伍 跳转到更新页面
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}


//退出队伍
/**
 * Update
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id,
  });
  if (res?.code === 0) {
    Toast.success('退出成功');
  } else {
    Toast.fail('退出失败' + (res.description ? `，${res.description}` : ''));

  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id: id,
  });
  if (res?.code === 0) {
    Toast.success('解散成功');
  } else {
    Toast.fail('解散失败' + (res.description ? `, ${res.description}` : ''));
  }
}

</script>

<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :thumb="defaultTeam"
        :desc="team.description"
        :title="`${team.name}`"

    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px ;margin-top:8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>

      <template #bottom>
        <div>
          {{ `最大人数:` + team.maxNum }}
        </div>
        <div v-if="team.expireTime">
          {{ `过期时间:` + team.expireTime }}
        </div>
        <div v-if="team.createTime">
          {{ `发布时间:` + team.createTime }}
        </div>

      </template>
      <template #footer>
        <van-button size="small" type="primary" v-if="team.userId!==currentUser?.id" plain @click="doJoinTeam(team.id)">
          加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" type="primary" plain
                    @click="doUpdateTeam(team.id)">
          更新队伍
        </van-button>
        <van-button size="small" type="primary" v-if="team.userId!==currentUser?.id" plain @click="doQuitTeam(team.id)">
          退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                    @click="doDeleteTeam(team.id)">
          解散队伍
        </van-button>
      </template>
    </van-card>

  </div>

</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
