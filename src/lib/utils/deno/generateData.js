/// <reference types="./deno.d.ts" />
import {
  walkSync,
  expandGlobSync,
} from "https://deno.land/std@0.141.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.141.0/path/mod.ts";

let imports = "// This is a generated file\n";
let names = [];

// walkSync("../../assets/Ultimate Stylized Nature - May 2022")
// for (const entry of walkSync("../../assets")) {
//   console.log(entry.path);
//   console.log(entry);
//   break
// }

for (const entry of expandGlobSync("../../assets/**/*.gltf")) {
  // const file = path.posix.parse(entry.path)
  const file = path.parse(entry.path);
  const name = `${file.name}`;
  names.push(name);
  const p = `../assets${file.dir.split("assets")[1].replaceAll("\\", "/")}/${
    file.base
  }`;
  const importString = `import ${file.name} from '${p}?url'\n`;
  imports += importString;
}

for (const entry of expandGlobSync("../../assets/**/*.png")) {
  // console.log(entry.path);
  const file = path.parse(entry.path);
  const name = `${file.name}`;
  names.push(name);
  const p = `../assets${file.dir.split("assets")[1].replaceAll("\\", "/")}/${
    file.base
  }`;
  const importString = `import ${file.name} from '${p}?url'\n`;
  imports += importString;
}

imports += `\nexport {\n`;
names.forEach((name) => {
  imports += `\t${name},\n`;
});
imports += `}\n`;

Deno.writeTextFileSync("../../data/mod.js", imports);
