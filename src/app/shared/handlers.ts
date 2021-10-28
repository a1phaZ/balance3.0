// eslint-disable-next-line max-len
export const compareDate = (d1, d2) => {
  const _d1 = new Date(d1);
  const _d2 = new Date(d2);
  return _d1.getDate() === _d2.getDate() && _d1.getMonth() === _d2.getMonth() && _d1.getFullYear() === _d2.getFullYear();
};

export const formatBalance = (locale, currency, value) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);

export const getOptionsList =
  (array) =>
    array.map(
      ({id, title, balance}) => ({id, title: `${title} [${formatBalance('ru-RU', 'RUB', balance)}]`})
    );
