"use strict";
import { deepFreeze } from "./js_objects.js";
//Placeholders are set by build-script, type error is therefore intentional
var APP_DATA = {
    version: {
        major: 9,
        minor: 1,
        patch: 0,
        beta: 5,
        date: {
            year: 2023,
            month: 12,
            day: 30
        }
    },
    platform: "snap",
    debug: false
};
deepFreeze(APP_DATA);
export { APP_DATA };
//LOCAL APP DATA COPY
export function getLocalAppDataCopy() {
    return JSON.parse(window.localStorage.getItem("morowayAppData") || "null");
}
export function setLocalAppDataCopy() {
    window.localStorage.setItem("morowayAppData", JSON.stringify(APP_DATA));
}
