<template>
  <div class="home">
    <el-container>
      <el-header class="homeHeader title_top">
        <ul class="lightrope">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </el-header>
          <div class="el-dropdown-link">
            <div style="float: left;margin-top: 15px;margin-left: 50px">
              <el-breadcrumb style="font-size: 20px" separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
              </el-breadcrumb>
              <div class="homeWelcome" style="font-size: 20px" v-if="this.$router.currentRoute.path === '/home'">
                <span class="hh" style="font-size: 25px"><span>希望</span>您<span>每天开心!</span></span>
              </div>
            </div>
            <div style="margin-left: 600px;font-size: 30px">
              <span class="hh"><span>小7</span>公司<span>在线管理</span>
              </span>
              <el-dropdown style="float: right" @command="commandHandler">
                <div class="el-dropdown-link">
                  <span style="margin-right: 10px">{{ user.name }}</span><i style="margin-right: 45px">
                  <img :src="getImg(user.userFace)"
                       style="width: 50px;height: 50px;border-radius: 24px"></i></div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                  <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <template v-for="(item,index) in routes">
              <el-submenu :index="index+''"
                          v-if="!item.hidden"
                          :key="index"
                          style="background-color: #fff;
">
                <template slot="title"><i :class="item.iconCls"
                                          style="color: steelblue;margin-right: 25px"></i><span>{{ item.name }}</span>
                </template>
                <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj"
                              >{{ children.name }}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="homeWelcome" style="font-size: 20px" v-if="this.$router.currentRoute.path === '/home'">
            <span class="hh"><span>欢迎</span>来到<span>小7公司!</span>
              </span>
            <el-button icon="el-icon-bell" type="text" style="color: black;margin-left: 0px" @click="goChat"></el-button>
            <hr>
            <img src="../../public/图片1.png" style="width: 700px;height: 530px;margin-left: 156px">
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
    }
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    },
    user() {
      return this.$store.state.currentAdmin
    }
  },
  methods: {
    goChat(){
      this.$router.push('/chat')
    },
    getImg(face){
      return require('../../public/'+face+'.jpg')
    },
    commandHandler(command) {
      if (command === 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
            .then(() => {
              // 注销登录
              this.postRequest('/logout')
              // 清空用户信息
              window.sessionStorage.removeItem('tokenStr')
              window.sessionStorage.removeItem('user')
              // 清空菜单
              this.$store.commit('initRoutes', [])
              // 跳转到登录页
              this.$router.replace('/')
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
      }
      if (command === 'userinfo') {
        this.$router.push('/userinfo')
      }
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
}
.hh {
  color: #808080;
  font-weight: 500;
  letter-spacing: 5px;
  cursor: pointer;
  margin-top: 5px;
}

.hh span {
  transition: 1s;
}
.hh:hover span:nth-child(1)::after {
  content: "'";
}


.hh:hover span {
  color: #fff;
  text-shadow: 0 0 0px #00f,
  0 0 20px #00f,
  0 0 30px #00f,
  0 0 80px #00f,
  0 0 120px #00f;
}
.home {
  background-color: #fff;

}
.title_top {
  width: 100%;
  background-color: #fff;
  height: 100%;
}

.lightrope {
  white-space: nowrap;
  overflow: hidden;
  margin: -15px 0 0 0;
  padding: 0;
  width: 100%;
}

.lightrope li {
  position: relative;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  list-style: none;
  padding: 0;
  width: 12px;
  height: 28px;
  border-radius: 50%;
  margin: 20px;
  display: inline-block;
  background: #00f7a5;
  box-shadow: 0px 4.6666666667px 24px 3px #00f7a5;
  -webkit-animation-name: flash-1;
  animation-name: flash-1;
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

.lightrope li:nth-child(2n+1) {
  background: cyan;
  box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 255, 255, 0.5);
  -webkit-animation-name: flash-2;
  animation-name: flash-2;
  -webkit-animation-duration: 0.4s;
  animation-duration: 0.4s;
}

.lightrope li:nth-child(4n+2) {
  background: #f70094;
  box-shadow: 0px 4.6666666667px 24px 3px #f70094;
  -webkit-animation-name: flash-3;
  animation-name: flash-3;
  -webkit-animation-duration: 1.1s;
  animation-duration: 1.1s;
}

.lightrope li:nth-child(odd) {
  -webkit-animation-duration: 1.8s;
  animation-duration: 1.8s;
}

.lightrope li:nth-child(3n+1) {
  -webkit-animation-duration: 1.4s;
  animation-duration: 1.4s;
}

.lightrope li:before {
  content: "";
  position: absolute;
  background: #222;
  width: 10px;
  height: 9.3333333333px;
  border-radius: 3px;
  top: -4.6666666667px;
  left: 1px;
}

.lightrope li:after {
  content: "";
  top: -14px;
  left: 9px;
  position: absolute;
  width: 52px;
  height: 18.6666666667px;
  border-bottom: solid #222 2px;
  border-radius: 50%;
}

.lightrope li:last-child:after {
  content: none;
}

.lightrope li:first-child {
  margin-left: -40px;
}

@-webkit-keyframes flash-1 {

  0%,
  100% {
    background: #00f7a5;
    box-shadow: 0px 4.6666666667px 24px 3px #00f7a5;
  }

  50% {
    background: rgba(0, 247, 165, 0.4);
    box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 247, 165, 0.2);
  }
}

@keyframes flash-1 {

  0%,
  100% {
    background: #00f7a5;
    box-shadow: 0px 4.6666666667px 24px 3px #00f7a5;
  }

  50% {
    background: rgba(0, 247, 165, 0.4);
    box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 247, 165, 0.2);
  }
}

@-webkit-keyframes flash-2 {

  0%,
  100% {
    background: cyan;
    box-shadow: 0px 4.6666666667px 24px 3px cyan;
  }

  50% {
    background: rgba(0, 255, 255, 0.4);
    box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 255, 255, 0.2);
  }
}

@keyframes flash-2 {

  0%,
  100% {
    background: cyan;
    box-shadow: 0px 4.6666666667px 24px 3px cyan;
  }

  50% {
    background: rgba(0, 255, 255, 0.4);
    box-shadow: 0px 4.6666666667px 24px 3px rgba(0, 255, 255, 0.2);
  }
}

@-webkit-keyframes flash-3 {

  0%,
  100% {
    background: #f70094;
    box-shadow: 0px 4.6666666667px 24px 3px #f70094;
  }

  50% {
    background: rgba(247, 0, 148, 0.4);
    box-shadow: 0px 4.6666666667px 24px 3px rgba(247, 0, 148, 0.2);
  }
}

@keyframes flash-3 {

  0%,
  100% {
    background: #f70094;
    box-shadow: 0px 4.6666666667px 24px 3px #f70094;
  }

  50% {
    background: rgba(247, 0, 148, 0.4);
    box-shadow: 0px 4.6666666667px 24px 3px rgba(247, 0, 148, 0.2);
  }
}

</style>