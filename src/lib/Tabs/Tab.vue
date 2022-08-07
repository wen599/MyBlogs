<template>
  <div class="wheel-tab">
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue'

type Props={
  title:string
}
defineProps<Props>()
</script>

<style scoped lang='scss'>

</style>
