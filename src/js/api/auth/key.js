import { API_AUTH_KEY } from "../constants";
import { headers } from "../headers";

export async function getKey() {
  try {
    const response = await fetch(`${API_AUTH_KEY}`, {
      method: "POST",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("apiKey", data.key)
    } else {
      throw new Error("Failed to get key");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
