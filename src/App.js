import "./App.css";
import Form from "./components/form";
import React, { useEffect } from "react";
import { uid } from "uid";
import List from "./components/list";
import WeatherDisplay from "./components/weather-display";
import useLocalStorageState from "use-local-storage-state";
function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [weather, setWeather] = useLocalStorageState("weather", {
    defaultValue: "",
  });
  const [location, setLocation] = useLocalStorageState("location", {
    defaultValue: "europe",
  });
  const URL = `https://example-apis.vercel.app/api/weather/${location}`;
  const filteredActivities = activities.filter((activity) =>
    weather.isGoodWeather
      ? activity.isForGoodWeather
      : !activity.isForGoodWeather
  );
  useEffect(() => {
    async function fetchingWeatherApi() {
      try {
        const response = await fetch(URL);
        const weather = await response.json();
        console.log(weather);
        setWeather(weather);
      } catch (error) {
        console.log("ERROR in FETCH: ", error);
      }
    }
    fetchingWeatherApi();
    const id = setInterval(fetchingWeatherApi, 5000);
    return () => {
      clearInterval(id);
    };
  }, [URL, setWeather]);
  function handleSubmit(newActivity) {
    setActivities([{ ...newActivity, id: uid() }, ...activities]);
    console.log(activities);
  }
  function handleDeleteActivity(id) {
    const newActivities = activities.filter((activity) => activity.id !== id);
    console.log("new activities ID: ", id);
    setActivities(newActivities);
  }
  return (
    <section
      className={`main-section ${
        weather.isGoodWeather ? "good-background" : "bad-background"
      }`}
    >
      <div className="container">
        <label className="label-form" htmlFor="location">
          Choose the Location:
        </label>
        <select
          id="location"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="europe">Europe</option>
          <option value="arctic">Arctic</option>
          <option value="sahara">Sahara</option>
          <option value="rainforest">Rainforest</option>
        </select>
      </div>
      <WeatherDisplay className="weather-display" weather={weather} />
      <List
        weather={weather}
        activities={filteredActivities}
        onDeleteActivity={handleDeleteActivity}
      />
      <Form onAddActivity={handleSubmit} />
    </section>
  );
}
export default App;
