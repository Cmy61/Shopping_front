<template>
    <div class="signup-container">
      <div class="signup-box">
        <h2>注册</h2>
        <form @submit.prevent="submitForm">
          <label for="phone">手机号</label>
          <input id="phone" type="text" v-model="phone" placeholder="请输入手机号" required />
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
  
          <label for="password">密码</label>
          <input id="password" type="password" v-model="password" placeholder="请输入密码" required />
  
          <label for="checkPassword">确认密码</label>
          <input id="checkPassword" type="password" v-model="checkPassword" placeholder="请再次输入密码" required />
          <span v-if="errors.checkPassword" class="error-message">{{ errors.checkPassword }}</span>
  
          <button type="submit">注册</button>
        </form>
      </div>
    </div>
  </template>
  
  
  <style>
    /* 确保整个页面充满屏幕 */
    html, body, #app {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  
    /* 使用 flexbox 居中整个容器 */
    .signup-container {
      display: flex;
      justify-content: center;  /* 水平居中 */
      align-items: center;      /* 垂直居中 */
      height: 100%;             /* 占满整个高度 */
    }
  
    .signup-box {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 300px;
      text-align: center;
    }
  
    .signup-box h2 {
      margin-bottom: 20px;
      color: #333;
    }
  
    .signup-box form {
      display: flex;
      flex-direction: column;
    }
  
    .signup-box label {
      margin-bottom: 5px;
      text-align: left;
    }
  
    .signup-box input {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  
    .signup-box button {
      background-color: #d1ae6e;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .signup-box button:hover {
      background-color: #c58b4b;
    }
    .error-message {
  color: red;
  font-size: 12px;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
}
  </style>
<script>
export default {
  data() {
    return {
      username: '',
      phone: '',
      password: '',
      checkPassword: '',
      errors: {
        phone: '',
        password: '',
        checkPassword: ''
      }
    };
  },
  methods: {
    submitForm() {
      // 清空错误信息
      this.errors = {
        phone: '',
        password: '',
        checkPassword: ''
      };

      // 验证手机号
      const phoneReg = /^1[3-9]\d{9}$/;
      if (!this.phone) {
        this.errors.phone = '手机号不能为空';
      } else if (!phoneReg.test(this.phone)) {
        this.errors.phone = '请输入有效的手机号';
      }

      // 验证密码
      if (!this.password) {
        this.errors.password = '密码不能为空';
      }

      // 验证确认密码
      if (this.password !== this.checkPassword) {
        this.errors.checkPassword = '两次输入的密码不一致';
      }

      // 如果有错误，阻止提交
      if (this.errors.phone || this.errors.password || this.errors.checkPassword) {
        return;
      }

      // 如果所有验证通过，显示注册成功信息
      alert('注册成功！');
      
      // 手动跳转到 /home
      this.$router.push('/home'); // 确保这行代码能执行
    }
  }
};
</script>