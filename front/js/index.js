                                  // API //

//On utilise une méthode fetch avec ses promises (.then, .catch), pour récuperer les informations des produits dans l'API.
fetch("http://127.0.0.1:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    //console.log(value);
  let produits = value;
  //On utilise une boucle for pour récuperer nos produits et ses informations pour les insérer dans notre page.
  for (let i = 0; i < produits.length; i++){
      //console.log(produits.length);
      let section = document.getElementById("items");
      //console.log(section.innerHTML);
      section.innerHTML = section.innerHTML + `<a href="./product.html?id=${produits[i]["_id"]}">
      <article>
        <img src="${produits[i]["imageUrl"]}" alt="${produits[i]["altTxt"]}">
        <h3 class="productName">${produits[i]["name"]}</h3>
        <p class="productDescription">${produits[i]["description"]}</p>
      </article>
    </a>`; 
    }

  })
  .catch(function() {
    alert("Oups, il y a une erreur !");
  });

  //console.log(fetch);
  