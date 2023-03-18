let impuestos = {
    IVA: 0.21,
    ISR: 0.1,
    IEPS: 0.15,
    IT: 0.25
};

let soloValores = Object.values(impuestos);
console.log(soloValores); // [ 0.21, 0.1, 0.15, 0.25 ]