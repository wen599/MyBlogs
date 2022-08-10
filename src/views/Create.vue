<template>
  <div class="container">
      <Title></Title>
    <v-md-editor
        v-model="text"
        height="680px"
        class="edit"
        right-toolbar="preview  sync-scroll fullscreen"
        @save="save"></v-md-editor>
    <Dialog :confirm="clickConfirm" :cancel="clickCancel" v-model:visible="visible">
      <template #title>
         请输入文件名称
      </template>
      <template #content>
        <span style="margin-right: 10px">名称:</span><WheelInput v-model:value="articleName"></WheelInput>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang='ts'>
import Title from '@/components/Manage/Title.vue'
import { toast } from '@/lib/Toast/Toast'
import Dialog from '@/lib/Dialog.vue'
import WheelInput from '@/lib/WheelInput.vue'
import { Ref } from 'vue'
import type { Create } from '@/request/request'
import { createArticle } from '@/request/request'
import { useRouter } from 'vue-router'

const router = useRouter()
const text = ref('')
const create = localStorage.getItem('create')
if (create) {
  text.value = create
}
const save = () => {
  if (text.value === '') {
    toast({
      time: 1000,
      content: '还没有输入任何内容',
      type: 'error'
    })
    return
  }
  visible.value = true
}
watch(text, (newVal) => {
  localStorage.setItem('create', newVal)
})
const articleName:Ref<string> = ref('')
const clickConfirm = () => {
  if (articleName.value === '') {
    toast({
      type: 'error',
      content: '请输入文件名称',
      time: 1000
    })
    return false
  }
  const data:Create = {
    time: Date.now(),
    content: text.value,
    name: articleName.value
  }
  const response = createArticle(data)
  response.then((res:{ status: number; message: string}) => {
    if (res.status === 0) {
      toast({
        type: 'success',
        time: 1000,
        content: res.message
      })
      text.value = ''
      articleName.value = ''
    } else {
      toast({
        type: 'error',
        time: 1000,
        content: res.message
      })
    }
  })
  router.push('/manage')
  return true
}
const visible:Ref<boolean> = ref(false)
const clickCancel = () => {
  visible.value = false
}
</script>

<style scoped lang='scss'>
.container{
  height: calc(100vh - 44px);
  //margin: 0;
}

</style>
