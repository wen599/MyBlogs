<template>
  <div class="container">
    <Title></Title>
    <div class="img">
      <img src="../../public/img/90c0522a3d32c96b818eb66fcd68f38.jpg">
    </div>
    <p class="introduce">小文 @ 成都,无业</p>
    <h3>找到我</h3>
    <ul>
      <li>微信:lxw__599</li>
      <li>Github:<a href="https://github.com/wen599/MyBlogsApi">github.com/wen599</a></li>
      <li>邮箱:601577921@qq.com</li>
    </ul>
    <h3>关于本站</h3>
    <ul>
      <li>本站只为记录平时学习,内容仅供参考.</li>
      <li>如果文章内容有误,可以联系我,当然也可以忽视它</li>
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
.introduce{
  line-height: 50px ;
}
h3{
  line-height: 50px;
}
ul>li{
  margin-left: 35px;
  line-height: 30px;
}
</style>
