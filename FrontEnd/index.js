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
    showWorks(works);
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