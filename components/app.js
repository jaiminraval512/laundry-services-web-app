
emailjs.init("LHvjlNpH_5L43xf4E");

const all_service = [
  { id: 1, img: `/assets/dry-clean.png`, name: "Dry Cleaning", price: 200 },

  { id: 2, img: `/assets/wash&fold.png`, name: "Wash & Fold", price: 100 },

  { id: 3, img: `/assets/iron.png`, name: "Clothe Ironing", price: 30 },

  { id: 4, img: `/assets/stain-removal.png`, name: "Stain Removal", price: 500 },

  { id: 5, img: `/assets/leather.png`, name: "Leather Clothes", price: 990 },

  { id: 6, img: `/assets/wedding-dress.png`, name: "Wedding Dress ", price: 2800 },
];

let serviceList = document.querySelector(".services-list");

let items = document.querySelector(".items");
let note = document.createElement("div");
note.className = "note";
note.textContent = "No Service Selected!"

let cart = [];
if (cart.length === 0) {
  items.appendChild(note);
}


// Rendring service items
const renderService = () => {

  all_service.forEach(service => {
    serviceList.insertAdjacentHTML("beforeend", `
        <div class="service-item">
        <div class="service-det">
            <img src="${service.img}" alt="${service.name}">
            <span class="item-name">${service.name}</span>
            <span class="divide"></span>
            <span class="item-price">
              <span>₹</span><span id="price">${service.price}</span>
            </span>
            </div>
            <div class="service-action">
            <button class="btn">Select</button>
          </div>
          </div>
      `);
  });
}

// Rendring cart
const renderCartItems = () => {

  let totalPrice = document.querySelector(".total-price");
  let total = 0;

  if (cart.length === 0) {
    totalPrice.textContent = 0;
    items.innerHTML = " "
    items.appendChild(note);
  }
  else {
    items.innerHTML = " ";
    cart.forEach((item, index) => {
      total += item.price;
      items.insertAdjacentHTML("beforeend", `

              <div class="cart-item">
                  <span class="item-no">${index + 1}</span>
                  <span class="item-name">${item.name}</span>
                  <span class="item-price"><span class="rs">₹</span>${item.price}</span>
              </div>

        `);
    });
    totalPrice.textContent = total;
  }




}

// Cart manipulation
const manageCart = () => {

  serviceList.addEventListener("click", (evt) => {

    let card = evt.target.closest(".service-item");
    let serviceDet = card.querySelector(".service-det");
    let serviceName = serviceDet.querySelector(".item-name");
    let servicePrice = serviceDet.querySelector("#price");
    let name = serviceName.textContent;
    let price = parseInt(servicePrice.textContent);
    let itemNo = 0;

    let item = {
      name: name,
      price: price
    }

    if (evt.target.tagName === "BUTTON") {
      // btn toggle  
      isSelected = false;
      if (evt.target.textContent === "Select") {
        cart.push(item);
        isSelected = !isSelected;
        evt.target.textContent = "Remove";
        evt.target.style.backgroundColor = "#D62828";
        evt.target.style.color = "white";



        // Render cart
        renderCartItems();

      }
      else {

        // Btn toggle
        evt.target.textContent = "Select";
        evt.target.style.backgroundColor = "#59CEF2";
        evt.target.style.color = "black";
        cart = cart.filter(cartItem => cartItem.name !== name);

        // Render cart
        renderCartItems();

      }

    }



  });


}

// Book now form 
const bookServiceForm = () => {

  let form = document.querySelector(".booking-form");

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const nameInp = document.querySelector("#fullName");
    const emailInp = document.querySelector("#email");
    const phoneInp = document.querySelector("#phone");

    const name = nameInp.value;
    const email = emailInp.value;
    const phone = phoneInp.value;
    let msgCont = document.querySelector(".book-msg");
    let errCont = document.querySelector(".book-err");
    let time = 4;
    

    if (name !== "" && email !== "" && phone !== "") {

      if (cart.length !== 0) {
        msgCont.style.display = "block";
        errCont.style.display = "none";
        form.reset();

        setTimeout(() => {
          msgCont.style.display = "none";
        }, time * 1000);

        // Implimenitg email.js , to send email : 


        // implimenting table for sending 
      let total = 0;

let table = `
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border:1px solid #ddd; padding:8px;">Service</th>
    <th style="border:1px solid #ddd; padding:8px;">Price (₹)</th>
  </tr>
`;

cart.forEach(service => {
  total += service.price;

  table += `
    <tr>
      <td style="border:1px solid #ddd; padding:8px;">${service.name}</td>
      <td style="border:1px solid #ddd; padding:8px;">${service.price}</td>
    </tr>
  `;
});

table += `</table>`; // ✅ important

emailjs.send("service_jdp1g2b", "template_a7sn9mn", {
  name: name,
  email: email, 
  time: new Date().toLocaleString(),
  services_table: table,
  total: total
})
.then(() => {
  console.log("Mail Sent ");
})
.catch(err => {
  console.error("Error:", err);
});
      }
      else {
        errCont.style.display = "block";
      }

    }
    else {
      alert("Please fill the form");

      return;
    }



  });

}


renderService();
manageCart();
bookServiceForm();
