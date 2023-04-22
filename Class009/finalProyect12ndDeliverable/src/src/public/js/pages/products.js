addProductToCart = async (pid) => {
    const options = {
        method: "POST",
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    };
    await fetch(
        `http://localhost:8080/api/carts/zzmXziFAu9UoBl5C/product/${pid}`,
        options
    )
}