import {Configuration, ModuleOptions} from "webpack";
import {Configuration as ConfigurationWebpackDev} from "webpack-dev-server"
import {WEBPACK_ENGINE, WebpackRulesTypes} from "../Types/WebpackTypesServer";
import path, {join} from "path";
import {ConfigWebpackServer} from "../Interfaces/WebpackConfigServer";
import {Options} from "../../../index";
import HtmlWebpackPlugin from "html-webpack-plugin";


export const DefaultConfigModuleRulesWebpack : WebpackRulesTypes = [
    {
        test: /\.(ts|js)x?/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    '@babel/preset-typescript'
                ]
            }
        },
    },
    {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
    },
    {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    },
]

export const DefaultConfigModuleWebpack : ModuleOptions = {
    rules : DefaultConfigModuleRulesWebpack,
}

export const DefaultConfigWebpack : Configuration = {
    mode : "development",
    entry : path.join(__dirname, "./../App"),
    module : DefaultConfigModuleWebpack,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    output : {
        path : join(process.cwd(),"./dist/"),
        filename: 'dkaframework.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./../public/index.html"),
            inject : "body"
        })
    ],
}

export const DefaultConfigWebpackDev : ConfigurationWebpackDev = {
    static : {
        directory : join(__dirname, "../public"),
        publicPath : "/"
    }
}
export const DefaultConfigWebpackServer : ConfigWebpackServer = {
    engine : WEBPACK_ENGINE,
    host : Options.HOST.LOCALHOST,
    port : Options.PORT.DEFAULT,
    webpack : DefaultConfigWebpack,
    webpackDev : DefaultConfigWebpackDev
}