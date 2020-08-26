/* Global Variables */

// Personal API Key for OpenWeatherMap API
const keyID = '&appid=b5835ff4355f31c2bba4d62ae8565145';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click' , getWeather);

/* Function called by event listener */
function getWeather(event) {
  const zipCode = document.getElementById('inputZipcode').value;
  const feel = document.getElementById('inputFeelings').value;
  getTemp(baseURL,zipCode,keyID)
    .then(data => {
      const temp = data.main.temp;
      postData('/add',{temp , date , feel});
    });
    updateUI();
};

/* Function to GET Web API Data*/
const getTemp = async (url,zip,key) =>{
  const response = await fetch(url,zip,key)
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
  const data = await fetch ('/all');
  document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
  document.getElementById('date').innerHTML = `Date: ${data.date}`;
  document.getElementById('feel').innerHTML = `Feeling: ${data.feel}`;
  try {
    const data = await getData.json();
  } catch (err) {
    console.log('Error' , err)
  }
};
