fetch("http://127.0.0.1:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
  
  let produits = value;
  for (let i = 0; i < produits.length; i++){
      console.log(produits.length);
      let section = document.getElementById("items");
      section.innerHTML = section.innerHTML + `<a href="./product.html?id=${produits[i]["_id"]}">
      <article>
        <img src="${produits[i]["imageUrl"]}" alt="${produits[i]["altTxt"]}">
        <h3 class="productName">${produits[i]["name"]}</h3>
        <p class="productDescription">${produits[i]["description"]}</p>
      </article>
    </a>`; 
    }

  })
  .catch(function(err) {
    alert("Oups, il y a une erreur !");
  });