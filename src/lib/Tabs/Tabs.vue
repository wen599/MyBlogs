<template>
  <div class="wheel-tabs">
    <div class="wheel-tabs-title-container" ref="container">
      <div class="wheel-tabs-title-item"
           :class="props.selected===item?'selected':''"
           v-for="(item,index) in titles"
           :key="index"
           @click="changeSelect(item)"
           :ref="(el:any) => {if (el) divs[index] = el}"
      >{{item}}
      </div>
      <div class="wheel-indicator" ref="indicator"></div>
    </div>

    <div class="wheel-tabs-content-container">
<!--      直接通过slot拿到所有的子节点 然后通过component 组件渲染出来-->
      <template  v-for="(item,index) in childrenNode" :key="index">
        <component :is="item" v-if="item?.props?.title===props.selected">

        </component>
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Tab from '@/lib/Tabs/Tab.vue'
import { onMounted, onUpdated, reactive, Ref, ref, useSlots } from 'vue'
type Props={
  selected:string
}
// 初始化
const slot = useSlots()
const props = defineProps<Props>()
const emit = defineEmits(['update:selected'])

// 拿到所有的子节点
const childrenNode = slot.default?.()

// 遍历子节点,保存titles
const titles:string[] = reactive([])
childrenNode?.forEach((item) => {
  // 如果子节点不是Tab,直接报错
  if (item.type !== Tab) {
    throw new Error('Tabs的子组件必须是Tab组件')
  }
  titles.push(item?.props?.title)
})
// 点击导航栏更改选中
const changeSelect = (title:string) => {
  emit('update:selected', title)
}

// 激活时候下面的横线逻辑
const divs:Ref<Element[]> = ref([])
const indicator = ref()
const container = ref()
const setIndicator = () => {
  // 找出类名含有selected的div
  const result = divs.value.find((item:Element) => {
    return item.classList.contains('selected')
  })
  // 设置下面横线的宽度为div的宽度和位置
  const { width, left: left2 } = (result as HTMLElement).getBoundingClientRect()
  const { left: left1 } = container.value.getBoundingClientRect()
  const left = left2 - left1
  indicator.value.style.width = width + 'px'
  indicator.value.style.left = left + 'px'
}
onMounted(setIndicator)
onUpdated(setIndicator)

</script>

<style scoped lang='scss'>
.wheel-tabs{
  font-size: 14px;
  padding: 0 20px;
}
.wheel-tabs-title-container{
  display: flex;
  line-height: 3;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  .wheel-tabs-title-item{
    cursor: pointer;
    margin-right: 20px;
    &.selected{
      color:#579bff;
    }
  }
}

.wheel-tabs-content-container{
  padding-top:10px;
}

.wheel-indicator{
  position: absolute;
  width: 100px;
  height: 2px;
  background-color:#579bff;
  bottom: 0;
  left: 0;
  transition: all 250ms;
}
</style>
