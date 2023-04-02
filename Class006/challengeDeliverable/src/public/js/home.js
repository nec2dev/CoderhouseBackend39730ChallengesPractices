//const socket = io();
//socket.emit('message', "Hello!, I am communicating from a websocket");
const divProducts = document.getElementById("products");

fetch('/api/products/')
    .then(res => res.json())
    .then(data => {
        let list = "";
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
        divProducts.innerHTML = list;
    })