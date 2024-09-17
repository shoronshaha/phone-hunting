const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(data);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  //   console.log(phones);
  //> 1 get korlam jekhane amra data gula dekhabo sey id k nilam
  const phoneContainer = document.getElementById("phone-container");
  //> display clear after new search
  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    console.log(phone);
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
        <div class="badge badge-outline">Fashion</div>
        <div class="badge badge-outline">Products</div>
        </div>
    </div>
    `;
    //> 4 appendChild
    phoneContainer.appendChild(phoneCard);
  });
};

const handelSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText);
};

// loadPhone();
