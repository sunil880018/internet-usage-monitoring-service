const GenerateFutureDate = () => {
  const date = new Date();

  // Extract the day, month, and year from the Date object
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Use template literals to build the DDMMYYYY string
  const futureDateString = `${day}${month}${year}`;
  return futureDateString;
};

export { GenerateFutureDate };
