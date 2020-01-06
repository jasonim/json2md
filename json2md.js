var path = require("path"); //系统路径模块
var fs = require("fs"); //文件模块

// var file = path.join(__dirname, 'data.json'); //文件路径，__dirname为当前运行js文件的目录
// const data = fs.readFileSync(file, 'utf-8');

// console.log('data: ', JSON.parse(data).content);

function parseContent(content, num) {
  content.forEach((item, index) => {
    let title = item.title;
    let outputFile = path.join(
      __dirname,
      "dist/" + title.replace(new RegExp(" ", "gm"), "_") + ".md"
    );

    let HEAD = `
title: ${title}
date: ${new Date().toString()}    
categories: baidu
---

`;
    let size = item.size ? item.size : 0;

    let inputData =
      HEAD + "# " + item.title + "\nsize: " + size + "\n " + item.desc + "\n ";

    if (item.dirs) {
      item.dirs.forEach(value => {
        // console.log(" value: ", value);
        inputData = inputData.concat("\n" + value);
      });
    }

    inputData = inputData.concat(
      `\n\n[How to download](https://bpcam.bemobtrk.com/go/2ceec3aa-1ca2-46d6-b9ff-aaa5c184517c?jno=${num +
        index})`
    );
    console.log("count ", num, " index: ", index, " ", num + index);
    fs.writeFile(outputFile, inputData, () => {});
  });

  return num + content.length;
}

module.exports = parseContent;