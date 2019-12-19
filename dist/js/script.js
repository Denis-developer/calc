window.addEventListener("DOMContentLoaded", function () {

  let blocks = document.getElementById("calc-blocks"),
      hours = document.getElementById("calc-hours"),
      rate = document.getElementById("calc-rate"),
      pages = document.getElementById("calc-pages"),
      blockBlocks = document.getElementsByClassName("block-blocks")[0],
      blockPages = document.getElementsByClassName("block-pages")[0],
      landing = document.getElementById("land"),
      corpotation = document.getElementById("corp"),
      checkboxAdmin = document.getElementById("admin"),
      checkboxCMS = document.getElementById("cms"),
      input = document.getElementsByTagName("input"),
      price = document.getElementById("price"),
      count = 0,
      time,
      rates,
      hourRate;

  const page = 3000,
        block = 500,
        cms = 3000,
        corp = 12000,
        land = 5000,
        admin = 1000;

blockPages.style.display = "none";

  landing.addEventListener("click", () => {

    for (let i = 0; i < input.length; i++) {
      input[i].value = "";
    }

    blockBlocks.style.display = "flex";
    blockPages.style.display = "none";

    corpotation.classList.remove("active-tab");
    landing.classList.add("active-tab");

    if(checkboxAdmin.checked){
      checkboxAdmin.checked = false;
    }

    if(checkboxCMS.checked){
      checkboxCMS.checked = false;
    }

    count = land;
    price.value = count;

  })

  corpotation.addEventListener("click", () => {

    for (let i = 0; i < input.length; i++) {
      input[i].value = "";
    }

    blockPages.style.display = "flex";
    blockBlocks.style.display = "none";

    landing.classList.remove("active-tab");
    corpotation.classList.add("active-tab");

    if(checkboxAdmin.checked){
      checkboxAdmin.checked = false;
    }

    if(checkboxCMS.checked){
      checkboxCMS.checked = false;
    }

    count = corp;
    price.value = count;

  })

  blocks.addEventListener("change", () => {

    hours.value = "";
    rate.value = "";
    count = blocks.value * block;
    price.value = count;

  })

  pages.addEventListener("change", () => {

    hours.value = "";
    rate.value = "";
    count = pages.value * page;
    price.value = count;

  })

  hours.addEventListener("change", () => {

    pages.value = "";
    blocks.value = "";
    time = hours.value;
    count = time * rates;

    if(rate.value == ""){
      price.value = "";
    }else{
      price.value = count;
    }

  })

  rate.addEventListener("change", () => {

    pages.value = "";
    blocks.value = "";
    rates = rate.value;

    count = time * rates;

    if(hours.value == ""){
      price.value = "";
    }else{
      price.value = count;
    }

  })

  checkboxAdmin.addEventListener("change", () => {

    if(checkboxAdmin.checked){
      count += admin;
    }else{
      count -= admin;
    }

    price.value = count;

  })

  checkboxCMS.addEventListener("change", () => {

    if(checkboxCMS.checked){
      count += cms;
    }else{
      count -= cms;
    }

    price.value = count;

  })

});
