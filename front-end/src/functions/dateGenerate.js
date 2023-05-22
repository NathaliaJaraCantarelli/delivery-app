// function getCurrentDateTimeUTC() {
//   const currentDate = new Date();
//   const year = currentDate.getUTCFullYear();
//   const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
//   const day = String(currentDate.getUTCDate()).padStart(2, '0');
//   const hours = String(currentDate.getUTCHours()).padStart(2, '0');
//   const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
//   const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');

//   const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
//   return formattedDate;
// }

// // Exemplo de uso
// export default getCurrentDateTimeUTC;

function convertDateFormat(dateString, digits) {
  const date = new Date(dateString);
  const yearDigits = -digits;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(yearDigits);

  return `${day}/${month}/${year}`;
}
export default convertDateFormat;
