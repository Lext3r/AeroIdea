export default class ProductCard{
  constructor(product){
      let productNode = this.createElement('div', 'product');
      productNode.id = product.id;
      productNode.appendChild(this.createElement('div','product__code', `Арт. ${product.code}`));
      productNode.appendChild(this.createElement('img','product__image','','img/' + product.imgUrl, 'Product image'));
      this.availability = this.createElement('div', 'product-availability');
      if (product.availability){
          this.availability.innerHTML = "В наличии";
          this.availability.className += " available";
      } else {
          this.availability.innerHTML = "Товар отсутствует";
          this.availability.className += " unavailable";
      }
      productNode.appendChild(this.availability);
      productNode.appendChild(this.createElement('div', 'product__title', product.title));
      product.params.map((parameter) =>{
        let el = this.createElement('div','product-parameter');
        el.appendChild(this.createElement('span', 'product-parameter__name', parameter.name));
        el.appendChild(this.createElement('span', 'product-parameter__value', parameter.value));
        productNode.appendChild(el);
      });
      this.buyButton = this.createElement('button', 'buy-button', 'Купить');
      productNode.appendChild(this.buyButton);
      productNode.appendChild(this.createElement('div',`product-fav ${product.inFav ? 'favorite' :''}`));
      productNode.appendChild(this.createElement('div',`product-comparision ${product.inComparsion ? 'inComparsion' :''}`));
      return productNode;
  }

   createElement(tagName, className, text='', src, alt){
      let el = document.createElement(tagName);
      el.className = className;
      el.innerHTML = text;
      if(src)
        el.src = src;
      if(alt)
        el.alt = alt;
      return el;
    }
}
