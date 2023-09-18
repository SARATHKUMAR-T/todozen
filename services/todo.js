import axios from "axios";

export async function getTodo() {
  const token = localStorage.getItem("token");
  const data = axios
    .get("https://todozen-backend.vercel.app/api/gettodo", {
      headers: {
        "x-auth-token": token,
      },
    })
    .catch(error => {
      throw error;
    });

  return data;
}
