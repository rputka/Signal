import Parse, { assertParseConfigured, isParseConfigured } from "../config/parse";

// Parse requires a username, so the email is stored as both.
export const register = (email, password) => {
  assertParseConfigured();

  const user = new Parse.User();
  user.set("username", email);
  user.set("email", email);
  user.set("password", password);
  return user.signUp();
};

export const login = (email, password) => {
  assertParseConfigured();

  return Parse.User.logIn(email, password);
};

export const logout = () => Parse.User.logOut();

// Parse keeps the current user in localStorage, so this survives a refresh.
export const getCurrentUser = () =>
  isParseConfigured ? Parse.User.current() : null;
