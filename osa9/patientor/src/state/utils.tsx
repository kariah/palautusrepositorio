
export const isDate = (date: string): boolean => {
    console.log('date ', Date.parse(date));
    if (date.length < 12)
    {
        return false;   
    }
    return Boolean(Date.parse(date));
};
  