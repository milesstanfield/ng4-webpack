# This is an example of how to create and deploy an angular 2+ app to production (Heroku) using the angular cli + AOT and webpack

The Heroku link to this example site is [here](https://cryptic-sea-49784.herokuapp.com/)

# Setup
[how to setup angular, the cli and node correctly](https://gist.github.com/milesstanfield/17f980ad4ed6d038a255f8fc3b222add#file-angular-and-node-setup-md)


# Create a new angular app with the cli
**note:** i've compiled some [basic cli usage docs](https://gist.github.com/milesstanfield/147de88d83e5b4eb790b7dd4fb615230#file-angular-cli-usage-md) you might find useful
```
ng new my-angular-app && cd my-angular-app
```

# At this point if you just wanted to use this app in development you are done. simple run this command to serve your app in a dev browser. Continue reading if you wish to deploy to production.
```
ng serve -o
```

# Add some scripts to package.json
```
"rimraf": "rimraf",
"clean:aot": "npm run rimraf -- compiled",
"clean:dist": "npm run rimraf -- dist",
"build:prod": "npm run clean:dist && npm run clean:aot && npm run build --aot -prod",
"start:prod": "node server.js",
"heroku-postbuild": "npm run build:prod"
```

# Add your specific Node and npm versions to the engines key in and add it to package.json
**hint:** you can find your current versions by `node -v && npm -v`
```
  ...
},
"engines": {
  "node": "6.9.0",
  "npm": "3.10.8"
}
```

# Add the cli and cli/compiler dependencies so they can be used in the npm build scripts
```
npm install @angular/cli@latest @angular/compiler-cli@latest --save
```

# install rimraf dev dependency (cleans up things)
```
npm install rimraf --save-dev
```

# download the barebones express server.js file
```
curl -o ./server.js https://raw.githubusercontent.com/milesstanfield/ng4-webpack/master/server.js
```

# install server dependencies for the server.js file
```
npm install express method-override --save
```

# run npm install
```
npm install
```

# test that your production build is working
```
npm run build:prod && npm run start:prod
```

# Make sure you have the Heroku toolbelt installed
```
brew install heroku
```

# create a Procfile for Heroku to run the server with
```
touch Procfile && echo "web: node server.js" > Procfile
```

# Commit, deploy and open your new Heroku production app
```
git init && git add . && git commit -m 'awesome stuff'
heroku create
git push heroku master
heroku ps:scale web=1
heroku restart
heroku open
```

# Tail the Heroku logs if you have any issues
```
heroku logs -t
```
