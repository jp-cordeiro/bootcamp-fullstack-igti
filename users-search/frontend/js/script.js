let randomUsers;
const API_URL = "http://127.0.0.1:3001";
const elSpinner = document.querySelector("#spinner");
const elUsersList = document.querySelector("#users-list");
const elUsersSumary = document.querySelector("#users-sumary");
const elInputUserName = document.querySelector("#user-name");

hideSpinner();

elInputUserName.addEventListener("keyup", ($event) => {
  if ($event.key === "Enter") {
    searchUsers();
  }
});

async function searchUsers() {
  showSpinner();
  const name = elInputUserName.value;
  await fetchUsers(name);
  setTimeout((_) => {
    showUserListAndSumary();
    renderUsersSumary();
    renderUsersList();
  }, 1000);
}

function showSpinner() {
  elSpinner.classList.remove("hide");
}

function hideSpinner() {
  elSpinner.classList.add("hide");
}

function hideUserListaAndSumary() {
  elUsersList.classList.add("hide");
  elUsersSumary.classList.add("hide");
}

function showUserListAndSumary() {
  elUsersList.classList.remove("hide");
  elUsersSumary.classList.remove("hide");
}

async function fetchUsers(searchName) {
  hideUserListaAndSumary();
  const result = await (await fetch(`${API_URL}/results`)).json();
  setTimeout((_) => {
    hideSpinner();

    let convertedResult = result.map(({ picture, gender, dob, name }) => {
      return {
        picture: picture.thumbnail,
        gender,
        age: dob.age,
        fullName: `${name.title} ${name.first} ${name.last}`,
      };
    });

    randomUsers = convertedResult.filter((user) => {
      if (searchName && user.fullName.toLowerCase().includes(searchName)) {
        return user;
      }
    });
  }, 1000);
}

async function renderUsersList() {
  if (randomUsers.length > 0) {
    elUsersList.innerHTML = `
    <div class="card">
      <div class="card-content">
      <h4>${randomUsers.length} Users found</h4>

      ${randomUsers
        .map((user) => {
          return `<div class="card">
           <div class="card-content">
             <span class="card-title"></span>
     
             <div class="row">
             <img src="${user.picture}" alt="${user.fullName}" class="circle responsive-img"/>
             <span>${user.fullName} | Age: ${user.age}</span>
             </div>
           </div>
         </div>`;
        })
        .join("")}
      </div>
    </div>
     `;
  } else {
    elUsersList.innerHTML = `<div class="card-panel lighten-4"> Users not found</div`;
  }
}

function renderUsersSumary() {
  if (randomUsers.length > 0) {
    const sumAges = randomUsers.reduce((acc, { age }) => {
      return acc + age;
    }, 0);

    const sumMaleGender = randomUsers.reduce((acc, { gender }) => {
      if (gender === "male") {
        acc += 1;
      }
      return acc;
    }, 0);

    const sumFemaleGender = randomUsers.reduce((acc, { gender }) => {
      if (gender === "female") {
        acc += 1;
      }
      return acc;
    }, 0);

    const averadeAges = (sumAges / randomUsers.length).toFixed(2);
    elUsersSumary.innerHTML = `
    <div class="card">
      <div class="card-content">
        <h4> Users sumary</h4>

        <div class="row">
          <span> Sum of ages: <strong>${sumAges}</strong></span>
        </div>

        <div class="row">
          <span> Average of ages: <strong>${averadeAges}</strong></span>
        </div>

        <div class="row">
          <span>Men: <strong>${sumMaleGender}</strong></span>
        </div>

        <div class="row">
          <span>Women: <strong>${sumFemaleGender}</strong></span>
        </div>
      </div>
    </div>
    `;
  } else {
    elUsersSumary.innerHTML = `<div class="card-panel lighten-4"> Nothing to show</div`;
  }
}
