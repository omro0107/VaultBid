/**
 * Displays the user profile information on the page.
 *
 * This function takes user data, validates it, and renders the user's avatar,
 * name, bio, and statistics in the user profile container.
 *
 * @param {Object} userData - The user data object containing profile information.
 * @param {string} userData.avatar.url - The URL of the user's avatar image.
 * @param {Object} userData._count - An object containing counts related to the user.
 * @param {number} userData._count.listings - The number of listings created by the user.
 * @param {number} userData._count.wins - The number of wins the user has.
 * @param {string} userData.name - The name of the user.
 * @param {string} [userData.bio] - The bio of the user (optional).
 *
 * @returns {void} This function does not return a value.
 */
export function displayUser (userData) {
  const userProfileContainer = document.getElementById("userProfile");

  try {    
      if (!userData || !userData.avatar || !userData._count) {
          console.error("User  data is incomplete:", userData);
          return;
      }

      userProfileContainer.innerHTML = '';

      const profileContainer = document.createElement("div");
      profileContainer.className = "flex flex-wrap bg-white p-6 rounded-lg shadow-sm mb-8";

      const avatarImg = createAvatar(userData.avatar.url);
      const userInfoContainer = createUserInfo(userData);

      profileContainer.appendChild(avatarImg);
      profileContainer.appendChild(userInfoContainer);

      userProfileContainer.appendChild(profileContainer);
  } catch (error) {
      handleError(error);
  }
}

/**
 * Creates an avatar image element for the user profile.
 * @param {string} avatarUrl - The URL of the user's avatar image.
 * @returns {HTMLImageElement} The created avatar image element.
 */
function createAvatar(avatarUrl) {
  const avatarImg = document.createElement("img");
  avatarImg.src = avatarUrl;
  avatarImg.alt = "User Avatar";
  avatarImg.className = "w-32 h-32 rounded-full object-cover flex-shrink-0 mr-4";
  return avatarImg;
}

/**
 * Creates the user information container with name, bio, and stats.
 * @param {Object} userData - The user data object.
 * @param {string} userData.name - The user's name.
 * @param {string} [userData.bio] - The user's bio (optional).
 * @param {Object} userData._count - User statistics.
 * @param {number} userData.credits - User's credits.
 * @returns {HTMLDivElement} The created user info container element.
 */
function createUserInfo(userData) {
  const userInfoContainer = document.createElement("div");
  userInfoContainer.className = "flex flex-col flex-grow";

  const userName = createUserName(userData.name);
  const userBio = createUserBio(userData.bio);
  const userStats = createUserStats(userData);

  userInfoContainer.appendChild(userName);
  userInfoContainer.appendChild(userBio);
  userInfoContainer.appendChild(userStats);

  return userInfoContainer;
}

/**
 * Creates the user name heading element.
 * @param {string} name - The user's name.
 * @returns {HTMLHeadingElement} The created user name heading element.
 */
function createUserName(name) {
  const userName = document.createElement("h2");
  userName.className = "text-xl font-semibold mb-2";
  userName.textContent = name;
  return userName;
}

/**
 * Creates the user bio paragraph element.
 * @param {string} [bio] - The user's bio (optional).
 * @returns {HTMLParagraphElement} The created user bio paragraph element.
 */
function createUserBio(bio) {
  const userBio = document.createElement("p");
  userBio.className = "text-gray-600 mb-4";
  userBio.textContent = bio || "No bio available";
  return userBio;
}

/**
 * Creates the user statistics container with credits, listings, and wins.
 * @param {Object} userData - The user data object.
 * @param {number} [userData.credits] - The user's credits.
 * @param {Object} userData._count - User statistics counts.
 * @param {number} userData._count.listings - Number of listings.
 * @param {number} userData._count.wins - Number of wins.
 * @returns {HTMLDivElement} The created user stats container element.
 */
function createUserStats(userData) {
  const userStats = document.createElement("div");
  userStats.className = "flex flex-col space-y-1";

  const creditsP = document.createElement("p");
  creditsP.className = "text-sm";
  creditsP.textContent = `Credits: ${userData.credits || 0}`;

  const listingsP = document.createElement("p");
  listingsP.className = "text-sm";
  listingsP.textContent = `Listings: ${userData._count.listings || 0}`;

  const winsP = document.createElement("p");
  winsP.className = "text-sm";
  winsP.textContent = `Wins: ${userData._count.wins || 0}`;

  userStats.appendChild(creditsP);
  userStats.appendChild(listingsP);
  userStats.appendChild(winsP);

  return userStats;
}

/**
 * Handles errors that occur during user profile display.
 * @param {Error} error - The error object.
 * @returns {void}
 */
function handleError(error) {
  console.error("Error displaying user data:", error);
  alert('An error occurred. Please try again.');
}
