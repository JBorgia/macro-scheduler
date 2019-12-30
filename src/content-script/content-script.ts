// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let lastElementContext;

document.addEventListener(
  'mouseup',
  event => {
    console.log('event', JSON.stringify(event));
    lastElementContext = event.target;
  },
  true
);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (lastElementContext && lastElementContext.parentNode) {
    lastElementContext.parentNode.removeChild(lastElementContext);
    lastElementContext = null;
  }
});
chrome.runtime.onMessage.addListener((message, callback) => {
  console.log('message', message);
  if (message === 'changeColor') {
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="orange"',
    });
  }
});
