<template>
  <div class="wheel-input-container" :class="props.error?'error':''">
    <input
        class="wheel-input"
        v-bind="attr"
        :value="props.value"
        @input="onInput"
    >
    <template v-if="props.error">
      <i class="iconfont icon-cuowu"></i>
      <span class="wheel-input-error-text" >{{props.error}}</span>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { useAttrs } from 'vue'
type Props={
  error?:string
  value?:string
}
const props = withDefaults(defineProps<Props>(), {
  error: '',
  value: ''
})
const attr = useAttrs()
const emit = defineEmits(['update:value', 'input'])
const onInput = (e:MouseEvent) => {
  emit('update:value', (e.target as HTMLInputElement).value)
  emit('input', e)
}
</script>
<script lang="ts">

export default {
  inheritAttrs: false
}
</script>

<style scoped lang='scss'>
$height:32px;
$border-color:#999;
$border-color-hover:#666;
$border-radius:4px;
$font-size:12px;
$box-shadow-color:rgba(0,0,0,0.5);
$disabled-color: #ccc;
$error-color:#f1453d;
.wheel-input{
  height: $height;
  border: 1px solid $border-color;
  border-radius:$border-radius ;
  padding: 0 8px;
  font-size: inherit;
  display: block;
  &:hover{
    border-color: $border-color-hover;
  }
  &:focus{
    outline: none;
    box-shadow: inset 0 1px 3px $box-shadow-color;
  }
  &[disabled],&[readonly]{
    color: $disabled-color;
    border-color: $disabled-color;
    cursor: not-allowed;
  }
}
.wheel-input-container{
  font-size: $font-size;
  display: flex;
  align-items: center;

  &.error{
    :not(:last-child){margin-right: 0.5em;}
    .wheel-input{
      border-color: $error-color;
    }
    span{
      color: $error-color;
    }
    .icon-cuowu{
      font-size: 14px;
      color: $error-color;
    }
    &:hover{
      border-color: $error-color;
    }
  }

  .wheel-input-error-text{
    font-size: inherit;
  }
}
</style>
