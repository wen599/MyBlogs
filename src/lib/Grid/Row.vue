<template>
<div class="wheel-grid-row">
  <slot></slot>
</div>
</template>

<script setup lang='ts'>
import Col from '@/lib/Grid/Col.vue'
import { useSlots, ref, provide } from 'vue'
type Props={
  gutter?:number|string
}
const props = withDefaults(defineProps<Props>(), {
  gutter: 0
})
const slot = useSlots()

// 先判断row 下面的子组件是不是col 如果不是直接报错
// 再判断col有没有span 没有row就不换行
const wrap = ref('nowrap')
slot.default?.()?.forEach((item) => {
  if (item.type !== Col) {
    throw new Error('Row 的子组件必须是Col')
  }
  if (item.props?.span) {
    wrap.value = 'wrap'
  }
})

// 先通过gutter的值给row来个-margin,再将gutter保存让col组件方便获取
const marginRightLeft = ref('0')
marginRightLeft.value = `-${Number(props.gutter) / 2}px`
provide('gutter', props.gutter)

//
</script>

<style  lang='scss'>
  .wheel-grid-row{
    display: flex;
    flex-wrap: v-bind(wrap);
    margin: 0 v-bind(marginRightLeft);
  }
</style>
