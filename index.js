import {
    get_crypto_data,
    get_crypto_currency
} from './request.js'

const live_currency = document.getElementById("live_currency");
const currency_type_one = document.getElementById("currency_type_one")
const currency_type_two = document.getElementById("currency_type_two")
const currency_value_one = document.getElementById("currency_value_one")
const currency_value_two = document.getElementById("currency_value_two")
const btn = document.getElementById("btn")
let last_price = null;

setInterval(() => {
    get_crypto_data(currency_type_one.value).then(data => {
        const cost = parseFloat(data[0].price).toFixed(6)
        live_currency.innerHTML = `1 ${currency_type_one.value} = ${cost}$`
        live_currency.style.color = !last_price || last_price === cost ? "black" : last_price < cost ? "green" : "red"; 
        last_price = cost;  
    })
}, 1500)

btn.addEventListener("click", () => {
    if(currency_value_one.value === "" || currency_value_one.value < 0){
        currency_value_one.style.border = "1px solid red"
    }
    else{
        currency_value_one.style.border = "0"
        currency_value_two.style.border = "0"
        const crypto = get_crypto_currency(currency_type_one.value, currency_type_two.value);
        crypto
        .then(data => {
            currency_value_two.innerHTML = currency_value_one.value * data[0].price;
        })
        .catch(error =>{
            error === "Same params" ? currency_value_two.innerHTML = currency_value_one.value: currency_value_two.innerHTML = "Invalid corversion"
            currency_value_two.style.border = "1px solid red"
        })
    }
})


window.addEventListener("keydown", (e) => {
    if(e.key === "Enter")
        btn.click()
})


currency_type_two.addEventListener("click", () => {
    currency_value_two.innerHTML = ""
    currency_value_two.style.border = "0"
})