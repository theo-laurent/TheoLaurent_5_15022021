main();

async function main() {
  const idArticle = getUrlArticle();
  const productData = await getOneArticle(idArticle);
  displayOneArticle(productData);
  clickPanier(productData);
}

function getUrlArticle() {
  return new URL(window.location.href).searchParams.get("id");
}

function getOneArticle(idArticle) {
  return fetch(`${apiUrl}/api/cameras/${idArticle}`)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      alert("Une erreur provenant du serveur est survenue.");
    });
}

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

let quantité = document.getElementById("quantité");
console.log(quantité.value);

function clickPanier(product) {
  document.getElementById("buttonPanier").onclick = function (event) {
    event.preventDefault();

    let dataPanier = JSON.parse(localStorage.getItem("panier")) || [];

    dataPanier.push({
      nom: product.name,
      prix: product.price,
      quantité: quantité.value,
      id: product._id,
    });
    localStorage.setItem("panier", JSON.stringify(dataPanier));
    alert("Votre article a bien été ajouté au panier.");
    window.location.reload();
  };
}


let numberPanier;

if (JSON.parse(localStorage.getItem("panier")) === null) {
  numberPanier = 0;
} else {
  numberPanier = JSON.parse(localStorage.getItem("panier")).length;
}

document.getElementById("logoPanier").innerHTML +=
  `<i class="fas fa-shopping-cart" style="font-size:22px"></i>` +
  "&nbsp" +
  "&nbsp" +
  "&nbsp" +
  `<span style="font-size:20px">${numberPanier}</span>`;
