const STORAGE_KEY = 'TODO_REDUX';
//   const data = [{
//   key: '123',
//   content: 'contetn',
//   checked: 'false',
// },{
//   key: '444',
//   content: 'conttt',
//   checked: false,
// }];
// localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
function getItemArray() {
  return new Promise((resolve, reject) => {
    const itemArray = JSON.parse(localStorage.getItem(STORAGE_KEY));
    setTimeout(() => {
      resolve(itemArray);
    }, 200)
  })
}
function setItemArray(itemArray) {
  return new Promise((resolve, reject) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemArray));
    setTimeout(() => {
      getItemArray().then(itemArray => resolve(itemArray));
    }, 300)
  })
}
function addItem(item, cb) {
  getItemArray().then(itemArray => {
    setItemArray(itemArray.concat(item)).then(itemArray => cb(itemArray));
  })
}