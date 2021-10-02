export default function isEmptyString(query) {
  const temporaryString = query.split(' ');
  return temporaryString.every(symbol => symbol === '');
}
