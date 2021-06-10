# MOROway App Development Tools

## General

This repository provides the build tools for MOROway App. The code here is used to build the read-to-use versions of MOROway App.

## Platforms

* The "web"-platform is the main platform and can be used with any web browser. The ready-to-use code for the "web"-platform can be found [here](https://github.com/MOROway/moroway-app).<sup>[&#91;1&#93;](#morowayrepoautoupdate)</sup>
* The "windows"-platform provides the PWA available at Microsoft Store.
* The "android"-platform is used within the Java Wrapper App available at Google Play Store. The wrapper app is not open-source.
* The "oc"-platform is used within the Apache Cordova Wrapper App available at F-Droid. The wrapper app can be found [here](https://github.com/MOROway/moroway-app-oc). This wrapper app contains a [already built version](https://github.com/MOROway/moroway-app-oc/moroway-app-oc) <sup>[&#91;1&#93;](#morowayrepoautoupdate)</sup> of the "oc"-platform.

<a name="morowayrepoautoupdate">&#91;1&#93;</a> The MOROway App components are auto updated by a [Github Action](https://github.com/MOROway/moroway-app-dev/actions). This action uses code derived from the [github-action-push-to-another-repository](https://github.com/cpina/github-action-push-to-another-repository/) Github Action (License: MIT, by Carles Pina Estany).

## Directories

* app = core files for all platform
    * src/lib: included open source [components](./app/src/lib/README.md).
* app_platforms = platform specific files
    * All directories containing files end with "_platform".
    * &#91;PLATFORM&#93;/core_excludes: core files not used by platform.
    * &#91;PLATFORM&#93;/sw_excludes: files not used in service worker.
* build = build script
    * Linux-based OS, Bash and common CLI-tools required
    * Usage: bash build.sh &#91; -p PLATFORM &#93;
    * version: set in conf-file (MAJOR.MINOR.PATCH).
    * beta: set in conf-file (0 for release / beta off, 1,2,3,… for beta number).
* out = ready-to-use MOROway App output
    * generated by build script
    * build logs at out/build_logs
    * out/&#91;PLATFORM&#93;/latest = last build (release or beta)
    * out/&#91;PLATFORM&#93;/current = last release build