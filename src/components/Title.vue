<template>
  <div class="title">
    <h1 class="title-text">
      <router-link to="/home">呆萌小老二</router-link>
      <img class="portrait" src="src/assets/img/cbfb5836769ec991be9e3023c8af263.jpg"></h1>
    <div class="title-content">
      <div class="title-content-name">小文的个人博客</div>
      <div class="title-content-nav">
        <router-link to="/article" class="article">文章</router-link>
        <router-link to="/about" class="about">关于</router-link>
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.title-text{
  margin: 30px 0 20px;
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
  margin: 0;
  }
}
.portrait{
  margin-left: 20px;
  width: 100px;
  border-radius: 50px;
}
.title-content{
  display: flex;
  justify-content: space-between;

}
.about,
.article{
  padding: 10px;
  &:hover{
    color: $fontColorHover;
  }
}
</style>
