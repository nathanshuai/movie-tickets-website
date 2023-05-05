// Add event listener
export function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
  }
  
  // Get HTML element by id
export function getElement(selector, parent = document) {
    return parent.getElementById(selector);
  }
  
  // Select HTML element by selector
export function select(selector, parent = document) {
    return parent.querySelector(selector);
  }
  
  // Get a (node) list of HTML elements
export function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  }
  
  // Print
export function print(arg) {
    console.log(arg);
  }