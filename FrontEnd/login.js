loginConnect()


/* Fonction qui récupère le formulaire et envoie une requête POST au clic de l'envoi (submit) du formulaire */
async function loginConnect() {
    const loginForm = document.querySelector(".login-form")

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const fetchLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })

        /* Si la requête est validée (donc a les bons identifiants rentrés), l'utilisateur est connecté et redirigé
        vers la page d'accueil et le token d'administrateur est stocké */
        if(fetchLogin.ok) {
            const dataApi = await fetchLogin.json()
            sessionStorage.setItem("token", dataApi.token)
            window.location.href = "index.html"
        }
        
        /* Si la requête n'est pas validée, un message d'erreur est affiché */
        else {
            alert("Connexion échouée")
        }
    })
}