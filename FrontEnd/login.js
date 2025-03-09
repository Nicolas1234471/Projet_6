async function getLogin() {
    const reponse = await fetch("http://localhost:5678/api/users/login");
    const login = await reponse.json();
    console.log(works);
}
getLogin()