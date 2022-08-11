<template>
  <div class="container">
    <Title></Title>
    <div class="img">
      <img src="../../public/img/c5f64a155714fb87c6e33eca7049100.png">
    </div>
    <h3>最新文章</h3>
    <ul class="article-list">
      <li class="article-item" v-for="item in articleList" :key="item.id">
          <p class="article-name" @click="gotoDetail(item.id)">{{ item.name }}</p>
          <p class="article-time">{{formatDate(item.time) }}</p>
      </li>

      <li class="article-item ">
        <h3 class="more"><router-link to="/article">更多文章...</router-link></h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import Title from '@/components/Title.vue'
import { findAllArticle } from '@/request/request'
import { toast } from '@/lib/Toast/Toast'
import { formatDate } from '@/Uitl/Util'
import { useRouter } from 'vue-router'

const router = useRouter()
type articleObj={
  id:number,
  time:string,
  name:string
}
const articleList:articleObj[] = reactive([])
const getArticleList = () => {
  const response = findAllArticle(10)
  response.then((res:{status:number, message:string, date?:articleObj[]}) => {
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
  })
}
const gotoDetail = (id:number) => {
  router.push({
    path: '/read',
    query: {
      id
    }
  })
}

getArticleList()

</script>

<style scoped lang='scss'>
.img{
  margin-top: 20px;
  >img{
    width: 100%;
  }
}
h3{
  margin: 20px 0 10px;

}

.article-list{
  padding-bottom:20px ;
  border-bottom: 1px solid #deeae6;
}
.article-item{
  line-height: 30px;
  display: flex;
  margin-left: 20px;
  justify-content: space-between;
  position: relative;
 >.article-name{
    cursor: pointer;
   &:hover{
     color: $fontColorHover;
   }
 }
  &:before{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background-color:$fontColor;
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
  }

}
.more{
  cursor: pointer;
  margin: 0;
  &:hover{
    color: $fontColorHover;
  }
}
</style>
