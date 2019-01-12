export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(<string>window.localStorage.getItem("gatsbyUser"))
    : {};

const setUser = (user: any) =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

export const handleLogin = ({ username, password }: { username: string, password: string }) => {
  if (username === `john` && password === `pass`) {
    return setUser({
      username: `john`,
      name: `Johnny`,
      email: `johnny@example.org`,
    })
  }

  return false
};

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
};

export const logout = (callback: Function) => {
  setUser({})
  callback()
};