<template>
  <div class="container">
    <Title></Title>
    <v-md-editor v-model="text"  mode="preview" class="ttt"></v-md-editor>
    <footer>
      <div class="back" @click="gotoManage">返回首页</div>
      <div class="edit" @click="gotoEdit(id)">编辑</div>
    </footer>
  </div>
</template>

<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router'
import { getArticleContent } from '@/request/request'
import { toast } from '@/lib/Toast/Toast'
import Title from '@/components/Manage/Title.vue'

const router = useRouter()
const text = ref('')
const route = useRoute()
const id:number = Number(route.query.id)
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
const gotoManage = () => {
  router.push('/manage')
}
const gotoEdit = (id:number) => {
  router.push({
    path: '/edit',
    query: {
      id
    }
  })
}

</script>

<style scoped lang='scss'>
footer{
  display: flex;
  justify-content: space-between;
}
.edit,
.back{
  width: 100px;
  line-height: 50px;
  cursor: pointer;

}
.edit{
 text-align: right;
}

</style>
