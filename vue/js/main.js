let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./assets/vmSocks-blue-onWhite.jpg",
        description: "A pair of warm, fuzzy socks.",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inventory: 100,
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        cart: 0,

        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
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
        updateProduct(variantImage) {
            this.image = variantImage
        }

    }


})

