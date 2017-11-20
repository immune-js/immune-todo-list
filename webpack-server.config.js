const webpack        = require( "webpack"                     )
const path           = require( "path"                        )
const fs             = require( "fs"                          )
const ProgressPlugin = require( "progress-bar-webpack-plugin" )
const nodeExternals  = require( "webpack-node-externals"      )

module.exports = 
  { devtool : "sourcemap"
  , entry   : "./server/index.js"
  , target  : "node"
  , output  : 
      { path     : path.join(__dirname, "build")
      , filename : "backend.js"
      }
  , externals : nodeExternals({ whitelist: [/immune.*/] })
  , resolve   : 
      { extensions : [".js", ".jsx"]
      , modules    : ["node_modules"]
      , alias      : {}
      }
  , plugins   : 
      [ new webpack.IgnorePlugin(/\.(css|less)$/)
      , new webpack.BannerPlugin(
          { banner    : "require('source-map-support/register');"
          , raw       : true
          , entryOnly : false 
          }
        )
      , new webpack.DefinePlugin(
          { "process.env.NODE_ENV" : JSON.stringify(process.env.NODE_ENV)
          , "process.env.PLATFORM" : JSON.stringify(process.env.PLATFORM) 
          , "process.env.DEBUG"    : JSON.stringify(process.env.DEBUG)
          }
        )
      , new ProgressPlugin({ format: '  building server: [:bar] :percent', clear: false })
      ]
  , module :
      { loaders :
          [ { test    : /\.jsx?$/
            , loader  : "babel-loader"
            }
          , { test    : /\.json$/
            , loader  : "json-loader"
            }
          ]
      }
}