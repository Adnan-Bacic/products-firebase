<template>
    <div class="container mt-3">
      <!--
        <h1>Products</h1>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <ul class="list-group" v-for="product in arrayProducts" v-bind:key="product.id">
                      <li class="list-group-item">{{ product.id }}</li>
                      <li class="list-group-item">{{ product.name }}</li>
                      <li class="list-group-item">
                          //coment stat router link to specific page //comment end
                          <router-link :to=" { name: 'Product', params:{ product_id: product.id } }">
                              <img :src="product.imgsrc" height="200px" width="200px">
                          </router-link>
                      </li>
                      <li class="list-group-item">{{ product.price }}</li>
                      <li class="list-group-item">{{ product.available }}</li>
                      
                      //comment start Array in array //comment end
                      <li class="list-group-item" v-for="(tag, index) in product.tags" v-bind:key="index">
                          {{ tag }}
                      </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr>
        -->
        <h1>Firebase products</h1>
          <div class="row">
            <div class="col-6 mb-3" v-for="product in arrayProductsFB" v-bind:key="product.id">
                <ul class="list-group">
                      <li class="list-group-item">ID: {{ product.id }}</li>
                      <li class="list-group-item">Name: {{ product.name }}</li>
                      <li class="list-group-item">
                          
                              <img :src="product.imgsrc" height="200px" width="200px">
                      </li>
                      <li class="list-group-item">Price: {{ product.price }}</li>
                      <!--if else to show if item is in stock or not-->
                      <li class="list-group-item" v-if="product.available">Item is in stock</li>
                      <li class="list-group-item" v-else>Item is NOT in stock</li>
                      
                      <!--Array in array-->
                      <div class="list-group-item">
                      <p>Tags:</p>
                      <p class="" v-for="(tag, index) in product.tags" v-bind:key="index">
                          {{ tag }}.
                      </p>
                      </div>
                    </ul>
                    <!--router link to specific page-->
                    <router-link :to=" { name: 'Product', params:{ product_id: product.id } }">
                      <button class="btn btn-primary btn-lg btn-block">Edit or delete this item</button>
                    </router-link>
          </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: 'Products',
    data(){
        return{
            arrayProducts:[
                {
                  id: '1',
                  name: 'Koala',
                  imgsrc: 'http://adnanbacic.dk/folders/files/vue-firebase-products/images/img1.jpg',
                  price: 111,
                  available: true,
                  tags: ['Animal', 'Koala']
                },
                {
                  id: '2',
                  name: 'Panda',
                  imgsrc: 'http://adnanbacic.dk/folders/files/vue-firebase-products/images/img2.jpg',
                  price: 222,
                  available: true,
                  tags: ['Animal', 'Panda']
                },
                {
                  id: '3',
                  name: 'Cheetah',
                  imgsrc: 'https://adnanbacic.dk/folders/files/vue-firebase-products/images/img3.jpg',
                  price: 333,
                  available: true,
                  tags: ['Animal', 'Cheetah']
                },
                {
                  id: '4',
                  name: 'Toucan',
                  imgsrc: 'https://adnanbacic.dk/folders/files/vue-firebase-products/images/img4.jpg',
                  price: 444,
                  available: true,
                  tags: ['Animal', 'Toucan']
                },
                {
                  id: '5',
                  name: 'Zebra',
                  imgsrc: 'https://adnanbacic.dk/folders/files/vue-firebase-products/images/img5.jpg',
                  price: 555,
                  available: true,
                  tags: ['Animal', 'Zebra']
                },
            ],
            arrayProductsFB:[],
            
        }
    },
    created(){
    //fetch data from firestore
    db.collection('products').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data(), doc.id)
        let product = doc.data()
        product.id = doc.id
        this.arrayProductsFB.push(product)
      })
    })
  }
}
</script>

<style scoped>
 .list-group-item p {
   display: inline;
 }
</style>