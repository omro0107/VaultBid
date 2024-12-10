export function displayUser (userData) {
  const userProfileContainer = document.getElementById("userProfile");

  try {
      if (!userData || !userData.avatar || !userData._count) {
          console.error("User  data is incomplete:", userData);
          return;
      }

      userProfileContainer.innerHTML = '';

      const avatarImg = createAvatar(userData.avatar.url);
      const userName = createUserName(userData.name);
      const userBio = createUserBio(userData.bio);
      const userStats = createUserStats(userData);

      userProfileContainer.appendChild(avatarImg);
      userProfileContainer.appendChild(userName);
      userProfileContainer.appendChild(userBio);
      userProfileContainer.appendChild(userStats);
  } catch (error) {
      handleError(error);
  }
}

function createAvatar(avatarUrl) {
  const avatarImg = document.createElement("img");
  avatarImg.src = avatarUrl;
  return avatarImg;
}

function createUserName(name) {
  const userName = document.createElement("h2");
  userName.textContent = name;
  return userName;
}

function createUserBio(bio) {
  const userBio = document.createElement("p");
  userBio.textContent = bio || "No bio available";
  return userBio;
}

function createUserStats(userData) {
  const userStats = document.createElement("div");

  const creditsP = document.createElement("p");
  creditsP.textContent = `Credits: ${userData.credits || 0}`;

  const listingsP = document.createElement("p");
  listingsP.textContent = `Listings: ${userData._count.listings || 0}`;

  const winsP = document.createElement("p");
  winsP.textContent = `Wins: ${userData._count.wins || 0}`;

  userStats.appendChild(creditsP);
  userStats.appendChild(listingsP);
  userStats.appendChild(winsP);

  return userStats;
}

function handleError(error) {
  console.error("Error displaying user data:", error);
  alert('An error occurred. Please try again.');
}