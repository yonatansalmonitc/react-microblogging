function formatDate(date: Date, withYear: boolean, relative: boolean): string {
  return (relative) ? getTimePassedString(date) : getFormattedDate(date, withYear);
}

function getFormattedDate(date: Date, withYear: boolean): string {
  try {
    const options: Intl.DateTimeFormatOptions = { dateStyle: "medium", timeStyle: "short" };
    let formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(date);
    let nth: string = 'th';
    let monthDayForNth: string = date.getDate().toString();
    const isTeen: boolean = ((monthDayForNth.length > 1) && (monthDayForNth[0] === '1')) ? true : false;
    monthDayForNth = (monthDayForNth.length > 1) ? monthDayForNth[1] : monthDayForNth;
  
    if (!isTeen) {
      switch (monthDayForNth) {
        case '1':
          nth = 'st';
          break;
        case '2':
          nth = 'nd';
          break;
        case '3':
          nth = 'rd';
          break;
        default:
          nth = 'th';
      }
    }
  
    formattedDate = (withYear) ? formattedDate.replace(',', nth).replace(/[,]/gm, '\n') : formattedDate.replace(/[,](.){5}[,]/gm, nth);
    return formattedDate;

  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
}

function getTimePassedString(date: Date): string {
  try {
    const timePassedNumber: number = Date.now() - date.getTime();
    let timePassedString: string;
  
    if (timePassedNumber < 60 * 1000) timePassedString = 'just now';
    else if (timePassedNumber < 60 * 1000 * 5) timePassedString = 'less than 5 mins ago';
    else if (timePassedNumber < 60 * 1000 * 30) timePassedString = 'in the last 30 mins';
    else if (timePassedNumber < 60 * 1000 * 60) timePassedString = 'less than 1 hr ago';
    else if (timePassedNumber < 60 * 1000 * 60 * 24) timePassedString = `${Math.floor(timePassedNumber / (1000 * 60 * 60))} hrs ago`;
    else if (timePassedNumber < 60 * 1000 * 60 * 24 * 7) timePassedString = `${Math.floor(timePassedNumber / (1000 * 60 * 60 * 24))} d's ago`;
    else if (timePassedNumber < 60 * 1000 * 60 * 24 * 30) timePassedString = `${Math.floor(timePassedNumber / (1000 * 60 * 60 * 24 * 7))} wk's ago`;
    else if (timePassedNumber < 60 * 1000 * 60 * 24 * 365) timePassedString = `${Math.floor(timePassedNumber / (1000 * 60 * 60 * 24 * 30))} mo's ago`;
    else timePassedString = `${Math.floor(timePassedNumber / (1000 * 60 * 60 * 24 * 365))} yr's ago`;
    
    return timePassedString;
  
  } catch (error: any) {
    console.error(error.message);
    return error.message;
  }
}

export default formatDate;