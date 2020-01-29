function copyProperties(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
      const desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

export function mix(Mix, ...mixins) {
  for (const mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}

export function uuid() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function deepClone(values) {
  let copy;
  if (null == values || 'object' != typeof values) return values;
  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }
  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }
  if (values instanceof Object) {
    copy = {};
    for (const attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
    }
    return copy;
  }
  throw new Error("Unable to copy values! Its type isn't supported.");
}

export function randomNum(max, min) {
  min = min || 0;
  const tmax = Math.max(max, min),
    tmin = Math.min(max, min);
  return tmin + Math.floor(Math.random() * (tmax - tmin));
}

/**
 * 数字千分位格式化
 */
export function toThousands(num) {
  let result = '',
    counter = 0;
  num = (num || 0).toString();
  for (let i = num.length - 1; i >= 0; i--) {
    counter++;
    result = num.charAt(i) + result;
    if (!(counter % 3) && i != 0) {
      result = ',' + result;
    }
  }
  return result;
}

export function toWans(num, fixed) {
  let result = '';
  fixed = fixed || 2;
  num = Number(num || 0);
  if (num >= 10000) {
    result = num / 10000;
    const _st = result.toString(),
      _mt = Math.pow(10, fixed);
    if (_st.indexOf('.') > -1 && _st.split('.')[1].length > fixed) result = Math.round(_mt * result) / _mt;
    result += '万';
  } else {
    result = String(num);
  }
  return result;
}

export function getCharLength(str) {
  let countLen = 0;
  let strLen = 0;
  strLen = str.length;
  for (let i = 0; i < strLen; i++) {
    const a = str.charAt(i);
    countLen++;
    if (escape(a).length > 4) {
      countLen++;
    }
  }
  return countLen;
}

export function ellipsis(str, len) {
  let countLen = 0;
  let strLen = 0;
  let strCut = new String();
  strLen = str.length;
  for (let i = 0; i < strLen; i++) {
    const a = str.charAt(i);
    countLen++;
    if (escape(a).length > 4) {
      countLen++;
    }
    strCut = strCut.concat(a);
    if (countLen > len) {
      strCut = strCut.concat('...');
      return strCut;
    }
  }
  if (countLen <= len) {
    return str;
  }
}

export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return window.unescape(r[2]);
  }
  return null;
}

const methodToColorMap = {
  debug: `#7f8c8d`, // Gray
  log: `#2ecc71`, // Green
  warn: `#f39c12`, // Yellow
  error: `#c0392b`, // Red
};

export const logger = (name = 'app') => {
  const _log = {};
  Object.keys(methodToColorMap).forEach(method => {
    const styles = [
      `background: ${methodToColorMap[method]}`,
      `border-radius: 0.25em`,
      `color: white`,
      `font-weight: bold`,
      `padding: 2px 0.5em`,
    ];
    _log[method] = console[method].bind(console, `%c[${name}]`, styles.join(';'));
  });
  return _log;
};

export function grayFilter(n) {
  n = n || 0;
  const grayMat = [
    0.3086 * (1 - n) + n,
    0.6094 * (1 - n),
    0.082 * (1 - n),
    0,
    0,
    0.3086 * (1 - n),
    0.6094 * (1 - n) + n,
    0.082 * (1 - n),
    0,
    0,
    0.3086 * (1 - n),
    0.6094 * (1 - n),
    0.082 * (1 - n) + n,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ];
  return new Laya.ColorFilter(grayMat);
}

export function lightFilter(n) {
  n = n || 0;
  const lightMat = [n, 0, 0, 0, 0, 0, n, 0, 0, 0, 0, 0, n, 0, 0, 0, 0, 0, 1, 0];
  return new Laya.ColorFilter(lightMat);
}

/**
 * @public
 * 创建骨骼动画
 * @param {String} path 骨骼动画路径
 * @param {Number} rate 骨骼动画帧率，引擎默认为30，一般传24
 * @param {Number} type 动画类型 0,使用模板缓冲的数据，模板缓冲的数据，不允许修改	（内存开销小，计算开销小，不支持换装） 1,使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存 （内存开销大，计算开销小，支持换装） 2,使用动态方式，去实时去画	（内存开销小，计算开销大，支持换装,不建议使用）
 * @return Skeleton骨骼动画
 */
const paths = [];
const temps = [];
export function createSkeleton(path, rate, type) {
  rate = rate || 24;
  type = type || 0;
  const png = Laya.loader.getRes(path + '.png');
  const sk = Laya.loader.getRes(path + '.sk');
  if (!png || !sk) {
    console.error('资源没有预加载:' + path);
    return null;
  }
  const index = paths.indexOf(path);
  let templet;
  if (index === -1) {
    templet = new Laya.Templet();
    const len = paths.length;
    paths[len] = path;
    temps[len] = templet;
    templet.parseData(png, sk, rate);
  } else {
    templet = temps[index];
  }
  return new Laya.Skeleton(templet, type);
}

// export function registeFnt(fontRes) {
//     for (let i = 0; i < fontRes.length; i++) {
//         let bitmapFont = new Laya.BitmapFont();
//         bitmapFont.loadFont(fontRes[i].url);
//         Laya.Text.registerBitmapFont(fontRes[i].name, bitmapFont);
//     }
// }
