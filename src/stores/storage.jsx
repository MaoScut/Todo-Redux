import uuid from 'uuid';

const STORAGE_KEY = 'TODO_REDUX';
const errorP = 0.2;
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
  const itemArray = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(itemArray || []);
    }, 500);
  });
}
export function setItemArray(itemArray) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itemArray));
  return getItemArray();
}
export function addOrUpdateItem(item) {
  // 这里返回的是一个promise对象，所以不是阻塞的
  // item有id，说明是更新
  if (item.id) {
    return getItemArray().then((result) => {
      const index = result.findIndex(v => v.id === item.id);
      const newResult = result.slice();
      newResult[index].content = item.content;
      if (Math.random() < errorP) throw Error('hhh');
      return setItemArray(newResult);
    });
  }
  // 否则在末尾追加
  return getItemArray().then(result => setItemArray(result.concat({
    id: uuid.v4(),
    content: item.content,
    checked: false,
  })));
}
export function deleteItem(id) {
  return getItemArray().then((result) => {
    const index = result.findIndex(v => v.id === id);
    const newResult = result.slice();
    newResult.splice(index, 1);
    if (Math.random() < errorP) throw Error('hhh');
    return setItemArray(newResult);
  });
}
export function toggleChecked(id) {
  return getItemArray().then((result) => {
    const index = result.findIndex(v => v.id === id);
    const newResult = result.slice();
    newResult[index].checked = !newResult[index].checked;
    if (Math.random() < errorP) throw Error('hhh');
    return setItemArray(newResult);
  });
}
// function addItem(item, cb) {
//   getItemArray().then(itemArray => {
//     setItemArray(itemArray.concat(item)).then(itemArray => cb(itemArray));
//   })
// }
export function getDonePercent() {
  return getItemArray().then((result) => {
    const doneNum = result.filter(v => v.checked).length;
    return String(doneNum).concat('/', result.length);
  });
}
