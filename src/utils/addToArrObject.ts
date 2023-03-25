export const addKeyAndValue = (arr: any, key: string, value: any, id: number) => {
  let obj: any = arr[arr.findIndex((x: { id: number; }) => x.id === id)];
  console.log(arr)
  obj[key] = value;
  console.log(obj)
  return arr;
}