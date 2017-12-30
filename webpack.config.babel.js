/**
 * Created by Benzo Media.
 * https://benzomedia.com
 * User: oreuveni
 * Date: 28/10/2017
 * Time: 11:40
 */
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

module.exports = function (env) {
    return {
        entry: "./assets/js/index.js",
        output: {
            path: __dirname + "/public",
            filename: "bundle.js"
        },
        module: {
            rules: [
                {test: /\.html$/, use: 'raw-loader', exclude: /node_modules/},
                {test: /\.js$/, use: 'babel-loader'},
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({use: ["css-loader"]}),
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({use: ["css-loader", "sass-loader"]}),
                    exclude: /node_modules/
                },
                {test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)|\.png($|\?)|\.gif($|\?)/, use: 'url-loader'}
            ]
        },
        target: "web",
        devtool: 'source-map',
        plugins: [
            new ExtractTextPlugin('style.min.css'),
            new OptimizeCssAssetsPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                PhotoSwipe: 'photoswipe',
                PhotoSwipeUI_Default: 'photoswipe/src/js/ui/photoswipe-ui-default.js'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                comments: false,
                sourceMap: true,
                minimize: false
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
        ]
    }
}