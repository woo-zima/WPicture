<template>
  <div id="app">
    <el-container class="page-container" style="overflow: hidden;">
      <!-- 左边栏开始 -->
      <el-aside style="" width="65px" >
        <LeftColumn/>
      </el-aside>
      <!-- 左边栏结束 -->
      <el-container style="overflow: hidden;">
        <!-- 标题栏开始 -->
        <el-header>
          <HeaderBar/>
        </el-header>
        <!-- 标题栏结束 -->
        <!-- 主要页面开始 -->
        <el-main class="window-view">
          <!-- <vue-page-stack> -->
            <router-view :key="$route.fullPath"/>
          <!-- </vue-page-stack> -->
        </el-main>
        <!-- 主要页面结束 -->
      </el-container>
    </el-container>
  <Login/>
  </div>
</template>

<script>
import LeftColumn from './components/publicP/LeftColumn.vue'
import HeaderBar from './components/publicP/HeaderBar.vue'
import Login from './components/publicP/login/index.vue'

export default {
  name: 'app',
  components: {
    LeftColumn,
    HeaderBar,
    Login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
