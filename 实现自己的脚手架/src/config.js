// 专门管理.zfclirc文件(当前的用户目录下)

// zf-cli config set key value
import { get, set, getAll, remove } from './utils/rc';
let config = async (action, k, v) => {
    switch (action) {
        case 'get':
            if (k) {
                let key = await get(k);
                console.log(key);
            } else {
                let obj = await getAll();
                Object.keys(obj).forEach(key=>{
                    console.log(`${key}=${obj[key]}`);
                })
            }
            break;
        case 'set':
            set(k, v);
            break;
        case 'remove':
            remove(k);
            break;
    }
}
export default config;
