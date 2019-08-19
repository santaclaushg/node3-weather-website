console.log("Client side javascript file is loaded!");

// fetch(`http://puzzle.mead.io/puzzle`)
//   .then(response => response.json())
//   .then(data => console.log(data));

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log(search.value);
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
      console.log("data", data);
      if (data.error) {
        console.log(1);
        console.log("data", data);
        const { error } = data;
        messageOne.textContent = data.error;
      } else {
        console.log(2);
        const { address, location, forecastData } = data;
        console.log(address, location, forecastData);
        messageOne.textContent = location;
        messageTwo.textContent = forecastData;
      }
    });
  console.log(e);
});
