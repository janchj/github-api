const sortArrayByKeyDesc = (arr, key) =>
  arr.sort((a, b) => {
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  });

const sortArrayByKeyAsc = (arr, key) =>
  arr.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });

const sliceArrayByCount = (arr, count) => arr.slice(0, count);

module.exports = {
  sortArrayByKeyAsc,
  sortArrayByKeyDesc,
  sliceArrayByCount
};
