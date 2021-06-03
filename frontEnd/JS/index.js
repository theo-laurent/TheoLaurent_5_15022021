main();

async function main() {
  const articles = await getArticles();
  for (let article of articles) {
    displayArticles(article);
  }
}

function getArticles() {
  return fetch("http://localhost:3000/api/cameras/")
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

function displayArticles(article) {
  document.getElementById("container-main").innerHTML += `
  
    <div class="col-md-6 col-lg-4 mb-5 w-100">
            <div class="card h-100">
            <img class="card-img-top" src="${article.imageUrl}">
              <div class="card-body">
                <h2 class="card-title">${article.name}</h2>
                <p class="card-text">${article.description}</p>
                <div class="card-body">
                <p><strong>${article.price / 100}.00</strong> €</p>
                <a href="./html/product.html?id=${
                  article._id
                }" class="stretched-link"></a>
                </div>
              </div>
            </div>
          </div>`;
}

let numberPanier

if (JSON.parse(localStorage.getItem("panier")) === null){
  numberPanier = 0 } else {
    numberPanier = JSON.parse(localStorage.getItem("panier")).length
  }

document.getElementById("logoPanier").innerHTML +=
  `<i class="fas fa-shopping-cart" style="font-size:22px"></i>` +
  "&nbsp" +
  "&nbsp" +
  "&nbsp" +
  `<span style="font-size:20px">${numberPanier}</span>`;
