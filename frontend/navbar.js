document.addEventListener("DOMContentLoaded", () => {
    const nav = document.createElement("nav");
    const token = localStorage.getItem("token");
    nav.style.padding = "0 1rem"; // ✅ ajoute du padding gauche/droite
    nav.style.marginBottom = "2rem"; // (optionnel) espacement sous la nav
  
    nav.innerHTML = `
      <ul>
        <li><strong>PollTech</strong></li>
      </ul>
      <ul>
        ${token
          ? `
          <li><a href="dashboard.html">Dashboard</a></li>
          <li><a href="index.html">Accueil</a></li>
          <li><a href="#" onclick="logout()">Déconnexion</a></li>
        `
          : `
          <li><a href="index.html">Accueil</a></li>
          <li><a href="signup.html">Inscription</a></li>
          <li><a href="login.html">Connexion</a></li>
        `}
      </ul>
    `;
  
    document.body.prepend(nav);
  });
  
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
  