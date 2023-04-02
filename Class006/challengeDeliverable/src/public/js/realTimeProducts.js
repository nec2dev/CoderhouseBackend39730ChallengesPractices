const socket = io();
const form = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const thumbnail = document.getElementById('thumbnail');
const divRealTimePorducts = document.getElementById('realTimeProducts')

socket.emit('message', 'We have an open connection');
socket.on('updateProducts', (message) => {
    console.log(message);
    fetch('/api/products/')
        .then(res => res.json())
        .then(data => {
            let list = ''
            data.forEach(p => {
                list += `title: ${p.title} ,
                description: ${p.description} ,
                code: ${p.code} ,
                price: ${p.price} ,
                stock: ${p.stock} ,
                category: ${p.category} ,
                thumbnail: ${p.thumbnail} ,
                id: ${p.id}</br>`
            });
            divRealTimePorducts.innerHTML = list;
        })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        thumbnail: thumbnail.value,
        })
    })
        .then(socket.emit("products", console.log("The products were shipped")))
})

socket.on('productList', (message) => {
    console.log(message);
    fetch('/api/products/')
        .then(res => res.json())
        .then(data => {
            let list = ''
            data.forEach(p => {
                list += `title: ${p.title} ,
                description: ${p.description} ,
                code: ${p.code} ,
                price: ${p.price} ,
                stock: ${p.stock} ,
                category: ${p.category} ,
                thumbnail: ${p.thumbnail} ,
                id: ${p.id}</br>`
            });
            divRealTimePorducts.innerHTML = list;
        })
    }
)













