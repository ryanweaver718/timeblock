const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }))

console.log(getItems(10))
console.log(getItems(5, 10))
