<template>
    <div class="wheel-popover-container">
      <transition name="wheel-popover-fade">
        <div class="wheel-popover-content" v-if="visible" :class="'wheel-popover-'+positionClass">
          <slot name="content"></slot>
        </div>
      </transition>
        <div class="wheel-popover-title" @click="visible=!visible">
            <slot>
                <Button>测试popover</Button>
            </slot>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from 'vue'
import Button from '@/lib/Button.vue'
type Props={
  placement?:'left'|'right'|'top'|'bottom'
}
const props = withDefaults(defineProps<Props>(), {
  placement: 'top'
})
// 控制content的位置类名
const positionClass = computed(() => {
  return props.placement
})

// 控制content的显示
const visible = ref(false)
watch(visible, (newVal) => {
  setTimeout(() => {
    if (newVal) {
      document.addEventListener('click', function click () {
        visible.value = false
        document.removeEventListener('click', click)
      })
    }
  }, 50)
})

</script>

<style lang='scss'>
.wheel-popover-container{
  display: inline-block;
  position: relative;
}
//content不同方向
%before{
  display: block;
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-style: solid;
  border-width: 1px;
  border-color: transparent #eee #eee transparent ;
  box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
  z-index: 12;

}
.wheel-popover-content{
  position: absolute;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
  z-index: 2;
  &.wheel-popover-top{
    left: 0;
    bottom: calc(100% + 15px);
    &:before{
      @extend %before;
      left: 10px;
      bottom: -5px;
      transform: rotate(45deg);
    }
  }

  &.wheel-popover-left{
    top: 0;
    right:calc(100% + 15px);
    &:before{
      @extend %before;
      top: 5px;
      right: -5px;
      transform: rotate(-45deg);
    }
  }

  &.wheel-popover-right{
    top: 0;
    left:calc(100% + 15px);
    &:before{
      @extend %before;
      top: 5px;
      left: -5px;
      transform: rotate(135deg);
      box-shadow: none;
    }
  }
  &.wheel-popover-bottom{
    top: calc(100% + 15px);
    left:0;
    &:before{
      @extend %before;
      top: -5px;
      left: 10px;
      transform: rotate(225deg);
      box-shadow: none;
    }
  }
}

// 动画
.wheel-popover-fade-enter-from,
.wheel-popover-fade-leave-to{
  opacity: 0;
}
.wheel-popover-fade-enter-active,
.wheel-popover-fade-leave-active{
  transition: opacity 250ms;
}
</style>
