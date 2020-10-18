export default function sortById(objA: { id: number }, objB: { id: number }) {
  return objA.id - objB.id;
}
