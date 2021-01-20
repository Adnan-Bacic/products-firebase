<template>
    <div class="container jumbotron mt-3" v-if="product">
        <div>
            <h1>Edit product {{ this.$route.params.product_id }}</h1>
            <h2>Edit {{ product.name }}</h2>
            <form v-on:submit.prevent="UpdateProduct()">
                <div class="form-group">
                    <label for="name" class="d-block">Name</label>
                    <input type="text" class="form-control" name="name" v-model="product.name">
                </div>
                <div class="form-group">
                     <label for="imgsrc" class="d-block">Image source</label>
                    <input type="text" class="form-control" name="imgsrc" v-model="product.imgsrc">
                </div>
                <div class="form-group">
                    <label for="price" class="d-block">Price</label>
                    <input type="number" class="form-control" name="price" v-model="product.price">
                </div>
                <div class="form-group">
                    <label for="available">Available</label>
                    <input type="checkbox" name="available" v-model="product.available">
                </div>
                <!--adding new input after tab press-->
                <div v-for="(tag, index) in product.tags" v-bind:key="index" class="field">
                    <label for="tag">Added tag:</label>
                    <input name="tag" class="form-control" type="text" v-model="product.tags[index]">
                    <button class="btn btn-warning mt-1 mb-3" v-on:click="DeleteTag(tag)">Delete tag</button>
                </div>
                <div class="field edit-ingredient">
                    <label for="ingredient">Add a tag - press tab to add more tags</label>
                    <input type="text" class="form-control" name="edit-ingredient" @keydown.tab.prevent="AddTag" v-model="anotherTag">
                    <p class="text-danger font-weight-bolder" v-if="emptyTagResponse">{{ emptyTagResponse }}</p>
                </div>
                <button class="btn btn-info btn-lg btn-block mt-3">Update</button>
            </form>
            <button class="btn btn-danger btn-lg btn-block mt-3" v-on:click="DeleteProduct()">Delete this product</button>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Product',

    data(){
        return{
            product_id: this.$route.params.product_id,
            product: null,
            imgsrc: null,
            price: null,
            available: null,
            anotherTag: null,
            emptyTagResponse: null,
        }
    },

    methods:{
        DeleteProduct(){
            db.collection('products').doc(this.product_id).delete()
            .then(() => {
                this.$router.push({ name: 'Index' })
            })
        },

        UpdateProduct(){
            if(this.product.name){
                db.collection("products").doc(this.product.id).update({
                name: this.product.name,
                imgsrc: this.product.imgsrc,
                price: Number(this.product.price),
                available: this.product.available,
                tags: this.product.tags
            }).then(() => {
                this.$router.push({ name: 'Index' })
            }).catch(err => {
                console.log(err)
            })
            } else {
                this.emptyTagResponse = 'Product must have a name'
            }
        },

        AddTag(){
            if(this.anotherTag){
                //push the value of the input into the array, on tab press
                this.product.tags.push(this.anotherTag)
                this.anotherTag = null
                this.emptyTagResponse = null
            } else {
                this.emptyTagResponse = 'You must enter a value to add an ingredient'
            }
        },
        DeleteTag(tag){
            this.product.tags = this.product.tags.filter(tagToRemove => {
                //if returns true then it stays, if false it gets removed
                return tagToRemove != tag
            })
        },
    },

    created(){
        //specific product
        db.collection('products').doc(this.product_id).get()
        .then(doc => {
            //console.log(doc.data())
            this.product = doc.data();
            this.product.id = doc.id
        })
    }
}
</script>

<style scoped>
 .inline p {
   display: inline;
 }
</style>