<template>
    <div class="container">
      <!-- 标题 -->
      <h2 class="custom-title">用户 - 账号信息</h2>
  
      <!-- 筛选条件 -->
      <div class="filter-bar">
        <!-- 筛选客户等级 -->
        <el-date-picker
          v-model="searchDate"
          placeholder="选择注册日期"
          type="date"
          style="width: 200px;"
          @change="filterTable"
          clearable
        />
        <!-- 搜索框：姓名 -->
        <el-input
          v-model="searchName"
          placeholder="搜索姓名"
          clearable
          style="width: 200px;"
          @input="filterTable"
          :class="{'search-focused': searchName}"
        >
          <template #prefix>
            <i class="el-icon-search"></i>
          </template>
        </el-input>
        <el-select
          v-model="selectedLevel"
          placeholder="选择客户等级"
          clearable
          style="width: 160px;"
          @change="filterTable"
        >
          <el-option
            v-for="level in levels"
            :key="level"
            :label="level"
            :value="level"
          ></el-option>
        </el-select>
        <!-- 搜索框：手机号 -->
        <el-input
          v-model="searchPhone"
          placeholder="搜索手机号"
          clearable
          style="width: 200px;"
          @input="filterTable"
          :class="{'search-focused': searchPhone}"
        >
          <template #prefix>
            <i class="el-icon-phone"></i>
          </template>
        </el-input>
  
        <!-- 搜索框：地址 -->
        <el-input
          v-model="searchAddress"
          placeholder="搜索地址"
          clearable
          style="width: 300px;"
          @input="filterTable"
          :class="{'search-focused': searchAddress}"
        >
          <template #prefix>
            <i class="el-icon-location"></i>
          </template>
        </el-input>
      </div>
  
      <!-- 表格 -->
      <el-table
        :data="filteredData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        class="custom-table"
      >
        <el-table-column prop="date" label="日期" sortable width="180" />
        <el-table-column prop="name" label="姓名" sortable width="180" />
        <el-table-column prop="level" label="客户等级" width="180" />
        <el-table-column
          prop="status"
          label="账号状态"
          width="180"
        />
        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
        />
        <!-- 控制显示密码字段的权限 -->
        <el-table-column
          prop="password"
          label="账号密码"
          width="180"
          :formatter="formatPassword"
        />
        <el-table-column
          prop="address"
          label="地址"
          width="400"
          :formatter="formatter"
        ></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 表格数据
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
            level: "金卡",
            status: "激活",
            phone: "13800138000",
            password: "12345678", // 密码
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
            level: "银卡",
            status: "激活",
            phone: "13900139000",
            password: "87654321", // 密码
          },
          {
            date: "2016-05-01",
            name: "李四",
            address: "上海市普陀区金沙江路 1519 弄",
            level: "普通卡",
            status: "禁用",
            phone: "13700137000",
            password: "11223344", // 密码
          },
          {
            date: "2016-05-03",
            name: "张三",
            address: "上海市普陀区金沙江路 1516 弄",
            level: "金卡",
            status: "激活",
            phone: "13600136000",
            password: "99887766", // 密码
          },
        ],
        levels: ["金卡", "银卡", "普通卡", "顶级管理员"], // 增加顶级管理员
        selectedLevel: "", // 当前选择的客户等级，默认值为空字符串
        searchName: "", // 搜索框内容
        searchPhone: "", // 搜索手机号
        searchAddress: "", // 搜索地址
        searchDate: "", // 搜索注册日期
        filteredData: [], // 筛选后的数据
      };
    },
    methods: {
      // 格式化地址
      formatter(row, column) {
        return row.address;
      },
  
      // 格式化密码字段，根据权限控制是否显示
      formatPassword(row, column) {
        // 如果是顶级管理员，显示密码；否则，显示为 "保密"
        if (this.selectedLevel === "顶级管理员") {
          return row.password;
        } else {
          return "保密";
        }
      },
  
      // 根据筛选条件过滤表格数据
      filterTable() {
        this.filteredData = this.tableData.filter((row) => {
          // 过滤等级
          const levelMatch =
            !this.selectedLevel || row.level === this.selectedLevel; // 若未选择等级，显示所有数据
          // 过滤姓名
          const nameMatch = row.name
            .toLowerCase()
            .includes(this.searchName.toLowerCase());
          // 过滤手机号
          const phoneMatch = row.phone
            .toLowerCase()
            .includes(this.searchPhone.toLowerCase());
          // 过滤地址
          const addressMatch = row.address
            .toLowerCase()
            .includes(this.searchAddress.toLowerCase());
          // 过滤注册日期
          const dateMatch =
            !this.searchDate || row.date === this.searchDate;
  
          return levelMatch && nameMatch && phoneMatch && addressMatch && dateMatch;
        });
      },
    },
    mounted() {
      // 初始化时，加载所有数据（没有选择时自动显示所有数据）
      this.filteredData = this.tableData;
    },
  };
  </script>
  
  <style scoped>
  /* 整体背景颜色 */
  #app {
    background-color: #f8f6f7; /* 温暖的浅灰白色 */
  }
  
  /* 外框样式：细边框和圆角 */
  .container {
    border: 1px solid #d1ae6e; /* 金色边框 */
    border-radius: 10px; /* 圆角 */
    padding: 20px;
    background-color: #fff; /* 背景白色 */
    margin: 20px;
  }
  
  /* 标题 */
  .custom-title {
    text-align: center;
    font-size: 24px;
    color: #d1ae6e; /* 金色主题 */
    margin-bottom: 20px;
  }
  
  /* 筛选栏样式 */
  .filter-bar {
    display: flex;
    gap: 15px; /* 调整为较小的间距 */
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
  }
  
  /* 筛选框前面的标题 */
  .filter-label {
    font-size: 14px;
    color: #333;
    margin-right: 10px;
  }
  
  /* 主题颜色：金色 */
  .el-select,
  .el-input,
  .el-date-picker {
    border-color: #d1ae6e !important; /* 金色边框 */
  }
  
  .el-select .el-input__inner,
  .el-input__inner,
  .el-date-picker .el-input__inner {
    background-color: #fff6e0; /* 浅金色背景 */
    color: #333;
  }
  
  /* 搜索框聚焦时变为蓝色 */
  .search-focused .el-input__inner {
    border-color: #d1ae6e; /* 金色边框 */
    box-shadow: 0 0 5px rgba(64, 158, 255, 0.5); /* 蓝色阴影 */
  }
  
  /* 表格样式 */
  .custom-table {
    margin-top: 20px;
  }
  
  /* 表格的字体颜色和背景颜色 */
  .el-table th,
  .el-table td {
    color: #333; /* 深灰色字体 */
  }
  </style>
  