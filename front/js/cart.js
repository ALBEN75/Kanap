                                        //API//

//On utilise cette variable pour récupérer les données des produits avec notre lockageStorage.                                        
let itemCommand = JSON.parse(localStorage.getItem("commande"));

//On récupere notre ID de notre balise HTML en utilisant cette variable, pour l'utiliser dans notre fonction.
let cartItem = document.querySelector("#cart__items");

//On utilise cette fonction pour insérer nos éléments HTML et pouvoir y ajouter nos produits selectionnés dans le localstorage.
function loadItems() {
    for (let item of itemCommand) {
        cartItem.innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${item.imageUrl}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.color}</p>
            <p>${item.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }
    
    addListeners();
}
// On charge les items de la commande.
loadItems();

// On attend le chargement des items avant l'ajouts des listeners.
async function addListeners() {
    await loadItems;
     let articles = document.querySelectorAll(".cart__item");
     updateQuantity(articles);
     deleteItem(articles);
}
//On utilise cette fonction pour modifier la quantité des produits dans notre panier.
function updateQuantity(articles) {
    for(let i = 0; i < articles.length ; i++) {
        articles[i].addEventListener("input", function (el) {
			/*console.log(el.target.value); On verifie le nombre de valeur qu'on obtiens, avec le console log.
            console.log(articles[i].dataset.id);*/
            let productId = articles[i].dataset.id;
            let itemQuantity = el.target.value;
            let resultat = itemCommand.find((el) => el.id == productId);
            //console.log(resultat);
            if (resultat) {
			    resultat.quantity = itemQuantity;
			    localStorage.setItem("commande", JSON.stringify(itemCommand));
            }
        });
    }
}

//On utilise cette fonction pour supprimer un ou des articles dans notre panier.
function deleteItem(articles) {
    for (let i = 0; i > articles.length; i--) {
        let deleteBtn = document.querySelector(".deleteItem");
        deleteBtn.addEventListener("click", function() {
            
            
        });
    
    }
}