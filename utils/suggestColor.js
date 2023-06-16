const hexToRgb = (hex) => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const distance = (a, b) => {
  return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
}

const nearestColor = (colorHex, hexList) => {
  var lowest = Number.POSITIVE_INFINITY;
  var tmp;
  let index = 0;
  var distance_list = [];
  hexList.forEach((el, i) => {
    tmp = distance(hexToRgb(colorHex), hexToRgb(el.code))
    distance_list.push({ color: el.code, distance: tmp, id: el.id, label: el.label })
    if (tmp < lowest) {
      lowest = tmp;
      index = i;
    };
  })
  return distance_list;
}

export default function SuggestColor(hexColor, hexList) {
  var list = nearestColor(hexColor, hexList);
  list.sort(function (a, b) { return a.distance - b.distance });
  return list.slice(0, 24);
}