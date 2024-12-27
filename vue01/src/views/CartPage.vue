<template>
    <div class="cart-container">
      <!-- 购物袋标题 -->
      <div class="cart-header">
        <h2>购物袋</h2>
      </div>
  
      <!-- 商品列表 -->
      <div class="cart-items">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <!-- 商品选择 -->
          <input type="checkbox" v-model="item.selected" class="item-checkbox" />
  
          <!-- 商品图片 -->
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
  
          <!-- 商品信息 -->
          <div class="item-details">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-code">货号: {{ item.code }}</p>
            <p class="item-price">单价: ￥{{ item.price.toFixed(2) }}</p>
  
            <!-- 数量选择 + 删除按钮 -->
            <div class="item-actions">
              <div class="item-quantity">
                <button @click="decreaseQuantity(item)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(item)">+</button>
              </div>
              <button @click="removeItem(index)" class="remove-item">删除</button>
            </div>
          </div>
  
          <!-- 总价 -->
          <div class="item-total-price">
            ￥{{ (item.price * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>
  
      <!-- 购物袋合计 -->
      <div class="cart-summary">
        <p>
          购物袋合计:
          <span class="summary-highlight">{{ totalItems }} 个商品</span>,
          总价: <span class="summary-highlight">￥{{ totalPrice.toFixed(2) }}</span>
        </p>
        <div class="cart-actions">
          <button @click="clearCart" class="clear-cart">清空购物车</button>
          <button @click="proceedToCheckout" class="checkout">付款</button>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [
          {
            name: "商品1",
            code: "001",
            price: 100,
            quantity: 1,
            image: "https://via.placeholder.com/80",
            selected: true
          },
          {
            name: "商品2",
            code: "002",
            price: 200,
            quantity: 2,
            image: "https://via.placeholder.com/80",
            selected: true
          }
        ]
      };
    },
    computed: {
      totalItems() {
        return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
      },
      totalPrice() {
        return this.cartItems
          .filter(item => item.selected)  // 只选中的商品计算总价
          .reduce((acc, item) => acc + item.price * item.quantity, 0);
      }
    },
    methods: {
      increaseQuantity(item) {
        item.quantity++;
      },
      decreaseQuantity(item) {
        if (item.quantity > 1) item.quantity--;
      },
      removeItem(index) {
        this.cartItems.splice(index, 1);
      },
      clearCart() {
        this.cartItems = [];
      },
      proceedToCheckout() {
        console.log("进行付款操作");
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-container {
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .cart-header {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: left;
  }
  
  .cart-items {
    border-top: 1px solid #ddd;
    margin-bottom: 20px;
  }
  
  .cart-item {
    display: grid;
    grid-template-columns: 30px 100px 1fr 100px;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
    gap: 15px;
  }
  
  .item-checkbox {
    justify-self: center;
  }
  
  .item-image img {
    width: 100px;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .item-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 3px; /* 缩小行距 */
  }
  
  .item-name {
    font-size: 16px;
    font-weight: bold;
  }
  
  .item-code,
  .item-price {
    font-size: 14px;
    color: #777;
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    margin-top: 8px; /* 增加与上方的间距 */
  }
  
  .item-quantity {
    display: flex;
    align-items: center;
  }
  
  .item-quantity button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    margin: 0 5px;
  }
  
  .item-quantity button:hover {
    background-color: #f0f0f0;
  }
  
  .item-quantity span {
    margin: 0 10px;
  }
  
  .remove-item {
    margin-left: 15px;
    background-color: transparent;
    color: #000;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }
  
  .remove-item:hover {
    text-decoration: underline;
  }
  
  .item-total-price {
    text-align: right;
    font-size: 16px;
    font-weight: bold;
  }
  
  .cart-summary {
    text-align: right;
    font-size: 16px;
  }
  
  .summary-highlight {
    font-weight: bold;
    color: #d1ae6e;
  }
  
  .cart-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 10px;
  }
  
  .cart-actions button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .clear-cart {
    background-color: #d1ae6e;
    color: white;
  }
  
  .clear-cart:hover {
    background-color: #c58b4b;
  }
  
  .checkout {
    background-color: #d1ae6e;
    color: white;
  }
  
  .checkout:hover {
    background-color: #c58b4b;
  }
  </style>
  