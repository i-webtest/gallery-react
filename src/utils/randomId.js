export const randomId = () => {
  return Math.random().toString(36).substring(2, 8) + Date.now().toString().substring(9);
};

export const assignId = (obj) => ({ ...obj, id: randomId() });
