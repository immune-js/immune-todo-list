const path              = require( "path"                        )
const webpack           = require( "webpack"                     )
const HtmlPlugin        = require( "html-webpack-plugin"         )
const ExtractTextPlugin = require( "extract-text-webpack-plugin" )
const MinifyPlugin      = require( "babel-minify-webpack-plugin" )
const CssoPlugin        = require( "csso-webpack-plugin"         ).default
const ProgressPlugin    = require( "progress-bar-webpack-plugin" )

const nodeEnv  = process.env.NODE_ENV
const platform = process.env.PLATFORM

const ifProd = (yes, no) => 
  nodeEnv === "production" ? yes : no

const ifDev = (yes, no) => 
  nodeEnv !== "production" ? yes : no

const ifBrowser = (yes, no) =>
  platform === "browser" ? yes : no

const removeEmpty = xs => xs.filter(x => !!x)

module.exports = 
  { devtool : ifProd("cheap-module-source-map", "cheap-module-source-map")
  , context : path.resolve(__dirname, "client")
  , entry   : path.resolve("client", "js", "index.js")
  , output  :
      { path       : path.resolve("build", "client")
      , filename   : "[name].[chunkhash].js"
      , publicPath : ifBrowser("/", "/build/client/")
      }
  , resolve : 
      { extensions : [".js", ".jsx"]
      , modules    : ["node_modules"]
      , alias      : {}
      }
  , plugins : removeEmpty(
      [ new HtmlPlugin(
          { template : path.resolve("client", "index.tpl.html")
          , filename : "index.html"
          , inject   : "body"
          , cache    : false
          }
        )
      , new webpack.DefinePlugin(
          { "process.env.NODE_ENV" : JSON.stringify(process.env.NODE_ENV)
          , "process.env.PLATFORM" : JSON.stringify(process.env.PLATFORM) 
          , 'process.env.DEBUG'    : JSON.stringify(process.env.DEBUG)
          }
        )
      , new ProgressPlugin({ format: '  building client: [:bar] :percent', clear: false })
      , ifProd(new ExtractTextPlugin("[name].[chunkhash].css"))
      , ifProd(new CssoPlugin())
      , ifProd(new MinifyPlugin({ removeConsole: false, removeDebugger: true }))
      ]
    )
  , module: 
      { loaders: 
          [ { test    : /\.jsx?$/
            , exclude : /node_modules/
            , loader  : "babel-loader"
            }
          , { test    : /\.css$/
            , exclude : /node_modules/
            , use     : ifProd(
                ExtractTextPlugin.extract(
                  { fallback : "style-loader"
                  , use      : "css-loader"
                  }
                ),
                [ "style-loader", "css-loader" ]
              )
            }
          ]
      }
      
  , devServer: 
      { proxy: 
          { '/api': 
              { target: 'http://localhost:9001'
              , secure: false
              }
          }
      }
  }
