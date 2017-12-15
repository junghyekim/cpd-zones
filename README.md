# CPD Zones

CPD Zones is a small web application showing the different Chattanooga Police Department zones. You can use it to figure out which zone your house is in, and which officers are the main contacts for your zone.

It is based off of a project started by [@seabre](https://github.com/seabre), [@kylegordy](https://github.com/kylegordy), and [@juzten](https://github.com/juzten). You can see the original project [here](https://github.com/openchattanooga/cpd-zones-old).

## Building The Project Site

This project uses [middleman](https://github.com/middleman/middleman). You will need a few things to set that up.

#### Requirements

At least [Ruby](https://www.ruby-lang.org/en/installation/) 2.2 and [Bundler](http://bundler.io/).

#### Project Setup

You first need to install the project's Ruby dependencies. From the root directory, run:

```bash
bundle install
```

#### Running

To run the project:

```bash
bundle exec middleman
```

The site will now be available at `http://localhost:4567`. Middleman will watch for changes in the project and reload them.

#### Deploying To GitHub Pages

Once the project is setup, you can now deploy the site if you wish. In order to deploy, run `bundle exec middleman deploy --build-before`. If you have direct commit access to this repo, it *should* just work.

Just note that *whatever is on your local machine at your current git branch will be deployed*. That said, be mindful when you run deployment.

## Updating Officer Information
From time to time you will need to update officer informaiton in the application. This most often happend when there are promotions or reassignments within the Chattanooga Police Department. The steps below will show you how to update the officer information when these changes occur. 

#### 1.  Gather data from CPD. You will need the following:
  * Sector Assignment
  * Full Title
  * Email Address
  * Photo

#### 2. Prepare photos. 
  * Rename photos with the last name of the officer, in all lower case.  
  * Resize photos to 320 pixels wide and crop image to upper body (chest and up) so that the size is 320 wide by 240 high. 
  * Move folders into the images project folder (cpd-zones/source/images) 

#### 3. Update GeoJSON File
  * Go to [geojson.io](http://geojson.io/) in your web browser. 
  * Load your topojson file (cpd-zones/source/data) either by connecting to your github project or downloading the file and uploading it to the website. 
  * Update the officer info in the json file (officer name, email and photo name) by clicking on the the sector to update the information.
  * Save the file to overwrite the origional in github (you can save a copy of the origional if locally if that makes you nervious) or as a new topojson file to be downloaded, renamed to CPDZones.topojson and use to replace the file in the source folder (cpd-zones/source/data).
  
#### 4. Follow the build instructions above and have Chattanooga Police Department check the website to make sure it is correct. 
 