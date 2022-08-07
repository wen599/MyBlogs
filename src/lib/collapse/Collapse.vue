<template>
  <div class="wheel-collapse-container">
      <slot>默认内容</slot>
  </div>
</template>

<script setup lang='ts'>
import CollapseItem from '@/lib/collapse/CollapseItem.vue'
import { defineEmits, defineProps, provide, reactive, useSlots, watch, withDefaults } from 'vue'
type Props={
  modelValue?:Array<string>
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return []
  }
})

const slot = useSlots()
const emit = defineEmits(['change', 'update:modelValue'])

// 子组件检查
type VisibleObj ={
  [name:string]:boolean
}
const visibleObj:VisibleObj = reactive({})
slot.default?.().forEach((item) => {
  if (item.type !== CollapseItem) {
    throw new Error('collapse子组件必须是CollapseItem')
  }
  if (item.props?.name === undefined) {
    throw new Error('collapseItem组件必须有name属性')
  }
  const result:string|undefined = Object.keys(visibleObj).find((name:string) => name === item.props?.name
  )
  if (result !== undefined) {
    throw new Error('collapseItem组件name属性必须具有唯一性')
  }
  visibleObj[item.props?.name] = props.modelValue?.includes(item.props.name)
})

provide('visibleObj', visibleObj)
watch(visibleObj, () => {
  const names:string[] = []
  for (const key in visibleObj) {
    if (visibleObj[key] === true) {
      names.push(key)
    }
  }
  emit('update:modelValue', names)
  emit('change', names)
}, {
  deep: true
})
</script>

<style  lang='scss'>
.wheel-collapse-container{
  width: 100%;
  border-bottom:1px solid #ebeef5;

}
</style>
