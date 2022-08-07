<template>
  <button class="wheel-button" :class="{circle:attr.circle===''}">
    <slot name="icon">
      <i class="button-loading" v-if="isLoading()"></i>
    </slot>
    <slot>
        <i class="iconfont" v-if="attr.circle===''"  :class="props.icon"></i>
        <span v-else>Default</span>
    </slot>
  </button>
</template>

<script setup lang='ts'>
import { defineProps, reactive, useAttrs } from 'vue'
type Size='large'|'small'|'default'
type Theme='default'|'primary'|'success'|'info'|'warning'|'danger'
type Props={
  theme?:Theme
  icon?:string
  size?:Size
}
const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
  size: 'default'
})
const attr:{
  plain?:string
  round?:string
  circle?:string
  link?:string
  disabled?:string|boolean
  loading?:string|boolean
} = useAttrs()

class Color {
  main:string
  aside:string
  minor:string
  constructor (main:string, aside:string, minor:string) {
    this.main = main
    this.aside = aside
    this.minor = minor
  }
}
const whiteColor = new Color('#fff', '#dcdfe6', '#606266')

const blueColor = new Color('#409eff', '#a0cfff', '#ecf5ff')

const greenColor = new Color('#67c23a', '#95d475', '#f0f9eb')

const orangeColor = new Color('#e6a23c', '#eebe77', '#fdf6ec')

const blackColor = new Color('#909399', '#b1b3b8', '#f4f4f5')

const redColor = new Color('#f56c6c', '#f89898', '#fef0f0')

const button = reactive({
  buttonColor: whiteColor.main,
  buttonFontSize: '14px',
  buttonBorderColor: whiteColor.aside,
  buttonBorderRadius: '5px',
  buttonFontColor: whiteColor.minor,
  buttonPadding: '8px 15px',
  buttonCircleWidthHeight: '30px',
  buttonCursor: 'pointer',
  buttonPointerEvents: 'auto'
})

const buttonHover = reactive({
  buttonHoverColor: blueColor.minor,
  buttonHoverFontColor: blueColor.main,
  buttonHoverBorderColor: blueColor.aside
})

const setDisabled = () => {
  button.buttonPointerEvents = 'none'

  blueColor.main = '#a0cfff'
  blueColor.aside = '#d9ecff'
  blueColor.minor = '#ecf5ff'

  greenColor.main = '#b3e19d'
  greenColor.aside = '#e1f3d8'
  greenColor.minor = '#f0f9eb'

  blackColor.main = '#c8c9cc'
  blackColor.aside = '#e9e9eb'
  blackColor.minor = '#f4f4f5'

  orangeColor.main = '#f3d19e'
  orangeColor.aside = '#faecd8'
  orangeColor.minor = '#fdf6ec'

  redColor.main = '#fab6b6'
  redColor.aside = '#fde2e2'
  redColor.minor = '#fef0f0'
}
if (attr.disabled === '' || attr.disabled === 'true' || attr.disabled === true) {
  setDisabled()
}
const isLoading = () => {
  return attr.loading === '' || attr.loading === 'true' || attr.loading === true
}
if (isLoading()) {
  setDisabled()
}

const setType = (buttonColor:string, buttonHoverColor:string, buttonFontColor?:string) => {
  button.buttonColor = buttonColor
  button.buttonBorderColor = buttonColor

  buttonHover.buttonHoverColor = buttonHoverColor
  buttonHover.buttonHoverBorderColor = buttonHoverColor
  if (buttonFontColor) {
    button.buttonFontColor = buttonFontColor
    buttonHover.buttonHoverFontColor = buttonFontColor
  } else {
    button.buttonFontColor = '#fff'
    buttonHover.buttonHoverFontColor = '#fff'
  }
}
switch (props.theme) {
  case 'primary':
    setType(blueColor.main, blueColor.aside)
    break
  case 'danger':
    setType(redColor.main, redColor.aside)
    break
  case 'success':
    setType(greenColor.main, greenColor.aside)
    break
  case 'warning':
    setType(orangeColor.main, orangeColor.aside)
    break
  case 'info':
    setType(blackColor.main, blackColor.aside)
    break
  default:
}
switch (props.size) {
  case 'small':
    button.buttonPadding = '5px 11px'
    button.buttonFontSize = '12px'
    button.buttonCircleWidthHeight = '24px'
    break
  case 'large':
    button.buttonFontSize = '16px'
    button.buttonPadding = '12px 19px'
    button.buttonCircleWidthHeight = '40px'
    break
  default:
}

const setPlain = (color:Color) => {
  button.buttonFontColor = color.main
  button.buttonBorderColor = color.aside
  button.buttonColor = color.minor

  buttonHover.buttonHoverColor = color.main
  buttonHover.buttonHoverBorderColor = color.main
  buttonHover.buttonHoverFontColor = whiteColor.main
}
if (attr.plain === '') {
  switch (props.theme) {
    case 'primary':
      setPlain(blueColor)
      break
    case 'danger':
      setPlain(redColor)
      break
    case 'success':
      setPlain(greenColor)
      break
    case 'warning':
      setPlain(orangeColor)
      break
    case 'info':
      setPlain(blackColor)
      break
    default:
      button.buttonBorderColor = whiteColor.aside
      button.buttonColor = whiteColor.main
      buttonHover.buttonHoverFontColor = blueColor.main
      buttonHover.buttonHoverBorderColor = blueColor.main
  }
}
if (attr.round === '') {
  button.buttonBorderRadius = '20px'
}
if (attr.circle === '') {
  button.buttonBorderRadius = '20px'
  button.buttonPadding = '0'
}

const setLink = (color:Color) => {
  button.buttonColor = 'transparent'
  button.buttonFontColor = color.main
  button.buttonBorderColor = 'transparent'

  buttonHover.buttonHoverColor = blackColor.minor
  buttonHover.buttonHoverFontColor = color.main
  buttonHover.buttonHoverBorderColor = blackColor.minor
}
if (attr.link === '') {
  switch (props.theme) {
    case 'primary':
      setLink(blueColor)
      break
    case 'danger':
      setLink(redColor)
      break
    case 'success':
      setLink(greenColor)
      break
    case 'warning':
      setLink(orangeColor)
      break
    case 'info':
      setLink(blackColor)
      break
    default:
      button.buttonColor = 'transparent'
      button.buttonFontColor = whiteColor.minor
      button.buttonBorderColor = 'transparent'

      buttonHover.buttonHoverColor = blackColor.minor
      buttonHover.buttonHoverFontColor = whiteColor.minor
      buttonHover.buttonHoverBorderColor = blackColor.minor
  }
}

</script>

<style lang='scss'>
@import '@/assets/iconfont/iconfont.css';
$button-padding:v-bind('button.buttonPadding');
$button-color:v-bind('button.buttonColor');
$button-font-size:v-bind('button.buttonFontSize');
$button-border-color:v-bind('button.buttonBorderColor');
$button-border-radius:v-bind('button.buttonBorderRadius');
$button-font-color:v-bind('button.buttonFontColor');
$button-circle-width-height:v-bind('button.buttonCircleWidthHeight');
$button-cursor:v-bind('button.buttonCursor');
$button-pointer-events:v-bind('button.buttonPointerEvents');

$bh:'$button-hover';
$button-hover-color:v-bind('buttonHover.buttonHoverColor');
$button-hover-font-color:v-bind('buttonHover.buttonHoverFontColor');
$button-hover-border-color:v-bind('buttonHover.buttonHoverBorderColor');

$w:".wheel-";
 #{$w}button{
   padding: $button-padding;
   font-size: $button-font-size;
   background-color: $button-color;
   color: $button-font-color;
   outline: none;
   border-style: solid;
   border-width: 1px;
   border-color: $button-border-color;
   border-radius: $button-border-radius;
   line-height: 1;
   cursor: $button-cursor;
   pointer-events: $button-pointer-events;

   &:focus,
   &:hover{
      color: $button-hover-font-color;
      background-color: $button-hover-color;
      border-color: $button-hover-border-color;
   }
   &.circle{
     width: $button-circle-width-height;
     height: $button-circle-width-height;
     display: inline-flex;
     justify-content: center;
     align-items: center;
     >.iconfont{
       font-size: $button-font-size;
     }
   }
}
.button-loading{
  vertical-align: bottom;
  display: inline-block;
  width:$button-font-size;
  height:$button-font-size;
  border-width: 1px;
  border-style: solid;
  border-color: v-bind('whiteColor.main') v-bind('whiteColor.aside') v-bind('whiteColor.aside') transparent;
  border-radius:$button-font-size;
  animation: button-rotate 1s infinite linear;
}
@keyframes button-rotate {
  from {
    transform: rotateZ(0);
  }
  to{
    transform:  rotateZ(360deg);
  }
}
</style>
