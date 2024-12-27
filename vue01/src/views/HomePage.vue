<template>
    <div class="home">
      <!-- 新品推荐 -->
      <section class="section">
        <h2 class="section-title">
          新品推荐
          <!-- 新品推荐部分的“全部 >”链接，放在标题的右侧 -->
          <a href="/allnew-products" class="view-all-link">全部 ></a>
        </h2>
        <div class="product-grid">
          <div v-for="(product, index) in newProducts" :key="'new-' + index" @click="selectProduct(product)" class="product-card">
            <img :src="product.image" :alt="product.name" class="product-image" />
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-price-container">
              <p class="product-price">{{ product.price }}</p>
              <i class="el-icon-goods" @click.stop="addToCart(product)"></i>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 热卖推荐 -->
      <section class="section">
        <h2 class="section-title">
          热卖推荐
          <!-- 热卖推荐部分的“全部 >”链接，放在标题的右侧 -->
          <a href="/allhot-products" class="view-all-link">全部 ></a>
        </h2>
        <div class="product-grid">
          <div v-for="(product, index) in hotProducts" :key="'hot-' + index" class="product-card">
            <img :src="product.image" :alt="product.name" class="product-image" />
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-price-container">
              <p class="product-price">{{ product.price }}</p>
              <i class="el-icon-goods" @click.stop="addToCart(product)"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <style>
  /* Section Styling */
  .section {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
    display: flex;
    justify-content: space-between; /* Ensure the title and "全部 >" are spaced apart */
    align-items: center;
  }
  
  /* Product Grid */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  /* Product Card */
  .product-card {
    background-color: #f8f6f7 !important;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  /* Product Image */
  .product-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 8px;
    border-radius: 4px;
  }
  
  /* Product Name */
  .product-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #555;
  }
  
  /* Product Price */
  .product-price {
    font-size: 16px;
    color: #d1ae6e;
  }
  
  /* Price container and icon (centered) */
  .product-price-container {
    display: flex;
    align-items: center;
    justify-content: center; /* Center items */
    gap: 10px; /* Space between price and icon */
  }
  
  /* Icon */
  .el-icon-goods {
    cursor: pointer;
    font-size: 20px;
    color: black;
    transition: color 0.3s ease;
  }
  
  /* Icon hover effect */
  .el-icon-goods:hover {
    color: #d7c199; /* 图标在鼠标悬停时变红 */
  }
  
  /* View All Link */
  .view-all-link {
    font-size: 14px;  /* Smaller font size for the "全部 >" link */
    color: #000;
    text-decoration: none;
    font-weight: bold;
  }
  
  .view-all-link:hover {
    color: #d1ae6e;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        // 新品推荐商品数据
        newProducts: [
          { name: "新品1", price: "￥100", image: "https://via.placeholder.com/200", url: "https://example.com/new1" },
          { name: "新品2", price: "￥120", image: "https://via.placeholder.com/200", url: "https://example.com/new2" },
          { name: "新品3", price: "￥150", image: "https://via.placeholder.com/200", url: "https://example.com/new3" }
        ],
        // 热卖推荐商品数据
        hotProducts: [
          { name: "热卖1", price: "￥200", image: "https://via.placeholder.com/200", url: "https://example.com/hot1" },
          { name: "热卖2", price: "￥250", image: "https://via.placeholder.com/200", url: "https://example.com/hot2" },
          { name: "热卖3", price: "￥300", image: "https://via.placeholder.com/200", url: "https://example.com/hot3" },
          { name: "热卖4", price: "￥350", image: "https://via.placeholder.com/200", url: "https://example.com/hot4" }
        ]
      };
    },
    methods: {
      selectProduct(product) {
        if (product.url) {
          window.location.href = product.url; // 跳转到商品链接
        } else {
          console.error("该商品没有设置链接");
        }
      },
      addToCart(product) {
        // 处理加入购物车的逻辑
        console.log('商品已加入购物车', product);
      }
    }
  };
  </script>
  