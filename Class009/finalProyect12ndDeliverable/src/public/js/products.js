addProductToCart = async (pid) => {
    const options = {
        method: "POST",
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    };
    await fetch(
        `${pid}`,
        options
    )
}