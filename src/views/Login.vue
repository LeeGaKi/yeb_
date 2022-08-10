<template>
  <div style="background: linear-gradient(#141e30, #243b55) no-repeat;height: 100%">
    <div>'</div>
    <el-form
        v-loading="loading"
        element-loading-text="小7在很努力登录中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :rules="rules"
        ref="loginForm"
        :model="loginForm"
        class="loginContainer">
      <h2 class="loginTitle">LOGIN</h2>
      <el-form-item prop="username">
        <el-input size="small" auto-complete="false" style="width: 250px;margin-left: 40px" type="test" v-model="loginForm.username" placeholder="请输入用户名" class="input"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="small" style="width: 250px;margin-left: 40px" type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码" class="input"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input  type="test" style="width: 143px;margin-left: 40px" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha" style="margin-bottom:-15px;margin-left: 8px" >
      </el-form-item>
      <button  class="btn" type="primary" @click.prevent="submitLogin">submit
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </el-form>
    <div>'</div>
    <div>'</div>
  </div>
</template>

<script>


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  methods:{
    updateCaptcha(){
      this.captchaUrl='/api//captcha?time'+new Date();
    },
    submitLogin: function (){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading=true;
          this.postRequest('/api/login',this.loginForm).then(resp=>{
            if (resp){
              //将用户的jwt令牌存到域中
              const tokenStr = resp.obj.tokenHead+' '+resp.obj.token;
              window.sessionStorage.setItem('tokenStr',tokenStr);
              // 页面跳转
              this.$router.replace('/home')
            }
            this.loading=false;

          })

        } else {
          this.$message.error('小7提示您不要想着漏填哦!!!');
          return false;
        }
      });
    }
  },
  data(){
    return{
      captchaUrl:'/api/captcha?time'+new Date(),
      loginForm:{
        username:"admin",
        password:"123",
        code:''
      },
      remember:true,
      loading:false,
      rules:{
        username:[{
          required:true,message:"快点输用户名啊",trigger:'blur'
        }],
        password: [{
          required:true,message:"还敢不输入密码",trigger:'blur'
        }],
        code:[{
          required:true,message:"来个验证码",trigger:'blur'
        }]
    }
    }
  }
}
</script>
<style scoped>

button{
  background: transparent;
  border: 0;
  outline: none;
}
.btn {
  border: 1px solid rebeccapurple;
  box-shadow: 0 0 5px #171010;
  padding: 10px 20px;
  width: 150px;
  margin-left: 90px;
  color: #03e9f4;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.btn:hover {
  border-radius: 5px;
  color: #fff;
  background: #03e9f4;
  box-shadow: 0 0 5px 0 #03e9f4,
  0 0 25px 0 #03e9f4,
  0 0 50px 0 #03e9f4,
  0 0 100px 0 #03e9f4;
  transition: all 1s linear;
}

.btn>span {
  position: absolute;
}

.btn>span:nth-child(1) {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(left, transparent, #03e9f4);
  left: -100%;
  top: 0px;
  animation: line1 1s linear infinite;
}

@keyframes line1 {
  50%,
  100% {
    left: 100%;
  }
}

.btn>span:nth-child(2) {
  width: 2px;
  height: 100%;
  background: -webkit-linear-gradient(top, transparent, #03e9f4);
  right: 0px;
  top: -100%;
  animation: line2 1s 0.25s linear infinite;
}

@keyframes line2 {

  50%,
  100% {
    top: 100%;
  }
}

.btn>span:nth-child(3) {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(left, #03e9f4, transparent);
  left: 100%;
  bottom: 0px;
  animation: line3 1s 0.75s linear infinite;
}

@keyframes line3 {

  50%,
  100% {
    left: -100%;
  }
}

.btn>span:nth-child(4) {
  width: 2px;
  height: 100%;
  background: -webkit-linear-gradient(top, transparent, #03e9f4);
  left: 0px;
  top: 100%;
  animation: line4 1s 1s linear infinite;
}

@keyframes line4 {
  50%,
  100% {
    top: -100%;
  }
}
.loginContainer{
  background-color: #0c1622;
  box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
  box-sizing: border-box;
  border-radius: 30px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 400px;
  padding: 15px 35px 15px 35px;
  border: 1px solid #ffffff;
}
.loginTitle{
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  margin: 0 auto 10px auto;
  color: aqua;
}
</style>