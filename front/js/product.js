let locationUrl = location.href;
let newUrl = new URL(locationUrl);
let productId = newUrl.searchParams.get('id');
let url = `http://127.0.0.1:3000/api/products/${productId}`;

fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    produit(value);
      document.querySelector('#addToCart').addEventListener('click', function() {
        addEntry(value);
        alert('Article(s) ajouté dans le panier');
    });
  })

  .catch(function(err) {
    alert("Oups, il y a une erreur !");
  });

  function produit(produits){
    document.querySelector(".item__img").innerHTML = `<img src="${produits.imageUrl}" alt="${produits.altTxt}">`;
    document.querySelector("#title").innerText = `${produits.name}`;
    document.querySelector("#price").innerText = `${produits.price}`;
    document.querySelector("#description").innerText = `${produits.description}`;
  }