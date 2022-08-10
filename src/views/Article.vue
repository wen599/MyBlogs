<template>
  <div class="container">
    <Title></Title>
    <p class="text">总计<span class="text-number">{{articleList.length}}</span>篇文章</p>
    <ul>
      <li class="list-item" v-for="item in list" :key="item.month">
          <h2>{{item.month+'('+item.children.length+')'}}</h2>
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
import { findAllArticle } from '@/request/request'
import { toast } from '@/lib/Toast/Toast'
import { formatDate } from '@/Uitl/Util'
import router from '@/router'

type Article={
  id:number,
  time:string | number,
  name:string
}
const articleList:Article[] = reactive([])
const list:{month:string, children:Article[]}[] = reactive([])

const getArticleList = () => {
  const response = findAllArticle()
  response.then((res:{status:number, message:string, date?:Article[]}) => {
    if (res.status === 1) {
      toast({
        type: 'error',
        content: res.message,
        time: 1000
      })
    }
    while (articleList.length > 0) {
      articleList.shift()
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
getArticleList()

const gotoRead = (id:number) => {
  router.push({
    path: '/read',
    query: {
      id
    }
  })
}
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
</style>
