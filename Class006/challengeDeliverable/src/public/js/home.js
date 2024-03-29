const divProducts = document.getElementById("products");
const socket = io();

socket.emit('message', "Hello!, I am communicating from a websocket");

fetch('/api/products/')
    .then(res => res.json())
    .then(data => {
        let productsList = "";
        data.forEach(p => {
            productsList += `title: ${p.title},
            description: ${p.description},
            code: ${p.code},
            price: ${p.price},
            stock: ${p.stock},
            category: ${p.category},
            thumbnail: ${p.thumbnail},
            id: ${p.id}</br>`
        });
        divProducts.innerHTML = productsList;
    })