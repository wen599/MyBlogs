<template>
  <div class="container">
  <Title></Title>
    <div class="search">
      <h3>所有文章</h3>
      <div>
        <Button class="create" @click="gotoCreate">新增</Button>
        <WheelInput @input="inputChange"></WheelInput>
      </div>
    </div>
    <ul>
      <li class="article"  v-for="article in articleList" :key="article.id">
        <div class="name" @click="gotoDetail(article.id)">{{ article.name }}</div>
        <div>
          <span class="time">{{ formatDate(article.time)}}</span>
          <Button @click="gotoEdit(article.id)">修改</Button>
          <Button @click="clickDelete(article.id)">删除</Button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import Button from '@/lib/Button.vue'
import Title from '@/components/Manage/Title.vue'
import WheelInput from '@/lib/WheelInput.vue'
import { useRouter } from 'vue-router'
import { findAllArticle, deleteArticle, findKeyword } from '@/request/request'
import { toast } from '@/lib/Toast/Toast'
import { formatDate } from '@/Uitl/Util'
import { showDialog } from '@/lib/Dialog'

const router = useRouter()
const gotoCreate = () => {
  router.push('/create')
}
type articleObj={
  id:number,
  time:string,
  name:string
}
const articleList:articleObj[] = reactive([])
const getArticleList = () => {
  const response = findAllArticle()
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
getArticleList()

const gotoEdit = (id:number) => {
  router.push({
    path: '/edit',
    query: {
      id
    }
  })
}

const clickDelete = (id:number) => {
  showDialog({
    title: '删除',
    content: '确认删除?',
    confirm: () => {
      deleteArticle(id).then((res:{status:number, message:string}) => {
        toast({
          type: res.status === 0 ? 'success' : 'error',
          time: 1000,
          content: res.message
        })
      })
      getArticleList()
      return true
    }
  })
}

const gotoDetail = (id:number) => {
  router.push({
    path: '/detail',
    query: {
      id
    }
  })
}

// 输入框的值更改时 发送请求查询
let flog: ReturnType<typeof setTimeout> |null = null
const inputChange = (e:MouseEvent) => {
  if (flog !== null) {
    clearTimeout(flog)
  }
  flog = setTimeout(() => {
    const value:string = (e.target as HTMLInputElement).value
    if (value === '') {
      return getArticleList()
    }
    findKeyword(value).then((res:{status:number, message:string, result:[{id:number, name:string, time:string}]}) => {
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
      if (res.result) articleList.push(...res.result)
    })
  }, 300)
}
</script>

<style scoped lang='scss'>

.name{
  line-height: 32px;
  cursor: pointer;
  width: 300px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  &:hover{
    color: $fontColorHover;
  }
  @media (max-width: 900px) {
    width: 100px;
  }
}
ul{
  border-bottom: 1px solid #deeae6;
  >li{
    margin-left: 30px;
    @media (max-width: 900px) {
      margin-left: 10px;
    }
  }
}

.article{
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  position: relative;
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
.search{
  display: flex;
  justify-content: space-between;
  align-items: center;
  >div{
    display: flex;
  }
}
Button{
  margin-left: 10px;
}
.create{
  margin-right: 50px;
  @media (max-width: 900px) {
    margin-right: 10px;
  }
}
.time{
  display: inline;
  @media (max-width: 900px) {
  display: none;
  }
}

</style>
