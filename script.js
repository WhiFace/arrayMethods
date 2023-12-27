//get elements from the dom

const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionaireBtn = document.getElementById("show-millionaire");
const sortBtn = document.getElementById("sort");
const calculeteWealthBtn = document.getElementById("calculate-wealth");

// initialize array that will store data to be displayed to DOM
let data = [];

//function that fetch data from api to create user and add money

const getRandomUser = async () => {
  //fetch data from api
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();

  //create user and add money
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  //call a function the take user data and push it to data array
  addData(newUser);
};

//Double money
const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

//Sort money
const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

//Filter millionaires
const showMillionaire = () => {
  data = data.filter((user) => {
    return user.money > 1000000;
  });

  updateDOM();
};

//Calculate total wealth
const calculateTotalWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
};

getRandomUser();

//create a function that takes user data and push it to data array

const addData = (obj) => {
  data.push(obj);
  updateDOM();
};

const updateDOM = (providedData = data) => {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    // 1. create an element in the DOM
    const element = document.createElement("div");

    //2. add person class to that element
    element.classList.add("person");

    // 3.update innerHTML with name and money
    element.innerHTML = `<strong>${item.name} </strong> ${formatMoney(
      item.money
    )}`;

    // 4. add that element to main div
    main.appendChild(element);
  });
};

//format money
const formatMoney = (number) => {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
};

//Event Listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionaireBtn.addEventListener("click", showMillionaire);
calculeteWealthBtn.addEventListener("click", calculateTotalWealth);
