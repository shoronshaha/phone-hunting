const loadPhone = async (searchText = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(data);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  //   console.log(phones);
  //> 1 get korlam jekhane amra data gula dekhabo sey id k nilam
  const phoneContainer = document.getElementById("phone-container");
  //> display clear after new search
  phoneContainer.textContent = "";
  //> show more then 12 phones in this button
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log("isShowAll :>> ", isShowAll);
  //> display first 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    //> 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 w-96 shadow-xl`;
    //> 3 set inner html
    phoneCard.innerHTML = `
    <figure>
        <img
        src="${phone.image}"
        alt="Shoes"
        />
    </figure>
    <div class="card-body">
        <h2 class="card-title text-red-500">
        ${phone.phone_name}
        <div class="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
       <button onClick='handleShowDetail("${phone.slug}")' class="btn btn-warning">Show Details</button>
    </div>
    `;
    //> 4 appendChild
    phoneContainer.appendChild(phoneCard);
  });

  //> hide loading spinner
  toggleLoadingSpinner(false);
};

//
const handleShowDetail = async (id) => {
  // console.log("show details", id);
  //? load single phone data
  const res = await fetch(
    // `https://openapi.programing-hero.com/api/phone/${id}`
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(data);
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img src ='${phone.image}' alt="" />;
    <p> <span> storage </span> ${phone?.mainFeatures?.storage} </p>;
<p><span>Gps</span> ${phone?.others?.GPS} </p>;
  `;
  show_details_modal.showModal();
};

//str handelSearch
const handelSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

//str handelSearch recap

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// str show all btn handelar

const handleShowAll = () => {
  handelSearch(true);
};
loadPhone();
