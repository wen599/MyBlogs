import { createApp, h, ref } from 'vue'
import Dialog from '@/lib/Dialog.vue'
type Options={
  title?:string
  content?:string
  confirm?:()=>void
  cancel?:()=>void
  onClickMaskClose?:boolean
}
export const showDialog = (options:Options) => {
  const visible = ref(true)
  const { title, confirm, cancel, content, onClickMaskClose } = options
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp({
    render () {
      return h(Dialog, {
        visible: visible.value,
        'onUpdate:visible': (date:boolean) => {
          if (date === false) {
            visible.value = false
            setTimeout(() => {
              app.unmount()
              div.remove()
            })
          }
        },
        onClickMaskClose,
        confirm,
        cancel
      }, {
        title () {
          return title
        },
        content () {
          return content
        }

      })
    }
  })
  app.mount(div)
}
