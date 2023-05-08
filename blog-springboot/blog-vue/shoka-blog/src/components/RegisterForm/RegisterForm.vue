<template>
<el-form
    ref="registerRef"
    :model="registerUser"
    :rules="registerRules"
    label-width="100px"
    class="registerForm sign-up-form "
    size="large"
  >
  
    <!-- <el-form-item label="用户名" prop="name">
      <el-input
        v-model="registerUser.name"
        placeholder="Enter UserName..."
      ></el-input>
    </el-form-item> -->
    <el-form-item label="邮箱" prop="username">
      <el-input
        v-model="registerUser.username"
        placeholder="Enter Email..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="registerUser.password"
        type="password"
        placeholder="Enter Password..."
      ></el-input>
    </el-form-item>
    
    <el-form-item label="确认密码" prop="password2">
      <el-input
        v-model="registerUser.password2"
        type="password"
        placeholder="Enter Password..."
      ></el-input>
    </el-form-item>

    <el-form-item label="验证码" prop="code">
      <el-input
        v-model="registerUser.code"
        type="code"
        placeholder="Enter code..."
      ></el-input>
      <el-button type="primary" class="send" @click="sendCode">{{ timer == 0 ? '发送' : `${timer}s` }}</el-button>
    </el-form-item>



<!-- 
     <el-form-item label="选择身份" >
      <el-select v-model="registerUser.role" placeholder="请选择身份" >
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="用户" value="user"></el-option>
        <el-option label="游客" value="visitor"></el-option>
      </el-select>
  </el-form-item> -->
    
    <el-form-item>
      <el-button
        @click="handleRegister(registerRef)"
        type="primary"
        class="submit-btn"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { getCode, login, register } from "@/api/login";
import { LoginForm } from "@/api/login/types";
import useStore from "@/store";
import { setToken } from "@/utils/token";
import { useIntervalFn } from '@vueuse/core';
import {startLoading,endLoading} from "@/utils/loading"
export default {
    props:{ 
      registerUser:{
            type:Object,
            required:true
        },
        registerRules:{
            type:Object,
            required:true
        }},
setup(props:any){
const {  user } = useStore();
const registerRef = ref();
const data = reactive({
  timer: 0,
  flag: false,
  loading: false,
  registerUser: {
    username: "",
    password: "",
    code: "",
  } ,
});
const { timer, flag,  registerUser } = toRefs(data);

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
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!reg.test(registerUser.value.username)) {
    window.$message?.warning("邮箱格式不正确");
    return;
  }
  start(60);
  getCode(registerUser.value.username).then(({ data }) => {
    if (data.flag) {
      window.$message?.success("发送成功");
    }
  });
};

const handleRegister = (registerRef:any) => {
  startLoading()
  registerRef.validate((valid:boolean)=>{
    if(valid){
      register(registerUser.value).then(({ data }) => {
      if (data.flag) {
      let loginForm: LoginForm = {
        username: registerUser.value.username,
        password: registerUser.value.password,
      }
      login(loginForm).then(({ data }) => {
        if (data.flag) {
          registerUser.value = {
            username: "",
            password: "",
            code: "",
          }
          setToken(data.data);
          user.GetUserInfo();
          window.$message?.success("登录成功");
        }
      });
    }
  });
}
    endLoading()
  })
};
return{timer,sendCode,registerRef,handleRegister,}
 }}
 
</script>

<style scoped lang="scss">
/* register */
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}

.el-input{
  flex:1.5;
}
.send{
  flex: 0.5;
  margin-left: 60px;
}


</style>