import ProductCard from './productCard.js'

function loadProducts(){
  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://my-json-server.typicode.com/aero-frontend/test-task/PRODUCTS_SUCCESS', false);

  xhr.send();

  if (xhr.status !== 200) {
    console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
  } else {
    clearProductsCards();
    return (JSON.parse(xhr.responseText).data.products);
  }
}

function submitFilters() {
  let xhr = new XMLHttpRequest();
  xhr.open('PATCH', 'https://my-json-server.typicode.com/aero-frontend/test-task/FILTER_SUCCESS', false);
  xhr.send(getFiltersValues());
  if (xhr.status !== 200) {
      console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
  } else {
      clearProductsCards();
      drawProductsCards(JSON.parse(xhr.responseText).data.products);
  }
}

function getFiltersValues() {
  let filters = [];
  let checkboxes = document.getElementsByClassName('filter-options')[0].querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    if(checkbox.checked)
      filters.push(checkbox.id);
  });
  return filters;
}

function clearFilters(){
  let checkboxes = this.parentNode.getElementsByClassName('filter-options')[0].querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    if(checkbox.checked)
      checkbox.checked = false;
  });
  clearProductsCards();
  drawProductsCards(loadProducts());
}

function clearProductsCards() {
    let node = document.getElementsByClassName("products-cards")[0];
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function drawProductsCards(products) {
    let productsNode = document.getElementsByClassName('products-cards')[0];
    products.map((product) => {
        productsNode.appendChild(new ProductCard(product));
    });
    for(let button of document.getElementsByClassName('product-fav')){
        button.addEventListener("click", submitFav);
    }
}

function submitFav(){
  let id = this.parentNode.id;
  let xhr = new XMLHttpRequest();
  xhr.open('PATCH', 'https://my-json-server.typicode.com/aero-frontend/test-task/FAVORITE_SUCCESS/', false);
  xhr.send(id);
  if (xhr.status !== 200) {
    console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
  } else {
    if(JSON.parse(xhr.responseText).data.inFav){
      this.className = 'product-fav favorite'
    } else {
      this.className = "product-fav"
    }
  }
}


window.onload = function () {
  drawProductsCards(loadProducts());
  document.getElementById('filter-clear').addEventListener("click", clearFilters);
  document.getElementById('filter-submit').addEventListener("click", submitFilters);

};