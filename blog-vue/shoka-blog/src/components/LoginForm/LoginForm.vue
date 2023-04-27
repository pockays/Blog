<template>
  <el-form
    ref="loginForm"
    :rules="rules"
    :model="loginUser"
    label-width="100px"
    class="loginForm sign-in-form"
    size="large"
  >
    <el-form-item label="邮箱" prop="username">
      <el-input
       v-model="loginUser.username"
        placeholder="Enter Email..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginUser.password"
        type="password"
        placeholder="Enter Password..."
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
      @click="handleLogin(loginForm)"
        type="primary"
        class="submit-btn"
        >提交</el-button
      >
    </el-form-item>

    <!-- 找回密码 -->
    <div class="tiparea">
      <p>忘记密码？ <a @click.prevent="handleForget">立即找回</a></p>
    </div>
  </el-form>
</template>

<script lang="ts"> 
import{useRouter} from 'vue-router'
import {startLoading,endLoading} from "@/utils/loading"
import { login } from "@/api/login"
import { loginUser } from "@/utils/loginValidators"
import { setToken } from "@/utils/token"
import useStore from '@/store'
export default {
 props:{
    loginUser:{
        type:Object,
        required:true
    },
    rules:{
        type:Object,
        required:true
    }
 },
 setup() {
  const loginForm = ref()
  const { user} = useStore();
  const router =useRouter()
  const handleForget = ()=>{
    router.push("/forgetpassword")
  }
  
  const handleLogin = (loginForm: any)=>{
    startLoading()
    loginForm.validate((valid:boolean)=>{
      if(valid){
        login(loginUser.value).then(({ data }) => {
           if (data.flag) {
             setToken(data.data);
             user.GetUserInfo();
             window.$message?.success("登录成功");
             loginUser.value = {
               username: "",
               password: "",
             };
           }
         router.replace(user.path)
         })
      }
      endLoading()
    })
}
   return {handleLogin,handleForget,loginForm}
}}

</script>

<style  scoped lang="scss">
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}



</style>