// 命令行的命令拿到后 这个是主的流程控制
import {betterRequire} from './utils/common';
import {resolve} from 'path';
let apply = (action,...args) => {
    // babal-env export default  => module.exports = {default:xxx} 
    betterRequire(resolve(__dirname,`./${action}`))(...args)
}
export default apply;
