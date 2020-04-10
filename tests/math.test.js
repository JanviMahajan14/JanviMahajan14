const {tipCalc, celsiusToFahrenheit, fahrenheitToCelsius, add} = require('../src/math');

test('Should calculate pay',()=>{
    const total = tipCalc(10,30)
    expect(total).toBe(13)

    // if(total != 13){
    //     throw new Error('Total tip should be 13')
    // }
})

test('celsuis to fahrentiate', () =>{
    const res = celsiusToFahrenheit(0)
    expect(res).toBe(32)
})

test('fahrentiate to celsuis', () =>{
    const res = fahrenheitToCelsius(32)
    expect(res).toBe(0)
})

// test('Async code',(done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2)
//         done()
//     },2000)
// })

test('add two nos',(done)=>{
    add(2,3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('add two nos async-await',async()=>{
    const sum = await add(5,5)
    expect(sum).toBe(10)
})