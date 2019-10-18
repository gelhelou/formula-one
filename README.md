# Project

## Overview

This single page application presents a list that shows the F1 world champions starting from 2005 until 2015. Every entry on the list is clickable and shows the winner for every single race of that season.

# Development Workflow

## Prepare for Development

-  Clone the project and run ```npm install``` in the root directory. This will download all dependencies to either run the project locally or compile a build.

## Run the Project 

- Run ```npm start```. This will run the ```webpack-dev-server``` and launch your favorite browser with the project running on ```localhost```.
- Change ```START_YEAR``` and ```END_YEAR``` in the ```config.js``` file to automatically update the range of data being fetched and hence the data displayed for the wolrd champions.

## Compile a Build

- Run ```npm run build``` in the root directory. This will compile a build inside ```dist``` folder.

# Testing

## All Tests

- Run ```npm test``` in the root directory. This will run all unit tests for the project using ```mocha``` based on the ```spec``` files and generate the outcome to your terminal.
