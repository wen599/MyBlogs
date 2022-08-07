import Toast from '@/lib/Toast/Toast.vue'
import { createVNode, render } from 'vue'
type Options={
    time?:number,
    content?:string,
    type?:'success'|'warning'|'message'|'error'
    close?:()=>void,
}
export const toast = (options:Options|string) => {
  let container = document.querySelector('.wheel-toast-container')
  if (container === null) {
    container = document.createElement('div')
    container.className = 'wheel-toast-container'
    document.body.appendChild(container)
  }
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }
  const userClose = options.close
  options.close = () => {
    userClose?.()
    div.remove()
    if (container?.children.length === 0) {
      container.remove()
    }
  }
  const div = document.createElement('div')
  const node = createVNode(Toast, options)
  render(node, div)
  container.appendChild(div.firstChild!)
}
