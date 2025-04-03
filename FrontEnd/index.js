let works = [];
let categories = [];
const portfolio = document.getElementById("portfolio");
const categoryFilters = document.createElement("div")
categoryFilters.classList.add("category-filters")
portfolio.appendChild(categoryFilters)
const gallery = document.createElement("div");
gallery.classList.add("gallery");
portfolio.appendChild(gallery)

async function getCategories() {
    const reponse = await fetch ("http://localhost:5678/api/categories");
    const categories = await reponse.json();
    console.log(categories)
    showCategoryFilters(categories);
}
getCategories();

async function getWorks() {
    const reponse = await fetch ("http://localhost:5678/api/works");
    works = await reponse.json();
    console.log(works)
    showWorks(works)
    showWorksModal(works);
}
getWorks();

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

function showCategoryFilters (categoryArray) {

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

function clearBtnFull() {
    const BoutonsFiltres = document.querySelectorAll(".btn-filtres")
    BoutonsFiltres.forEach ((button) => {
        button.classList.remove("btn-filtres-full")
    });
}

/* PARTIE MODALE */

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
    /* modalDeux = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modalDeux.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus') 
    modalDeux.style.display = null
    focusables[0].focus() */
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

const stopPropagation = function (e) {
    e.stopPropagation()
}

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

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal)
})

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
const btnPreviousModal = document.querySelector(".js-modal-previous")

btnAjoutPhoto.addEventListener('click', (e) => {
    closeModal()
    openModalDeux()
})

btnPreviousModal.addEventListener('click', (e) => {
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

function showWorksModal(data) {

    for (let i = 0; i < data.length; i++) {
        const figureModal = document.createElement("figure")
        const imageModal = document.createElement("img")
        const deleteIcon = document.createElement("i")
        imageModal.classList.add("image-modal")
        deleteIcon.classList.add("fa-solid","fa-trash-can")

        imageModal.src = data[i].imageUrl
        imageModal.alt = data[i].title

        galleryModal.appendChild(figureModal)
        figureModal.appendChild(imageModal)
        figureModal.appendChild(deleteIcon)
    }
}

function verifyToken() {
    const token = sessionStorage.getItem('token')
    if (token) {
        adminTopBar.style.display = "flex"
        lienModal.style.display = "block"
    }
}
verifyToken();

/* A FAIRE LA PROCHAINE FOIS:
   VOIR POUR FAIRE FONCTIONNER CORRECTEMENT LE BOUTON "RETOUR" DE LA DEUXIEME MODALE */
