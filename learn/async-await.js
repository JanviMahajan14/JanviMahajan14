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

const sum = async ()=>{
    const sum1 = await add(1,1);
    const sum2 = await add(sum1,-1);
    const sum3 = await add(sum2,1);
    return sum3;
}

sum().then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});

// const doWork = async()=>{
//     return;
// }

// doWork().then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// });