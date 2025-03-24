loginConnect()

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

        if(fetchLogin.ok) {
            const dataApi = await fetchLogin.json()
            sessionStorage.setItem("token", dataApi.token)
            window.location.href = "index.html"
        }
        
        else {
            alert("Connexion échouée")
        }
    })
}
