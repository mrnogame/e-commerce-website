var shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

function generateShop(){
    return  (shop.innerHTML = shopItems.map(function(x) {
        let {id,name,desc,price,img} =x ;
        let search = basket.find(function(x){
            return x.id === id;
        }) || [];
        return `
        <div id = product-id-${id} class="item">
            <img src=${img} alt="" width="200">
                <div class="details">
                     <h3>${name}</h3>
                   
                        <div class="price-qty">
                            <h2>${ price} €</h2>
                                <div class="button">
                                     <button onclick="togliere(${id})" class="btn-">-</button>
                                     <div id=${id}  class="quantity">
                                     ${search.item === undefined ? 0: search.item}
                                 </div>
                                 
                                        
                            <button onclick="agg(${id})" class="btnplus">+</button>
                            </div>
                         </div> 
                         <button onclick="showDetails('${id}')" class="descBtn">Show Details</button>
                <div id="desc${id}" class="hidden">
                    ${desc}
             
            </div>
        </div>
        </div>
        
        `
    }).join(""));

}
generateShop();

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

    localStorage.setItem("data", JSON.stringify(basket));
}

function update(id){
    let search = basket.find(function(x){
        return x.id === id
    })
    console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    totaleCarello();
};

function totaleCarello() {
    let numeroArticoliCar = document.getElementById('numProd');
    let totalItems = basket.map(function(x) {
        return x.item;
    }).reduce(function(x, y) {
        return x + y;
    }, 0);
    numeroArticoliCar.innerHTML = totalItems
    //  console.log(totalItems);
};
totaleCarello();
function showDetails(id) {
         var desc = document.getElementById("desc" + id);
         desc.classList.toggle("hidden");
};