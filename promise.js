//вначале выведутся все console.log, а потом setTimeout
/*setTimeout(() => {
    console.log('Time is out!');
}, 1000);
console.log('Waiting');
console.log('Waiting');
console.log('Waiting');
console.log('Waiting');

 //что выполнится раньше setImmediate, setTimeout, process.nextTick ?
 setTimeout(() => {
 console.log('set timeout');
 }, 0);
 setImmediate(() => {
 console.log('set immediate');
 });
 process.nextTick(()=>{console.log('nextTick')});

//д\з последовательный запуск
setTimeout(() => {
    console.log('one seconds is over');
    setTimeout(() => {
        console.log('two seconds is over');
        setTimeout(() => {
            console.log('two and half seconds is over');
            setTimeout(()=>{
                console.log('done');
            }, 0);
        },2500)
    }, 2000)
}, 1000);
//я неправильно сделала:
 setTimeout(()=>{
 console.log('1');
 }, 3000);
 setTimeout(()=>{
 console.log('2');
 }, 2000);
 setTimeout(()=>{
 console.log('3');
 }, 500);
 setTimeout(()=>{
 console.log('done');
 }, 0);

const setTimePeriod = (ms, msg) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(msg);
            res(msg);
        }, ms);
    });
}
setTimePeriod(1000, '11')
    .then(done => setTomePeriod(2000, '12'))
    .then(done => setTomePeriod(2500, '13'))
    .then(done => setTomePeriod(0, 'done'));

// делаем внештатную ситуацию, чтоб сработал reject
const setTimePeriod = (ms, msg) =>  new Promise((res, rej) => {
        if( ms >10000) {
           return rej('I can not waiting so much!');
        }
        setTimeout(() => {
            console.log(msg);
            res(msg);
        }, ms);
    });

setTimePeriod(1000, 'one seconds is over')
    .then(done => {
        console.log(done);
        return setTimePeriod(2000, 'two seconds is over');
    })//console.log(done); - рапортуем что предыдущий промис успешно прошел
    .then(done => {
        console.log(done);
        return setTimePeriod(2500, 'two and half seconds is over');
    })
    .then(done => {
        console.log(done);
        return setTimePeriod(1500, 'A lot of millisecond lost!');
    })
    .catch( err => {
        console.log(err);
        return setTimePeriod(2000, 'two second is over in catch')
    })
    .then(done => {
        console.log(done);
        return setTimePeriod(1500, 'after catch');
    })
    .then((data) =>{
        console.log(data);
        console.log('Done');
    })
    ;

//сработает? нет
/*try{
    setTimeout(()=>{}, 1000);
} catch(e){
    console.log(e)
}

//параллельный запуск ********************************************************************
//1сп
setTimeout(()=>{
    console.log('First done')
}, 1000);
setTimeout(()=>{
    console.log('Second done')
}, 2000);
setTimeout(()=>{
    console.log('Third done')
}, 1500);

//2сп

const wait = (ms) => {
    return new Promise((resolve, reject) => {
        if(ms > 2000) {
            reject('A long time period');
            return;
        }
        setTimeout(() => {
            console.log('Im there');
            resolve(ms);
            console.log('Im here!');
            return;
        }, ms);
    })
}

Promise.all([
    wait(1000),
    wait(1500),
    wait(3000)
]).then(data => {
    console.log(data);
    console.log('DONE!');
}).catch(err => {
    console.log(err);
    console.log('Something goes wrong');
});
// кто первый отстрелевает, тот и выигрывает и его данные будут обработаны в then
Promise.race([
    wait(2000),
    wait(1000),
    wait(500)
])
    .then(done => {
    console.log(done);
    console.log('done');
})
    .catch(err => {
        console.log(err);
        console.log('err');
    });
 */
Promise
    .resolve('Some data')
    .then(data => {
        console.log(data);
    });
Promise
    .reject('Error')
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log('Goes wrong!');
        console.log(e);
    })