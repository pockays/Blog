<template>
  <el-form 
  ref="forgetpassword"
  :rules="forules"
  :model="forgetForm"
  label-width="100px" 
  size="large"
  class="container">
    <el-form-item  label="邮箱" prop="username">
      <el-input type="email"  v-model="forgetForm.username" placeholder="Enter Email..."></el-input>
    </el-form-item>
    <el-form-item  label="验证码" prop="code">
      <el-input type="code"  v-model="forgetForm.code" placeholder="Enter code..."></el-input>
      <el-button type="primary" class="send" @click="sendCode">{{ timer == 0 ? '发送' : `${timer}s` }}</el-button>
    </el-form-item>
    <el-form-item  label="密码" prop="password">
      <el-input type="password"  v-model="forgetForm.password" placeholder="Enter password..."></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
      @click="handleForget(forgetpassword)"
        type="primary"
        class="submit-btn"
        >找回密码</el-button
      >
    </el-form-item>
    <div class="mt-10"><span class="dialog-text">已有账号？</span><span class="colorFlag" @click="handleLogin">登录</span>
    </div>
  </el-form>
</template>

<script lang="ts"> 
import { getCode } from "@/api/login";
import { updateUserPassword } from "@/api/user";
import { forgetForm } from "@/model";
import { useIntervalFn } from "@vueuse/core";
import {forules} from  "@/utils/forgetValidators"
import {startLoading,endLoading} from "@/utils/loading"
import{useRouter} from 'vue-router'
export default{
  name:"LoginRegister",
  props:{
    forgetForm:{
        type:Object,
        required:true
    },
    forules:{
        type:Object,
        required:true
    }
 },
 setup() {
 const data = reactive({
  timer: 0,
  flag: false,
  loading: false,
  forgetForm,
});
const router =useRouter()
const forgetpassword=ref()
const { timer, flag } = toRefs(data);
const { pause, resume } = useIntervalFn(() => {
  timer.value--;
  if (timer.value <= 0) {
    // 停止定时器
    pause();
    flag.value = false;
  }
}, 1000, { immediate: false });
const start = (time: number) => {
  flag.value = true;
  timer.value = time;
  // 启动定时器
  resume();
};
const sendCode = () => {
  start(60);
  getCode(forgetForm.value.username).then(({ data }) => {
    if (data.flag) {
      window.$message?.success("发送成功");
    }
  });
};

const handleForget = (forgetpassword: any) => {
  startLoading()
  forgetpassword.validate((valid:boolean)=>{
    console.log(valid)
    if(valid){
      updateUserPassword(forgetForm.value).then(({ data }) => {
    if (data.flag) {
      window.$message?.success("修改成功");
      forgetForm.value = {
        username: "",
        password: "",
        code: "",
      }
    }
   })
  }
    endLoading()
  })
};
const handleLogin = () => {
  router.push("/login")
};
 return {timer,sendCode,handleForget,handleLogin,forgetpassword,forgetForm,forules}
}
}

</script>

<style scoped>
.container{
    width:50%;
    margin:200px auto
}

.submit-btn {
  width: 100%;
}

:deep(.el-form-item__content ) {
  display: flex;
  flex-wrap: nowrap;
}

.el-input{
  flex:1.5;
}
.send{
  flex: 0.5;
  margin-left: 60px;
}

.colorFlag{
  color: pink;
  z-index: 9999;
}
.mt-10{
  display: flex;
  justify-content: end;
}   

</style>