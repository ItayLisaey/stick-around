export const getBackendURL = () => {
  const url = process.env.SERVER_LOCATION;
  if (url) {
    return url.toString();
  } else {
    return null;
  }
};
