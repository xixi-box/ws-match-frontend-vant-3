<script setup lang="ts">


import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";

const route = useRoute();
const router = useRouter()
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    alert('用户未登录');
    return;
  }

  //提交到后台
  const res = await myAxios.post('/user/update', {
    'id': currentUser.id,
    [editUser.value.editKey as string]:
    editUser.value.currentValue,

  })


  if (res.code === 0 && res.data > 0) {
    router.back()
  } else {
    alert('修改错误')
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交修改
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>