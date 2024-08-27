const { EsbuildPlugin } = require("esbuild-loader");
const Dotenv = require("dotenv-webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CssPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const pkg = require("./package.json");

var config = {
    entry: {
        main: "./src/index.ts",
        view: "./src/view.ts",
        try: "./src/try.ts"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "esbuild-loader",
                    options: {
                        loader: "ts",
                        target: "esnext"
                    }
                },
            },
            {
                test: /\.css/,
                use: [
                    { loader: CssPlugin.loader },
                    {
                        loader: "css-loader",
                        options: { url: false }
                    }],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', "jsx"],
        fallback: { crypto: false }
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlPlugin({
            template: "src/index.html",
            title: pkg.title || "Engeenee Hand Demo",
            meta: { description: pkg.description || "Engeenee Hand demo" },
            chunks: ['main']
        }),

        new HtmlPlugin({
            template: "src/view.html",
            filename: "view.html",
            title: "View 3D Model",
            chunks: ['view']
           
        }),
        new HtmlPlugin({
            template: "src/try.html",
            filename: "try.html",
            title: "Try On Watch",
            chunks: ['try']
           
        }),
        new Dotenv(),
        new CssPlugin()
    ]
};

module.exports = (_, argv) => {
    if (argv.mode === "development") {
        config.mode = "development";
        config.devtool = 'source-map';
        config.devServer = { port: 3000 };
        config.output.devtoolModuleFilenameTemplate =
            "file:///[absolute-resource-path]"
    }
    else {
        config.mode = "production";
        config.optimization = {
            minimize: true,
            minimizer: [new EsbuildPlugin({
                target: "esnext", legalComments: "none"
            })]
        };
        config.plugins.push(new CopyPlugin({
            patterns: ["public"]
        }));
        config.output.filename = '[name].[fullhash].js';
    }
    // config.plugins.push(new Dotenv());
    return config;
}
