<template>
    <teleport to="body">
      <transition name="wheel-dialog-fade" :appear="true">
      <div  class="wheel-dialog-container" v-if="props.visible"  @click.self="closeMask">
        <div class="wheel-dialog-mask" >
          <div class="wheel-dialog-title">
            <div class="wheel-dialog-icon" @click.stop="closeDialog">
                <i class="iconfont icon-quxiao"></i>
            </div>
            <b>
              <slot name="title">默认标题</slot>
            </b>
          </div>
          <div class="wheel-dialog-content">
              <slot name="content">
                <p>默认内容</p>
                <p>默认内容</p>
                <p>默认内容</p>
              </slot>
          </div>
          <div class="wheel-dialog-footer">
              <Button class="wheel-dialog-cancel" @click.stop="no">取消</Button>
              <Button theme="primary" class="wheel-dialog-confirm" @click.stop="yes">确定</Button>
          </div>
        </div>
      </div>
      </transition>
    </teleport>
</template>

<script setup lang='ts'>
import Button from '@/lib/Button.vue'
type Props={
  visible?:boolean
  onClickMaskClose?:boolean
  confirm?:Function,
  cancel?:Function
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  onClickMaskClose: false
})

const emit = defineEmits(['update:visible'])

const closeDialog = () => {
  emit('update:visible', false)
}

const closeMask = () => {
  if (props.onClickMaskClose)closeDialog()
}
const yes = () => {
  props.confirm?.()
  closeDialog()
}
const no = () => {
  props.cancel?.()
  closeDialog()
}

</script>

<style  lang='scss'>
@import '@/assets/iconfont/iconfont.css';
$wd:'.wheel-dialog-';
#{$wd}container{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.2);
  z-index: 10;
  #{$wd}mask{
    position: absolute;
    left: 50%;
    top:  30%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    width: 520px;
    @media (max-width: 500px) {
      width: 80%;
    }
    #{$wd}title{
      padding: 16px 24px;
      font-size: 16px;
      line-height: 22px;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      >#{$wd}icon{
        position: absolute;
        width: 54px;
        height: 100%;
        right: 0;
        top: 0;
        text-align: center;
        line-height: 54px;
        >.iconfont{
          color: #b4b4b4;
          &:hover{
            color: #222222;
          }
        }
      }
    }
    #{$wd}content{
      padding: 24px;
      font-size: 14px;
      line-height: 20px;
      border-bottom: 1px solid #eeeeee;
    }
    #{$wd}footer{
      text-align: right;
      padding: 10px 16px;
    }
  }
}
#{$wd}cancel{
  margin-right: 10px;
}
.wheel-dialog-fade-enter-from,
.wheel-dialog-fade-leave-to {
  opacity: 0;
}
.wheel-dialog-fade-enter-active,
.wheel-dialog-fade-leave-active{
  transition: opacity 0.35s;
}
</style>
