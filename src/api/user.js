export async function getUsers() {
  const mockRecords = [
    { name: 'hoga', age: 27 },
    { name: 'xixi', age: 28 }
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRecords);
    }, 10);
  });
}
