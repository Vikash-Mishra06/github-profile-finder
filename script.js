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
  console.log(details);
  let data = `<img src="${details.avatar_url}" alt="User Avatar" class="w-32 h-32 rounded-full bg-gray-300 "/>

          <!-- User Info -->
          <div class="flex-1 space-y-3 ">
            <h2 class="text-2xl font-semibold text-gray-800">${details.name}</h2>
            <p class="text-gray-600">${details.bio}</p>


            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="bg-white shadow rounded-lg p-3">
                <p class="text-lg font-bold text-gray-800">${details.public_repos}</p>
                <p class="text-sm text-gray-500">Repos</p>
              </div>
              <div class="bg-white shadow rounded-lg p-3">
                <p class="text-lg font-bold text-gray-800">${details.followers}</p>
                <p class="text-sm text-gray-500">Followers</p>
              </div>
              <div class="bg-white shadow rounded-lg p-3">
                <p class="text-lg font-bold text-gray-800">${details.following}</p>
                <p class="text-sm text-gray-500">Followings</p>
              </div>
            </div>
          </div>
        </div>`;

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
