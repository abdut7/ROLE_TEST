const path = require('path');
const nodeExternals = require('webpack-node-externals');
/**
 * parsed env files passing to webpack config
 */
module.exports = {
       entry: __dirname+'/server.ts',
        target: 'node',
        plugins: [
        ],
        module: {
         
          rules: [
            {test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader'}
          ]
       
        },
        output: {
          path: path.resolve('./build'),
          filename: 'open.js'
        },
        resolve: {
          modules: [path.resolve('node_modules'),path.resolve('libs'),path.resolve('microservices/open_services')],
          extensions: ['*','.ts','.js'],
         
        },
        externals: [nodeExternals({
          
            // load non-javascript files with extensions, presumably via loaders
            whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
          
        })],
      }

    
