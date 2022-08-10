<template>
  <div class="container">
    <Title></Title>
    <v-md-editor v-model="text"  mode="preview" class="ttt"></v-md-editor>
    <div class="back" @click="gotoHome">返回</div>
  </div>
</template>

<script setup lang='ts'>
import Title from '@/components/Title.vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleContent } from '@/request/request'
import { toast } from '@/lib/Toast/Toast'
const route = useRoute()
const text = ref('')
const router = useRouter()
const id = Number(route.query.id)
getArticleContent(id).then((res:{status:number, message:string, data:[{content:string}]}) => {
  if (res.status !== 0) {
    return toast({
      type: 'error',
      time: 1000,
      content: res.message
    })
  }
  text.value = res.data[0].content
})
const gotoHome = () => {
  router.back()
}
</script>

<style scoped lang='scss'>
.back{
  width: 100px;
  line-height: 50px;
  cursor: pointer;
}
.v-md-editor--preview{
  margin-top: 20px;
}
</style>
