const qutu =document.getElementById("card") 

let limit = 4;
let page = 1

async function getProducts(){
    let skip = (page-1)*limit
    const response = await axios.get(`https://65685e799927836bd974a707.mockapi.io/products?limit=${limit}&page=${page}&skip=${skip}`)
    const data = await response.data

    db = data;

    db.map(item => {
        const box = document.createElement('div');
        box.className ="cardList"
        box.innerHTML = `
            <img src="${item.image}" alt="photo">
            <h1>${item.title}</h1>
            <p>$ ${item.price}</p>
            <button onclick="addToBasket(${item.id})">SEPETE EKLE</button>
        `
        qutu.append(box)
    })
    page++
}
document.getElementById("btn").addEventListener("click", getProducts)


function addToBasket(id){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(db.find(item => item.id == id));
    localStorage.setItem('cart', JSON.stringify(cart));
}

getProducts()