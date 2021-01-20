import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

import Product from '@/components/Product'
import CreateProduct from '@/components/CreateProduct'
import CreateProductUpload from '@/components/CreateProductUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/product/:product_id',
      name: 'Product',
      component: Product
    },
    {
      path: '/create-product',
      name: 'CreateProduct',
      component: CreateProduct
    },
    {
      path: '/create-product-upload',
      name: 'CreateProductUpload',
      component: CreateProductUpload
    },
  ]
})
