/**
 * @license
 * Copyright 2022 Superflows.dev
 * SPDX-License-Identifier: MIT
 */

import {SfIUploader} from '../sf-i-uploader.js';
// import { stub } from 'sinon';
import {fixture} from '@open-wc/testing';
import {assert} from '@open-wc/testing';
import { html } from 'lit/static-html.js';

const htmlContent = html `

  <sf-i-uploader max="10" apiId="1peg5170d3" allowedExtensions="[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;]" extract="yes" dataPassthrough="test123" callbackUrlHost="webhook.site" callbackUrlPath="d2f50e9d-8d27-47db-b457-b6691c3477e5"></sf-i-uploader></sf-i-uploader>

      `;


const htmlContent1 = html `

      <sf-i-uploader max="10" apiId="1peg5170d3" allowedExtensions="[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;]" extract="yes" dataPassthrough="test123" callbackUrlHost="webhook.site" callbackUrlPath="d2f50e9d-8d27-47db-b457-b6691c3477e5" maxSize="100"></sf-i-uploader></sf-i-uploader>
    
          `;

var clickEvent = new MouseEvent("click", {
  "view": window,
  "bubbles": true,
  "cancelable": false
});

const changeEvent = new Event('change');

// const TIMEOUT_500 = 500;
const TIMEOUT_2000 = 2000;
const TIMEOUT_4000 = 4000;


//const TIMEOUT = 2000;
suite('sf-i-uploader > basics', () => {

  test('is defined', () => {
    const el = document.createElement('sf-i-uploader');
    assert.instanceOf(el, SfIUploader);
  });

  test('new button render', async () => {

    // basic button load

    const el = (await fixture(htmlContent)) as SfIUploader;
    await el.updateComplete;

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    const button = el.shadowRoot!.querySelector('#button-add')!;
    assert.ok(button.innerHTML.indexOf('New') >= 0); 

    // click on the new button, input should load

    button.dispatchEvent(clickEvent);

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    const file0 = el.shadowRoot!.querySelector('#file-0')! as HTMLInputElement;
    assert.exists(file0);

    // click on the new button, next input should load

    button.dispatchEvent(clickEvent);

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    const file1 = el.shadowRoot!.querySelector('#file-1')!;
    assert.exists(file1);

    // delete the second input

    let delete1 = el.shadowRoot!.querySelector('#button-delete-1')!;
    delete1.dispatchEvent(clickEvent);

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    delete1 = el.shadowRoot!.querySelector('#button-delete-1')!;
    assert.notExists(delete1);

    // file selection
    try{
      let file = new File(['this is file content!'], 'dummy.txt');
      let dt = new DataTransfer();
      dt.items.add(file);
      file0.files  = dt.files;
      file0.dispatchEvent(changeEvent);
    }catch(e){
      assert(true, 'DataTransfer() not supported');
      return
    }
    

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    let upload0 = el.shadowRoot!.querySelector('#button-upload-0');
    assert.exists(upload0);

    const cancel0 = el.shadowRoot!.querySelector('#button-cancel-0');
    assert.exists(cancel0);

    // clear file selection

    cancel0?.dispatchEvent(clickEvent);

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    let delete0 = el.shadowRoot!.querySelector('#button-delete-0')!;
    assert.exists(delete0);

    // file selection again

    let file = new File(['this is file content!'], 'dummy.txt');
    let dt = new DataTransfer();
    dt.items.add(file);
    file0.files  = dt.files;
    file0.dispatchEvent(changeEvent);

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    upload0 = el.shadowRoot!.querySelector('#button-upload-0');
    assert.exists(upload0);
    assert.equal(JSON.stringify(el.selectedValues()), "[]");    

  });

  test('max invalid', async () => {

    // basic button load

    const el = (await fixture(htmlContent1)) as SfIUploader;
    await el.updateComplete;

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    const button = el.shadowRoot!.querySelector('#button-add')!;

    assert.ok(button.innerHTML.indexOf('New') >= 0); 

    // click on the new button, input should load

    button.dispatchEvent(clickEvent);

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    const file0 = el.shadowRoot!.querySelector('#file-0')! as HTMLInputElement;
    assert.exists(file0);

    // file selection
    try{
      let file = new File(['"pdf", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="'], 'dummy.txt');
      let dt = new DataTransfer();
      dt.items.add(file);
      file0.files  = dt.files;
      file0.dispatchEvent(changeEvent);
    }catch(e){
      assert(true, 'DataTransfer() not supported');
      return
    }

    await new Promise((r) => setTimeout(r, TIMEOUT_2000));

    // let upload0 = el.shadowRoot!.querySelector('#button-upload-0');
    // assert.exists(upload0);

    // upload0?.dispatchEvent(clickEvent);
    
    // await new Promise((r) => setTimeout(r, TIMEOUT_4000));

    let errMsg = el.shadowRoot!.querySelector('#div-row-error-message');
    if(errMsg !== null){
      assert.ok(errMsg!.innerHTML.indexOf("Maximum") >= 0)
    }
    await new Promise((r) => setTimeout(r, TIMEOUT_4000));
  });

});

