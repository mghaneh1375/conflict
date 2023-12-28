export const removeAuthCache = async () => {
  let secToken = await getToken("token_sec");
  if (secToken !== undefined) {
    let secUser = await getUser("user_sec");
    if (secUser !== undefined) {
      await setCacheItem("token", secToken);
      await setCacheItem("user", secUser);
      await setCacheItem("token_sec", undefined);
      await setCacheItem("user_sec", undefined);
      return;
    }
  }

  await setCacheItem("token", undefined);
  await setCacheItem("user", undefined);
};

export const setCacheItem = async (key, val) => {
  try {
    localStorage.setItem(key, val);
    // await AsyncStorage.setItem(key, val);
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async (key = "token") => {
  try {
    // const value = await AsyncStorage.getItem(key);
    const value = localStorage.getItem(key);
    if (value !== null && value !== undefined && value != "undefined")
      return value;
  } catch (e) {
    return null;
  }
};

export const getUser = async (key = "user") => {
  try {
    // const value = await AsyncStorage.getItem(key);
    const value = localStorage.getItem(key);
    if (value !== null && value !== undefined && value != "undefined") {
      return JSON.parse(value);
    }
  } catch (e) {
    return null;
  }
};
