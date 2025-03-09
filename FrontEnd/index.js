async function getCategories() {
    const reponse = await fetch ("http://localhost:5678/api/categories");
    const categories = await reponse.json();
    console.log(categories)
    showCategoryFilters(categories);
}
getCategories();

async function getWorks() {
    const reponse = await fetch ("http://localhost:5678/api/works");
    const works = await reponse.json();
    console.log(works)
    showWorks(works);
}
getWorks();

function showWorks(worksArray) {

    const portfolio = document.getElementById("portfolio");
    const gallery = document.createElement("div");
        gallery.classList.add("gallery");

    portfolio.appendChild(gallery)

    gallery.innerHTML = ""

    for (let i = 0; i < worksArray.length; i++) {
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        const figcaption = document.createElement("figcaption")

        image.src = worksArray[i].imageUrl
        image.alt = worksArray[i].title
        figcaption.innerText = worksArray[i].title

        gallery.appendChild(figure)
        figure.appendChild(image)
        figure.appendChild(figcaption)
    }
}

function showCategoryFilters (categoryArray) {

    const categoryFilters = document.createElement("div")
    categoryFilters.classList.add(".category-filters")
    portfolio.appendChild(categoryFilters)

    const buttonTous = document.createElement("button")
        buttonTous.classList.add("btn-filtres","btn-filtres-full")
        buttonTous.id = 0
        buttonTous.innerText = "Tous"
    categoryFilters.appendChild(buttonTous)

    manageEventListeners(buttonTous);

    for (let i = 0; i < categoryArray.length; i++) {
        const button = document.createElement("button")
            button.classList.add("btn-filtres")
            button.id = categoryArray[i].id
            button.innerText = categoryArray[i].name

        categoryFilters.appendChild(button)

        manageEventListeners(button);

    }
}

function manageEventListeners(buttonParam) {
    buttonParam.addEventListener("click", () => {
        clearBtnFull(buttonParam)
        buttonParam.classList.add("btn-filtres-full");
    });
}

function clearBtnFull() {
    const BoutonsFiltres = document.querySelectorAll(".btn-filtres")
    BoutonsFiltres.forEach ((button) => {
        button.classList.remove("btn-filtres-full")
    });
}

const worksFiltered = categoryArray.filter((work) => {
    return work.categoryId == btn.id
});

