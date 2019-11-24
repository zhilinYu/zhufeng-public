import request from 'request';
import {getAll } from './rc';
import downLoadGit from 'download-git-repo';
import {DOWNLOAD} from './constants';
let fetch = async (url) =>{
    return new Promise((resolve,reject)=>{
        let config = {
            url,
            method:'get',
            headers:{
                'user-agent':'xxx'
            }
        }
        request(config,(err,response,body)=>{
            if(err){
                reject(err);
            }
            resolve(JSON.parse(body));
        })
    })
}

export let tagList = async(repo)=>{
    let config = await getAll();
    let api = `https://api.github.com/repos/${config.registry}/${repo}/tags`;
    return await fetch(api);
}
export let repoList = async()=>{
    let config = await getAll();
    let api = `https://api.github.com/${config.type}/${config.registry}/repos`
    return await fetch(api);
};

export let download = async (src,dest)=>{
    return new Promise((resolve,reject)=>{
        downLoadGit(src,dest,(err)=>{
            if(err){
                reject(err);
            }
            resolve();
        });
    });
}

export let downloadLocal = async(project,version)=>{
    let conf = await getAll();
    let api = `${conf.registry}/${project}`;
    if(version){
        api +=  `#${version}`;
    }
    return await download(api,DOWNLOAD+'/'+project);
}