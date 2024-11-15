const apiKey = 'Open_Weather_Map_API_KEY';
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const errorMessage = document.getElementById('error');

getWeatherBtn.addEventListener('click', getWeather);

function getWeather() {
    const city = cityInput.value.trim();

    if (city === '') {
        errorMessage.textContent = 'Lütfen geçerli bir şehir adı girin!';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},TR&appid=${apiKey}&units=metric&lang=tr`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                errorMessage.textContent = 'Şehir bulunamadı! Lütfen tekrar deneyin.';
                clearWeather();
                return;
            }

            console.log('API\'den gelen hava durumu açıklaması:', data.weather[0].description);

            errorMessage.textContent = '';
            cityName.textContent = `Şehir: ${data.name}, ${data.sys.country}`;
            temperature.textContent = `Sıcaklık: ${data.main.temp}°C`;
            humidity.textContent = `Nem: ${data.main.humidity}%`;
            wind.textContent = `Rüzgar Hızı: ${data.wind.speed} m/s`;

            const weatherDescription = data.weather[0].description.toLowerCase();
            const weatherIcon = document.createElement('img');
            
            let finalText = 'Durum: ';

            console.log('Hava durumu açıklaması kontrolleri başlıyor...');

            if (weatherDescription.includes('gök gürültülü') || weatherDescription.includes('sağanak yağışlı')) {
                console.log('Gök gürültülü/sağanak yağış durumu tespit edildi');
                weatherIcon.src = "Thunder.png";
                finalText += weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
            } else if (weatherDescription.includes('kısa süreli hafif yoğunluklu yağmur')) {
                console.log('Kısa süreli yağmur durumu tespit edildi');
                weatherIcon.src = "night-rain.png";
                finalText += weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
            } else if (weatherDescription.includes('kapalı')) {
                console.log('Kapalı hava durumu tespit edildi');
                weatherIcon.src = "overcast.png";
                finalText += "Kapalı";
            } else if (weatherDescription.includes('sis')) {
                weatherIcon.src = "fog.png";
                finalText += "Sisli";
            } else if (weatherDescription.includes('açık')) {
                weatherIcon.src = "sun.png";
                finalText += "Açık";
            } else if (weatherDescription.includes('parçalı bulut')) {
                weatherIcon.src = "partly-cloudy.png";
                finalText += "Parçalı Bulutlu";
            } else if (weatherDescription.includes('bulut')) {
                weatherIcon.src = "clouds.png";
                finalText += "Bulutlu";
            } else if (weatherDescription.includes('kar')) {
                weatherIcon.src = "snow.png";
                finalText += "Karlı";
            } else {
                weatherIcon.src = "default.png";
                finalText += weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
            }

            console.log('Seçilen ikon:', weatherIcon.src);

            weatherIcon.style.width = '50px';
            weatherIcon.style.height = '50px';
            weatherIcon.style.marginLeft = '10px';

            weatherIcon.onerror = function() {
                console.error('Resim yüklenemedi:', weatherIcon.src);
            };

            description.innerHTML = '';
            description.appendChild(document.createTextNode(finalText));
            description.appendChild(weatherIcon);
        })
        .catch(error => {
            console.error('API Hatası:', error);
            errorMessage.textContent = 'Bir hata oluştu! Lütfen tekrar deneyin.';
            clearWeather();
        });
}

function clearWeather() {
    cityName.textContent = '';
    temperature.textContent = '';
    description.innerHTML = '';
    humidity.textContent = '';
    wind.textContent = '';
}