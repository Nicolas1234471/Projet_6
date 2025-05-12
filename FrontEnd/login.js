loginConnect()

/* Fonction qui récupère le formulaire et envoie une requête POST au clic de l'envoi (submit) du formulaire */
async function loginConnect() {
    const loginForm = document.querySelector(".login-form")
    const errorEmpty = document.querySelector(".error-empty")
    const identifiantIncorrect = document.querySelector(".identifiant-error-incorrect")

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        /* Si un des deux champs est vide, un message d'erreur s'affiche */
        errorEmpty.style.display = "none";
        identifiantIncorrect.style.display = "none";

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        if (email === "" || password === "") {
            errorEmpty.style.display = "inline"
            return
        }

        try {
        const fetchLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });
        /* Si la requête est validée (donc a les bons identifiants rentrés), l'utilisateur est connecté et redirigé
        vers la page d'accueil et le token d'administrateur est stocké */
        if (fetchLogin.ok) {
            const dataApi = await fetchLogin.json()
            sessionStorage.setItem("token", dataApi.token)
            window.location.href = "index.html"
        }
        /* Si les identifiants sont mauvais, un message d'erreur est affiché */
        else {
            identifiantIncorrect.style.display = "inline"
        }
        } catch (e) {
            console.error("Erreur lors de la tentative de connection :", error);
        }
    });
}