const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Ambos campos son obligatorios...');
        return;
    }
    callApi(nameCity.value, nameCountry.value);

})

function callApi(city, country){
    const apiId = '272bea7f2677cb6579097bc1f6d84c6d'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json()
            
        })
        .then(dataJSON => {
            if(dataJSON.cod === '404') {
                showWeather('Ciudad no encontrada');
                }else{
                    clearHTML();
                    showWeather(dataJSON)
                
                }
            }
            
            )
        .catch(error => {
            alert(error)
        })}

    function showWeather(data){
        const{name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
        const grados = kvToCentigrados(temp)
        const min = kvToCentigrados(temp_min)
        const max = kvToCentigrados(temp_max)
        
        
        
        const content = document.createElement('div');
        content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
        <h2>${grados}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
        `;

        result.appendChild(content)
        
    }



    function showError(message){
        const alert = document.createElement('p');
        alert.classList.add('alert-message');
        alert.innerHTML = message;
        
        form.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        },2000);
    }

function kvToCentigrados(temp){
    return parseInt(temp  - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
