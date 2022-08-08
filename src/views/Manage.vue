<template>
  <div class="container">
    <div class="title">
      <h1 class="title-text">
        <router-link to="/manage">呆萌小老二</router-link>
        <img class="portrait" src="src/assets/img/cbfb5836769ec991be9e3023c8af263.jpg"></h1>
    </div>
    <div class="search">
      <h3>所有文章</h3>
      <div>
        <Button class="create">新增</Button>
        <wheel-input></wheel-input>
      </div>
    </div>
    <ul>
      <li class="article">
        <div class="name">假装是名字</div>
        <div>
          <Button>修改</Button>
          <Button>删除</Button>
        </div>
      </li>
      <li class="article">
        <div class="name">假装是名字</div>
        <div>
          <Button>修改</Button>
          <Button>删除</Button>
        </div>
      </li>
      <li class="article">
        <div class="name">假装是名字</div>
        <div>
          <Button>修改</Button>
          <Button>删除</Button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import Button from '@/lib/Button.vue'
import WheelInput from '@/lib/WheelInput.vue'
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
.name{
  line-height: 32px;
  cursor: pointer;
  &:hover{
    color: $fontColorHover;
  }
}
ul{
  border-bottom: 1px solid #deeae6;
  >li{
    margin-left: 30px;
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
}
</style>
