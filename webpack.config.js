module.exports={
    devtool: '#eval-source-map',
    context: __dirname,
        entry: "./index.js",
        output: {
        path: __dirname + "/dist",
            filename:"bundle.js"
    }

    ,
    watch: true,
    module: {


        rules: [
            {

                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {

                    loader: "babel-loader",
                    options: {

                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [[
                            "@babel/plugin-proposal-class-properties"
                        ]
]
                    }


                }

            },

         
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
    
            


        ]



    }
}
