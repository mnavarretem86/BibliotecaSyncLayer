import http from "./httpClient";

export const login = (email, password) => {
  return http.post("/Auth/login", {
    email,
    password,
  });
};