export const listData = [...(new Array(30)).keys()].map((_,i)=>({
  title: i.toString(),
  id: _.toString(),
  done: _%2===0
}));