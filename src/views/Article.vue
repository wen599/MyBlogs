<template>
  <div class="container">
    <Title></Title>
    <div class="input">
      <p class="text">总计<span class="text-number">{{articleList.length}}</span>篇文章</p>
      <wheel-input v-model:value="inputValue" @input="inputChange"></wheel-input>
    </div>
    <ul>
      <li class="list-item" v-for="item in list" :key="item.month">
          <h4>{{item.month+'('+item.children.length+')'}}</h4>
          <ul>
            <li v-for="i in item.children" :key="i.id" class="article">
              <div class="name" @click="gotoRead(i.id)">
                {{i.name}}
              </div>
              <div class="time">
                {{i.time}}
              </div>
            </li>
          </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import Title from '@/components/Title.vue'
import { findAllArticle, findKeyword } from '@/request/request'
import { toast } from '@/lib/Toast/Toast'
import { formatDate } from '@/Uitl/Util'
import router from '@/router'
import WheelInput from '@/lib/WheelInput.vue'

type Article={
  id:number,
  time:string | number,
  name:string
}
const articleList:Article[] = reactive([])
const list:{month:string, children:Article[]}[] = reactive([])

const getArticleList = () => {
  while (articleList.length > 0) {
    articleList.shift()
  }
  while (list.length > 0) {
    list.shift()
  }

  let response = findAllArticle()
  if (inputValue.value.trim() !== '') {
    response = findKeyword(inputValue.value)
  }
  response.then((res:{status:number, message:string, date?:Article[], result?:Article[]}) => {
    if (res.result !== undefined && res.result.length !== 0) {
      res.date = res.result
    }
    if (res.status === 1) {
      toast({
        type: 'error',
        content: res.message,
        time: 1000
      })
    }
    if (res.date) articleList.push(...res.date)
    articleList.forEach((article:Article) => {
      article.time = formatDate(article.time)
      const result = list.find((item:{month:string, children:Article[]}) => {
        return item.month === (article.time as string).substring(0, 7)
      })
      if (result) {
        result.children.push(article)
      } else {
        list.push({
          month: (article.time as string).substring(0, 7),
          children: reactive([article])
        })
      }
    })
  })
}

const gotoRead = (id:number) => {
  router.push({
    path: '/read',
    query: {
      id
    }
  })
}

const inputValue = ref('')
let timer:ReturnType<typeof setTimeout>|null = null
const inputChange = () => {
  if (timer !== null) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    getArticleList()
  }, 1000)
}

getArticleList()
</script>

<style scoped lang='scss'>
.text{
  line-height: 50px;
}
.article{
  margin-left: 20px;
  display: flex;
  line-height: 30px;
  justify-content: space-between;
}
ul{
  list-style: none;
}
.name{
  cursor: pointer;
  &:hover{
    color: $fontColorHover;
  }
}
.input{
  display: flex;
  justify-content: space-between;
}
</style>
