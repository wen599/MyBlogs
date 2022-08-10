import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import '@/assets/css/reset.css'
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// @ts-ignore
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
// @ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// @ts-ignore
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import hljs from 'highlight.js'

// @ts-ignore
import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  codeHighlightExtensionMap: {
    vue: 'xml'
  }
})
VueMarkdownEditor.use(createCopyCodePlugin())

VMdPreview.use(githubTheme, {
  Hljs: hljs
})

createApp(App).use(router).use(VMdPreview).use(VueMarkdownEditor).mount('#app')
