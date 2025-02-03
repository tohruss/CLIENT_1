Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
    </ul>
    `
});

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },


    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText" />
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <span :class="{saleText: onSale}" >{{sale}}</span>
            <p v-if="inventory > 10">In stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else :disabled="!inStock" :class="{ OutofStock: !inStock }">Out of stock</p>
            <p>{{ description }}</p>
            <p>User is premium: {{ premium }}</p>
            <p>Shipping: {{ shipping }}</p>
            <product-details :details="filteredDetails"></product-details>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
            </div>
            
            <div class="BUTTON">
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
                <button v-on:click="deleteFromCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Delete from cart</button>
            </div>
            
            <div class="SIZE">
                <div v-for="size in sizes" :key="size">
                    <p>{{ size }}</p>
                </div>
            </div>

            <a :href="link">More products like this.</a>
        </div>
        
        <product-review @review-submitted="addReview"></product-review>
        
        <div class="reviews">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li class="review-item" v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                <p>{{ review.quiz }}</p>
            </li>
        </ul>
        </div>
   

    </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            description: "A pair of warm, fuzzy socks.",
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 190,
            reviews: [],
            onSale: true,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 2,
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        deleteFromCart(){
            this.$emit('delete-from-cart',this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        addReview(productReview) {
            this.reviews.push(productReview)

        }

    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },

        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale(){
            return this.onSale ? (`${this.brand} ${this.product} on sale!`) : (`${this.brand} ${this.product} not on sale.`);
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
        filteredDetails() {
            if (this.premium) {
                return ['80% cotton', '20% polyester', 'Gender-neutral', 'Premium quality'];
            } else {
                return ['80% cotton', '20% polyester', 'Gender-neutral', 'Standard quality'];
            }
        }
    },

})
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name" placeholder="name">
        </p>
        
        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        <p>Would you recommend this product?</p>
        <div>
            <div class="inputRadio">
                <input type="radio" id="contactChoice1" name="contact" value="yes" v-model="quiz"/>
                <label for="contactChoice1">YES</label>
            </div>
            <div class="inputRadio">
                <input type="radio" id="contactChoice2" name="contact" value="no" v-model="quiz"/>
                <label for="contactChoice2">NO</label>
            </div>
        </div>
        
        <p>
          <input type="submit" value="Submit"> 
        </p>
        <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>
    
    </form>

 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            quiz: null,
            errors: []

        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating && this.quiz) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    quiz: this.quiz,
                }
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.quiz = null;
            } else {
                if(!this.name) this.errors.push("Name required.");
                if(!this.review) this.errors.push("Review required.");
                if(!this.rating) this.errors.push("Rating required.");
                if (!this.quiz) this.errors.push("Recommendation required.");
            }
        }

    }

})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        details: [],
        cart: [],
        reviews: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        notupdateCart(id){
            this.cart = this.cart.filter(item => item !== id);
        },


    }

})


