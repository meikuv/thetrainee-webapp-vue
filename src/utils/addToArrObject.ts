export const addKeyAndValue = (arr: any, key: string, value: any, id: number) => {
  let obj: any = arr[arr.findIndex((x: { id: number; }) => x.id === id)];
  obj[key] = value;

  return arr;
}