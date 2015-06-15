#HabitRPG Mini

##How to use

##Development
To install the app locally, in development mode, you need to allow unpack extensions in your version of chrome. This can be achieved by going to More Tools > Extensions and enabling "Developer mode".

Then, you need to run the command 

> npm install

in the command line to install all the development dependencies. After having installed the dependencies, you can build the application by running

> gulp build

for the minified version, or

> gulp watch

for the development version (allows sourcemaps, etc.).

After having built the application, it can be loaded into chrome by visiting the Extensions page and clicking on "Load unpacked extension...". Select the "dist" folder of the project to load the extension into chrome.

You can then test it by clicking on the HabitRPG icon.
