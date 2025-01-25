var firebaseUrl = 'https://wd-sv-45-2022-3278d-default-rtdb.europe-west1.firebasedatabase.app';

var path = window.location.pathname;
var fileName = path.split('/').pop();


document.addEventListener('DOMContentLoaded', function() {
  var bodyElement = document.getElementsByTagName('body')[0];
  var headerElement = document.createElement('header');
  headerElement.innerHTML = `
    <div class="container">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
          <h2>Turističke agencije</h2>
        </a>
        <ul class="nav nav-pills">
          <li class="nav-item"><a href="index.html" class="nav-link active" aria-current="page">Početna</a></li>
          <li class="nav-item"><a href="izmena-agencije-index.html" class="nav-link">Izmeni agencije</a></li>
          <li class="nav-item"><a href="korisnici.html" class="nav-link" id="prikazi-korisnike">Prikaži korisnike</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-toggle="modal" data-target="#loginModal">Prijava</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-toggle="modal" data-target="#registrationModal">Registracija</a></li>
          <li class="nav-item"><a href="greske.html" class="nav-link">Greske</a></li>
        </ul>
      </header>
    </div>
  `;
  bodyElement.insertBefore(headerElement, bodyElement.firstChild);
});


window.addEventListener('load', function() {
  if (fileName == "index.html"){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function (){
      if (this.readyState == 4){
        if (this.status == 200){
          var agencije = JSON.parse(request.responseText)

          for (var id in agencije){
            var agencija = agencije[id];
            console.log(agencija);
            dodajAgencijaDiv(agencija, id);
          }

          var searchButton = document.getElementById("search-button");
          searchButton.addEventListener('click', function() {
            pretraziAgencije(agencije);
          });
        } else {
          alert('Greska. Agencije ne mogu da se ucitaju')
        }
      }
    }

    request.open('GET', firebaseUrl + '/agencije.json');
    request.send();
  } else {
    console.log('fajl nije index.html')
  }
  
})

function pretraziAgencije(agencije) {
  var searchInput = document.getElementById("search-input");
  var searchQuery = searchInput.value.toLowerCase();

  if (searchQuery == '') {
    window.location.href = 'index.html';
  }

  var agencijeDiv = document.getElementById("agencijeDiv");
  agencijeDiv.innerHTML = "";

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        var destinacijeSve = JSON.parse(request.responseText);

        for (var id in agencije) {
            var agencija = agencije[id];
            var destinacije = destinacijeSve[agencija.destinacije];

            for (var id2 in destinacije) {
              var destinacija = destinacije[id2];

              if (
                agencija.naziv.toLowerCase().includes(searchQuery) ||
                destinacija.naziv.toLowerCase().includes(searchQuery)
              ) {
                dodajAgencijaDiv(agencija, id);
                break;
              }
            }


        }
      } else {
        alert("Greska. Destinacije ne mogu da se ucitaju");
      }
    }
  };

  request.open("GET", firebaseUrl + "/destinacije.json");
  request.send();
}



window.addEventListener('load', function() {
  if (fileName == "izmena-agencije-index.html"){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function (){
      if (this.readyState == 4){
        if (this.status == 200){
          var agencije = JSON.parse(request.responseText)

          for (var id in agencije){
            var agencija = agencije[id];
            console.log(agencija);
            dodajAgencijaDivIzmena(agencija, id);
          }
        } else {
          alert('Greska. Agencije ne mogu da se ucitaju')
        }
      }
    }

    request.open('GET', firebaseUrl + '/agencije.json');
    request.send();
  } else {
    console.log('fajl nije index.html')
  }
  
})

window.addEventListener('load', function() {
  if (fileName == 'agencija.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var agencija = JSON.parse(request.responseText);
                var imgElement = document.createElement('img');
                imgElement.src = agencija.logo;
                imgElement.classList.add('slika-agencija');
                var targetDiv = document.getElementById('agencija-logo');
                targetDiv.appendChild(imgElement);
                document.title = agencija.naziv;
                dodajInformacijeOAgenciji(agencija);

                var searchButton = document.getElementById('search-button2')
                searchButton.addEventListener('click', function() {
                  pretraziDestinacijeAgencije(agencija);
                })
            } else {
                alert('Doslo je do greske u ucitavanju agencije')
            }
        }
    }

    request.open('GET', firebaseUrl + '/agencije/' + id + '.json');
    request.send();
  }
  
})


function pretraziDestinacijeAgencije(agencija) {
  var searchNazivInput = document.getElementById("search-naziv");
  var searchNaziv = searchNazivInput.value.toLowerCase();

  var searchTipSelect = document.getElementById("search-tip");
  var searchTip = searchTipSelect.value;

  var searchPrevozSelect = document.getElementById("search-prevoz");
  var searchPrevoz = searchPrevozSelect.value;

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        var destinacije = JSON.parse(request.responseText);
        var rezultatDiv = document.getElementById("destinacije-lista");
        rezultatDiv.innerHTML = "";

        var listaDestinacija = [];

        for (var id in destinacije[agencija.destinacije]) {
          var destinacija = destinacije[agencija.destinacije][id];

          var nazivMatch = destinacija.naziv.toLowerCase().includes(searchNaziv);
          var tipMatch = (searchTip === "" || destinacija.tip === searchTip);
          var prevozMatch = (searchPrevoz === "" || destinacija.prevoz === searchPrevoz);

          if (nazivMatch && tipMatch && prevozMatch) {
            var destinacijaTuple = {
              destinacija: destinacija,
              id: id
            };
            
            listaDestinacija.push(destinacijaTuple);
          }
        }

        var pElement = document.createElement("p");
        pElement.innerText = "Destinacije:";
        rezultatDiv.appendChild(pElement);

        if (listaDestinacija.length > 0) {
          for (var i = 0; i < listaDestinacija.length; i++) {
            var destinacija = listaDestinacija[i].destinacija;
            var id = listaDestinacija[i].id
        
            var liElement = document.createElement("li");
            liElement.classList.add('list-group-item');
        
            var linkElement = document.createElement("a");
            linkElement.href = 'destinacija.html?id=' + agencija.destinacije + '&id2=' + id;
            linkElement.textContent = destinacija.naziv;
        
            liElement.appendChild(linkElement);
            rezultatDiv.appendChild(liElement);
          }
        } else {
          var pElement = document.createElement("p");
          pElement.innerText = "Nema rezultata za pretragu.";
          rezultatDiv.appendChild(pElement);
        }


        // Pozivamo funkciju pretrage na zahtev korisnika
        document.getElementById("search-button2").addEventListener("click", function() {
          pretraziDestinacijeAgencije(agencija);
        });
        
      } else {
        alert("Greska. Destinacije ne mogu da se ucitaju");
      }
    }
  };

  request.open("GET", firebaseUrl + "/destinacije.json");
  request.send();
}












window.addEventListener('load', function() {
  if (fileName == 'destinacija.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const id2 = urlParams.get('id2');

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var destinacija = JSON.parse(request.responseText);
          document.title = destinacija.naziv;
          dodajInformacijeODestinaciji(destinacija, id, id2);
        } else {
          alert('Doslo je do greske u ucitavanju destinacije');
        }
      }
    }

    request.open('GET', firebaseUrl + '/destinacije/' + id + '/' + id2 + '.json');
    request.send();
  }
})

window.addEventListener('load', function() {
  if(fileName == 'korisnici.html') {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var korisnici = JSON.parse(request.responseText);
          for (var id in korisnici) {
            var korisnik = korisnici[id];
            prikaziKorisnika(korisnik, id);
          }
        } else {
          alert('Greska. Korisnici ne mogu da se ucitaju.')
        }
      }
    }

    request.open('GET', firebaseUrl + '/korisnici.json');
    request.send();
  }
})

window.addEventListener('load', function() {
  if(fileName == 'izmena-agencije.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var agencija = JSON.parse(request.responseText);
          document.title = agencija.naziv + ' - izmena podataka';
          prikaziFormuZaIzmenuAgencije(agencija);
          var deleteButton = document.getElementById("dugme-brisanje");
          deleteButton.addEventListener("click", brisanjeAgencije(id));
          var editButton = document.getElementById("dugme-izmeni");
          editButton.addEventListener("click", izmenaAgencije(id, agencija));
        } else {
          alert('Doslo je do greske');
        }
      }
    }

    request.open('GET', firebaseUrl + '/agencije/' + id + '.json');
    request.send();
  }
})

window.addEventListener('load', function() {
  if (fileName == 'korisnik.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var korisnik = JSON.parse(request.responseText);
          document.title = 'Korisnik - ' + korisnik.korisnickoIme;
          prikaziFormuZaIzmenuKorisnika(korisnik);
          var deleteButton = document.getElementById("dugme-brisanje");
          deleteButton.addEventListener("click", brisanjeKorisnika(id));
          var editButton = document.getElementById('dugme-izmeni');
          editButton.addEventListener("click", izmenaKorisnika(id));
        } else {
          alert('Doslo je do greske');
        }
      }
    }

    request.open('GET', firebaseUrl + '/korisnici/' + id + '.json');
    request.send();
  }
})

window.addEventListener('load', function() {
  if (fileName == 'izmena-destinacije.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const id2 = urlParams.get('id2');

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var destinacija = JSON.parse(request.responseText);
          document.title = destinacija.naziv + ' - izmena podataka';
          generisiFormuZaIzmenuDestinacije(destinacija);
          var editButton = document.getElementById('dugme-izmeni');
          editButton.addEventListener("click", izmenaDestinacije(id, id2, destinacija));
        } else {
          alert('Doslo je do greske');
        }
      }
    }

    request.open('GET', firebaseUrl + '/destinacije/' + id + '/' + id2 + '.json');
    request.send();
  }
})

var dugmePrijava = document.getElementById('prijavaDugme')
dugmePrijava.addEventListener('click', loginValidacija)

// var dugmeRegistracija = document.getElementById('dugmeRegistracija')
// dugmeRegistracija.addEventListener('click', registrationValidacija)



var registrationForm = document.getElementById("registration-form");

registrationForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var validacija = registrationValidacija();

  if (validacija) {
    var korisnik = {
      korisnickoIme: document.getElementById("registration-username").value,
      lozinka: document.getElementById("registration-password").value,
      ime: document.getElementById("registration-name").value,
      prezime: document.getElementById("registration-surname").value,
      email: document.getElementById("registration-email").value,
      datum: document.getElementById("registration-date").value,
      adresa: document.getElementById("registration-address").value,
      telefon: document.getElementById("registration-phone").value
    };

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Uspešno dodavanje korisnika u bazu
          console.log("Korisnik uspešno dodat.");
          location.reload();
        } else {
          // Greška prilikom dodavanja korisnika u bazu
          console.error("Greška prilikom dodavanja korisnika.");
        }
      }
    };

    request.open("POST", firebaseUrl + '/korisnici.json');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(korisnik));
  }
});

function izmenaAgencije(idAgencije, agencija) {
  return function(event) {
    event.preventDefault(); // Prevent the default form submission

    var validacija = agencijaValidacija();

    if (!validacija) {
      console.log("Validacija agencije nije prošla. Izmena podataka agencije nije dozvoljena.");
      return;
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Uspešna izmena podataka agencije
          console.log("Podaci agencije uspešno izmenjeni.");
          location.reload();
        } else {
          // Greška prilikom izmene podataka agencije
          console.error("Greška prilikom izmene podataka agencije.");
        }
      }
    };

    var updateData = {}; // Objekat koji će sadržati ažurirane podatke

    var nazivInput = document.getElementById("agencija-naziv");
    var nazivValue = nazivInput.value.trim();
    if (nazivValue !== "") {
      updateData.naziv = nazivValue;
    } else {
      // Ako je vrednost prazna, koristimo vrednost iz placeholdera
      updateData.naziv = nazivInput.placeholder;
    }

    var adresaInput = document.getElementById("agencija-adresa");
    var adresaValue = adresaInput.value.trim();
    if (adresaValue !== "") {
      updateData.adresa = adresaValue;
    } else {
      // Ako je vrednost prazna, koristimo vrednost iz placeholdera
      updateData.adresa = adresaInput.placeholder;
    }

    var godinaInput = document.getElementById("agencija-godina");
    var godinaValue = godinaInput.value.trim();
    if (godinaValue !== "") {
      updateData.godina = godinaValue;
    } else {
      // Ako je vrednost prazna, koristimo vrednost iz placeholdera
      updateData.godina = godinaInput.placeholder;
    }

    var telefonInput = document.getElementById("agencija-telefon");
    var telefonValue = telefonInput.value.trim();
    if (telefonValue !== "") {
      updateData.brojTelefona = telefonValue;
    } else {
      // Ako je vrednost prazna, koristimo vrednost iz placeholdera
      updateData.brojTelefona = telefonInput.placeholder;
    }

    var emailInput = document.getElementById("agencija-email");
    var emailValue = emailInput.value.trim();
    if (emailValue !== "") {
      updateData.email = emailValue;
    } else {
      // Ako je vrednost prazna, koristimo vrednost iz placeholdera
      updateData.email = emailInput.placeholder;
    }

    // Dodajemo polja "logo" i "destinacije" sa stvarnim vrednostima iz baze
    var logoValue = agencija.logo;
    if (logoValue) {
      updateData.logo = logoValue;
    }

    var destinacijeValue = agencija.destinacije;
    if (destinacijeValue) {
      updateData.destinacije = destinacijeValue;
    }

    request.open("PUT", firebaseUrl + '/agencije/' + idAgencije + '.json');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(updateData));
  };
}


function izmenaKorisnika(idKorisnika) {
  return function(event) {
    event.preventDefault(); // Prevent the default form submission

    var validacija = validacijaKorisnik();

    if (!validacija) {
      console.log("Validacija nije prosla");
      return;
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Uspešna izmena podataka korisnika
          console.log("Podaci korisnika uspešno izmenjeni.");
          location.reload();
        } else {
          // Greška prilikom izmene podataka korisnika
          console.error("Greška prilikom izmene podataka korisnika.");
        }
      }
    };

    var updateData = {}; // Objekat koji će sadržati ažurirane podatke

    var korisnickoImeInput = document.getElementById("korisnik-korisnickoIme");
    var korisnickoImeValue = korisnickoImeInput.value.trim();
    if (korisnickoImeValue !== "") {
      updateData.korisnickoIme = korisnickoImeValue;
    } else {
      updateData.korisnickoIme = korisnickoImeInput.placeholder;
    }

    var lozinkaInput = document.getElementById("korisnik-lozinka");
    var lozinkaValue = lozinkaInput.value.trim();
    if (lozinkaValue !== "") {
      updateData.lozinka = lozinkaValue;
    } else {
      updateData.lozinka = lozinkaInput.placeholder;
    }

    var imeInput = document.getElementById("korisnik-ime");
    var imeValue = imeInput.value.trim();
    if (imeValue !== "") {
      updateData.ime = imeValue;
    } else {
      updateData.ime = imeInput.placeholder;
    }

    var prezimeInput = document.getElementById("korisnik-prezime");
    var prezimeValue = prezimeInput.value.trim();
    if (prezimeValue !== "") {
      updateData.prezime = prezimeValue;
    } else {
      updateData.prezime = prezimeInput.placeholder;
    }

    var emailInput = document.getElementById("korisnik-email");
    var emailValue = emailInput.value.trim();
    if (emailValue !== "") {
      updateData.email = emailValue;
    } else {
      updateData.email = emailInput.placeholder;
    }

    var datumInput = document.getElementById("korisnik-datum");
    var datumValue = datumInput.value.trim();
    if (datumValue !== "") {
      updateData.datum = datumValue;
    } else {
      updateData.datum = datumInput.placeholder;
    }

    var adresaInput = document.getElementById("korisnik-adresa");
    var adresaValue = adresaInput.value.trim();
    if (adresaValue !== "") {
      updateData.adresa = adresaValue;
    } else {
      updateData.adresa = adresaInput.placeholder;
    }

    var telefonInput = document.getElementById("korisnik-telefon");
    var telefonValue = telefonInput.value.trim();
    if (telefonValue !== "") {
      updateData.telefon = telefonValue;
    } else {
      updateData.telefon = telefonInput.placeholder;
    }

    request.open("PUT", firebaseUrl + '/korisnici/' + idKorisnika + '.json');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(updateData));
  };
}


function izmenaDestinacije(idDestinacije, idDestinacije2, destinacija) {
  return function(event) {
    event.preventDefault(); // Prevent the default form submission

    var validacija = validacijaDestinacija();

    if (!validacija) {
      console.log("Validacija nije prosla");
      return;
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Uspešna izmena podataka destinacije
          console.log("Podaci destinacije uspešno izmenjeni.");
          location.reload();
        } else {
          // Greška prilikom izmene podataka destinacije
          console.error("Greška prilikom izmene podataka destinacije.");
        }
      }
    };

    var updateData = {}; // Objekat koji će sadržati ažurirane podatke

    var nazivInput = document.getElementById("destinacija-naziv");
    var nazivValue = nazivInput.value.trim();
    if (nazivValue !== "") {
      updateData.naziv = nazivValue;
    } else {
      updateData.naziv = nazivInput.placeholder;
    }

    var opisInput = document.getElementById("destinacija-opis");
    var opisValue = opisInput.value.trim();
    if (opisValue !== "") {
      updateData.opis = opisValue;
    } else {
      updateData.opis = opisInput.placeholder;
    }

    var tipInput = document.getElementById("destinacija-tip");
    var tipValue = tipInput.value.trim();
    if (tipValue !== "") {
      updateData.tip = tipValue;
    } else {
      updateData.tip = tipInput.placeholder;
    }

    var vrstaPrevozaInput = document.getElementById("destinacija-prevoz");
    var vrstaPrevozaValue = vrstaPrevozaInput.value.trim();
    if (vrstaPrevozaValue !== "") {
      updateData.prevoz = vrstaPrevozaValue;
    } else {
      updateData.prevoz = vrstaPrevozaInput.placeholder;
    }

    var cenaKarteInput = document.getElementById("destinacija-cena");
    var cenaKarteValue = cenaKarteInput.value.trim();
    if (cenaKarteValue !== "") {
      updateData.cena = cenaKarteValue;
    } else {
      updateData.cena = cenaKarteInput.placeholder;
    }

    var maksBrojOsobaInput = document.getElementById("destinacija-maxOsoba");
    var maksBrojOsobaValue = maksBrojOsobaInput.value.trim();
    if (maksBrojOsobaValue !== "") {
      updateData.maxOsoba = maksBrojOsobaValue;
    } else {
      updateData.maxOsoba = maksBrojOsobaInput.placeholder;
    }

    var slikeValue = destinacija.slike;
    if (slikeValue) {
      updateData.slike = slikeValue;
    }

    request.open("PUT", firebaseUrl + '/destinacije/' + idDestinacije + '/' + idDestinacije2 + '.json');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(updateData));
  };
}

function prikaziModalPoruku(poruka, potvrdaCallback) {
  var modal = document.createElement("div");
  modal.classList.add("modal2");

  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content2");

  var message = document.createElement("p");
  message.textContent = poruka;

  var buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("modal-buttons2");

  var confirmButton = document.createElement("button");
  confirmButton.textContent = "Potvrdi";
  confirmButton.addEventListener("click", function() {
    potvrdaCallback();
    modal.parentNode.removeChild(modal);
  });

  var cancelButton = document.createElement("button");
  cancelButton.textContent = "Otkaži";
  cancelButton.addEventListener("click", function() {
    modal.parentNode.removeChild(modal);
  });

  buttonsContainer.appendChild(confirmButton);
  buttonsContainer.appendChild(cancelButton);

  modalContent.appendChild(message);
  modalContent.appendChild(buttonsContainer);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);
}

function brisanjeKorisnika(id) {
  return function(event) {
    event.preventDefault();

    prikaziModalPoruku("Da li ste sigurni da želite da obrišete korisnika?", function() {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            alert("Korisnik je uspešno obrisan.");
            window.location.href = "korisnici.html";
          } else {
            alert("Došlo je do greške prilikom brisanja korisnika.");
          }
        }
      };

      request.open("DELETE", firebaseUrl + "/korisnici/" + id + ".json");
      request.send();
    });
  };
}

function brisanjeAgencije(id) {
  return function(event) {
    event.preventDefault();

    prikaziModalPoruku("Da li ste sigurni da želite da obrišete agenciju?", function() {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            alert("Agencija je uspešno obrisana.");
            window.location.href = "index.html";
          } else {
            alert("Došlo je do greške prilikom brisanja agencije.");
          }
        }
      };

      request.open("DELETE", firebaseUrl + "/agencije/" + id + ".json");
      request.send();
    });
  };
}



