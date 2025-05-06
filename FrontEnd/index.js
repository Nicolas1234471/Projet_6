/* Ici on déclare les variables correspondantes aux éléments html constituant la galerie de travaux,
et on déclare égalemet works et categories comme tableaux */
let works = [];
let categories = [];
const portfolio = document.getElementById("portfolio");
const categoryFilters = document.createElement("div")
categoryFilters.classList.add("category-filters")
portfolio.appendChild(categoryFilters)
const gallery = document.createElement("div");
gallery.classList.add("gallery");
portfolio.appendChild(gallery)

/* Fonction de récupération des différentes catégories de l'API via fetch */
async function getCategories() {
    const reponse = await fetch ("http://localhost:5678/api/categories");
    const categories = await reponse.json();
    console.log(categories)
    showCategoryFilters(categories);
    createOption(categories);
}
getCategories();

/* Fonction de récupération des différents travaux de l'API via fetch */
async function getWorks() {
    const reponse = await fetch ("http://localhost:5678/api/works");
    works = await reponse.json();
    console.log(works)
    showWorks(works)
    showWorksModal(works);
}
getWorks();

/* Fonction générant dynamiquement l'affichage des travaux sur la page */
function showWorks(data) {

    gallery.innerHTML = ""

    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        const figcaption = document.createElement("figcaption")

        image.src = data[i].imageUrl
        image.alt = data[i].title
        figcaption.innerText = data[i].title

        gallery.appendChild(figure)
        figure.appendChild(image)
        figure.appendChild(figcaption)
    }
}

/* Fonction générant dynamiquement les boutons permettant de filtrer les travaux affichés, selon leur catégorie
récupéré plus haut dans l'API via fetch */
function showCategoryFilters (categoryArray) {
    /* Création du bouton Tous par défaut qui affiche tous les travaux */
    const buttonTous = document.createElement("button")
        buttonTous.classList.add("btn-filtres","btn-filtres-full")
        buttonTous.id = 0
        buttonTous.innerText = "Tous"
    categoryFilters.appendChild(buttonTous)

    buttonTous.addEventListener("click", () => {
        clearBtnFull()
        buttonTous.classList.add("btn-filtres-full")
        showWorks(works)
    })

    /* Création d'une boucle qui crée un bouton pour chaque catégorie du tableau et y associe son nom,
    puis filtre les travaux pour afficher ceux correspondants à la catégorie séléctionnée */
    for (let i = 0; i < categoryArray.length; i++) {
        const button = document.createElement("button")
            button.classList.add("btn-filtres")
            button.id = categoryArray[i].id
            button.innerText = categoryArray[i].name

        categoryFilters.appendChild(button)

        button.addEventListener("click", () => {
            clearBtnFull()
            const worksFiltered = works.filter((work) => {
                return work.categoryId == button.id

            })
            showWorks(worksFiltered)
            button.classList.add("btn-filtres-full")
        })
    }
}

/* Ici simple fonction qui déséléctionne les autres boutons lorsque que l'on clique sur un bouton filtre */
function clearBtnFull() {
    const BoutonsFiltres = document.querySelectorAll(".btn-filtres")
    BoutonsFiltres.forEach ((button) => {
        button.classList.remove("btn-filtres-full")
    });
}

/* PARTIE MODALE */

/* Déclaration des variables constituant le html des modales */
let modal = null
let modalDeux = document.getElementById("modal2")
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null
const overlayModal = document.querySelector(".overlay-modal")
const adminTopBar = document.querySelector(".admin_top-bar")
const lienModal = document.querySelector(".js-modal")

/* Ouverture et fermeture modale 1 */

const openModal = function (e) {
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null
    focusables[0].focus()
    overlayModal.addEventListener('click', closeModal)
    overlayModal.style.display = "block"
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    overlayModal.style.display = "none"
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

/* Ouverture et fermeture modale 2 */

const openModalDeux = function (e) {
    modalDeux = document.getElementById("modal2")
    modalDeux.style.display = "block"
    overlayModal.addEventListener('click', closeModalDeux)
    overlayModal.style.display = "block"
    modalDeux.removeAttribute('aria-hidden')
    modalDeux.setAttribute('aria-modal', 'true')
    modalDeux.addEventListener('click', closeModalDeux)
    modalDeux.querySelector('.js-modal-close').addEventListener('click', closeModalDeux)
    modalDeux.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModalDeux = function (e) {
    modalDeux = document.getElementById("modal2")
    if (modalDeux === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    overlayModal.style.display = "none"
    modalDeux.style.display = "none"
    modalDeux.setAttribute('aria-hidden', 'true')
    modalDeux.removeAttribute('aria-modal')
    modalDeux.removeEventListener('click', closeModalDeux)
    modalDeux.querySelector('.js-modal-close').removeEventListener('click', closeModalDeux)
    modalDeux.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

/* Ici la variable permet de ne pas fermer la fenêtre modale lorsque l'on clique à l'intérieur de cette dernière */
const stopPropagation = function (e) {
    e.stopPropagation()
}

/* Ici on fait en sorte de pouvoir interagir avec la fenêtre modale au clavier uniquement */
const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

/* Même chose mais pour la seconde fenêtre modale */
const focusInModalDeux = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modalDeux.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

/* Ici on ajoute un event listener sur le text lien "modifier" pour ouvrir la fenêtre modale */
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal)
})

/* Bouton précédent qui permet de revenir sur la première fenêtre modale depuis la seconde */
const previousModal = function (e) {
    modal = document.getElementById("modal1")
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = "block"
    focusables[0].focus()
    overlayModal.addEventListener('click', closeModal)
    overlayModal.style.display = "block"
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const btnAjoutPhoto = document.getElementById("btn-ajout-photo")
const btnPreviousModalDeux = document.querySelector("#modal2 .js-modal-previous")

/* Au clic du bouton d'ajout de photo, la première modale se ferme et la seconde s'ouvre */
btnAjoutPhoto.addEventListener('click', (e) => {
    closeModal()
    openModalDeux()
})

/* Au clic du bouton précédent (flèche), la seconde modale se ferme et la première s'ouvre */
btnPreviousModalDeux.addEventListener('click', (e) => {
    closeModalDeux()
    previousModal()
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModalDeux(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModalDeux(e)
    }
})

const modalWrapper = document.querySelector(".modal-wrapper")
const galleryModal = document.querySelector(".gallery-modal")

/* Mise en place de l'affichage de la liste des travaux dynamiquement sur la fenêtre de la première modale */
function showWorksModal(data) {

    /* On fait une boucle qui donnera pour chaque élément du tableau des travaux de l'API, le nom, l'url image
    et id correspondant */
    for (let i = 0; i < data.length; i++) {
        const figureModal = document.createElement("figure")
        const imageModal = document.createElement("img")
        const deleteIcon = document.createElement("i")
        imageModal.classList.add("image-modal")
        deleteIcon.classList.add("fa-solid","fa-trash-can","icone-delete")

        imageModal.src = data[i].imageUrl
        imageModal.alt = data[i].title
        deleteIcon.id = data[i].id

        galleryModal.appendChild(figureModal)
        figureModal.appendChild(imageModal)
        figureModal.appendChild(deleteIcon)

            /* PARTIE SUPPRESSION PHOTO */
            /* On ajoute un event listener au click sur l'icone poubelle qui envoie une requête de suppression
            à l'API avec des conditions si réussite ou non */
            deleteIcon.addEventListener('click', async (e) => {
                try {
                    const iconDeleteId = deleteIcon.getAttribute('id')
                    const response = await fetch(`http://localhost:5678/api/works/${iconDeleteId}`, {
                        headers: {"Authorization": `Bearer ${token}`},
                        method: "DELETE"
                    });
                    if (response.ok) {
                        figureModal.remove();
                        reloadTravaux(galleryModal);

                        const buttonTous = document.querySelector('.btn-filtres[id="0"]');
                        if (buttonTous) {
                            clearBtnFull();
                            buttonTous.classList.add("btn-filtres-full");
                            showWorks(works);
                        }
                    }
                    } catch (e) {
                        console.error(e);
                    }
            });
    }
}

/* Fonction qui vide la galerie et la re-remplit avec un nouvel appel API pour actualiser les travaux */
function reloadTravaux (dataReload) {
    dataReload.innerHTML = ""
    getWorks();
}

/* Récupération du token et vérification, si le token est correct, on affiche l'interface administrateur */

const token = sessionStorage.getItem('token');
const loginLink = document.querySelector(".login-redirect");
const logoutNav = document.querySelector(".logout-nav")

function verifyToken() {
    if (token) {
        adminTopBar.style.display = "flex"
        lienModal.style.display = "block"
        loginLink.style.display = "none"
        logoutNav.style.display = "block"
        logoutNav.addEventListener("click", () => {
            sessionStorage.removeItem("token");

        })
    }
}
verifyToken();

function logoutAdmin () {
    logoutNav.addEventListener("click", () => {
        sessionStorage.removeItem(token);
        window.location.reload();
    })
}
logoutAdmin();

/* Création des choix possibles de catégorie d'image en fonction des catégories disponibles sur l'API */

const selectCategorie = document.getElementById('categorie-photo')

function createOption (listeCategories) {
    for (let i = 0; i < listeCategories.length; i++) {
        const choixCategorie = document.createElement("option")
        choixCategorie.innerText = listeCategories[i].name
        choixCategorie.value = listeCategories[i].id

        selectCategorie.appendChild(choixCategorie)
    }
}

/* PARTIE FORMULAIRE ENVOI PHOTO */

/* AFFICHAGE APERCU DE L'IMAGE UPLOADEE */

const boutonValider = document.querySelector('.btn-valider-photo')
const spanSubmitPhoto = document.querySelector('.form-envoi-photo span')
const labelSubmitPhoto = document.querySelector('label[for="btn-submit-photo"]');
const iconePhoto = document.querySelector('.icone-post-photo')
const containerPostPhoto = document.querySelector('.container-post-photo')
const chooseFile = document.getElementById('btn-submit-photo')
const previewImageFile = document.createElement("div")
previewImageFile.classList.add("image-preview")
containerPostPhoto.appendChild(previewImageFile)

/* Event listener au "changement" de statut de la séléction d'image à ajouter, ce qui supprime ce qu'il y a derrière
pour afficher une preview de l'image séléctionnée */
chooseFile.addEventListener('change', function () {
    getImgData();
    spanSubmitPhoto.style.display = "none";
    chooseFile.style.display = "none";
    iconePhoto.style.display = "none";
    labelSubmitPhoto.style.display = "none";
})

/* Récupération de l'image à afficher */
function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener('load', function () {
            previewImageFile.style.display = 'block';
            previewImageFile.innerHTML = '<img src="' + this.result + '" />';
        });
    }
}

/* FONCTIONNEMENT DE L'AJOUT DE PHOTO AU BACKEND */

const titrePhoto = document.getElementById("titre-photo");

function verifierFormulairePhotoComplet() {
    const categorieEnvoiPhoto = document.getElementById("categorie-photo").value;
    const fichierPhoto = document.getElementById("btn-submit-photo").files.length > 0;
    const titleField = document.getElementById("titre-photo").value.trim();

    const formulaireEstComplet = titleField !== "" && categorieEnvoiPhoto !== "" && fichierPhoto;

    if (formulaireEstComplet) {
        boutonValider.classList.add("btn-valider-photo-green");
        boutonValider.classList.remove("btn-valider-photo");
    } else {
        boutonValider.classList.remove("btn-valider-photo-green");
        boutonValider.classList.add("btn-valider-photo");
    }
}

titrePhoto.addEventListener("input", verifierFormulairePhotoComplet);
selectCategorie.addEventListener("change", verifierFormulairePhotoComplet);
chooseFile.addEventListener("change", verifierFormulairePhotoComplet);

const formulaireEnvoiPhoto = document.querySelector('.form-envoi-photo')

/* On envoie une requête à l'API en utilisant les données enregistrées dans le formulaire d'envoi de photo */
async function envoiPhoto () {

    /* Récupération des éléments HTML correpondants aux messages d'erreurs */
    const categorieExemple = document.getElementById('categorie-photo');
    const errorTitleEmpty = document.querySelector(".error-titre-empty")
    const errorCategoryEmpty = document.querySelector(".error-categorie-empty")
    const titleField = document.getElementById("titre-photo").value.trim();

    let valid = true;
    /* Si le champ de texte de titre est vide, on affiche un message d'erreur et le bouton valider reste gris */
    if (titleField === "") {
        errorTitleEmpty.style.display = "inline";
        valid = false;
        boutonValider.classList.add('btn-valider-photo')
        boutonValider.classList.remove('btn-valider-photo-green')

    } else {
        errorTitleEmpty.style.display = "none";
    }
    /* Si aucune catégorie n'est choisie, on affiche un message d'erreur et le bouton valider reste gris */
    if (categorieExemple.value === "") {
        errorCategoryEmpty.style.display = "inline";
        valid = false;
        boutonValider.classList.add('btn-valider-photo')
        boutonValider.classList.remove('btn-valider-photo-green')

    } else {
        errorCategoryEmpty.style.display = "none";
    }
    /* On vérifie si valid est true ou false, si il est false, la fonction s'arrête ici */
    if (!valid) return;

    const formulaireEnvoiPhotoData = new FormData(formulaireEnvoiPhoto);

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            headers: {"Authorization": `Bearer ${token}`},
            method: "POST",
            body: formulaireEnvoiPhotoData
        });
        console.log(await response.json());
        /* Si la requête est validée, on actualise la liste des travaux de la page d'accueil et on ferme la modale */
        if (response.ok) {
            reloadTravaux(galleryModal);
            closeModalDeux();
            formulaireEnvoiPhoto.reset();
            resetInputFile();
            errorTitleEmpty.style.display = "none";
            errorCategoryEmpty.style.display = "none";

            const buttonTous = document.querySelector('.btn-filtres[id="0"]');
            if (buttonTous) {
                clearBtnFull();
                buttonTous.classList.add("btn-filtres-full");
                showWorks(works);
            }
        }
        /* Sinon, un message d'erreur doit apparaître au niveau de la page formulaire */
        else {
            console.warn("Erreur lors de l'envoi :", response.status);
        }
    } catch (e) {
        console.error(e);
    }
}

/* Envoi du formulaire */

formulaireEnvoiPhoto.addEventListener('submit', (event) => {
    event.preventDefault();
    envoiPhoto();
})

function resetInputFile() {
    previewImageFile.style.display = "none";
    spanSubmitPhoto.style.display = "inline";
    iconePhoto.style.display = "block";
    labelSubmitPhoto.style.display = "flex";
}

