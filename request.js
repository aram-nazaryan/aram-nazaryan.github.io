export async function get_crypto_data(name){
    const result = await fetch(`https://api.binance.com/api/v3/trades?symbol=${name}USDT&limit=1`, {method: "GET"});

    const parsOBJ = await result.json();

    return parsOBJ;
}

export async function get_crypto_currency(first, second){
    const result = await fetch(`https://api.binance.com/api/v3/trades?symbol=${first}${second}&limit=1`, {method: "GET"});
    
    if(result.status >= 400){
        throw first === second ? "Same params" : "Invalid conversion";
    }

    const parsOBJ = await result.json();

    return parsOBJ;
}