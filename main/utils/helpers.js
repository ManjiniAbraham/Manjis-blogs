const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

module.exports = {
    format_date: (date) => {
      // Format date according to day (long form), month & date (long form), year(number)
      return date.toLocaleDateString("en-US", options);
    },
    format_amount: (amount) => {
      return parseInt(amount).toLocaleString();
    },
  };
  