# iTechArt-internship
## Goal
Create a set of automated tests for 1k.by using protractor, node js and jasmine framework.
## General info
This project uses test framework jasmine, allowing to check parts of the given website. </br>
Protractor is used to interact with elements of the given website. </br>
Logger configuration files are stored in loggerConfig folder, which consists of log4js.json and loggerConfigurator.js files. </br>
All log files are stored in logs folder, which will be created automatically at first launch. </br>
.gitignore file contain files excluded from git repository. </br> 
Package.json specify project's info, like included packages, vesion, git path and name. </br>
Protractor configuration is stored in conf.js file. </br>
## To launch:
First, run 'npm i' in project's folder to install all necessary node packages,then update webdriver-manager, finally run 'npm test'.
Upon running 'npm test' command, start.js file is executed, which automatically starts protractor's webdriver-manager, but running webdriver-manager separatly won't cause any problems.

