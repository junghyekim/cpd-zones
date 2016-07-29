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
