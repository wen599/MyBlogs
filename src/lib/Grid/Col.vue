<template>
  <div class="wheel-grid-col" >
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, inject, ref } from 'vue'
type Proving={
  span?:number|string
  offset?:number|string
}
type Props={
  span?:number|string
  offset?:number|string
  xs?:Proving
  xm?:Proving
  md?:Proving
  lg?:Proving
  xl?:Proving
}

const props = defineProps<Props>()
const width = ref('100%')
const marginRight = ref('0')

// 根据数字获取百分数
const getPercent = (date:string|number) => {
  return Number(date) / 24 * 100 + '%'
}

// 根据span 获取 width
if (props.span) {
  width.value = getPercent(props.span)
}

// 根据offset 获取 marginRight
if (props.offset) {
  marginRight.value = getPercent(props.offset)
}

// gutter 的逻辑
const paddingLeftRight = ref('0')
const gutter = inject('gutter')
if (gutter) {
  paddingLeftRight.value = Number(gutter) / 2 + 'px'
}
// 响应式逻辑
const xsWidth = ref('')
const xsMarginRight = ref('')
const xmWidth = ref('')
const xmMarginRight = ref('')
const mdWidth = ref('')
const mdMarginRight = ref('')
const lgWidth = ref('')
const lgMarginRight = ref('')
const xlWidth = ref('')
const xlMarginRight = ref('')

// xl
if (props.xl?.span) {
  xlWidth.value = getPercent(props.xl.span)
} else {
  xlWidth.value = width.value
}
if (props.xl?.offset) {
  xlMarginRight.value = getPercent(props.xl.offset)
} else {
  xlMarginRight.value = marginRight.value
}

// lg
if (props.lg?.span) {
  lgWidth.value = getPercent(props.lg.span)
} else {
  lgWidth.value = xlWidth.value
}
if (props.lg?.offset) {
  lgMarginRight.value = getPercent(props.lg.offset)
} else {
  lgMarginRight.value = xlMarginRight.value
}
// md
if (props.md?.span) {
  mdWidth.value = getPercent(props.md.span)
} else {
  mdWidth.value = lgWidth.value
}
if (props.md?.offset) {
  mdMarginRight.value = getPercent(props.md.offset)
} else {
  mdMarginRight.value = lgMarginRight.value
}
// xm
if (props.xm?.span) {
  xmWidth.value = getPercent(props.xm.span)
} else {
  xmWidth.value = mdWidth.value
}
if (props.xm?.offset) {
  xmMarginRight.value = getPercent(props.xm.offset)
} else {
  xmMarginRight.value = xlMarginRight.value
}
// xs
if (props.xs?.span) {
  xsWidth.value = getPercent(props.xs.span)
} else {
  xsWidth.value = xlWidth.value
}
if (props.xs?.offset) {
  xsMarginRight.value = getPercent(props.xs.offset)
} else {
  xsMarginRight.value = xmMarginRight.value
}

</script>

<style lang='scss'>
  .wheel-grid-col{
    width:v-bind(width);
    margin-right: v-bind(marginRight);
    padding: 0 v-bind(paddingLeftRight);
    @media (max-width:1600px) {
      width:v-bind(xlWidth);
      margin-right: v-bind(xlMarginRight);
    }
    @media (max-width:1200px) {
      width:v-bind(lgWidth);
      margin-right: v-bind(lgMarginRight);
    }
    @media (max-width:992px) {
      width:v-bind(mdWidth);
      margin-right: v-bind(mdMarginRight);
    }
    @media (max-width:768px) {
      width:v-bind(xmWidth);
      margin-right: v-bind(xmMarginRight);
    }
    @media (max-width:576px) {
      width:v-bind(xsWidth);
      margin-right: v-bind(xsMarginRight);
    }
  }

</style>
