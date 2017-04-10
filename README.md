# This repo walks through how to create an angular app via the cli (1.0.0) and deploy a build to production using webpack + AOT compliation + Gzip compression

The Heroku link to this example site is [here](https://cryptic-sea-49784.herokuapp.com/)

**Note**: I'm not paying high dollar to keep that site spun up. It may be in a cool down state when you first visit it and could take 30 seconds to spin-up/load the first time.


# Setup
[how to setup angular, the cli and node correctly](https://gist.github.com/milesstanfield/17f980ad4ed6d038a255f8fc3b222add#file-angular-and-node-setup-md)


# Create an angular app with the cli
```
ng new my-angular-app && cd my-angular-app
```

# Serve your app locally
```
ng serve -o
```

# Update package.json
- Add some scripts to package.json
```
"rimraf": "rimraf",
"clean": "npm run rimraf -- dist",
"build:prod": "npm run clean && npm run build --aot --prod",
"start:prod": "node server.js",
"heroku-postbuild": "npm run build:prod"
```

- Add your specific Node and npm versions to the engines key in package.json

**hint:** you can find your current versions by `node -v && npm -v`
```
  ...
},
"engines": {
  "node": "6.9.0",
  "npm": "3.10.8"
}
```

# update dependencies
- Add the cli and cli/compiler dependencies so they can be used in the npm build scripts
```
npm install @angular/cli@latest @angular/compiler-cli@latest --save
```

- install rimraf dev dependency (cleans up things)
```
npm install rimraf --save-dev
```


# server setup
- download the barebones express server.js file
```
curl -o ./server.js https://raw.githubusercontent.com/milesstanfield/ng4-webpack/master/server.js
```

- install server dependencies for the server.js file
```
npm install express method-override compression --save-dev
```

# Production Optimization
- eject angular
```
ng eject && npm install
```

- install compression plugin (gzip)
```
npm install compression-webpack-plugin --save-dev
```

- add these constants to the top of the `webpack.config.js` file
```
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
```

- change this to false in the `AotPlugin` in the `webpack.config.js` file
```
"skipCodeGeneration": false
```

- add this to the bottom of the plugins list in `webpack.config.js` file
```
new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false, screw_ie8 : true },
  output: { comments: false },
  mangle: { screw_ie8 : true }
}),
new CompressionPlugin()
```

# test that your production build is working
```
npm run build:prod && npm run start:prod
```

# deploying to Heroku
- Make sure you have the Heroku toolbelt installed
```
brew install heroku
```

- create a Procfile for Heroku to run the server with
```
touch Procfile && echo "web: node server.js" > Procfile
```

- Commit, deploy and open your new Heroku production app
```
git init && git add . && git commit -m 'awesome stuff'
heroku create
git push heroku master
heroku ps:scale web=1
heroku restart
heroku open
```

- Tail the Heroku logs if you have any issues
```
heroku logs -t
```
