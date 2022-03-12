let loc = document.getElementById('location');
let tempIcon = document.getElementById('temp-icon');
let tempValue = document.getElementById('temp-value');
let climate = document.getElementById('climate');
let iconFile;
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});

const getWeather=async(city)=>{
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=029f46ceab0d93178f1c0263bb0e3af2`,
        {mode:'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempValue.textContent=Math.round(feels_like-273);
        if(id<300 && id>200){
            tempIcon.src="./icons/thunderstorm.png";
        }
       else if(id<400 && id>300){
            tempIcon.src="./icons/cloud.png";
        }
        else if(id<600 && id>500){
            tempIcon.src="./icons/rain.png";
        }
        else if(id<700 && id>600){
            tempIcon.src="./icons/snow.png";
        }
        else if(id<800 && id>700){
            tempIcon.src="./icons/atmosphere.png";
        }
        else if(id==800){
            tempIcon.src="./icons/clear.png";
        }
        
    }
    catch(error){
        alert('City not found');
    }
};


window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=029f46ceab0d93178f1c0263bb0e3af2`;
            fetch(api).then((response) => {
                return response.json();
            })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];


                    loc.textContent = name;
                    climate.textContent = main;
                    tempValue.textContent = Math.round(feels_like - 273);
                    if(id<300 && id>200){
                        tempIcon.src="./icons/thunderstorm.png";
                    }
                   else if(id<400 && id>300){
                        tempIcon.src="./icons/cloud.png";
                    }
                    else if(id<600 && id>500){
                        tempIcon.src="./icons/rain.png";
                    }
                    else if(id<700 && id>600){
                        tempIcon.src="./icons/snow.png";
                    }
                    else if(id<800 && id>700){
                        tempIcon.src="./icons/atmosphere.png";
                    }
                    else if(id==800){
                        tempIcon.src="./icons/clear.png";
                    }
                   

                })




        })

    }
})