// on définit une variable globale qui renseignera le nombre d'articles lors de la confirmation à l'utilisateur
let nbrArticles = 0;
// on définit une variable globale qui renseignera le prix payé total lors de la confirmation à l'utilisateur
let totalComplet = 0;
//on créé une variable globale en recupérant le tableau "panier" du local et en le parsant pour lui rendre ses attributs
let panierFinal = JSON.parse(localStorage.getItem("panier"));

//appel des fonctions principales de la page
displayPanier();
formulaireContactValid();

// fonction qui affiche dans le panier les éléments stockés dans le localStorage
function displayPanier() {
  console.log(panierFinal);
  // la fonction se declenche seulement si le panier n'est pas vide
  if (panierFinal != null) {
    // on boucle sur notre nouveau tableau
    for (let i of panierFinal) {
      document.getElementById("tableauPanier").innerHTML += `<tr>
    <td>${i.nom}</td>
    <td>${i.quantité}</td>
    <td>${i.prix / 100}.00 €</td>
    <td>${(i.prix / 100) * i.quantité}.00 €</td>
    <td style="width:10px"><button type="button" class="btn btn-danger btnDelete">Supprimer</button></td>
      </tr>`;
      totalComplet += (i.prix / 100) * i.quantité;
      nbrArticles = Number(i.quantité);
    }
    document.getElementById("tableauPanier").innerHTML += ` <tr>
            <td colspan="3">Total</td>
            <td colspan="1" id="totalComplet"><strong>${totalComplet}.00 €</strong></td>
          </tr>`;
  } else {
    alert("Votre panier est vide");
  }
}

// on ajoute event sur le bouton vider le panier qui demande une confirmation puis si oui, clear le localstorage et recharge la page.
document.getElementById("vidagePanier").onclick = function (event) {
  event.preventDefault();
  if (window.confirm("Voulez vraiment vider votre panier ?")) {
    localStorage.clear();
    window.location.reload();
  } else {
  }
};

// on ajoute un event a notre btnPaiement pour vérifier le formulaire, stocker des données "contact" et "products" et envoyer ces données au serveur
function formulaireContactValid() {
  document.getElementById("btnPaiement").addEventListener("click", function () {
    let products = [];
    let contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    for (i of panierFinal) {
      products.push(i.id);
    }
    if (formulaire.checkValidity()) {
      fetch(`http://localhost:3000/api/cameras/order`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          } else {
            alert("Le serveur n'a pas reçu les données");
          }
        })
        .then(function (data) {
          alert("Les données ont bien été transmises au serveur");
          // on recupere la réponse du serveur qui nous renvoi un orderId pour le stocker dans le localStorage
          localStorage.setItem(
            "identifiantCommande",
            JSON.stringify(data.orderId)
          );
          localStorage.setItem("paiement", totalComplet);
          localStorage.setItem("nbrArticles", nbrArticles);
          // on redirige l'utilisateur vers la page confirmation.html lors de la fin de la fonction
          window.location.assign("./confirmation.html");
        });
    } else {
      alert("Veuillez remplir le formulaire correctement");
    }
  });
}
