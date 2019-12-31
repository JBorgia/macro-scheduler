// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let lastElementContext;
window.addEventListener('load', () => {
  console.log('contentscript running');
  document.body.addEventListener(
    'mouseup',
    (event) => {
      console.log('event', JSON.stringify(event));
      lastElementContext = event.target;
    },
    true
  );
});
