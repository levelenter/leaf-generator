// import { Uri, URIs } from './common/URIs';
import { loadBizClass } from "./loadBizClass";
import { generateClientProxy } from "./generateClientProxy";
import {
  generateRestAPI,
  ignoreTokenFileCreate,
} from "./generateExpressRouter";
import { checkDecorater } from "./checkDecorater";
import { config }  from "../config/config"
import { copyFileSync } from "fs-extra";
import { createIfNotExist } from './util';

const clientPath = config.output_dir + "/biz/remote";
const expressRouteGeneratePath = config.output_dir + "/web/generatedRest.ts";
const ignoreTokenFilePath = config.output_dir + "/web/ignoreTokenUriList.ts";

console.log("-------------------------");
console.log("- ロード開始             ");
console.log("-------------------------");
const classes = loadBizClass();

console.log("-------------------------");
console.log("- クライアントサイド生成 ");
console.log("-------------------------");
// クライアントサイド生成
generateClientProxy(classes, clientPath);
console.log("クライアントサイド生成 done");

console.log("-------------------------");
console.log("- サーバーサイド生成     ");
console.log("-------------------------");
// サーバーサイド生成
createIfNotExist("./dist/web")
generateRestAPI(classes, expressRouteGeneratePath);
ignoreTokenFileCreate(classes, ignoreTokenFilePath);
console.log("サーバーサイド生成 done");

console.log("-------------------------");
console.log("- フレームワークコードコピー");
console.log("-------------------------");
copyFileSync("./src/lib/Response.ts","./dist/biz/Response.ts")
copyFileSync("./src/lib/ErrorResult.ts","./dist/biz/ErrorResult.ts")

copyFileSync("./src/lib/MaybeError.ts","./dist/biz/MaybeError.ts")
copyFileSync("./src/lib/MessageDialog.ts","./dist/biz/MessageDialog.ts")
copyFileSync("./src/lib/ErrorType.ts","./dist/biz/ErrorType.ts")

copyFileSync("./src/lib/GeneratedBizBase.ts","./dist/biz/GeneratedBizBase.ts")
copyFileSync("./src/lib/web_handler.ts","./dist/biz/web_handler.ts")
copyFileSync("./src/lib/tokenHandler.ts","./dist/biz/tokenHandler.ts")

copyFileSync("./src/lib/ErrorType.ts","./dist/biz/ErrorType.ts")
copyFileSync("./src/lib/Session.ts","./dist/biz/Session.ts")
copyFileSync("./src/lib/ErrorHandler.ts","./dist/biz/ErrorHandler.ts")


console.log("-------------------------");
console.log("- 整合性チェック         ");
console.log("-------------------------");
checkDecorater(classes);
console.log("done");
