export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // console.log(data);
    // console.log(event.target.elements.isForGoodWeather.checked);
    event.target.elements.name.focus();
    event.target.reset();
    onAddActivity(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add new activity👇🏽</h2>
        <section>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" required />
        </section>
        <section>
          <label htmlFor="check-box">Good weather activity? </label>
          <input type="checkbox" id="check-box" name="isForGoodWeather" />
        </section>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
