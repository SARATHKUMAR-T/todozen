import axios from "axios";

export async function getTodo() {
  const token = localStorage.getItem("token");
  const data = axios
    .get("http://localhost:9000/api/gettodo", {
      headers: {
        "x-auth-token": token,
      },
    })
    .catch(error => {
      throw error;
    });

  return data;
}
