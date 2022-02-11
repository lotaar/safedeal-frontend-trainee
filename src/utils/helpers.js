export const dateFormatter = (timestamp) => {
    let formatedData = new Date(timestamp).toLocaleDateString("ru-RU");
    return formatedData;
  };