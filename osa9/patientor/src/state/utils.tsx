
export const isDate = (date: string): boolean => {
    // console.log('date ', Date.parse(date));
    let isOk = true;

    if (date.length !== 10)
    { 
       isOk = false;   
    } 
    if (isOk)
    {
        isOk = Boolean(Date.parse(date));
    } 
    return isOk;
};
  