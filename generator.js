const generator = require("otsimo-game-generator");
const utils = require("otsimo-game-generator/dist/utils/");
const child_process = require("child_process");
const path = require("path");
function execPromise(command) {
  return new Promise((resolve, reject) => {
    const cmd = child_process.execFile("sh", ["-c", command]);
    cmd.stdout.pipe(process.stdout);
    cmd.stderr.pipe(process.stderr);
    cmd.on("exit", (code, signal) => {
      console.log("child process exited with", code, "and", signal);
      if (code == 0) {
        resolve(code);
      } else {
        reject("failed to build");
      }
    });
  });
}
var gopts = [
  {
    id: "gridsize",
    type: "string",
    default: "grid-6x4",
    enum: [
      "grid-3x2",
      "grid-3x3",
      "grid-4x3",
      "grid-5x3",
      "grid-5x4",
      "grid-6x4",
      "grid-6x5",
      "grid-8x5",
      "grid-10x7",
      "grid-11x9",
    ],
  },
];

function optionAnnotations(lang) {
  if (lang === "tr") {
    return {
      "settings/gridsize/title": "Resim Izgarası Boyutu",
      "settings/gridsize/description": "Resim panelinin ızgara boyutu",
      "settings/gridsize/keys/grid-3x2/title": "3x2 Boyutu",
      "settings/gridsize/keys/grid-3x2/description": "3x2 Boyutu",
      "settings/gridsize/keys/grid-3x3/title": "3x3 Boyutu",
      "settings/gridsize/keys/grid-3x3/description": "3x3 Boyutu",
      "settings/gridsize/keys/grid-4x3/title": "4x3 Boyutu",
      "settings/gridsize/keys/grid-4x3/description": "4x3 Boyutu",
      "settings/gridsize/keys/grid-5x3/title": "5x3 Boyutu",
      "settings/gridsize/keys/grid-5x3/description": "5x3 Boyutu",
      "settings/gridsize/keys/grid-5x4/title": "5x4 Boyutu",
      "settings/gridsize/keys/grid-5x4/description": "5x4 Boyutu",
      "settings/gridsize/keys/grid-6x4/title": "6x4 Boyutu",
      "settings/gridsize/keys/grid-6x4/description": "6x4 Boyutu",
      "settings/gridsize/keys/grid-6x5/title": "6x5 Boyutu",
      "settings/gridsize/keys/grid-6x5/description": "6x5 Boyutu",
      "settings/gridsize/keys/grid-8x5/title": "8x5 Boyutu",
      "settings/gridsize/keys/grid-8x5/description": "8x5 Boyutu",
      "settings/gridsize/keys/grid-10x7/title": "10x7 Boyutu",
      "settings/gridsize/keys/grid-10x7/description": "10x7 Boyutu",
      "settings/gridsize/keys/grid-11x9/title": "11x9 Boyutu",
      "settings/gridsize/keys/grid-11x9/description": "11x9 Boyutu",
    };
  }
  return {
    "settings/gridsize/title": "Picture Grid Size",
    "settings/gridsize/description": "The grid size of the picture panel",
    "settings/gridsize/keys/grid-3x2/title": "3x2 Size",
    "settings/gridsize/keys/grid-3x2/description": "3x2 Size",
    "settings/gridsize/keys/grid-3x3/title": "3x3 Size",
    "settings/gridsize/keys/grid-3x3/description": "3x3 Size",
    "settings/gridsize/keys/grid-4x3/title": "4x3 Size",
    "settings/gridsize/keys/grid-4x3/description": "4x3 Size",
    "settings/gridsize/keys/grid-5x3/title": "5x3 Size",
    "settings/gridsize/keys/grid-5x3/description": "5x3 Size",
    "settings/gridsize/keys/grid-5x4/title": "5x4 Size",
    "settings/gridsize/keys/grid-5x4/description": "5x4 Size",
    "settings/gridsize/keys/grid-6x4/title": "6x4 Size",
    "settings/gridsize/keys/grid-6x4/description": "6x4 Size",
    "settings/gridsize/keys/grid-6x5/title": "6x5 Size",
    "settings/gridsize/keys/grid-6x5/description": "6x5 Size",
    "settings/gridsize/keys/grid-8x5/title": "8x5 Size",
    "settings/gridsize/keys/grid-8x5/description": "8x5 Size",
    "settings/gridsize/keys/grid-10x7/title": "10x7 Size",
    "settings/gridsize/keys/grid-10x7/description": "10x7 Size",
    "settings/gridsize/keys/grid-11x9/title": "11x9 Size",
    "settings/gridsize/keys/grid-11x9/description": "11x9 Size",
  };
}

var opts = {
  outputDir: "dist",
  gameOptions: gopts,
  annotations: optionAnnotations,
};

const symbolLocation = path.join(__dirname, "app", "symbols");
const getTr = process.env["AAC_TR_REPO"];
const getEn = process.env["AAC_EN_REPO"];

const command = `
cd ${symbolLocation}
if [ ! -d "aac-tr" ]; then
git clone ${getTr}
fi
if [ ! -d "aac-en" ]; then
git clone ${getEn}
fi
`;

console.log("build command", command);
execPromise(command)
  .then(() => {
    generator(opts);
  })
  .catch(err => {
    console.error(err);
    process.exit(2);
  });
