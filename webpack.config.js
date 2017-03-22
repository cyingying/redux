module.exports = {
    entry:'./src/js/index2.js',
    output:{
        path:'./redux-2/',
        publicPath:'./redux-2/',
        filename:'index2.js'
    },
    module:{ 
     loaders:[
       {test:/.js$/,loader:'babel',query:{presets: ['react','es2015'] },exclude:/node_modules/},
       {test:/.less$/,loader:'style!css!less'},
       {test:/.(jpg|png|gif)$/,loader:'url?limit=8129'}
     ]
    }
}