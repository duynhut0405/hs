function formatVND(n) {
  if (!n) return '0';
  n = Math.ceil(n);
  if (n < 0) {
    let newNumber = Math.abs(n);
    return '-' + newNumber.toFixed(0).replace(/./g, function(c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
  });
  }
  return n.toFixed(0).replace(/./g, function(c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
  });
}

export default formatVND

