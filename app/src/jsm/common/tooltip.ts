"use strict";
//TOOLTIPS
export function initTooltip(elem: HTMLElement) {
    function activate() {
        tooltipContainer.classList.add("active");
        tooltipContainer.textContent = elem.dataset.tooltip;
        const rect = elem.getBoundingClientRect();
        const margin = tooltipContainer.offsetHeight * 0.2;
        tooltipContainer.style.top = (rect.top - tooltipContainer.offsetHeight - margin >= 0 ? rect.top - tooltipContainer.offsetHeight - margin : rect.top + elem.offsetHeight + margin) + "px";
        tooltipContainer.style.left = (rect.left + tooltipContainer.offsetWidth <= window.innerWidth ? rect.left : window.innerWidth - tooltipContainer.offsetWidth - margin) + "px";
    }
    function reset() {
        tooltipContainer.classList.remove("active");
    }
    if (elem.dataset.tooltipInit == undefined) {
        elem.addEventListener("mouseenter", function () {
            activate();
        });
        elem.addEventListener("mouseover", function () {
            activate();
        });
        elem.addEventListener("mousemove", function () {
            activate();
        });
        elem.addEventListener("mousedown", function () {
            reset();
        });
        elem.addEventListener("mouseup", function () {
            reset();
        });
        elem.addEventListener("mouseout", function () {
            reset();
        });
        elem.dataset.tooltipInit = "1";
    }
}
export function initTooltips() {
    const elemsTooltip = document.querySelectorAll("*[data-tooltip]") as NodeListOf<HTMLElement>;
    for (let i = 0; i < elemsTooltip.length; i++) {
        initTooltip(elemsTooltip[i]);
    }
}
const tooltipContainer = document.createElement("div");
tooltipContainer.classList.add("tooltip-container");
document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(tooltipContainer);
});
