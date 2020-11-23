const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

//especificar en donde esta el proyecto de desarrollo y donde lo va a poner
//genera un archivo javascript donde compilara el codigo y lo mostrara
module.exports = {
    entry: './frontend/app.js',
    output:{
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'//guarda el javascript dentro de una carpeta archivo para ser utilizada//
    },
    mode: 'development',

    module:{
        rules:[
            {
                test: /\.css/,//examina los archivos css
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,//si esta en desarollo carga os estilos dentro del js de lo contrario carga los estilos propios de css//
                    'css-loader'
                ]
            }

        ]
    },

    //permite que el plugin genere el template para utilizar html
    plugins:[
        new HtmlWebpackPlugin({
            template: './frontend/index.html', 
            minify: {//minifica el codigo html y lo pone en una sola linea
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'//carga el archivo css para aplicar en production guardando en carpeta y archivo// 
        })
    ],

    devtool: 'source-map'
};