export const useGetUserInfo = () => {
  const { userID, name, profilePhoto, isAuth } =
    JSON.parse(localStorage.getItem('auth')) || {};

  return { name, profilePhoto, userID, isAuth };
};
