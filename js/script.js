/*
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come ispirandovi alla foto allegata. Se volete cambiare la grafica siete liberi di farlo.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile assieme al suo titolo e testo.
Milestone 2:
Aggiungere il "ciclo infinito" del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sotto forma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop  del meccanismo di autoplay.
*/
//# ARRAY IMMAGINI
const data = [
  {
    image: "img/01.webp",
    title: "Marvel's Spiderman Miles Morale",
    text: "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.",
  },
  {
    image: "img/02.webp",
    title: "Ratchet & Clank: Rift Apart",
    text: "Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.",
  },
  {
    image: "img/03.webp",
    title: "Fortnite",
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  },
  {
    image: "img/04.webp",
    title: "Stray",
    text: "Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city",
  },
  {
    image: "img/05.webp",
    title: "Marvel's Avengers",
    text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
  },
];

//# FUNZIONI
//Creo funzione per big pics
const getBigPic = (element, i) => {
  const picture = `
  <div class="big-pic">
    <img src="img/0${i}.webp" alt="pics ${i}" />
    <div class="pic-description">
      <h2>${element.title}</h2>
      <p>
        ${element.text}
      </p>
    </div>
  </div>
  `;
  return picture;
};

const getThumbnails = (i) => {
  const thumb = `
  <figure>
  <img src="img/0${i}.webp" alt="pics ${i}" />
  </figure>
  `;
  return thumb;
};

const changePics = (target) => {
  //Tolgo la classe active attuale
  bigPics[currentActive].classList.remove("active");
  thumbnails[currentActive].classList.remove("active");

  //Creo condizione individuale
  switch (target) {
    case "next":
      if (currentActive < bigPics.length - 1) {
        currentActive++;
      } else {
        currentActive = 0;
      }
      break;
    case "prev":
      if (!currentActive) {
        currentActive = bigPics.length - 1;
      } else {
        currentActive--;
      }
      break;
    case target:
      currentActive = target;
      break;
  }

  //Aggiungo nuova classe active
  bigPics[currentActive].classList.add("active");
  thumbnails[currentActive].classList.add("active");
};
//Funzioni di AUTOPLAY
let autoplay;
const getAutoplay = () => {
  autoplay = setInterval(() => {
    changePics("next");
  }, 3000);
};

const restarAutoplay = () => {
  clearInterval(autoplay);
  getAutoplay();
};

//# AZIONI PRELIMINARI
//Targhettizzo gli elementi in pagina
const carouselLeft = document.querySelector(".carousel-left");
const thumbnailsElement = document.querySelector(".thumbnails");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

//# EVENTI LOGICI
getAutoplay();

let pictures = "";
let thumb = "";
//Creo ciclo che stampi un'immagine per ogni elemento
data.forEach((image, i) => {
  i++;
  pictures += getBigPic(image, i);
  thumb += getThumbnails(i);
});

carouselLeft.innerHTML += pictures;
thumbnailsElement.innerHTML += thumb;

//Aggiungo classe active per rendere l'immagine visibile dinamicamente
const bigPics = document.querySelectorAll(".big-pic");
const thumbnails = document.querySelectorAll(".thumbnails figure");

let currentActive = 0;
bigPics[currentActive].classList.add("active");
thumbnails[currentActive].classList.add("active");

//Evento al click next
next.addEventListener("click", () => {
  changePics("next");
  restarAutoplay();
});

//Evento al click prev
prev.addEventListener("click", () => {
  changePics("prev");
  restarAutoplay();
});

//Creo ciclo per aggiungere evento al click thumbnails
thumbnails.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    changePics(i);
    restarAutoplay();
  });
});
