# SSG Demo

## Introduction

This repository serves as a demo on Static Site Generation together with the CMS of Contentstack.
Multiple frameworks are used so ease of development and readability can be compared between them.
A shared library is used for communication with Contentstack.

## NextJS

NextJS version 13 is used as a showcase of SSG with NextJS. This does not use the new app router, instead it uses the stable `pages` directory.

## Nuxt

Nuxt version 3 is used as a showcase of SSG with NuxtJS.

## How to run

The repository uses workspaces. Go to the root of the repository and run `npm install` to install the dependencies.

In order to run the application using NextJS run the following commands:

1. `npm run next:build`
2. `npm run next:start`

In order to run the application using Nuxt run the following commands:

1. `npm run nuxt:build`
2. `npm run nuxt:start`

In both cases, the application is available on http://localhost:3000.
