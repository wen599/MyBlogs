<template>
  <div class="title">
    <h1 class="title-text">
      <router-link to="/manage">呆萌小老二</router-link>
      <img class="portrait" src="src/assets/img/cbfb5836769ec991be9e3023c8af263.jpg"></h1>
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
</style>
