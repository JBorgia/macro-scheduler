// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.tabs.executeScript(null, { file: 'contentscript.js' });
});

// The onClicked callback function.
const onClickHandler = (info, tab) => {
  console.log('item ' + info.menuItemId + ' was clicked');
  console.log('info: ' + JSON.stringify(info));
  console.log('tab: ' + JSON.stringify(tab));
  // console.log('lastElementContext', lastElementContext);
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(() => {
  // Create one test item for each context type.
  const contexts = [
    'page',
    'selection',
    'link',
    'editable',
    'image',
    'video',
    'audio',
  ];
  const id = chrome.contextMenus.create({
    title: 'macroScheduler',
    contexts,
    id: 'contextMenu',
  });
});
