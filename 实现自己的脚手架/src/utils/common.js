export let betterRequire = (absPath)=>{
    let module = require(absPath);
    if(module.default){
        return module.default;
    }
    return module;
}