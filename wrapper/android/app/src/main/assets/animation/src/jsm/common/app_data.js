/**
 * Copyright 2024 Jonathan Herrmann-Engel
 * SPDX-License-Identifier: GPL-3.0-only
 */
"use strict";
import { deepFreeze } from "./js_objects.js";
//Placeholders are set by build-script, type error is therefore intentional
var APP_DATA = {
    version: {
        major: 10,
        minor: 0,
        patch: 0,
        beta: 0,
        date: {
            year: 2024,
            month: 7,
            day: 26
        }
    },
    platform: "android",
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
