import {RuleSetRule} from "webpack";
import {ConfigReactJS} from "../../../Interfaces/Config/ReactJS";


export async function Rules(config : ConfigReactJS) : Promise<(RuleSetRule | "...")[]> {
    return new Promise(async (resolve, rejected) => {
        let WebpackRules: (RuleSetRule | "...")[] = [];

        WebpackRules.push({
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        });

        WebpackRules.push({
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        });

        WebpackRules.push({
            test: /\.(mp4|mkv|avi|mp3|wav|png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ]
        })
        WebpackRules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            ],
        })
        WebpackRules.push({
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                    ],
                },
            },
        });
        await resolve(WebpackRules);
    })
}