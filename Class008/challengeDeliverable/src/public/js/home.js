const socket = io();
const inputMessage = document.getElementById('chatBox');
const log = document.getElementById('messageLogs');

Swal.fire({
    title: "Log In:",
    input: "text",
    text: " Enter your name in the chat",
    inputValidator: (value) => {
        return !value && 'You need a username'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user)
})

socket.on('newUserConnected', data => {
    console.log(`Username ${data} received for users`);
    if (!user) return;
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} has joined the chat`,
        icon: "success"
    })
})

inputMessage.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && inputMessage.value.trim().length > 0) {
        socket.emit("message", { user, message: inputMessage.value });
        inputMessage.value = "";
    }
});

socket.on("log", (data) => {
    let logs = "";
    data.logs.forEach((log) => {
        logs += `<div><span>${log.user}: ${log.message}</span>`
    });
    log.innerHTML = logs;
});
