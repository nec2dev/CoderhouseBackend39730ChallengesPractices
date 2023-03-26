function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}
const array = []
for (/* Creating an array of 10000 random numbers between 1 and 20. */
let i = 0;i < 10000; i++) {
    let key = getRandomInt(1,21)
    array.push(key)
}
const obj = array.reduce((acc,cur)=>{
    if(Object.keys(acc).includes(String(cur))) {
        acc[String(cur)] += 1
    } else {
        acc[cur] = 1
    }
    return acc
},{})
console.log(obj)
