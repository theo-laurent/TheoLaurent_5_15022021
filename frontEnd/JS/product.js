main();

// on utilise l'ID récupéré pour le passer en parametre de notre fonction qui va recuperer les données de cet article précis, puis on utilise les données de cet article pour les passer en argument de nos fonctions display et clickPanier.
async function main() {
  const idArticle = getUrlArticle();
  const productData = await getOneArticle(idArticle);
  displayOneArticle(productData);
  clickPanier(productData);
}

// la fonction recupère la partie représantant l'ID de l'URL actuelle, URL de l'article cliqué par l'utilisateur
function getUrlArticle() {
  return new URL(window.location.href).searchParams.get("id");
}

//récupération de données de l'API d'un seul article en fonction de son ID, et parse grâce a .json()
function getOneArticle(idArticle) {
  return fetch(`http://localhost:3000/api/cameras/${idArticle}`)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      alert("Une erreur provenant du serveur est survenue.");
    });
}

//ajout des variables de l'article choisi dans la structure HTML, on boucle sur l'array lenses
function displayOneArticle(product) {
  document.getElementById(
    "img"
  ).innerHTML = `<img src="${product.imageUrl}" class="card-img"/>`;
  document.getElementById("nom").innerHTML = `${product.name}`;
  document.getElementById("description").innerHTML = `${product.description}`;
  document.getElementById("prix").innerHTML = `${product.price / 100}.00€`;

  for (i of product.lenses) {
    document.getElementById("lentilles").innerHTML += `<option>${i}</option>`;
  }
}


// on ajoute un evenement a notre buttonPanier
function clickPanier(product) {
  let quantité = document.getElementById("quantité");
  document.getElementById("buttonPanier").onclick = function (event) {
    event.preventDefault();
    // création variable qui récupère l'array "panier"  ou qui crée un array vide si "panier" n'existe pas
    let dataPanier = JSON.parse(localStorage.getItem("panier")) || [];
    // on push les valeurs choisie de notre objet product à notre array "panier"
    dataPanier.push({
      nom: product.name,
      prix: product.price,
      quantité: quantité.value,
      id: product._id,
    });
    // ajout au localStorage de notre array "panier"
    localStorage.setItem("panier", JSON.stringify(dataPanier));
    alert("Votre article a bien été ajouté au panier.");
    // on actualise la page pour mettre a jour la quantité du panier logo
    window.location.reload();
  };
}

// création d'une variable pour quantifier le panier
let numberPanier;

// si "panier" de localstorage est null, on lui attribue la valeur de 0, sinon on lui attribue le length de celui ci.
if (JSON.parse(localStorage.getItem("panier")) === null) {
  numberPanier = 0;
} else {
  numberPanier = JSON.parse(localStorage.getItem("panier")).length;
}

// création d'un logo panier prenant notre variable numberPanier pour visuellement quantifier le panier sur les pages html.
document.getElementById("logoPanier").innerHTML +=
  `<i class="fas fa-shopping-cart" style="font-size:22px"></i>` +
  "&nbsp" +
  "&nbsp" +
  "&nbsp" +
  `<span style="font-size:20px">${numberPanier}</span>`;
