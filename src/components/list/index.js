export default function List({ weather, activities, onDeleteActivity }) {
  return (
    <>
      <p
        className={`${
          weather.isGoodWeather ? "weather-phrase-good" : "weather-phrase-bad"
        }`}
      >
        {weather.isGoodWeather
          ? "The weather is awesome! Go outside and: "
          : "Bad weather outside! Here's what you can do now:"}
      </p>
      <ul>
        {activities?.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            <button
              className="delete-button"
              onClick={() => onDeleteActivity(activity.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
