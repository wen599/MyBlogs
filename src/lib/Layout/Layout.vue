<template>
  <div class="wheel-layout">
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { ref, useSlots } from 'vue'
import Layout from '@/lib/Layout/Layout.vue'
import Aside from '@/lib/Layout/Aside.vue'
import Content from '@/lib/Layout/Content.vue'
import Header from '@/lib/Layout/Header.vue'
import Footer from '@/lib/Layout/Footer.vue'
const slot = useSlots()

const direction = ref('column')
slot.default?.().forEach((item) => {
  if (item.type !== Layout && item.type !== Footer && item.type !== Header && item.type !== Content && item.type !== Aside) {
    throw new Error('layout子组件必须是Layout或Header或Aside或Content或Footer')
  }
  if (item.type === Aside) {
    direction.value = 'row'
  }
})

</script>

<style  lang='scss'>
.wheel-layout{
  display: flex;
  flex-direction:v-bind(direction);
  flex-grow: 1;
}
</style>
