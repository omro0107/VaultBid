export function displayUser () {
  const userProfileContainer = document.getElementById("userProfile");

  try {
    const storedUserData = localStorage.getItem("myUserData");

    if (!storedUserData) {
      console.error("No user data found in localStorage");
      return;
    }

    const userData = JSON.parse(storedUserData).data;

    if (!userData || !userData.avatar || !userData._count) {
      console.error("User data is incomplete:", userData);
      return;
    }

    userProfileContainer.innerHTML = '';

    const avatarImg = document.createElement("img");
    avatarImg.src = userData.avatar.url;

    const userName = document.createElement("h2");
    userName.textContent = userData.name;

    const userBio = document.createElement("p");
    userBio.textContent = userData.bio || "No bio available";

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

    userProfileContainer.appendChild(avatarImg);
    userProfileContainer.appendChild(userName);
    userProfileContainer.appendChild(userBio);
    userProfileContainer.appendChild(userStats);
  } catch (error) {
    console.error("Error displaying user data:", error);
  }
}