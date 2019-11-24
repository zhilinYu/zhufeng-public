module.exports = {
    entry:"./4.import.js",
    output:{
        filename:'bundle.js',
        path:__dirname
    },
    module:{
        rules:[
            {test:/\.js$/,use:{
                loader:'babel-loader',
                options:{
                    presets:[
                        'env',
                        'react'
                    ],
                    plugins:[
                        ['zf-import',{libararyName:'antd'}]
                    ]
                }
            },exclude:/node_modules/}
        ]
    }
}
// 7月15号 现在报名有优惠