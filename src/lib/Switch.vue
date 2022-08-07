<template>
    <div class="wheel-switch-container" @click="changeState" :class="{disabled:attr.disabled}">
      <span class="wheel-inactive-text" v-if="props.inactiveText" :style="props.modelValue?'':{color:onColor}" >{{props.inactiveText}}</span>
      <div class="wheel-switch-content"
           :class="{'close':!props.modelValue}"
           >
        <div class="wheel-switch-circle"  :class="isLoading?'switch-loading':''"></div>
      </div>
      <span class="wheel-active-text"  v-if="props.activeText" :style="props.modelValue?{color:onColor}:''">{{props.activeText}}</span>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, useAttrs } from 'vue'

type Props={
    modelValue?:boolean
    switchOnColor?:string
    switchOffColor?:string
    size?:'large' | 'default' | 'small'
    switchCircleColor?:string
    activeText?:string
    inactiveText?:string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  switchOnColor: '#409eff',
  switchOffColor: '#dcdfe6',
  size: 'default',
  switchCircleColor: '#fff'
})
const attr = useAttrs()

const emit = defineEmits(['update:modelValue'])
const onColor = ref(props.switchOnColor)
let changeState:(()=>void) | undefined = () => {
  emit('update:modelValue', !props.modelValue)
}

const switchHeight = computed(() => {
  if (props.size === 'large') return '16px'
  if (props.size === 'small') return '24px'
  return '20px'
})

const cursor = ref('pointer')
const isLoading = ref(false)

if (attr.disabled === '' || attr.disabled === true || attr.disabled === 'true') {
  changeState = undefined
  cursor.value = 'no-drop'
  onColor.value = 'rgb(225,225,225)'
}
if (attr.loading === '' || attr.loading === true || attr.loading === 'true') {
  changeState = undefined
  cursor.value = 'no-drop'
  isLoading.value = true
}

</script>

<style lang='scss'>
@import '@/assets/iconfont/iconfont.css';
//transition time
$time:0.5s;

//container
$switch-height:v-bind(switchHeight);
$switch-width:calc(v-bind(switchHeight)*2);
$switch-on-color:v-bind(onColor);
$switch-border-radius:calc(v-bind(switchHeight) / 2);

//switch-circle
$switch-circle-height:calc(v-bind(switchHeight) - 4px);
$switch-circle-background-color:v-bind(switchCircleColor);
$switch-circle-border-radius:calc((v-bind(switchHeight) - 4px)/2);

//off
$switch-off-color:v-bind(switchOffColor);
$switch-off-circle-left:calc(100% - v-bind(switchHeight) + 4px - 2px);

//text
$text-font-size:calc(v-bind(switchHeight) - 6px);
$text-font-color:#494a4c;

//cursor
$cursor:v-bind(cursor);

.wheel-switch-container{
  vertical-align: top;
  display: inline-flex;
}

.wheel-switch-content{
  display: inline-block;
  width:$switch-width;
  height:$switch-height;
  background-color:$switch-on-color;
  border-radius:$switch-border-radius;
  position: relative;
  transition: background-color 0.5s;
  cursor:$cursor;
  .wheel-switch-circle{
    position: absolute;
    left: $switch-off-circle-left;
    top: 2px;
    width: $switch-circle-height;
    height:$switch-circle-height;
    background-color: $switch-circle-background-color;
    border-radius: $switch-circle-border-radius ;
    transition: left $time;
    &.switch-loading{
      &:before{
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60%;
        height: 60%;
        border-width: 1px;
        border-style: solid;
        border-color: $text-font-color $text-font-color $text-font-color transparent;
        border-radius: $switch-circle-border-radius;
        animation: switch-rotate 1s infinite linear;
      }
  }
  }
}
.close{
  background-color:$switch-off-color;
  >.wheel-switch-circle{
    left: 2px;
  }
}

.wheel-inactive-text,
.wheel-active-text {
  font-size: $text-font-size;
  margin: 0 10px;
  color: $text-font-color;
  transition: color $time;
  cursor: $cursor;
}

@keyframes switch-rotate {
  from {
    transform: translate(-50%,-50%) rotateZ(0);
  }
  to{
    transform: translate(-50%,-50%) rotateZ(360deg);
  }
}

</style>
