const tipCalc = (total,tipPercent) => {
    const tip = (total * tipPercent)/100
    return tip + total
}

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a < 0 | b < 0){
                reject("Non negative no not allowed!");
            }
            resolve(a+b);
        },2000);
    })
}

module.exports = {
    tipCalc,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}