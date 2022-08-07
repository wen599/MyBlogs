<template>
<div class="collapse-item" :class="visible?'collapse-active':''" ref="item">
  <div class="collapse-item-title" @click="visible=!visible">
    <div class="title-text">
      {{props.title}}
    </div>
    <div class="title-icon" :class="visible?'collapse-icon-rotate':''">
      <i  class="iconfont icon-xiangyou1"></i>
    </div>
  </div>
  <div class="collapse-item-content" >
    <slot></slot>
  </div>
</div>
</template>

<script setup lang='ts'>
import { defineProps, inject, onMounted, ref, toRef } from 'vue'

type Props={
  title?:string,
  name:string,
}
const props = withDefaults(defineProps<Props>(), {
  title: '默认标题'
})

const item = ref()
const height = ref('')
onMounted(() => {
  height.value = item.value.scrollHeight + 'px'
})
type VisibleObj ={
  [name:string]:boolean
}

const visibleObj = inject('visibleObj') as VisibleObj
const visible = toRef(visibleObj, props.name)
</script>

<style  lang='scss'>
.collapse-item{
  overflow: hidden;
  height: 50px;
  transition: all 250ms;
}
.collapse-item-title{
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  border-top:1px solid #ebeef5;
  cursor: pointer;
}
.collapse-item-content{
  line-height: 1.5em;
  padding-bottom: 10px;
}
.title-icon{
  width: 49px;
  text-align: center;
  transition:transform 250ms ;
}
.collapse-icon-rotate{
  transform: rotate(90deg);
}
.collapse-active{
  height: v-bind(height);
}
</style>
