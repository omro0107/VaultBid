export default async function router(pathname = window.location.pathname) {
  let pageLoaded = false;
  
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      pageLoaded = true;
      break;
    case "/auth/login/":
      await import("./views/login.js");
      pageLoaded = true;
      break;
    case "/auth/register/":
      await import("./views/register.js");
      pageLoaded = true;
      break;
    case "/auctions/":
      await import("./views/auctions.js");
      pageLoaded = true;
      break;
    case "/auctions/listing/":
      await import("./views/single-listing.js");
      pageLoaded = true;
      break;
    case "/auctions/create/":
      await import("./views/create-listing.js");
      pageLoaded = true;
      break;
    case "/profile/":
      await import("./views/profile.js");
      pageLoaded = true;
      break;
    case "/contact/":
      await import("./views/contact.js");
      pageLoaded = true;
      break;
  }

  if (!pageLoaded) {
      await import("./views/notFound.js");
  }
}