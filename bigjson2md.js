const { chain } = require("stream-chain");

const { parser } = require("stream-json");
const { pick } = require("stream-json/filters/Pick");
const { ignore } = require("stream-json/filters/Ignore");
const { streamValues } = require("stream-json/streamers/StreamValues");
const { streamArray } = require("stream-json/streamers/StreamArray");
const fs = require("fs");
const zlib = require("zlib");
const path = require("path"); 
const parseContent = require("./json2md");

const pipeline = chain([
  fs.createReadStream(path.join(__dirname, "./data.json")),
  //   zlib.createGunzip(),
  parser(),
    // pick({ filter: "data" }),
  //   ignore({ filter: /\b_meta\b/i }),
  streamArray(),
//   data => {
//     const value = data.value;
//     console.log("data: ", value);
//     return data;
//   }
]);

let counter = 0;
let num = 0;
pipeline.on("data", ({key, value}) => {
    if (num < 5000) {
      // console.log("key: ", key, value, counter);
      num = parseContent(value.content, num);
    }
    
    ++counter;
});
pipeline.on("end", () =>
  console.log(`The accounting department has ${counter} employees.`)
);


// const StreamArray = require("stream-json/streamers/StreamArray");
// // const path = require("path");
// // const fs = require("fs");

// const jsonStream = StreamArray.withParser();

// //You'll get json objects here
// //Key is an array-index here
// jsonStream.on("data", ({ key, value }) => {
//   console.log(key, value);
// });

// jsonStream.on("end", () => {
//   console.log("All done");
// });

// const filename = path.join(__dirname, "sample.json");
// fs.createReadStream(filename).pipe(jsonStream.input);