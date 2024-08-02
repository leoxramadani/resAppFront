const formatDate = (datetimeString) => {
  const date = new Date(datetimeString);

  const padZero = (num) => (num < 10 ? "0" : "") + num;

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  // const year = date.getFullYear();

  let muaji = "";
  switch (month) {
    case "01":
      muaji = "Janar";
      break;
    case "02":
      muaji = "Shkurt";
      break;
    case "03":
      muaji = "Mars";
      break;
    case "04":
      muaji = "Prill";
      break;
    case "05":
      muaji = "Maj";
      break;
    case "06":
      muaji = "Qershor";
      break;
    case "07":
      muaji = "Korrik";
      break;
    case "08":
      muaji = "Gusht";
      break;
    case "09":
      muaji = "Shtator";
      break;
    case "10":
      muaji = "Tetor";
      break;
    case "11":
      muaji = "Nentor";
      break;
    case "12":
      muaji = "Dhjetor";
      break;
    default:
      muaji = "Invalid Month";
  }

  return `${hours}:${minutes}:${seconds} ${day} ${muaji}`;
};

export default formatDate;
