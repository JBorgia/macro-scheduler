// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'sampleContextMenu',
    title: 'Sample Context Menu',
    contexts: ['selection'],
  });
  // A generic onclick callback function.
  function genericOnClick(info, tab) {
    console.log('item ' + info.menuItemId + ' was clicked');
    console.log('info: ' + JSON.stringify(info));
    console.log('tab: ' + JSON.stringify(tab));
  }

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
  for (const context of contexts) {
    const title = 'Test "' + context + '" menu item';
    const id = chrome.contextMenus.create({
      title,
      contexts: [context],
      onclick: genericOnClick,
    });
    console.log('"' + context + '" item:' + id);
  }

  // Create a parent item and two children.
  const parentItem = chrome.contextMenus.create({
    title: 'Test parent item',
  });
  const child1 = chrome.contextMenus.create({
    title: 'Child 1',
    parentId: parentItem,
    onclick: genericOnClick,
  });
  const child2 = chrome.contextMenus.create({
    title: 'Child 2',
    parentId: parentItem,
    onclick: genericOnClick,
  });
  console.log('parent:' + parent + ' child1:' + child1 + ' child2:' + child2);

  // Create some radio items.
  function radioOnClick(info, tab) {
    console.log(
      'radio item ' +
        info.menuItemId +
        ' was clicked (previous checked state was ' +
        info.wasChecked +
        ')'
    );
  }
  let radio1 = chrome.contextMenus.create({
    title: 'Radio 1',
    type: 'radio',
    onclick: radioOnClick,
  });
  let radio2 = chrome.contextMenus.create({
    title: 'Radio 2',
    type: 'radio',
    onclick: radioOnClick,
  });
  console.log('radio1:' + radio1 + ' radio2:' + radio2);

  // Create some checkbox items.
  function checkboxOnClick(info, tab) {
    console.log(JSON.stringify(info));
    console.log(
      'checkbox item ' +
        info.menuItemId +
        ' was clicked, state is now: ' +
        info.checked +
        '(previous state was ' +
        info.wasChecked +
        ')'
    );
  }
  let checkbox1 = chrome.contextMenus.create({
    title: 'Checkbox1',
    type: 'checkbox',
    onclick: checkboxOnClick,
  });
  let checkbox2 = chrome.contextMenus.create({
    title: 'Checkbox2',
    type: 'checkbox',
    onclick: checkboxOnClick,
  });
  console.log('checkbox1:' + checkbox1 + ' checkbox2:' + checkbox2);

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  console.log(
    'About to try creating an invalid item - an error about ' +
      'item 999 should show up'
  );
  chrome.contextMenus.create(
    {
      title: 'Oops',
      parentId: 999,
    },
    () => {
      if (chrome.extension.lastError) {
        console.log(
          'Got expected error: ' + chrome.extension.lastError.message
        );
      }
    }
  );

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request) {
      sendResponse(true);
    }
  });

  const applyClass = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { target: true });
    });
  };

  chrome.contextMenus.create({
    id: 'scheduleClick',
    title: 'Schedule Click',
    contexts: ['page', 'selection', 'image', 'link'],
  });

  // Must be synchronously called on event page load,
  //   for instance in the top level code
  chrome.contextMenus.onClicked.addListener(applyClass);
});
