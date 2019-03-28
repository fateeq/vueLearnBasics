Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product">
			<h1>{{ title }}</h1>
			<img :src="image">
			<div>
				<p v-if="inStock">In Stock</p>
				<p v-else>Out of  Stock</p>
			</div>
			<div>
				<p>Shipping: {{ shipping }}</p>
			</div>
			<div class="align-left">
				<p>Details:</p>
				<ul>
					<li v-for="detail in details">{{ detail }}</li>
				</ul>
			</div>
			<div class="flex-container">
				<div v-for="(variant, index) in variants" 
				:key="variant.variantId"
				class="color-box"
				:style="{ backgroundColor: variant.variantColor }"
				@mouseover="updateProduct(index)">
				</div>
			</div>
			<div>
				<button 
					v-on:click="addToCart"
					:disabled="!inStock"
				>Add to cart
				</button>
			</div>
		</div>
	`,
	data() {
		return {
			brand: 'Vue Master',
			product: 'Socks',
			selectedVariant: 0,
			details: ["80% cotton","20% wool","gender neutral"],
			variants: [
				{
					variantId: 2234,
					variantColor: "green",
					variantImage: 'https://www.sockittome.com/images/detailed/6/MEF0209.jpg',
					variantQty: 10
				},
				{
					variantId: 2235,
					variantColor: "blue",
					variantImage: 'http://ilovethosesocks.com/wp-content/uploads/2017/08/mustache-socks-blue.jpg',
					variantQty: 0
				}
			]
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
		},
		updateProduct(x) {
			this.selectedVariant = x
			console.log(x)
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product
		},
		image() {
			return this.variants[this.selectedVariant].variantImage
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQty
		},
		shipping() {
			if (this.premium) {
				return "Free"
			} else
			return "$2.99"
		}
	}
})

var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: []
	},
	methods: {
		updateCart(id) {
			this.cart.push(id)
		}
	}
})