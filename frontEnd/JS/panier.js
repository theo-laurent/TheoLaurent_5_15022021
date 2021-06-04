let panierFinal = JSON.parse(localStorage.getItem("panier"));
let totalComplet = 0;
let nbrArticles = 0;

console.log(panierFinal);

displayPanier();

function displayPanier() {
  if (panierFinal != null) {
    for (let i of panierFinal) {
      document.getElementById("tableauPanier").innerHTML += `<tr>
    <td>${i.nom}</td>
    <td>${i.quantité}</td>
    <td>${i.prix / 100}.00 €</td>
    <td>${(i.prix / 100) * i.quantité}.00 €</td>
    <td style="width:10px"><button type="button" class="btn btn-danger btnDelete">Supprimer</button></td>
      </tr>`;
      totalComplet += (i.prix / 100) * i.quantité;
      nbrArticles += Number(i.quantité);
    }
    document.getElementById("tableauPanier").innerHTML += ` <tr>
            <td colspan="3">Total</td>
            <td colspan="1" id="totalComplet"><strong>${totalComplet}.00 €</strong></td>
          </tr>`;
  } else {
    alert("Votre panier est vide");
  }
}

document.getElementById("vidagePanier").onclick = function (event) {
  event.preventDefault();
  if (window.confirm("Voulez vraiment vider votre panier ?")) {
    localStorage.clear();
    window.location.reload();
  } else {
  }
};

formulaireContactValid();

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
          localStorage.setItem(
            "identifiantCommande",
            JSON.stringify(data.orderId)
          );
          localStorage.setItem("paiement", totalComplet);
          localStorage.setItem("nbrArticles", nbrArticles);
          window.location.assign("./confirmation.html");
        });
    } else {
      alert("Veuillez remplir le formulaire correctement");
    }
  });
}
