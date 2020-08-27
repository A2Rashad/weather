/* Global Variables */

// Personal API Key for OpenWeatherMap API
const keyID = '';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click' , getWeather);

/* Function called by event listener */
function getWeather(event) {
  event.preventDefault();
  const zipCode = document.getElementById('inputZipcode').value;
  const feel = document.getElementById('inputFeelings').value;
  getTemp(baseURL,zipCode,keyID)
    .then(data => {
      postData('http://localhost:3000/add',{temp : data.main.temp , date: date , feel : feel});
    });
    updateUI();
};

/* Function to GET Web API Data*/
const getTemp = async (url,zip,key) =>{
  const response = await fetch(`${url}?zip=${zip},us&units=metric&APPID=${key}`);
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error' , err)
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log('Error' , err)
  }
};


/* Function to GET Project Data */
const updateUI = async () => {
  const getData = await fetch ('http://localhost:3000/all');
  try {
    const data = await getData.json();
    document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
    document.getElementById('date').innerHTML = `Date: ${data.date}`;
    document.getElementById('feel').innerHTML = `Feeling: ${data.feel}`;
  } catch (err) {
    console.log('Error' , err)
  }
};
