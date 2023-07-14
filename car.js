let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

function totalCarello() {
    let numeroArticoliCar = document.getElementById('numProd');
    numeroArticoliCar.innerHTML = basket.map(function(x) {
        return x.item;
    }).reduce(function(x, y) {
        return x + y;
    }, 0);

    
};
totalCarello();

function generateCartItems() {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x)=>{

        let{id, item} = x;
        let search = shopItems.find((y)=> y.id === id) || [];
        let {name, price, img }= search
            return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="" />  
                    <div class="details">
                    <div class="title-price-x"> 
                    <h4 class="title-price">
                    <p>${name}</p>
                    <p class="cart-item-price"> ${price} €</p>
                    </h4>
                    
                    <div class="button">
                        <button onclick="togliere(${id})" class="btn-">-</button>
                        <div id=${id}  class="quantity">${item}</div> 
                        <button onclick="agg(${id})" class="btnplus">+</button>    
                    </div> 
                    <button onclick="removeItem(${id})" class="closeCartBtn"> X</button>
                    </div>

                    <div class="cart-btn"></div>

                    <h3>${item * search.price} €</h3>
                
                    
                    </div>  
                </div>
            `;
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back To Home</button>
            </a>
        `;
        console.log("empty");
    }
};
generateCartItems();

function agg(id){
    let selectItem = id;
    let search = basket.find(function(x) {
        return x.id === selectItem.id})

    if(search === undefined) {
        basket.push({
            id : selectItem.id,
            item : 1,
    
        });
       
    } else{
        search.item += 1 ;
    }
    generateCartItems(); 
    // console.log(basket)
    update(selectItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    
};

function togliere(id) {

    let selectItem = id;
    let search = basket.find(function(x) {
        return x.id === selectItem.id;
    });

    if (search === undefined) {
        return localStorage.removeItem("data");
    } else if (search.item === 0) {
        // Remove the item from the basket
        basket = basket.filter(function(x) {
            return x.id !== id;
        });
    } else {
        search.item -= 1;
    }

    update(selectItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();

    localStorage.setItem("data", JSON.stringify(basket));
}

function update(id){
    let search = basket.find(function(x){
        return x.id === id
    })
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    totalCarello();
    totalAmont();
};

function removeItem(id){
    let seletedItem=id
    // console.log(seletedItem.id)
    basket = basket.filter((x)=> x.id !== seletedItem.id)
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems(); 
    totalAmont();
    totalCarello();
};

function clearAll(){
    
    basket =[];
    
    generateCartItems();
    totalCarello();
    localStorage.setItem("data", JSON.stringify(basket));
   
} ;



let totalAmont = () => {
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let{item, id } = x;
            let search = shopItems.find((y)=> y.id === id) || [];
            return item * search.price ;
           
        }).reduce((x,y) => x + y, 0);
        label.innerHTML= `
        <h2> Total bill : ${amount} €</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearAll()"{" class="removeAll"> Clear all </button>
        `
        // console.log(amount);
        
    } else return 
};

totalAmont();

