// 本地存储模块
export const getItem = key => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};
// 在localStorage设置item
export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    window.localStorage.setItem(key, value);
  }
};
export const removeItem = key => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    return null;
  }
};
