<template>
  <div class="login-container">
    <h1 class="title">Login</h1>
    <div class="content">
        <div class="input">
          <div class="name">
            <span class="text">用户名:</span>
            <WheelInput
                class="wheel-input" type="text"
                v-model:value="userName"
                :error="userNameError"
                placeholder="账号"></WheelInput>
          </div>
          <div class="password">
            <span class="text">密码:</span>
            <WheelInput
                v-model:value="password"
                class="wheel-input"
                type="password"
                :error="passwordError"
                placeholder="密码"></WheelInput>
          </div>
        </div>
        <div class="button">
          <Button class="login" @click="login">登录</Button>
          <Button class="reset" @click="reset">重置</Button>
        </div>
      </div>
  </div>
</template>

<script setup lang='ts'>
import Button from '@/lib/Button.vue'
import WheelInput from '@/lib/WheelInput.vue'
import { toast } from '@/lib/Toast/Toast'
import { Ref } from 'vue'
import { loginRequest } from '@/request/request'
import router from '@/router'

const userName:Ref<string> = ref('admin')
const userNameError:Ref<string> = ref('')
const password:Ref<string> = ref('lxw170108')
const passwordError:Ref<string> = ref('')

const reset = () => {
  userName.value = ''
  userNameError.value = ''
  passwordError.value = ''
  password.value = ''
}
const login = () => {
  if (userName.value === '') {
    toast({
      content: '请输入用户名',
      type: 'error'
    })
    return
  }
  if (password.value === '') {
    toast({
      content: '请输入密码',
      type: 'error'
    })
  }
  const response = loginRequest({
    userName: userName.value,
    password: password.value
  })
  response.then((res: { states: number; message: string; token: string }) => {
    if (res.states === 1) {
      toast({
        type: 'error',
        content: res.message
      })
    } else {
      toast({
        type: 'success',
        content: res.message
      })
      sessionStorage.setItem('MyBlogsToken', res.token)
      router.push('/manage')
    }
  })
}
</script>

<style scoped lang='scss'>
.login-container{
  height: 100vh;
  background-color: $backgroundColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #4e5056;
  .title{
    margin-top: 150px;
    line-height: 100px;
  }
}
.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #b8ceca;
  padding: 30px 30px 20px;
  border-radius: 5px ;
  .input{
          >div{
            display: flex;
          }
          .text{
            width: 50px;
            line-height: 50px;
          }
  }
  .button{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .login,
    .reset {
      margin-left: 20px;
    }
}

}
:deep(.wheel-input){
  width: 200px;
}
</style>
