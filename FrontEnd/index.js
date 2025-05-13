/* Ici on déclare les variables correspondantes aux éléments html constituant la galerie de travaux,
et on déclare égalemet works et categories comme tableaux */
let works = [];
let categories = [];
const portfolio = document.getElementById('portfolio');
const categoryFiltersContainer = document.createElement('div');
categoryFiltersContainer.classList.add('category-filters');
portfolio.appendChild(categoryFiltersContainer);
const gallery = document.createElement('div');
gallery.classList.add('gallery');
portfolio.appendChild(gallery);
/* Variables constituant le html des modales */
let modal = null;
let modalTwo = document.getElementById('modal2');
const focusableSelector = 'button, a, input, textarea';
let focusables = [];
let previouslyFocusedElement = null;
const overlayModal = document.querySelector('.overlay-modal');
const adminTopBar = document.querySelector('.admin_top-bar');
const modalLink = document.querySelector('.js-modal');
const modalWrapper = document.querySelector('.modal-wrapper');
const galleryModal = document.querySelector('.gallery-modal');
const buttonAddPictureModal = document.getElementById('btn-ajout-photo');
const buttonPreviousModalTwo = document.querySelector(
    '#modal2 .js-modal-previous'
);
/* Gestion du token et des boutons de connexion/déconnexion */
const token = sessionStorage.getItem('token');
const loginNav = document.querySelector('.login-redirect');
const logoutNav = document.querySelector('.logout-nav');
/* Variables du formulaire d'ajout de photo */
const formSendPicture = document.querySelector('.form-envoi-photo');
const buttonValider = document.querySelector('.btn-valider-photo');
const spanSubmitPhoto = document.querySelector('.form-envoi-photo span');
const labelSubmitPhoto = document.querySelector(
    'label[for="btn-submit-photo"]'
);
const iconPhoto = document.querySelector('.icone-post-photo');
const containerPostPhoto = document.querySelector('.container-post-photo');
const chooseFile = document.getElementById('btn-submit-photo');
const previewImageFile = document.createElement('div');
previewImageFile.classList.add('image-preview');
containerPostPhoto.appendChild(previewImageFile);
const titlePhoto = document.getElementById('titre-photo');
const selectCategory = document.getElementById('categorie-photo');

/* Fonction de récupération des différentes catégories de l'API via fetch */
async function getCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        categories = await response.json();
        showCategoryFilters(categories);
        createOptionCategoryChoice(categories);
    } catch (e) {
        console.error('Erreur lors de la récupération des catégories:', e);
    }
}

/* Fonction de récupération des différents travaux de l'API via fetch */
async function getWorks() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        works = await response.json();
        showWorks(works);
        showWorksModal(works);
    } catch (e) {
        console.error('Erreur lors de la récupération des travaux :', e);
    }
}

/* Fonction générant dynamiquement l'affichage des travaux sur la page */
function showWorks(data) {
    gallery.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        image.src = data[i].imageUrl;
        image.alt = data[i].title;
        figcaption.innerText = data[i].title;
        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    }
}

/* Ici simple fonction qui déséléctionne les autres boutons lorsque que l'on clique sur un bouton filtre */
function clearBtnFull() {
    const buttonsFilters = document.querySelectorAll('.btn-filtres');
    buttonsFilters.forEach((button) => {
        button.classList.remove('btn-filtres-full');
    });
}

/* Fonction générant dynamiquement les boutons permettant de filtrer les travaux affichés, selon leur catégorie
récupéré plus haut dans l'API via fetch */
function showCategoryFilters(categoryArray) {
    /* Création du bouton Tous par défaut qui affiche tous les travaux */
    const buttonTous = document.createElement('button');
    buttonTous.classList.add('btn-filtres', 'btn-filtres-full');
    buttonTous.id = 0;
    buttonTous.innerText = 'Tous';
    categoryFiltersContainer.appendChild(buttonTous);

    buttonTous.addEventListener('click', () => {
        clearBtnFull();
        buttonTous.classList.add('btn-filtres-full');
        showWorks(works);
    });
    /* Création d'une boucle qui crée un bouton pour chaque catégorie du tableau et y associe son nom,
    puis filtre les travaux pour afficher ceux correspondants à la catégorie séléctionnée */
    for (let i = 0; i < categoryArray.length; i++) {
        const button = document.createElement('button');
        button.classList.add('btn-filtres');
        button.id = categoryArray[i].id;
        button.innerText = categoryArray[i].name;
        categoryFiltersContainer.appendChild(button);

        button.addEventListener('click', () => {
            clearBtnFull();
            const worksFiltered = works.filter((work) => {
                return work.categoryId == button.id;
            });
            showWorks(worksFiltered);
            button.classList.add('btn-filtres-full');
        });
    }
}

/* PARTIE MODALE */
/* Ouverture et fermeture modale 1 */
const openModal = function (e) {
    modal = document.querySelector(e.target.getAttribute('href'));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus');
    modal.style.display = null;
    focusables[0].focus();
    overlayModal.addEventListener('click', closeModal);
    overlayModal.style.display = 'block';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal
        .querySelector('.js-modal-close')
        .addEventListener('click', closeModal);
    modal
        .querySelector('.js-modal-stop')
        .addEventListener('click', stopPropagation);
};

const closeModal = function (e) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    overlayModal.style.display = 'none';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal
        .querySelector('.js-modal-close')
        .removeEventListener('click', closeModal);
    modal
        .querySelector('.js-modal-stop')
        .removeEventListener('click', stopPropagation);
    modal = null;
};

/* Ouverture et fermeture modale 2 */
const openModalTwo = function (e) {
    modalTwo = document.getElementById('modal2');
    modalTwo.style.display = 'block';
    overlayModal.addEventListener('click', closeModalTwo);
    overlayModal.style.display = 'block';
    modalTwo.removeAttribute('aria-hidden');
    modalTwo.setAttribute('aria-modal', 'true');
    modalTwo.addEventListener('click', closeModalTwo);
    modalTwo
        .querySelector('.js-modal-close')
        .addEventListener('click', closeModalTwo);
    modalTwo
        .querySelector('.js-modal-stop')
        .addEventListener('click', stopPropagation);
};

const closeModalTwo = function (e) {
    modalTwo = document.getElementById('modal2');
    if (modalTwo === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    overlayModal.style.display = 'none';
    modalTwo.style.display = 'none';
    modalTwo.setAttribute('aria-hidden', 'true');
    modalTwo.removeAttribute('aria-modal');
    modalTwo.removeEventListener('click', closeModalTwo);
    modalTwo
        .querySelector('.js-modal-close')
        .removeEventListener('click', closeModalTwo);
    modalTwo
        .querySelector('.js-modal-stop')
        .removeEventListener('click', stopPropagation);
    modal = null;
};

/* Ici la variable permet de ne pas fermer la fenêtre modale lorsque l'on clique à l'intérieur de cette dernière */
const stopPropagation = function (e) {
    e.stopPropagation();
};

/* Ici on fait en sorte de pouvoir interagir avec la fenêtre modale au clavier uniquement */
const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(
        (f) => f === modal.querySelector(':focus')
    );
    if (e.shiftKey === true) {
        index--;
    } else {
        index++;
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
};

/* Même chose mais pour la seconde fenêtre modale */
const focusInModalTwo = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(
        (f) => f === modalTwo.querySelector(':focus')
    );
    if (e.shiftKey === true) {
        index--;
    } else {
        index++;
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
};

/* Ici on ajoute un event listener sur le text lien "modifier" pour ouvrir la fenêtre modale */
document.querySelectorAll('.js-modal').forEach((a) => {
    a.addEventListener('click', openModal);
});

/* Bouton précédent qui permet de revenir sur la première fenêtre modale depuis la seconde */
const previousModal = function (e) {
    modal = document.getElementById('modal1');
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus');
    modal.style.display = 'block';
    focusables[0].focus();
    overlayModal.addEventListener('click', closeModal);
    overlayModal.style.display = 'block';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal
        .querySelector('.js-modal-close')
        .addEventListener('click', closeModal);
    modal
        .querySelector('.js-modal-stop')
        .addEventListener('click', stopPropagation);
};

/* Au clic du bouton d'ajout de photo, la première modale se ferme et la seconde s'ouvre */
buttonAddPictureModal.addEventListener('click', (e) => {
    closeModal();
    openModalTwo();
});

/* Au clic du bouton précédent (flèche), la seconde modale se ferme et la première s'ouvre */
buttonPreviousModalTwo.addEventListener('click', (e) => {
    closeModalTwo();
    previousModal();
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e);
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e);
    }
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModalTwo(e);
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModalTwo(e);
    }
});

/* Mise en place de l'affichage de la liste des travaux dynamiquement sur la fenêtre de la première modale */
function showWorksModal(data) {
    /* On fait une boucle qui donnera pour chaque élément du tableau des travaux de l'API, le nom, l'url image
    et id correspondant */
    for (let i = 0; i < data.length; i++) {
        const figureModal = document.createElement('figure');
        const imageModal = document.createElement('img');
        const deleteIcon = document.createElement('i');
        imageModal.classList.add('image-modal');
        deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'icone-delete');

        imageModal.src = data[i].imageUrl;
        imageModal.alt = data[i].title;
        deleteIcon.id = data[i].id;

        galleryModal.appendChild(figureModal);
        figureModal.appendChild(imageModal);
        figureModal.appendChild(deleteIcon);

        /* PARTIE SUPPRESSION PHOTO */
        /* On ajoute un event listener au click sur l'icone poubelle qui envoie une requête de suppression
            à l'API avec des conditions si réussite ou non */
        deleteIcon.addEventListener('click', async (e) => {
            try {
                const iconDeleteId = deleteIcon.getAttribute('id');
                const response = await fetch(
                    `http://localhost:5678/api/works/${iconDeleteId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        method: 'DELETE',
                    }
                );
                if (response.ok) {
                    figureModal.remove();
                    reloadWorks(galleryModal);
                    const buttonTous = document.querySelector(
                        '.btn-filtres[id="0"]'
                    );
                    if (buttonTous) {
                        clearBtnFull();
                        buttonTous.classList.add('btn-filtres-full');
                        showWorks(works);
                    }
                } else {
                    console.warn(
                        'Erreur lors de la suppression :',
                        response.status
                    );
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
}

/* Fonction qui vide la galerie et la re-remplit avec un nouvel appel API pour actualiser les travaux */
function reloadWorks(dataReload) {
    dataReload.innerHTML = '';
    getWorks();
}

/* Récupération du token et vérification, si le token est correct, on affiche l'interface administrateur */
function verifyToken() {
    if (token) {
        adminTopBar.style.display = 'flex';
        modalLink.style.display = 'block';
        loginNav.style.display = 'none';
        logoutNav.style.display = 'block';
        logoutNav.addEventListener('click', () => {
            sessionStorage.removeItem('token');
        });
    }
}

/* Déconnexion de l'utilisateur au clic du bouton logout */
function logoutAdmin() {
    logoutNav.addEventListener('click', () => {
        sessionStorage.removeItem(token);
        window.location.reload();
    });
}

/* Création des choix possibles de catégorie d'image en fonction des catégories disponibles sur l'API */
function createOptionCategoryChoice(categoryList) {
    for (let i = 0; i < categoryList.length; i++) {
        const categoryChoice = document.createElement('option');
        categoryChoice.innerText = categoryList[i].name;
        categoryChoice.value = categoryList[i].id;
        selectCategory.appendChild(categoryChoice);
    }
}

/* PARTIE FORMULAIRE ENVOI PHOTO */
/* AFFICHAGE APERCU DE L'IMAGE UPLOADEE */
/* Event listener au "changement" de statut de la séléction d'image à ajouter, ce qui supprime ce qu'il y a derrière
pour afficher une preview de l'image séléctionnée */
chooseFile.addEventListener('change', function () {
    getImgData();
    spanSubmitPhoto.style.display = 'none';
    chooseFile.style.display = 'none';
    iconPhoto.style.display = 'none';
    labelSubmitPhoto.style.display = 'none';
});

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
function checkFormComplete() {
    const sendPictureCategory =
        document.getElementById('categorie-photo').value;
    const pictureFile =
        document.getElementById('btn-submit-photo').files.length > 0;
    const titleField = document.getElementById('titre-photo').value.trim();
    const formIsComplete =
        titleField !== '' && sendPictureCategory !== '' && pictureFile;

    if (formIsComplete) {
        buttonValider.classList.add('btn-valider-photo-green');
        buttonValider.classList.remove('btn-valider-photo');
    } else {
        buttonValider.classList.remove('btn-valider-photo-green');
        buttonValider.classList.add('btn-valider-photo');
    }
}

titlePhoto.addEventListener('input', checkFormComplete);
selectCategory.addEventListener('change', checkFormComplete);
chooseFile.addEventListener('change', checkFormComplete);

/* On envoie une requête à l'API en utilisant les données enregistrées dans le formulaire d'envoi de photo */
async function sendPicture() {
    /* Récupération des éléments HTML correpondants aux messages d'erreurs */
    const categoryExample = document.getElementById('categorie-photo');
    const errorPhotoEmpty = document.querySelector('.error-photo-empty');
    const errorTitleEmpty = document.querySelector('.error-titre-empty');
    const errorCategoryEmpty = document.querySelector('.error-categorie-empty');
    const titleField = document.getElementById('titre-photo').value.trim();
    const filePhotoEmpty =
        document.getElementById('btn-submit-photo').files.length < 1;

    let valid = true;
    /* Si le champ de texte de titre est vide, on affiche un message d'erreur */
    if (titleField === '') {
        errorTitleEmpty.style.display = 'inline';
        valid = false;
    } else {
        errorTitleEmpty.style.display = 'none';
    }
    /* Si aucune catégorie n'est choisie, on affiche un message d'erreur */
    if (categoryExample.value === '') {
        errorCategoryEmpty.style.display = 'inline';
        valid = false;
    } else {
        errorCategoryEmpty.style.display = 'none';
    }
    /* Si aucune image à uploader n'est choisie, on affiche un message d'erreur */
    if (filePhotoEmpty) {
        errorPhotoEmpty.style.display = 'inline';
        valid = false;
    } else {
        errorPhotoEmpty.style.display = 'none';
    }
    /* On vérifie si valid est true ou false, si il est false, la fonction s'arrête ici */
    if (!valid) return;

    const formSendPictureData = new FormData(formSendPicture);

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            headers: { Authorization: `Bearer ${token}` },
            method: 'POST',
            body: formSendPictureData,
        });
        console.log(await response.json());
        /* Si la requête est validée, on actualise la liste des travaux de la page d'accueil et on ferme la modale */
        if (response.ok) {
            reloadWorks(galleryModal);
            closeModalTwo();
            formSendPicture.reset();
            resetInputFile();
            errorTitleEmpty.style.display = 'none';
            errorCategoryEmpty.style.display = 'none';

            const buttonTous = document.querySelector('.btn-filtres[id="0"]');
            if (buttonTous) {
                clearBtnFull();
                buttonTous.classList.add('btn-filtres-full');
                showWorks(works);
            }
        } else {
        /* Sinon, un message d'erreur doit apparaître au niveau de la page formulaire */
            console.warn("Erreur lors de l'envoi :", response.status);
        }
    } catch (e) {
        console.error(e);
    }
}

/* Envoi du formulaire */
formSendPicture.addEventListener('submit', (event) => {
    event.preventDefault();
    sendPicture();
});

function resetInputFile() {
    previewImageFile.style.display = 'none';
    spanSubmitPhoto.style.display = 'inline';
    iconPhoto.style.display = 'block';
    labelSubmitPhoto.style.display = 'flex';
}

/* Appels de fonction initiales */
getCategories();
getWorks();
verifyToken();
logoutAdmin();
