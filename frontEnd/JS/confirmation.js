console.log(localStorage);

confirmationCommande();

function confirmationCommande() {
  document.getElementById("container-confirmation").innerHTML = `
        <div class="card" id="cardConfirmation">
        <div class="card-body">
        <h4>Nous vous remercions pour votre commande !</h4>
        <p class="card-text">Identifiant de la commande: <strong>${JSON.parse(
          localStorage.identifiantCommande
        )}</strong> </p>
        <p class="card-text">Nombre d'articles: <strong>${
          localStorage.nbrArticles
        }</p>
<p></strong> Paiement total: <strong>${localStorage.paiement} €</strong></p>
        <a class="btn btn-info ml-auto" href="./index.html">Retour à l'accueil</a>
        </div>
        </div> `;

  // on ajoute un evenement à window qui lors du déchargement de la page videra le localStorage.
  window.addEventListener("unload", function event() {
    localStorage.clear();
  });
}
