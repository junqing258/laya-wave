#!/usr/bin/env node
const path = require('path');
// const program = require("commander");
const shell = require('shelljs');
const fs = require('fs');
const fse = require('fs-extra');
const child_process = require('child_process');
const os = require('os');
const template = require('art-template');
const { execSync, spawn, exec } = child_process;

// https://www.cnblogs.com/sandal1980/articles/3904623.html
(() => {
  const dir = path.resolve(__dirname, '../laya/fonts');
  console.log('dir', dir);
  const args = [];
  args.push('--sheet ../assets/out.png');
  args.push('--data ../assets/out.json');
  args.push('--format laya');
  args.push('font_white26');

  const str = 'TexturePacker ' + args.join(' ');
  console.log(str);
  execSync(str, { cwd: dir });

  const data = fse.readJsonSync(path.join(dir, '../assets/out.json'));

  // console.log(data);
  const frames = Object.keys(data.frames);
  const outData = {};
  //<char id="48" x="0" y="0" width="13" height="19" xoffset="0" yoffset="0" xadvance="13" page="0" chnl="15" />
  let maxW = 0,
    maxH = 0;
  outData.chars = frames.map(fname => {
    const v = data.frames[fname];
    const id = fname.split('.')[0].charCodeAt();
    const f = v.frame;
    if (maxW < f.w) maxW = f.w;
    if (maxH < f.h) maxH = f.h;
    return `<char id=${id} x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" xoffset="0" yoffset="0" xadvance="13" page="0" chnl="15" />`;
  });

  Object.assign(outData, {
    file: data.meta.image,
    charCount: frames.length,
    maxW,
    maxH,
  });

  fse.removeSync(path.join(dir, '../assets/out.json'));
  const fntTpl = template(__dirname + '/tpl/tpl-fnt.art', outData);
  fs.writeFileSync(path.join(dir, '../assets/out.fnt'), fntTpl);
})();
