/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const BabiliPlugin = require( 'babili-webpack-plugin' );
const buildConfig = require( './build-config' );

module.exports = {
	devtool: 'source-map',

	entry: [
		require.resolve( 'regenerator-runtime/runtime.js' ),
		path.resolve( __dirname, 'ckeditor.js' )
	],

	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'ckeditor.compat.js',
		libraryTarget: 'umd'
	},

	plugins: [
		new CKEditorWebpackPlugin( {
			languages: [ buildConfig.language ]
		} ),
		new BabiliPlugin( null, {
			comments: false
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} )
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						query: {
							presets: [
								[
									require( 'babel-preset-env' ),
									{
										targets: {
											browsers: [
												'last 2 versions',
												'ie >= 11'
											]
										}
									}
								]
							]
						}
					}
				]
			},
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					'sass-loader'
				]
			}
		]
	}
};
