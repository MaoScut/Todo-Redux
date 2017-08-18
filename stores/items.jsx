const STORAGE_KEY = 'TODO_REDUX';
// 数据结构
// [{
//   key: '123',
//   content: 'contetn',
//   checked: 'false',
// },{
//   key: '444',
//   content: 'conttt',
//   checked: false,
// }]
// let storage = localStorage.getItem(STORAGE_KEY);
function getItemArray() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const itemArr = localStorage.getItem(STORAGE_KEY);
      resolve(JSON.parse(itemArr));
    }, 200)
  })
}
getItemArray().then(itemArr => console.log(itemArr)).catch(() => console.log('error!'));