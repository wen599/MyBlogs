<template>
  <div class="container">
    <Title></Title>
    <div class="img">
      <img src="src/assets/img/c5f64a155714fb87c6e33eca7049100.png">
    </div>
    <h3>最新文章</h3>
    <ul class="article-list">
      <li class="article-item">
          <p class="article-name">测试</p>
          <p class="article-time">2022-06</p>
      </li>
      <li class="article-item">
        <p class="article-name">测试</p>
        <p class="article-time">2022-06</p>
      </li>
      <li class="article-item">
        <p class="article-name">测试</p>
        <p class="article-time">2022-06</p>
      </li>
      <li class="article-item ">
        <h3 class="more">更多文章</h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import Title from '@/components/Title.vue'
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
