									// API //

//On utilise cette variable pour obtenir l'url de la page actuelle.
let str = location.href;//
//On stocke notre nouvelle URL dans une variable.
let newUrl = new URL(str);
//On stocke dans une variable notre nouvelle URL, on utilise l'interface searchParams avec la méthode GET et en paramètre l'id de notre produit.
let productId = newUrl.searchParams.get('id');
//console.log(productId);

//On utilise une méthode fetch avec ses promises (.then, .catch) pour récupérer les informations du produit.
fetch(`http://127.0.0.1:3000/api/products/${productId}`)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (value) {
		produit(value);
		//console.log(produit);
		document.querySelector("#addToCart").addEventListener("click", function () {
			addEntry(value);
		//console.log(addEntry);
		});
	})

	.catch(function () {
		alert("Oups, il y a une erreur !");
	});

									// DOM //

//On récupere les informations des produits pour les insérer dans notre page et avec notre boucle on lui indique les différentes couleurs à sélectioner.
function produit(produits) {
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
	//console.log(produits.colors);
}

//Fonction pour l'ajout(s) de produit(s) dans le localstorage. 
function addEntry(produits) {

	let itemColor = document.querySelector("#colors").value;
	let itemQuantity = document.querySelector("#quantity").value;
	//Conditons pour vérifier si l'utilisateur n'as rien indiqué pour la couleur ou la quantité on lui retourne donc une alert sinon on enregistre donc son article dans le localStorage sous la forme d'un Array.
	if (itemColor == "" || itemQuantity < 1) {
		alert("Veuillez inserer les éléments concernés !");
		return;
	} else {
		let itemCommand = JSON.parse(localStorage.getItem("commande"));
		if (itemCommand == null) {
			itemCommand = [];
		}
		//console.log(itemCommand);
		
		//Variables stockant toutes les données d'un produit.
		let command = {
			"id": productId,
			"name": produits.name,
			"color": itemColor,
			"quantity": itemQuantity,
			"imageUrl": produits.imageUrl,
			"altTxt": produits.altTxt,
			"price": produits.price
		}
		//console.log(command);
		
		//On vérifie si ce produit a était enregistré avec la même id et la même couleur.
		let resultat = itemCommand.find((el) => el.id == productId && el.color == itemColor);

		//Conditions pour incrémenter la nouvelle quantité de produit si elle est existante, sinon on envoi la quantité sans ajout.
		if (resultat) {
			let newQuantity = parseInt(resultat.quantity) + parseInt(itemQuantity);
			resultat.quantity = newQuantity;
			localStorage.setItem("commande", JSON.stringify(itemCommand));
		} else {
			itemCommand.push(command);
			localStorage.setItem("commande", JSON.stringify(itemCommand));
		}
		//console.log(resultat.quantity);
		
		alert("Article(s) ajouté(s) au panier ! ");
	}
}

