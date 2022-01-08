import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import "./App.css";
// import smoke from './images/cloud.png'
// import sun from './images/sun.png'

export default function App() {

  const [city, newCity] = useState(null)
  const [search, newSearch] = useState('Karachi')
  var smoke = "https://freepngimg.com/thumb/cloud/2-cloud-png-image.png"
  var sun = "https://freepngimg.com/thumb/sun/23551-1-sun-transparent-background.png"
  var source = smoke
  
  useEffect(() => {
    
    console.log("search", search)
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=3d1018049c0728121f60ecafac8d1796`)
      .then((data) => {
        console.log('data: ', data)
        console.log("seoncd: ", data.data.main.temp)
        let celcius = parseInt(data.data.main.temp) - 273
        console.log(celcius)
        newCity(data)
        console.log("city: ", city)
        
      })
  }, [search])

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var current = new Date()
    var localTime = current.getTime()
    var localOffset = current.getTimezoneOffset() * 60000
    var utc = localTime + localOffset
    var cite = utc + (1000 * parseInt(d))
    var nd = new Date(cite)

    let day = days[nd.getDay()];
    let date = nd.getDate();
    let month = months[nd.getMonth()];
    let year = nd.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }

  const sourcePic = (city) => {
    console.log('inside source pic: ', city)
    if(city.data.weather[0].main === "Clear") { 
      var source = sun
      console.log("source: ", source)
        return `${source}`
    }
    else if(city.data.weather[0].main === "Clouds") { 
      var source = {smoke}

      return `${source}`
    }
    else { 
      var source = {smoke}
      console.log("source: ", source)
      return `${source}`
    }
   

  }
  

  const timeBuilder = (d) => {
          console.log("time zone", d)
          var current = new Date()
          var localTime = current.getTime()
          var localOffset = current.getTimezoneOffset() * 60000
          var utc = localTime + localOffset
          var cite = utc + (1000 * parseInt(d))
          var nd = new Date(cite)
          var hours = nd.getHours()
          var minutes = nd.getMinutes()
          
          return nd.toLocaleTimeString('en-US')
  
  }
  
    return (
          
      <>
        <div className="App" id="first">
          <div className="main">
            <input type="text" id="input" 
              value={search} 
              onChange={(event) => {
                newSearch(event.target.value);
                sourcePic(city);
                }}
          />
        </div>
            
          {!city?
            (<p>..</p>) :
            (<div>

              
           

              <div className="cityName">{city.data.name}, {city.data.sys.country}</div>
              <div className="date">{dateBuilder(city.data.timezone)}</div>              
              <div className="time">{timeBuilder(city.data.timezone)}</div>

              <div className="temp">{Math.round(city.data.main.temp - 273)}°C</div>
              <div className="dot">...............</div>
              
              <img src={source} width={300} height={200}/> 
               
              <div className="descript">{city.data.weather[0].main}</div>

                

              <div className="twoBox">
                <div className="feel"><div id="hd">{Math.round(city.data.main.feels_like - 273)} °C</div> Feels like</div>
                <div className="humid"><div id="hd">{Math.round(city.data.main.humidity)}%</div> Humidity</div>
              </div>
            </div>)

          }
        </div>
      </>
    );
  } 
  
  

    
    
