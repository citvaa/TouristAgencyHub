window.dodajAgencijaDiv = function(agencija, id) {
    var divElement = document.createElement('div');
    divElement.classList.add('col');
    
    var cardElement = document.createElement('div');
    cardElement.classList.add('card', 'h-100');
    
    var imgElement = document.createElement('img');
    imgElement.src = agencija.logo;
    imgElement.classList.add('card-img-top');
    imgElement.alt = agencija.naziv;
    
    var cardBodyElement = document.createElement('div');
    cardBodyElement.classList.add('card-body');
    
    var h5Element = document.createElement('h5');
    h5Element.classList.add('card-title');
    h5Element.innerText = agencija.naziv;
    
    var aElement = document.createElement('a');
    aElement.href = 'agencija.html?id=' + id;
    aElement.classList.add('btn', 'btn-primary');
    aElement.innerText = 'Prikaži';
    
    cardBodyElement.appendChild(h5Element);
    cardBodyElement.appendChild(aElement);
    
    cardElement.appendChild(imgElement);
    cardElement.appendChild(cardBodyElement);
    
    divElement.appendChild(cardElement);
    
    var targetDiv = document.getElementById('agencijeDiv');
    targetDiv.appendChild(divElement);
  }
  
  window.dodajInformacijeOAgenciji = function(agencija) {
    var listaElement = document.getElementById("agencija-lista");
  
    var nazivLi = document.createElement('li');
    nazivLi.classList.add('list-group-item');
    nazivLi.innerText = 'Naziv: ' + agencija.naziv;
    listaElement.appendChild(nazivLi);
  
    var adresaLi = document.createElement('li');
    adresaLi.classList.add('list-group-item');
    adresaLi.innerText = 'Adresa: ' + agencija.adresa;
    listaElement.appendChild(adresaLi);
  
    var godinaLi = document.createElement('li');
    godinaLi.classList.add('list-group-item');
    godinaLi.innerText = 'Godina: ' + agencija.godina;
    listaElement.appendChild(godinaLi);
  
    var telefonLi = document.createElement('li');
    telefonLi.classList.add('list-group-item');
    telefonLi.innerText = 'Broj telefona: ' + agencija.brojTelefona;
    listaElement.appendChild(telefonLi);
  
    var emailLi = document.createElement('li');
    emailLi.classList.add('list-group-item');
    emailLi.innerText = 'Email: ' + agencija.email;
    listaElement.appendChild(emailLi);
  
    var destinacijeLi = document.createElement('li');
    destinacijeLi.classList.add('list-group-item');
    destinacijeLi.id = 'destinacije-lista';
    listaDestinacija(agencija.destinacije)
      .then(function(destinacijeHtml) {
        destinacijeLi.innerHTML = 'Destinacije: <ul class="list-group">' + destinacijeHtml + '</ul>';
        listaElement.appendChild(destinacijeLi);
      })
      .catch(function() {
        alert('Greška prilikom dohvatanja destinacija.');
      });
  
    
  }
  
  window.listaDestinacija = function(listaDestinacija) {
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
  
      request.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            var destinacije = JSON.parse(request.responseText);
            var destinacijeHtml = '';
  
            for (var id in destinacije) {
              var destinacija = destinacije[id];
              destinacijeHtml += '<li class="list-group-item"><a href="destinacija.html?id=' + listaDestinacija + '&id2=' + id + '">' + destinacija.naziv + '</a></li>';
            }
  
            resolve(destinacijeHtml);
          } else {
            reject();
          }
        }
      };
  
      request.open('GET', firebaseUrl + '/destinacije/' + listaDestinacija + '.json');
      request.send();
    });
  }
  
  window.dodajInformacijeODestinaciji = function(destinacija, id, id2) {
    var carouselDestinacija = document.getElementById("slike-destinacija");
    var prviDiv = document.createElement('div');
    prviDiv.classList.add("carousel-item", "active");
  
    var prvaSlika = document.createElement('img');
    prvaSlika.classList.add("d-block", "w-100");
    prvaSlika.src = destinacija.slike[0];
  
    prviDiv.appendChild(prvaSlika);
    carouselDestinacija.appendChild(prviDiv);
  
    for (var i = 1; i < destinacija.slike.length; i++) {
      var div = document.createElement('div');
      div.classList.add("carousel-item");
  
      var slika = document.createElement('img');
      slika.classList.add("d-block", "w-100");
      slika.src = destinacija.slike[i];
  
      div.appendChild(slika);
      carouselDestinacija.appendChild(div);
    }
  
    var destinacijaPodaci = document.getElementById("destinacija-podaci");
  
    var nazivLi = document.createElement('li');
    nazivLi.classList.add('list-group-item');
    nazivLi.innerText = 'Naziv: ' + destinacija.naziv;
    destinacijaPodaci.appendChild(nazivLi);
  
    var opisLi = document.createElement('li');
    opisLi.classList.add('list-group-item');
    opisLi.innerText = 'Opis: ' + destinacija.opis;
    destinacijaPodaci.appendChild(opisLi);
  
    var tipLi = document.createElement('li');
    tipLi.classList.add('list-group-item');
    tipLi.innerText = 'Tip: ' + destinacija.tip;
    destinacijaPodaci.appendChild(tipLi);
  
    var vrstaPrevozaLi = document.createElement('li');
    vrstaPrevozaLi.classList.add('list-group-item');
    vrstaPrevozaLi.innerText = 'Vrsta prevoza: ' + destinacija.prevoz;
    destinacijaPodaci.appendChild(vrstaPrevozaLi);
  
    var cenaKarteLi = document.createElement('li');
    cenaKarteLi.classList.add('list-group-item');
    cenaKarteLi.innerText = 'Cena karte: ' + destinacija.cena;
    destinacijaPodaci.appendChild(cenaKarteLi);
  
    var maksBrojOsobaLi = document.createElement('li');
    maksBrojOsobaLi.classList.add('list-group-item');
    maksBrojOsobaLi.innerText = 'Maksimalan broj osoba: ' + destinacija.maxOsoba;
    destinacijaPodaci.appendChild(maksBrojOsobaLi);
  
    var breakElement = document.createElement('br');
    destinacijaPodaci.appendChild(breakElement);
  
    var izmeniButton = document.createElement('button');
    izmeniButton.setAttribute('type', 'button');
    izmeniButton.classList.add('btn', 'btn-primary');
    izmeniButton.innerText = 'Izmeni podatke';
    izmeniButton.onclick = function() {
      window.location.href = 'izmena-destinacije.html?id=' + id + '&id2=' + id2;
    };
    destinacijaPodaci.appendChild(izmeniButton);
  }
  
  window.prikaziKorisnika = function(korisnik, id) {
    var korisniciDiv = document.getElementById('div-korisnici');
  
    var prviDiv = document.createElement('div');
    prviDiv.classList.add('col');
    korisniciDiv.appendChild(prviDiv);
  
    var drugiDiv = document.createElement('div');
    drugiDiv.classList.add('card', 'h-100');
    prviDiv.appendChild(drugiDiv);
  
    var slika = document.createElement('img');
    slika.src = 'slike/prof.jpg';
    slika.classList.add('card-img-top');
    slika.alt = korisnik.korisnickoIme;
    drugiDiv.appendChild(slika);
  
    var treciDiv = document.createElement('div');
    treciDiv.classList.add('card-body');
    drugiDiv.appendChild(treciDiv);
  
    var naslov = document.createElement('h5');
    naslov.classList.add('card-title');
    naslov.innerText = korisnik.korisnickoIme;
    treciDiv.appendChild(naslov);
  
    var dugme = document.createElement('a');
    dugme.href = 'korisnik.html?id=' + id;
    dugme.classList.add('btn', 'btn-primary');
    dugme.innerText = 'Izmeni';
    treciDiv.appendChild(dugme);
  }

  window.dodajAgencijaDivIzmena = function (agencija, id) {
    var divElement = document.createElement('div');
    divElement.classList.add('col');
    
    var cardElement = document.createElement('div');
    cardElement.classList.add('card', 'h-100');
    
    var imgElement = document.createElement('img');
    imgElement.src = agencija.logo;
    imgElement.classList.add('card-img-top');
    imgElement.alt = agencija.naziv;
    
    var cardBodyElement = document.createElement('div');
    cardBodyElement.classList.add('card-body');
    
    var h5Element = document.createElement('h5');
    h5Element.classList.add('card-title');
    h5Element.innerText = agencija.naziv;
    
    var aElement = document.createElement('a');
    aElement.href = 'izmena-agencije.html?id=' + id;
    aElement.classList.add('btn', 'btn-primary');
    aElement.innerText = 'Izmeni';
    
    cardBodyElement.appendChild(h5Element);
    cardBodyElement.appendChild(aElement);
    
    cardElement.appendChild(imgElement);
    cardElement.appendChild(cardBodyElement);
    
    divElement.appendChild(cardElement);
    
    var targetDiv = document.getElementById('agencijeDiv');
    targetDiv.appendChild(divElement);
  }

  window.prikaziFormuZaIzmenuAgencije = function (agencija) {
    var formaElement = document.createElement('form');
    formaElement.classList.add('forma');

    var nazivFormGroup = document.createElement('div');
    nazivFormGroup.classList.add('form-group');
    var nazivLabel = document.createElement('label');
    nazivLabel.setAttribute('for', 'formGroupExampleInput');
    nazivLabel.innerText = 'Naziv:';
    var nazivInput = document.createElement('input');
    nazivInput.setAttribute('type', 'text');
    nazivInput.classList.add('form-control');
    nazivInput.setAttribute('id', 'agencija-naziv');
    nazivInput.setAttribute('placeholder', agencija.naziv);
    nazivFormGroup.appendChild(nazivLabel);
    nazivFormGroup.appendChild(nazivInput);
    formaElement.appendChild(nazivFormGroup);

    var adresaFormGroup = document.createElement('div');
    adresaFormGroup.classList.add('form-group');
    var adresaLabel = document.createElement('label');
    adresaLabel.setAttribute('for', 'formGroupExampleInput2');
    adresaLabel.innerText = 'Adresa:';
    var adresaInput = document.createElement('input');
    adresaInput.setAttribute('type', 'text');
    adresaInput.classList.add('form-control');
    adresaInput.setAttribute('id', 'agencija-adresa');
    adresaInput.setAttribute('placeholder', agencija.adresa);
    adresaFormGroup.appendChild(adresaLabel);
    adresaFormGroup.appendChild(adresaInput);
    formaElement.appendChild(adresaFormGroup);

    var godinaFormGroup = document.createElement('div');
    godinaFormGroup.classList.add('form-group');
    var godinaLabel = document.createElement('label');
    godinaLabel.setAttribute('for', 'formGroupExampleInput2');
    godinaLabel.innerText = 'Godina:';
    var godinaInput = document.createElement('input');
    godinaInput.setAttribute('type', 'text');
    godinaInput.classList.add('form-control');
    godinaInput.setAttribute('id', 'agencija-godina');
    godinaInput.setAttribute('placeholder', agencija.godina);
    godinaFormGroup.appendChild(godinaLabel);
    godinaFormGroup.appendChild(godinaInput);
    formaElement.appendChild(godinaFormGroup);

    var telefonFormGroup = document.createElement('div');
    telefonFormGroup.classList.add('form-group');
    var telefonLabel = document.createElement('label');
    telefonLabel.setAttribute('for', 'formGroupExampleInput2');
    telefonLabel.innerText = 'Broj telefona:';
    var telefonInput = document.createElement('input');
    telefonInput.setAttribute('type', 'text');
    telefonInput.classList.add('form-control');
    telefonInput.setAttribute('id', 'agencija-telefon');
    telefonInput.setAttribute('placeholder', agencija.brojTelefona);
    telefonFormGroup.appendChild(telefonLabel);
    telefonFormGroup.appendChild(telefonInput);
    formaElement.appendChild(telefonFormGroup);

    var emailFormGroup = document.createElement('div');
    emailFormGroup.classList.add('form-group');
    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'formGroupExampleInput2');
    emailLabel.innerText = 'Email:';
    var emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'text');
    emailInput.classList.add('form-control');
    emailInput.setAttribute('id', 'agencija-email');
    emailInput.setAttribute('placeholder', agencija.email);
    emailFormGroup.appendChild(emailLabel);
    emailFormGroup.appendChild(emailInput);
    formaElement.appendChild(emailFormGroup);

    var razmak1 = document.createElement('br');

    var izmeniButton = document.createElement('button');
    izmeniButton.setAttribute('type', 'button');
    izmeniButton.classList.add('btn', 'btn-primary');
    izmeniButton.innerText = 'Izmeni podatke';
    izmeniButton.id = 'dugme-izmeni';

    var razmak2 = document.createTextNode(' ');

    var obrisiButton = document.createElement('button');
    obrisiButton.setAttribute('type', 'button');
    obrisiButton.classList.add('btn', 'btn-primary');
    obrisiButton.innerText = 'Obriši agenciju';
    obrisiButton.id = 'dugme-brisanje';

    formaElement.appendChild(razmak1);
    formaElement.appendChild(izmeniButton);
    formaElement.appendChild(razmak2);
    formaElement.appendChild(obrisiButton);

    document.body.appendChild(formaElement);
  }

  window.prikaziFormuZaIzmenuKorisnika = function (korisnik) {
    var formaElement = document.createElement('form');
    formaElement.classList.add('forma');

    var korisnickoImeFormGroup = document.createElement('div');
    korisnickoImeFormGroup.classList.add('form-group');
    var korisnickoImeLabel = document.createElement('label');
    korisnickoImeLabel.setAttribute('for', 'formGroupExampleInput');
    korisnickoImeLabel.innerText = 'Korisničko ime:';
    var korisnickoImeInput = document.createElement('input');
    korisnickoImeInput.setAttribute('type', 'text');
    korisnickoImeInput.classList.add('form-control');
    korisnickoImeInput.setAttribute('id', 'korisnik-korisnickoIme');
    korisnickoImeInput.setAttribute('placeholder', korisnik.korisnickoIme);

    korisnickoImeFormGroup.appendChild(korisnickoImeLabel);
    korisnickoImeFormGroup.appendChild(korisnickoImeInput);

    var lozinkaFormGroup = document.createElement('div');
    lozinkaFormGroup.classList.add('form-group');
    var lozinkaLabel = document.createElement('label');
    lozinkaLabel.setAttribute('for', 'formGroupExampleInput2');
    lozinkaLabel.innerText = 'Lozinka:';
    var lozinkaInput = document.createElement('input');
    lozinkaInput.setAttribute('type', 'text');
    lozinkaInput.classList.add('form-control');
    lozinkaInput.setAttribute('id', 'korisnik-lozinka');
    lozinkaInput.setAttribute('placeholder', korisnik.lozinka);

    lozinkaFormGroup.appendChild(lozinkaLabel);
    lozinkaFormGroup.appendChild(lozinkaInput);

    var imeFormGroup = document.createElement('div');
    imeFormGroup.classList.add('form-group');
    var imeLabel = document.createElement('label');
    imeLabel.setAttribute('for', 'formGroupExampleInput');
    imeLabel.innerText = 'Ime:';
    var imeInput = document.createElement('input');
    imeInput.setAttribute('type', 'text');
    imeInput.classList.add('form-control');
    imeInput.setAttribute('id', 'korisnik-ime');
    imeInput.setAttribute('placeholder', korisnik.ime);

    imeFormGroup.appendChild(imeLabel);
    imeFormGroup.appendChild(imeInput);

    var prezimeFormGroup = document.createElement('div');
    prezimeFormGroup.classList.add('form-group');
    var prezimeLabel = document.createElement('label');
    prezimeLabel.setAttribute('for', 'formGroupExampleInput');
    prezimeLabel.innerText = 'Prezime:';
    var prezimeInput = document.createElement('input');
    prezimeInput.setAttribute('type', 'text');
    prezimeInput.classList.add('form-control');
    prezimeInput.setAttribute('id', 'korisnik-prezime');
    prezimeInput.setAttribute('placeholder', korisnik.prezime);

    prezimeFormGroup.appendChild(prezimeLabel);
    prezimeFormGroup.appendChild(prezimeInput);

    var emailFormGroup = document.createElement('div');
    emailFormGroup.classList.add('form-group');
    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'formGroupExampleInput');
    emailLabel.innerText = 'Email:';
    var emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.classList.add('form-control');
    emailInput.setAttribute('id', 'korisnik-email');
    emailInput.setAttribute('placeholder', korisnik.email);

    emailFormGroup.appendChild(emailLabel);
    emailFormGroup.appendChild(emailInput);

    var datumFormGroup = document.createElement('div');
    datumFormGroup.classList.add('form-group');
    var datumLabel = document.createElement('label');
    datumLabel.setAttribute('for', 'formGroupExampleInput');
    datumLabel.innerText = 'Datum:';
    var datumInput = document.createElement('input');
    datumInput.setAttribute('type', 'date');
    datumInput.classList.add('form-control');
    datumInput.setAttribute('id', 'korisnik-datum');
    datumInput.setAttribute('placeholder', korisnik.datumRodjenja);
    datumInput.setAttribute('pattern', '\d{4}-\d{2}-\d{2}');

    datumFormGroup.appendChild(datumLabel);
    datumFormGroup.appendChild(datumInput);

    var adresaFormGroup = document.createElement('div');
    adresaFormGroup.classList.add('form-group');
    var adresaLabel = document.createElement('label');
    adresaLabel.setAttribute('for', 'formGroupExampleInput');
    adresaLabel.innerText = 'Adresa:';
    var adresaInput = document.createElement('input');
    adresaInput.setAttribute('type', 'text');
    adresaInput.classList.add('form-control');
    adresaInput.setAttribute('id', 'korisnik-adresa');
    adresaInput.setAttribute('placeholder', korisnik.adresa);

    adresaFormGroup.appendChild(adresaLabel);
    adresaFormGroup.appendChild(adresaInput);

    var telefonFormGroup = document.createElement('div');
    telefonFormGroup.classList.add('form-group');
    var telefonLabel = document.createElement('label');
    telefonLabel.setAttribute('for', 'formGroupExampleInput');
    telefonLabel.innerText = 'Telefon:';
    var telefonInput = document.createElement('input');
    telefonInput.setAttribute('type', 'text');
    telefonInput.classList.add('form-control');
    telefonInput.setAttribute('id', 'korisnik-telefon');
    telefonInput.setAttribute('placeholder', korisnik.telefon);

    telefonFormGroup.appendChild(telefonLabel);
    telefonFormGroup.appendChild(telefonInput);

    var razmak1 = document.createElement('br'); // Razmak između poslednjeg input polja i dugmeta

    var izmeniButton = document.createElement('button');
    izmeniButton.setAttribute('type', 'button');
    izmeniButton.classList.add('btn', 'btn-primary');
    izmeniButton.innerText = 'Izmeni podatke';
    izmeniButton.id = 'dugme-izmeni';

    var razmak2 = document.createTextNode(' '); // Razmak između dva dugmeta

    var obrisiButton = document.createElement('button');
    obrisiButton.setAttribute('type', 'button');
    obrisiButton.classList.add('btn', 'btn-primary');
    obrisiButton.innerText = 'Obriši korisnika';
    obrisiButton.id = 'dugme-brisanje';

    formaElement.appendChild(korisnickoImeFormGroup);
    formaElement.appendChild(lozinkaFormGroup);
    formaElement.appendChild(imeFormGroup);
    formaElement.appendChild(prezimeFormGroup);
    formaElement.appendChild(emailFormGroup);
    formaElement.appendChild(datumFormGroup);
    formaElement.appendChild(adresaFormGroup);
    formaElement.appendChild(telefonFormGroup);

    formaElement.appendChild(razmak1);
    formaElement.appendChild(izmeniButton);
    formaElement.appendChild(razmak2);
    formaElement.appendChild(obrisiButton);

    // Dodavanje forme na kraj body taga
    document.body.appendChild(formaElement);
  }

  window.generisiFormuZaIzmenuDestinacije = function (destinacija) {
    var formaDestinacija = document.createElement('form');
    formaDestinacija.classList.add('forma');
    
    // Naziv
    var nazivFormaGrupa = document.createElement('div');
    nazivFormaGrupa.classList.add('form-group');
    
    var nazivLabela = document.createElement('label');
    nazivLabela.setAttribute('for', 'formGroupExampleInput');
    nazivLabela.innerText = 'Naziv:';
    
    var nazivInput = document.createElement('input');
    nazivInput.setAttribute('type', 'text');
    nazivInput.classList.add('form-control');
    nazivInput.setAttribute('id', 'destinacija-naziv');
    nazivInput.setAttribute('placeholder', destinacija.naziv);
    
    nazivFormaGrupa.appendChild(nazivLabela);
    nazivFormaGrupa.appendChild(nazivInput);
    formaDestinacija.appendChild(nazivFormaGrupa);
    
    // Opis
    var opisFormaGrupa = document.createElement('div');
    opisFormaGrupa.classList.add('form-group');
    
    var opisLabela = document.createElement('label');
    opisLabela.setAttribute('for', 'formGroupExampleInput2');
    opisLabela.innerText = 'Opis:';
    
    var opisInput = document.createElement('input');
    opisInput.setAttribute('type', 'text');
    opisInput.classList.add('form-control');
    opisInput.setAttribute('id', 'destinacija-opis');
    opisInput.setAttribute('placeholder', destinacija.opis);
    
    opisFormaGrupa.appendChild(opisLabela);
    opisFormaGrupa.appendChild(opisInput);
    formaDestinacija.appendChild(opisFormaGrupa);
    
    // Tip
    var tipFormaGrupa = document.createElement('div');
    tipFormaGrupa.classList.add('form-group');
    
    var tipLabela = document.createElement('label');
    tipLabela.setAttribute('for', 'formGroupExampleInput');
    tipLabela.innerText = 'Tip:';
    
    var tipInput = document.createElement('input');
    tipInput.setAttribute('type', 'text');
    tipInput.classList.add('form-control');
    tipInput.setAttribute('id', 'destinacija-tip');
    tipInput.setAttribute('placeholder', destinacija.tip);
    
    tipFormaGrupa.appendChild(tipLabela);
    tipFormaGrupa.appendChild(tipInput);
    formaDestinacija.appendChild(tipFormaGrupa);
    
    // Vrsta prevoza
    var prevozFormaGrupa = document.createElement('div');
    prevozFormaGrupa.classList.add('form-group');
    
    var prevozLabela = document.createElement('label');
    prevozLabela.setAttribute('for', 'formGroupExampleInput');
    prevozLabela.innerText = 'Vrsta prevoza:';
    
    var prevozInput = document.createElement('input');
    prevozInput.setAttribute('type', 'text');
    prevozInput.classList.add('form-control');
    prevozInput.setAttribute('id', 'destinacija-prevoz');
    prevozInput.setAttribute('placeholder', destinacija.prevoz);
    
    prevozFormaGrupa.appendChild(prevozLabela);
    prevozFormaGrupa.appendChild(prevozInput);
    formaDestinacija.appendChild(prevozFormaGrupa);
    
    // Cena karte
    var cenaFormaGrupa = document.createElement('div');
    cenaFormaGrupa.classList.add('form-group');
    
    var cenaLabela = document.createElement('label');
    cenaLabela.setAttribute('for', 'formGroupExampleInput');
    cenaLabela.innerText = 'Cena karte:';
    
    var cenaInput = document.createElement('input');
    cenaInput.setAttribute('type', 'text');
    cenaInput.classList.add('form-control');
    cenaInput.setAttribute('id', 'destinacija-cena');
    cenaInput.setAttribute('placeholder', destinacija.cena);
    
    cenaFormaGrupa.appendChild(cenaLabela);
    cenaFormaGrupa.appendChild(cenaInput);
    formaDestinacija.appendChild(cenaFormaGrupa);
    
    // Maksimalan broj osoba
    var maksBrojOsobaFormaGrupa = document.createElement('div');
    maksBrojOsobaFormaGrupa.classList.add('form-group');
    
    var maksBrojOsobaLabela = document.createElement('label');
    maksBrojOsobaLabela.setAttribute('for', 'formGroupExampleInput');
    maksBrojOsobaLabela.innerText = 'Maksimalan broj osoba:';
    
    var maksBrojOsobaInput = document.createElement('input');
    maksBrojOsobaInput.setAttribute('type', 'text');
    maksBrojOsobaInput.classList.add('form-control');
    maksBrojOsobaInput.setAttribute('id', 'destinacija-maxOsoba');
    maksBrojOsobaInput.setAttribute('placeholder', destinacija.maxOsoba);
    
    maksBrojOsobaFormaGrupa.appendChild(maksBrojOsobaLabela);
    maksBrojOsobaFormaGrupa.appendChild(maksBrojOsobaInput);
    formaDestinacija.appendChild(maksBrojOsobaFormaGrupa);

    var razmak = document.createElement('br');
    formaDestinacija.appendChild(razmak);
    
    // Dugme
    var dugmeIzmeni = document.createElement('button');
    dugmeIzmeni.setAttribute('type', 'button');
    dugmeIzmeni.classList.add('btn', 'btn-primary');
    dugmeIzmeni.innerText = 'Izmeni podatke';
    dugmeIzmeni.id = 'dugme-izmeni';
    
    formaDestinacija.appendChild(dugmeIzmeni);
    
    document.body.appendChild(formaDestinacija);
  }
  
  window.validacijaKorisnik = function () {
    var usernameInput = document.getElementById("korisnik-korisnickoIme");
    var usernameValue = usernameInput.value.trim();

    var passwordInput = document.getElementById("korisnik-lozinka");
    var passwordValue = passwordInput.value.trim();

    var dateInput = document.getElementById("korisnik-datum");
    var dateValue = dateInput.value.trim();
    var datePattern = /^\d{4}-\d{2}-\d{2}$/;

    var emailInput = document.getElementById("korisnik-email");
    var emailValue = emailInput.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var addressInput = document.getElementById("korisnik-adresa");
    var addressValue = addressInput.value.trim();
    var addressPattern = /^[A-Za-z\s]+,\s*\d+,\s*[A-Za-z\s]+,\s*\d{5}$/;

    var phoneInput = document.getElementById("korisnik-telefon");
    var phoneValue = phoneInput.value.trim();
    var phonePattern = /^\d{9,}$/;

    var nameInput = document.getElementById("korisnik-ime");
    var nameValue = nameInput.value.trim();
    var namePattern = /^[A-Za-z]+$/;

    var lastnameInput = document.getElementById("korisnik-prezime");
    var lastnameValue = lastnameInput.value.trim();
    var lastnamePattern = /^[A-Za-z]+$/;
  
    
    if (!datePattern.test(dateValue) && dateValue.length != 0) {
        displayMessage("Datum mora biti u formatu YYYY-MM-DD.");
        return false;
    }
    else if (!emailPattern.test(emailValue) && emailValue.length != 0) {
        displayMessage("Molimo vas unesite ispravnu email adresu.");
        return false;
    }
    else if (!addressPattern.test(addressValue) && addressValue.length != 0) {
        displayMessage("Molimo vas unesite ispravan format adrese (ulica, broj, grad, postanski broj).");
        return false;
    }
    else if (!phonePattern.test(phoneValue) && phoneValue.length != 0) {
        displayMessage("Molimo vas unesite ispravan telefonski broj.");
        return false;
    }
    else if (!namePattern.test(nameValue) && nameValue.length != 0) {
        displayMessage("Molimo vas unesite ispravno ime (samo slova).");
        return false;
    }
    else if (!lastnamePattern.test(lastnameValue) && lastnameValue.length != 0) {
        displayMessage("Molimo vas unesite ispravno prezime (samo slova).");
        return false;
    }
    else if (usernameValue.length == 0 && passwordValue.length == 0 && dateValue.length == 0 && emailValue.length == 0 && addressValue.length == 0 && phoneValue.length == 0 && nameValue.length == 0 && lastnameValue.length == 0){
        displayMessage("Molimo vas unesite zeljenu izmenu");
        return false;
    }
    else {
        alert("Uspesno uneti podaci");
        return true;
    }
  }

  window.validacijaDestinacija = function() {
    var nameInput = document.getElementById("destinacija-naziv");
    var nameValue = nameInput.value.trim();
    var namePattern = /^[a-zA-Z]+$/;

    var opisInput = document.getElementById("destinacija-opis");
    var opisValue = opisInput.value.trim();

    var tipInput = document.getElementById("destinacija-tip");
    var tipValue = tipInput.value.trim();

    var prevozInput = document.getElementById("destinacija-prevoz");
    var prevozValue = prevozInput.value.trim();

    var priceInput = document.getElementById("destinacija-cena");
    var priceValue = priceInput.value.trim();
    var pricePattern = /^\d+$/;

    var maxPersonsInput = document.getElementById("destinacija-maxOsoba");
    var maxPersonsValue = maxPersonsInput.value.trim();
    var numberPattern = /^\d+$/;

    if (!namePattern.test(nameValue) && nameValue.length != 0) {
        displayMessage("Ime može sadržati samo slova.");
        return false;
      }
    else if (!pricePattern.test(priceValue) && priceValue.length != 0) {
        displayMessage("Cena mora sadržati samo brojeve.");
        return false;
      }
    else if (!numberPattern.test(maxPersonsValue) && maxPersonsValue != 0) {
        displayMessage("Maksimalan broj osoba mora sadržati samo brojeve.");
        return false;
      }
    else if (nameValue.length == 0 && opisValue.length == 0 && tipValue.length == 0 && prevozValue.length == 0 && priceValue.length == 0 && maxPersonsValue == 0){
        displayMessage("Unesite zeljenu izmenu.");
        return false;
    }
    else {
        return true;
    }
  }

  window.agencijaValidacija = function () {
    var nameInput = document.getElementById("agencija-naziv");
    var nameValue = nameInput.value.trim();
    var namePattern = /^[a-zA-Z]+$/;

    var addressInput = document.getElementById("agencija-adresa");
    var addressValue = addressInput.value.trim();
    var addressPattern = /^[A-Za-z\s]+,\s*\d+,\s*[A-Za-z\s]+,\s*\d{5}$/;

    var yearInput = document.getElementById("agencija-godina");
    var yearValue = yearInput.value.trim();
    var numberPattern = /^\d+$/;

    var phoneInput = document.getElementById("agencija-telefon");
    var phoneValue = phoneInput.value.trim();
    var phonePattern = /^[\d\/\-]+$/;

    var emailInput = document.getElementById("agencija-email");
    var emailValue = emailInput.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!namePattern.test(nameValue) && nameValue.length != 0) {
      displayMessage("Ime može sadržati samo slova.");
      return false;
    }
    else if (!addressPattern.test(addressValue) && addressValue.length != 0) {
        displayMessage("Molimo vas unesite ispravan format adrese (ulica, broj, grad, postanski broj).");
        return false;
    }
    else if (!numberPattern.test(yearValue) && yearValue.length != 0) {
        displayMessage("Godina mora sadržati samo brojeve.");
        return false;
    }
    else if (!phonePattern.test(phoneValue) && phoneValue.length != 0) {
        displayMessage("Broj telefona može sadržati samo brojeve, znakove '/' i '-'.");
        return false;
      }
    else if (phoneValue.replace(/[\-\/]/g, "").length < 9 && phoneValue.length != 0) {
        displayMessage("Broj telefona mora imati najmanje 9 cifara.");
        return false;
    }
    else if (!emailPattern.test(emailValue) && emailValue.length != 0) {
        displayMessage("Molimo vas unesite ispravnu email adresu.");
        return false;
    }
    else if (nameValue.length == 0 && addressValue.length == 0 && yearValue.length == 0 && phoneValue.length == 0 && emailValue.length == 0) {
        displayMessage("Unesite zeljenu izmenu.");
        return false;
    }
    else {
        return true;
    }
  }

window.loginValidacija = function() {
  var emailInput = document.getElementById("login-email");
  var emailValue = emailInput.value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var passwordInput = document.getElementById("login-password")
  var passwordValue = passwordInput.value.trim();

  if (!emailPattern.test(emailValue) && emailValue.length != 0) {
    displayMessage("Molimo vas unesite ispravnu email adresu.");
    return false;
  }
  else if (emailValue.length == 0) {
    displayMessage("Unesite email adresu.");
    return false;
  }
  else if (passwordValue.length == 0) {
    displayMessage("Unesite lozinku.");
    return false;
  }
  else {
      alert("Uspesna prijava");
      return true;
  }

}

window.registrationValidacija = function() {

  var usernameInput = document.getElementById("registration-username")
  var usernameValue = usernameInput.value.trim();

  var passwordInput = document.getElementById("registration-password")
  var passwordValue = passwordInput.value.trim();

  var nameInput = document.getElementById("registration-name");
  var nameValue = nameInput.value.trim();
  var namePattern = /^[A-Za-z]+$/;

  var lastnameInput = document.getElementById("registration-surname");
  var lastnameValue = lastnameInput.value.trim();
  var lastnamePattern = /^[A-Za-z]+$/;

  var emailInput = document.getElementById("registration-email");
  var emailValue = emailInput.value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var dateInput = document.getElementById("registration-date");
  var dateValue = dateInput.value;

  var addressInput = document.getElementById("registration-address");
  var addressValue = addressInput.value.trim();
  var addressPattern = /^[A-Za-z\s]+,\s*\d+,\s*[A-Za-z\s]+,\s*\d{5}$/;

  var phoneInput = document.getElementById("registration-phone");
  var phoneValue = phoneInput.value.trim();
  var phonePattern = /^\d{9,}$/;


  if (usernameValue.length == 0) {
    displayMessage("Unesite korisnicko ime");
    return false;
  }
  else if (passwordValue.length == 0) {
    displayMessage("Unesite lozinku.");
    return false;
  }
  else if (!namePattern.test(nameValue) && nameValue.length != 0) {
    displayMessage("Ime može sadržati samo slova.");
    return false;
  }
  else if (!lastnamePattern.test(lastnameValue) && lastnameValue.length != 0) {
    displayMessage("Molimo vas unesite ispravno prezime (samo slova).");
    return false;
  }
  else if (!emailPattern.test(emailValue) && emailValue.length != 0) {
    displayMessage("Molimo vas unesite ispravnu email adresu.");
    return false;
  }
  else if (!addressPattern.test(addressValue) && addressValue.length != 0) {
    displayMessage("Molimo vas unesite ispravan format adrese (ulica, broj, grad, postanski broj).");
    return false;
  }
  else if (!phonePattern.test(phoneValue) && phoneValue.length != 0) {
    displayMessage("Molimo vas unesite ispravan telefonski broj.");
    return false;
  }
  else if (nameValue.length == 0) {
    displayMessage("Unesite Ime.");
    return false;
  }
  else if (lastnameValue.length == 0) {
    displayMessage("Unesite prezime.");
    return false;
  }
  else if (emailValue.length == 0) {
    displayMessage("Unesite email adresu.");
    return false;
  }
  else if (dateValue == '') {
    displayMessage("Unesite datum rodjenja")
    return false;
  }
  else if (addressValue.length == 0) {
    displayMessage("Unesite adresu");
    return false;
  }
  else if (phoneValue.length == 0) {
    displayMessage("Unesite broj telefona");
    return false;
  }
  else {
    alert("Uspesna registracija");
    return true;
  }
}

function displayMessage(message) {
  var errorMessageElement = document.getElementById("errorMessage");
  errorMessageElement.innerText = message;
  $('#errorModal').modal('show');
}

