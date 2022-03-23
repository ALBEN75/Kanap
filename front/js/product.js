// API //

let str = location.href;
let newUrl = new URL(str);
let productId = newUrl.searchParams.get('id');

fetch(`http://127.0.0.1:3000/api/products/${productId}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    produit(value);
      document.querySelector("#addToCart").addEventListener("click", function() {
        addEntry(value);
      });
  })

  .catch(function() {
    alert("Oups, il y a une erreur !");
  });

  // DOM //
  
  function produit(produits){
    document.querySelector(".item__img").innerHTML = `<img src="${produits.imageUrl}" alt="${produits.altTxt}">`;
    document.querySelector("#title").innerText = `${produits.name}`;
    document.querySelector("#price").innerText = `${produits.price}`;
    document.querySelector("#description").innerText = `${produits.description}`;
    for (let i = 0; i < produits.colors.length; i++) {
      let option = document.createElement("option");
      document.querySelector("#colors").appendChild(option);
      option.setAttribute("value", `${produits.colors[i]}`);
      option.innerText = `${produits.colors[i]}`;
  }; 
}


  function addEntry(produits){
     
    let itemColor = document.querySelector("#colors").value;
    let itemQuantity = document.querySelector("#quantity").value;
    if (itemColor == "" || itemQuantity < 1 ) {
      alert("Veuillez inserer les éléments concernés !");
      return;
    } else if(itemQuantity > 1 && itemQuantity + 1 ) {
        alert("Article(s) ajouté(s) au panier ! ")
    }
    
    let itemCommand = JSON.parse(localStorage.getItem("commande"));
    if (itemCommand == null) {
      itemCommand = [];
    }

    let command = {
      "id": productId,
      "name": produits.name,
      "color": itemColor,
      "quantity": itemQuantity,
      "imageUrl": produits.imageUrl,
      "altTxt": produits.altTxt
    }
     console.log(command);

    let resultat = itemCommand.find((el) => el.id == productId && el.color == itemColor);
   
    if (resultat) {
      let newQuantity = parseInt(resultat.quantity) + parseInt(itemQuantity);
      resultat.quantity = newQuantity;
      localStorage.setItem("commande", JSON.stringify(itemCommand)); 
    } else {
      itemCommand.push(command);
      localStorage.setItem("commande", JSON.stringify(itemCommand));
    }
  }
  
