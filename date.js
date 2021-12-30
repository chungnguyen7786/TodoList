module.exports.getDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };
  return today.toLocaleString("en-Us", options);
};

module.exports.getDay = () => {
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleString("en-Us", options);
};
