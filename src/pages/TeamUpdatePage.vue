<script setup lang="ts">
//跳转到
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

//控制页面跳转
const router = useRouter();

//获取当前页面路由信息
const route = useRoute();
//默认不展示日期选择器
// 展示日期选择器
const showPicker = ref(false);


const minDate = new Date();
const addTeamData = ref({});
const id = route.query.id;

//获取之前的用户信息
onMounted(async () => {
  if (id <= 0) {
    Toast.fail('获取队伍信息失败');
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
    Toast.success("刷新成功");
  } else {
    Toast.fail('刷新失败');
  }
})
//提交
const doSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }

  const res = await myAxios.post("/team/update", postData);

  if (res?.code === 0 && res.data) {
    await router.push(
        {
          path: '/team',
          replace: true
        }
    );
    Toast('更新成功')
  } else {
    Toast('更新失败')
  }
}
</script>

<template>
  <div id="teamAddPage">
    <van-form @submit="doSubmit">
      <van-cell-group inset>

        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />


        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />


        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              v-model="addTeamData.expireTime"
              @confirm="showPicker = false"
              type="datetime"
              title="请选择过期时间"
              :min-date="minDate"
          />
        </van-popup>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field v-if="Number(addTeamData.status)===2"
                   v-model="addTeamData.password"
                   type="password"
                   name="password"
                   label="密码"
                   placeholder="请输入密码"
                   :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>

      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<style scoped>
#teamAddPage {

}
</style>