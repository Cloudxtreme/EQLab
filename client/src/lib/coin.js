export function convertPrice(totalPrice) {
  let p, g, s, c, temp;
  p = Math.floor(totalPrice / 1000);
  temp = (totalPrice % 1000);
  g = Math.floor(temp / 100);
  temp = (temp % 100);
  s = Math.floor(temp / 10);
  temp = (temp % 10);
  c = temp;

  return {
    platinum: p,
    gold: g,
    silver: s,
    copper: c
  }
}