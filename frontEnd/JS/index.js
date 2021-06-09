main();

// fonction main qui regroupe les fonctions principales de la page JS, la fonction boucle sur l'array "articles" pour appliquer displayArticle sur chaque "article"
async function main() {
  for (const article of await getArticles()) {
    displayArticles(article);
  }
  logoPanier();
}

// la fonction get récupère une réponse de l'API et la parse grâce à response.json() pour retourner un array
function getArticles() {
  return fetch(`http://localhost:3000/api/cameras`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new error("erreur");
      }
    })
    .catch(function (error) {
      alert("Une erreur provenant du serveur est survenue.");
    });
}

// fonction display créé une structure HTML dans un container pour chaque "article", en utilisant des variables provenant de chaque objet "article" avec le article.qqchose
function displayArticles(article) {
  document.getElementById("container-main").innerHTML += `
  
    <div class="col-md-6 col-lg-4 mb-5 w-100">
            <div class="card h-100 card-index">
            <img class="card-img-top" src="${article.imageUrl}">
              <div class="card-body">
                <h2 class="card-title">${article.name}</h2>
                <p class="card-text">${article.description}</p>
                <div class="card-body">
                <p><strong>${article.price / 100}.00</strong> €</p>
                <a href="./product.html?id=${
                  article._id
                }" class="stretched-link"></a>
                </div>
              </div>
            </div>
          </div>`;
}

function logoPanier() {
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
}
