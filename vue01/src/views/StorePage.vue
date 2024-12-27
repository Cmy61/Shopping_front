<template>
  <div class="product-list">
    <div v-for="(product, index) in filteredProducts" :key="index" class="product-item" @click="gotoProduct(product.id)">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-material">材质: {{ product.material }}</p>
        <p class="product-usage">使用范围: {{ product.usage }}</p>
        <p class="product-warnings">注意事项: {{ product.warnings }}</p>
        <p class="product-price">价格: {{ product.price }}</p>
        <button class="add-to-cart" @click="addToCart(product, $event)">加入购物车</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allProducts: [
        { name: "商品1", id: 1, description: "商品1简介", material: "木材", usage: "家庭使用", warnings: "避免潮湿环境", price: "￥100", image: "https://via.placeholder.com/150", url: "/product/1" },
        { name: "商品2", id: 2, description: "商品2简介", material: "金属", usage: "办公室使用", warnings: "避免刮伤", price: "￥200", image: "https://via.placeholder.com/150", url: "/product/2" },
        // 更多商品...
      ],
      filteredProducts: []
    };
  },
  watch: {
    // 监听查询参数的变化
    '$route.query.search': 'filterProducts'
  },
  methods: {
    addToCart(product, event) {
      event.stopPropagation();
      console.log("商品已加入购物车", product);
    },
    selectProduct(product) {
      if (product.url) {
        window.location.href = product.url;
      } else {
        console.error("该商品没有设置链接");
      }
    },
    gotoProduct(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    },
    filterProducts() {
      const searchQuery = this.$route.query.search?.toLowerCase() || '';
      if (searchQuery) {
        this.filteredProducts = this.allProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredProducts = this.allProducts;
      }
    }
  },
  created() {
    this.filterProducts(); // 组件创建时进行初始过滤
  }
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}
.product-item {
  display: flex;
  gap: 20px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f6f7;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin-left: 15%;
  margin-right: 15%;
  cursor: pointer;
}
.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.product-image img {
  width: 200px;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.product-info {
  flex: 1;
}
.product-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.product-description,
.product-material,
.product-usage,
.product-warnings,
.product-price {
  margin-bottom: 8px;
  font-size: 16px;
}
.add-to-cart {
  padding: 10px 20px;
  background-color: #d1ae6e;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
.add-to-cart:hover {
  background-color: #c58b4b;
}
</style>
