<template>
  <div id="app" style="height: 100%;">
  <el-container style="height: 100vh;">
    <!-- 侧边栏 -->
    

    <!-- 主体内容 -->
    <el-container style="height: 100%; flex-direction: column;">
      <!-- 顶部栏 -->
      <el-header class="header">Header</el-header>
      
      <!-- 主体内容 -->
      <el-main class="main"><router-view /></el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* 确保html和body的高度为100% */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* 防止溢出滚动条 */
}

/* 背景颜色 */
#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置页面高度为视口高度 */
}

/* 侧边栏样式 */
.aside {
  background-color: #d1ae6e; /* 金色调 */
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%; /* 占满父容器高度 */
}

/* 顶部栏样式 */
.header {
  background-color: #d1ae6eb7; /* 深金色 */
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px; /* 固定高度 */
  flex-shrink: 0; /* 防止顶部栏缩小 */
}

/* 主体内容样式 */
.main {
  background-color: #ffffff; /* 白色，保持干净 */
  color: #333333; /* 深灰色字体，易于阅读 */
  padding: 20px;
  font-size: 16px;
  flex: 1; /* 占用剩余空间 */
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  overflow-y: auto; /* 内容过多时支持滚动 */
}
</style>
