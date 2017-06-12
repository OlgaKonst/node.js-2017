
const btn = document.querySelector('.btn');
const weatherBlock = document.querySelector('.weather-forecast-item');
const picture = document.querySelector('img');
const tempTitle = document.querySelector('.temprat-title');
const windTitle = document.querySelector('.wind-title');
const pressureTitle = document.querySelector('.pressure-title');

const url = 'http://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&APPID=88ec8d7c9f65bdeb88f6ba35f1766831';
const imgUrl = 'http://openweathermap.org/img/w/';

const createAjaxPromise = (method, url, data) => {
    return new Promise((resolve, reject) => {
        const ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open(method, url);
        ajaxRequest.send(data);
        ajaxRequest.addEventListener('readystatechange', () => {
            if(ajaxRequest.readyState === ajaxRequest.DONE) {
                if(ajaxRequest.status !== 200) {
                    return reject(ajaxRequest);
                }
                const response = JSON.parse(ajaxRequest.responseText);
                console.log('response',response);
                return resolve(response);
            }
        });
    })
}
function setTimePeriod(data) {
    return new Promise((res,rej) => {
        setTimeout(() => { console.log('3000ms'); return res(data)}, 3000);
    });
}
btn.addEventListener('click', (e) => {
    e.preventDefault();
    setTimePeriod().then(() => {
        console.log('ajax');
        return createAjaxPromise('GET', url)
    }).then((data) => {
        return setTimePeriod(data);
    }).then((data) => {
        console.log('out');
        console.log(data.main.pressure);
        weatherBlock.style.display = "block";
        tempTitle.textContent = data.main.temp;
        windTitle.textContent = data.wind.speed;
        pressureTitle.textContent = data.main.pressure;
        const pictureUrl = imgUrl + data.weather[0].icon;
        picture.setAttribute('src', `${pictureUrl}.png`);
    }).catch((err) => {
        console.log('ajax request failed! ', err);
        });
});

