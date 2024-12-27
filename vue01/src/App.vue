<template>
  <div id="app">
    <el-container style="height: 100%;">
      <!-- Dynamic header -->
      <el-header v-show="showHeader">
        <div class="nav-logo">LOGO</div>
        <!-- Navigation menu -->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="transparent"
          text-color="#000000"
          active-text-color="#d1ae6e"
        >
          <el-menu-item index="1">
            <router-link to="/home" class="menu-link">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/store" class="menu-link">商城</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/cart" class="menu-link">购物袋</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/connection" class="menu-link">联系我们</router-link>
          </el-menu-item>
        </el-menu>

        <!-- Right side content -->
        <div class="nav-right">
          <template v-if="isLoggedIn">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link" style="color: #000000;cursor: pointer;">
                <i class="el-icon-user" style="color: #000000;"></i>
                用户
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdownMenu">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else>
            <div class="log-actions">
              <button @click="signup" class="signup">注册</button>
              <button @click="login" class="login">登录</button>
            </div>
          </template>
        </div>
      </el-header>

      <el-main>
  <router-view />

  <!-- 固定搜索按钮 -->
  <el-button 
    icon="el-icon-search" 
    circle 
    class="fixed-button"
    @click="toggleSearch"
  ></el-button>

  <!-- 搜索框，当 showSearch 为 true 时显示 -->
  <div v-if="showSearch" class="search-container">
    <el-input 
      v-model="searchQuery" 
      placeholder="请输入搜索内容" 
      clearable
      class="search-input"
      @keydown.enter="search"
    >
      <!-- 搜索按钮，放在输入框右边 -->
      <template #append>
        <el-button 
          class="search-btn" 
          size="small" 
          @click="search"
        >
          搜索
        </el-button>
      </template>
    </el-input>
  </div>
</el-main>



      <!-- Dynamic footer -->
      <el-footer class="footer" style="height: 50px;" v-show="showFooter">
        <div class="footer-logo">LOGO</div>
        <div class="footer-links">
          <router-link to="/home">首页</router-link>
          <router-link to="/store">商城</router-link>
          <router-link to="/about">关于</router-link>
          <router-link to="/connection">联系我们</router-link>
        </div>
        <div class="footer-social">
          <i class="el-icon-facebook" title="Facebook"></i>
          <i class="el-icon-twitter" title="Twitter"></i>
          <i class="el-icon-weibo" title="微博"></i>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: '1', // 默认选中的菜单项
      isLoggedIn: false,
      showSearch: false, // 控制搜索框显示与隐藏
      searchQuery: '',  // 存储用户输入的搜索内容
    };
  },
  computed: {
    // 根据路由判断是否显示 header 和 footer
    showHeader() {
      return !['/signup', '/login'].includes(this.$route.path);
    },
    showFooter() {
      return !['/signup', '/login'].includes(this.$route.path);
    },
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key; // 更新 activeIndex，使选中的菜单项高亮
      console.log(key); // 输出被选中的菜单项索引
    },
    signup() {
      this.$router.push('/signup'); // 跳转到注册页面
    },
    login() {
      this.$router.push('/login'); // 跳转到登录页面
      console.log("login");
    },
    toggleSearch() {
      this.showSearch = !this.showSearch; // 切换搜索框显示状态
    },
    search() {
    console.log('搜索内容：', this.searchQuery);

    // Redirect to the store page with the search query as a query parameter
    this.$router.push({ path: '/store', query: { search: this.searchQuery } });

    // After the search, close the search input field
    this.showSearch = false;
  }
  },
};
</script>


<style>

#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置页面高度为视口高度 */
}
.el-main {
  position: relative; /* 确保 el-main 是定位容器 */
}

.fixed-button {
  position: fixed;
  right: 20px; /* 距离右边20px */
  bottom: 60px; /* 距离底部20px */
  z-index: 1000; /* 确保按钮在其他元素之上 */
}

.el-header {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中菜单项 */
  padding: 0 20px; /* 内边距调整 */
  background-color: #f8f6f7;
}
.search-container {
  position: fixed;
  right: 70px; /* 与按钮保持一定的间距 */
  bottom: 60px; /* 与按钮对齐 */
  z-index: 999;
  width: 250px; /* 控制搜索框的宽度 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.search-input {
  width: 100%; /* 让输入框填满容器 */
}

.search-btn {
  margin-top: 10px;
  width: 100%;

}
.el-dropdown-item {
  color: #d1ae6e; /* 设置下拉项颜色 */
}
.el-menu-item a {
  text-decoration: none !important;
}
.menu-link {
  display: block; /* 将 router-link 设置为块状元素，填满整个菜单项 */
  width: 100%;    /* 确保链接充满菜单项的宽度 */
  height: 100%;   /* 确保链接充满菜单项的高度 */
  line-height: inherit; /* 保持菜单项的行高一致 */
  text-decoration: none; /* 去除下划线 */
  color: inherit; /* 确保文字颜色继承自父元素 */
}
.nav-logo {
  font-size: 18px;
  flex: 1 1 20%;
  font-weight: bold;
  color: #333;
}

.el-menu-demo {
  flex: 1 1 60%; /* 中间菜单占60% */
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中菜单项 */
  align-items: center; /* 垂直居中 */
}

.nav-right {
  flex: 1 1 20%; /* 右侧留白 */
  display: flex;
  justify-content: center; /* 使右侧内容水平居中 */
  align-items: center; /* 垂直居中 */
}
.el-main {
  flex: 1; /* 主体区域填满剩余空间 */
  background-color: #f2eff0;
}
.el-footer {
  flex-shrink: 0;
  height: 50px;
  background-color: #1f2324;
}
.el-popper.dropdownMenu {
  background-color: fff; /* 背景颜色 */
  border: 1px solid #fff; 
}

.el-popper.dropdownMenu .el-dropdown-menu__item { /* 下拉菜单文字颜色 */
  color: #000000 !important;
}

.el-popper.dropdownMenu .popper__arrow::after {
  border-bottom-color: #d7c199 !important;
  border-top-color: #d7c199 !important;
}

.el-popper.dropdownMenu .el-dropdown-menu__item:not(.is-disabled):hover {
  background: #d7c199 !important;
}
.el-dropdown-link:hover {
  color: #d1ae6e !important; /* 设置文本和图标的颜色 */
}

.el-dropdown-link i {
  color: inherit !important; /* 确保图标颜色继承父元素的颜色 */
}
.el-footer {
  display: flex; /* 使用 flex 布局 */
  justify-content: space-between; /* 左中右三部分等分布局 */
  align-items: center;
  height: 50px;
  padding: 0 20px; /* 内边距 */
  background-color: #1f2324;
  color: #fff;
}

.footer-logo {
  flex: 1; /* 左侧LOGO */
  font-weight: bold;
  font-size: 16px;
  color: #d1ae6e;
}

.footer-links {
  flex: 2; /* 中间导航菜单 */
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-links a {
  text-decoration: none;
  color: #d1ae6e;
  font-size: 14px;
}

.footer-links a:hover {
  color: #fff;
}

.footer-social {
  flex: 1; /* 右侧社交图标 */
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.footer-social i {
  font-size: 20px;
  cursor: pointer;
  color: #d1ae6e;
}

.footer-social i:hover {
  color: #fff;
}
.log-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 10px;
  }
  
  .log-actions button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .signup {
    background-color: #d1ae6e;
    color: white;
  }
  
  .signup:hover {
    background-color: #c58b4b;
  }
  
  .login {
    background-color: #d1ae6e;
    color: white;
  }
  
  .login:hover {
    background-color: #c58b4b;
  }
  /* 在 App.vue 或全局样式中 */
body.no-layout {
  /* 隐藏默认的全局布局，如头部、底部等 */
  padding-top: 0;
  padding-bottom: 0;
}

</style>