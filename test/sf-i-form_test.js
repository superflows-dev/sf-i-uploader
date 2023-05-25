/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */
import { SfIUploader } from '../sf-i-uploader.js';
// import { stub } from 'sinon';
// import {fixture, assert} from '@open-wc/testing';
import { assert } from '@open-wc/testing';
// import {html} from 'lit/static-html.js';
//const TIMEOUT = 2000;
suite('sf-i-uploader > left menu', () => {
    test('is defined', () => {
        const el = document.createElement('sf-i-uploader');
        assert.instanceOf(el, SfIUploader);
    });
});
//# sourceMappingURL=sf-i-uploader_test.js.map