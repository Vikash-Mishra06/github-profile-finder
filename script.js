let searchBtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not Found");
    return raw.json();
  });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) throw new Error("Repo not Found");
    return raw.json();
  });
}

function decorateProfileData(details) {
  let data = `
    <div class="flex flex-col md:flex-row gap-6 items-center">
      <img src="${
        details.avatar_url
      }" alt="User Avatar" class="w-32 h-32 rounded-full shadow-lg"/>

      <!-- User Info -->
      <div class="flex-1 space-y-3">
        <h2 class="text-2xl font-bold text-gray-900">${
          details.name || details.login
        }</h2>
        <p class="text-gray-600">${details.bio || "No bio available"}</p>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 text-center mt-4">
          <div class="bg-white rounded-xl shadow p-4 hover:shadow-xl transition-shadow">
            <p class="text-xl font-bold text-gray-900">${
              details.public_repos
            }</p>
            <p class="text-sm text-gray-500">Repos</p>
          </div>
          <div class="bg-white rounded-xl shadow p-4 hover:shadow-xl transition-shadow">
            <p class="text-xl font-bold text-gray-900">${details.followers}</p>
            <p class="text-sm text-gray-500">Followers</p>
          </div>
          <div class="bg-white rounded-xl shadow p-4 hover:shadow-xl transition-shadow">
            <p class="text-xl font-bold text-gray-900">${details.following}</p>
            <p class="text-sm text-gray-500">Following</p>
          </div>
        </div>
      </div>
    </div>
  `;
  card.innerHTML = data;
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault(); // ✅ prevent page reload if inside a form
  let username = usernameinp.value.trim();
  if (username.length > 0) {
    getProfileData(username).then((data) => {
      decorateProfileData(data);
    });
  } else {
    alert("Please enter a username"); // ✅ fixed empty alert
  }
});
