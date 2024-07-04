const differentNumbers = {
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
};

export const getDateDifferent = (date1: Date, date2: Date, differentValue: keyof typeof differentNumbers) => {
    const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
    return Math.round(differenceInMilliseconds / differentNumbers[differentValue]);
};
