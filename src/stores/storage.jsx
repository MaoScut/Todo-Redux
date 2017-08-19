const STORAGE_KEY = 'TODO_REDUX';
//   const dat = [{
//   id: '123',
//   content: 'contetn',
//   checked: false,
// },{
//   id: '444',
//   content: 'conttt',
//   checked: false,
// }];
// localStorage.setItem('TODO_REDUX', JSON.stringify(dat));
export function getItemArray() {
  return new Promise((resolve, reject) => {
    const itemArray = JSON.parse(localStorage.getItem(STORAGE_KEY));
    setTimeout(() => {
      resolve(itemArray);
    }, 200);
  });
}
export function setItemArray(itemArray) {
  return new Promise((resolve, reject) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemArray));
    setTimeout(() => {
      getItemArray().then(results => resolve(results));
    }, 300);
  });
}
// function addItem(item, cb) {
//   getItemArray().then(itemArray => {
//     setItemArray(itemArray.concat(item)).then(itemArray => cb(itemArray));
//   })
// }
