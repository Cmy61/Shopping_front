<template>
    <div class="product-detail">
      <!-- 商品顶部：主图与基本信息 -->
      <section class="product-header">
        <div class="carousel-container">
          <el-carousel indicator-position="outside" height="400px">
            <el-carousel-item v-for="(img, index) in product.images" :key="index">
              <img :src="img" :alt="`商品图片${index + 1}`" class="carousel-image" />
            </el-carousel-item>
          </el-carousel>
        </div>
  
        <div class="product-info">
          <h1 class="product-name">{{ product.name }}</h1>
          <p class="price">
            <span class="current-price">{{ product.price }}</span>
            <span class="original-price" v-if="product.originalPrice">￥{{ product.originalPrice }}</span>
          </p>
          <p class="promo" v-if="product.promo">{{ product.promo }}</p>
          <div class="action-buttons">
            <el-button class="btn btn-cart" @click="addToCart(product)">加入购物车</el-button>
            <el-button class="btn btn-buy" @click="buyNow(product)">立即购买</el-button>
          </div>
        </div>
      </section>
  
      <!-- 详情与评价切换 -->
      <section class="product-tabs">
        <div class="tabs">
          <span
            class="tab"
            :class="{ active: activeTab === 'details' }"
            @click="activeTab = 'details'"
          >
            商品详情
          </span>
          <span
            class="tab"
            :class="{ active: activeTab === 'reviews' }"
            @click="activeTab = 'reviews'"
          >
            用户评价
          </span>
        </div>
  
        <!-- 商品详情 -->
        <div v-if="activeTab === 'details'" class="tab-content">
          <h2>商品详情</h2>
          <p>{{ product.description }}</p>
          <ul>
            <li><strong>材质：</strong>{{ product.material }}</li>
            <li><strong>使用方法：</strong>{{ product.usage }}</li>
            <li><strong>注意事项：</strong>{{ product.warnings }}</li>
          </ul>
          <div class="detail-images">
            <h3>更多商品图片</h3>
            <div v-for="(detailImg, index) in product.detailImages" :key="index" class="detail-image-item">
              <img :src="detailImg" :alt="`商品详情图片${index + 1}`" class="detail-image" />
            </div>
          </div>
        </div>
  
        <!-- 用户评价 -->
        <div v-if="activeTab === 'reviews'" class="tab-content">
          <h2>用户评价</h2>
          <!-- 总体评价 -->
          <div class="overall-rating">
            <h3>总体评价</h3>
            <el-rate v-model="overallRating" disabled show-score text-color="#ff9900" score-template="{value}" />
            <p>质量评价：</p>
            <el-rate v-model="qualityRating" disabled text-color="#ff9900" score-template="{value}" />
            <p>价格评价：</p>
            <el-rate v-model="priceRating" disabled text-color="#ff9900" score-template="{value}" />
          </div>
          <!-- 用户评价列表 -->
          <div v-if="reviews.length">
            <div v-for="(review, index) in reviews" :key="index" class="review">
              <p><strong>{{ review.user }}</strong> ({{ review.rating }}/5)</p>
              <el-rate v-model="review.rating" disabled text-color="#ff9900" />
              <p>{{ review.comment }}</p>
            </div>
          </div>
          <div v-else>
            <p>暂无评价</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        product: {},
        reviews: [],
        activeTab: 'details',
        overallRating: 4.2,
        qualityRating: 4.5,
        priceRating: 4.0,
      };
    },
    created() {
      const products = [
        {
          id: 1,
          name: '商品1',
          description: '这是一款高质量的商品，适合家庭使用。',
          material: '木材',
          usage: '家庭使用',
          warnings: '避免潮湿环境',
          price: '￥100',
          originalPrice: '￥150',
          promo: '满200减50',
          images: [
            'https://via.placeholder.com/800x800?text=商品主图1',
            'https://via.placeholder.com/800x800?text=商品主图2',
            'https://via.placeholder.com/800x800?text=商品主图3',
          ],
          detailImages: [
            'https://via.placeholder.com/800x600?text=详情图片1',
            'https://via.placeholder.com/800x600?text=详情图片2',
            'https://via.placeholder.com/800x600?text=详情图片3',
          ],
        },
      ];
  
      const reviews = {
        1: [
          { user: '用户A', rating: 5, comment: '非常好，物超所值！' },
          { user: '用户B', rating: 4, comment: '质量不错，但略贵。' },
          { user: '用户C', rating: 3.5, comment: '整体满意，但物流有点慢。' },
        ],
      };
  
      this.product = products.find(p => p.id === parseInt(this.id));
      this.reviews = reviews[this.id] || [];
    },
    methods: {
      addToCart(product) {
        console.log('加入购物车', product);
      },
      buyNow(product) {
        console.log('立即购买', product);
      },
    },
  };
  </script>
  
  <style scoped>
  .product-detail {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  /* 商品顶部布局 */
  .product-header {
    display: flex;
    gap: 5%;
    margin-bottom: 30px;
    margin-left: 10%;
    margin-right:10%;
  }
  
  /* 图片轮播 */
  .carousel-container {
    flex: 1;
    max-width: 60%;
    margin-right: 20px;
  }
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  /* 基本信息 */
  .product-info {
  flex: 1; /* 设置flex值为1以缩小其宽度 */
  max-width: 500px; /* 限制最大宽度 */
 
}
  
  /* 价格样式 */
  .price {
    font-size: 20px;
    font-weight: bold;
  }
  .current-price {
    color: #e60012; /* Red color for current price */
    font-size: 24px;
    margin-right: 10px;
  }
  .original-price {
    color: #999;
    text-decoration: line-through;
    font-size: 18px;
  }
  
  /* 特价文字样式 */
  .promo {
  background-color: #ff9900;
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 10px;
  display: inline-block; /* Make it only as wide as the content */
  max-width: 250px; /* Optional: Limit the width if it's still too wide */
  word-wrap: break-word; /* Ensure text breaks if it's too long */
}
  
  /* 切换标签 */
  .tabs {
    display: flex;
    justify-content: flex-start;
    border-bottom: 2px solid #ddd;
    margin-bottom: 10px;
  }
  .tab {
    margin-right: 20px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: #555;
  }
  .tab.active {
    border-bottom: 2px solid #d1ae6e;
    color: #d1ae6e;
  }
  
  /* 标签内容 */
  .tab-content {
    padding: 10px;
  }
  
  /* 商品详情部分 */
  .detail-images {
    margin-top: 20px;
  }
  .detail-image-item {
    margin-bottom: 15px;
  }
  .detail-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }
  
  /* 用户评价 */
  .overall-rating {
    margin-bottom: 20px;
  }
  .review {
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
  }
  .action-buttons .el-button {
  font-size: 18px; /* 增大字体 */
  padding: 15px 30px; /* 增加内边距，使按钮更大 */
  height: 50px; /* 设置按钮高度 */
  min-width: 180px; /* 设置按钮的最小宽度 */
  border-radius: 8px; /* 保持圆角 */
}

/* 针对购物车按钮的特殊样式（可选） */
.action-buttons .btn-cart {
  background-color: #d1ae6e; /* 购物车按钮颜色 */
  color: white;
}

/* 针对立即购买按钮的特殊样式（可选） */
.action-buttons .btn-buy {
  background-color: #d1ae6e; /* 立即购买按钮颜色 */
  color: white;
}
  </style>
  