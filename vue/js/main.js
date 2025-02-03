let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        brand: 'Vue Mastery',
        selectedVariant: 0,
        description: "A pair of warm, fuzzy socks.",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inventory: 190,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        cart: 0,

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
                variantQuantity: 0,
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']

    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        deliteToCart(){
            if (this.cart >= 1){
                this.cart -= 1
            }else
                this.cart = 0
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
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
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            return this.onSale ? (`${this.brand} ${this.product} on sale!`) : (`${this.brand} ${this.product} not on sale.`);
        }


    }


})

