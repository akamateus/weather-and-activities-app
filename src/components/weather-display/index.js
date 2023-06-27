export default function WeatherDisplay({ weather }) {
  return (
    <header>
      <h1 className="h1-header">
        {weather.condition}
        {weather.temperature} °C
      </h1>
    </header>
  );
}
