/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */
import { SfIUploader } from '../sf-i-uploader.js';
// import { stub } from 'sinon';
import { fixture } from '@open-wc/testing';
import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
const htmlContent = html `

  <sf-i-uploader max="10" apiId="1peg5170d3" allowedExtensions="[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;]" extract="yes" dataPassthrough="test123" callbackUrlHost="webhook.site" callbackUrlPath="d2f50e9d-8d27-47db-b457-b6691c3477e5"></sf-i-uploader></sf-i-uploader>

      `;
var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});
const changeEvent = new Event('change');
// const TIMEOUT_500 = 500;
const TIMEOUT_2000 = 2000;
//const TIMEOUT = 2000;
suite('sf-i-uploader > basics', () => {
    test('is defined', () => {
        const el = document.createElement('sf-i-uploader');
        assert.instanceOf(el, SfIUploader);
    });
    test('new button render', async () => {
        // basic button load
        const el = (await fixture(htmlContent));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        const button = el.shadowRoot.querySelector('#button-add');
        assert.ok(button.innerHTML.indexOf('New') >= 0);
        // click on the new button, input should load
        button.dispatchEvent(clickEvent);
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        const file0 = el.shadowRoot.querySelector('#file-0');
        assert.exists(file0);
        // click on the new button, next input should load
        button.dispatchEvent(clickEvent);
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        const file1 = el.shadowRoot.querySelector('#file-1');
        assert.exists(file1);
        // delete the second input
        let delete1 = el.shadowRoot.querySelector('#button-delete-1');
        delete1.dispatchEvent(clickEvent);
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        delete1 = el.shadowRoot.querySelector('#button-delete-1');
        assert.notExists(delete1);
        // file selection
        let file = new File(['this is file content!'], 'dummy.txt');
        let dt = new DataTransfer();
        dt.items.add(file);
        file0.files = dt.files;
        file0.dispatchEvent(changeEvent);
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        let upload0 = el.shadowRoot.querySelector('#button-upload-0');
        assert.exists(upload0);
        const cancel0 = el.shadowRoot.querySelector('#button-cancel-0');
        assert.exists(cancel0);
        // clear file selection
        cancel0 === null || cancel0 === void 0 ? void 0 : cancel0.dispatchEvent(clickEvent);
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        let delete0 = el.shadowRoot.querySelector('#button-delete-0');
        assert.exists(delete0);
        // file selection again
        file = new File(['this is file content!'], 'dummy.txt');
        dt = new DataTransfer();
        dt.items.add(file);
        file0.files = dt.files;
        file0.dispatchEvent(changeEvent);
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        upload0 = el.shadowRoot.querySelector('#button-upload-0');
        assert.exists(upload0);
        assert.equal(JSON.stringify(el.selectedValues()), "[]");
    });
});
//# sourceMappingURL=sf-i-uploader_test.js.map