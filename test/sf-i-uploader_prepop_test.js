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
const htmlContent1 = html `

  <sf-i-uploader max="10" apiId="1peg5170d3" allowedExtensions="[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;]" extract="yes" dataPassthrough="test123" callbackUrlHost="webhook.site" callbackUrlPath="d2f50e9d-8d27-47db-b457-b6691c3477e5" prepopulatedInputArr="[{&quot;arrWords&quot;:[&quot;A&quot;,&quot;Simple&quot;,&quot;PDF&quot;,&quot;File&quot;,&quot;This&quot;,&quot;is&quot;,&quot;a&quot;,&quot;small&quot;,&quot;demonstration&quot;,&quot;.pdf&quot;,&quot;file&quot;,&quot;-&quot;,&quot;just&quot;,&quot;for&quot;,&quot;use&quot;,&quot;in&quot;,&quot;the&quot;,&quot;Virtual&quot;,&quot;Mechanics&quot;,&quot;tutorials.&quot;,&quot;More&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;Boring,&quot;,&quot;ZZZZZ.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;Even&quot;,&quot;more.&quot;,&quot;Continued&quot;,&quot;on&quot;,&quot;page&quot;,&quot;2&quot;,&quot;Simple&quot;,&quot;PDF&quot;,&quot;File&quot;,&quot;2&quot;,&quot;continued&quot;,&quot;from&quot;,&quot;page&quot;,&quot;1.&quot;,&quot;Yet&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;Oh,&quot;,&quot;how&quot;,&quot;boring&quot;,&quot;typing&quot;,&quot;this&quot;,&quot;stuff.&quot;,&quot;But&quot;,&quot;not&quot;,&quot;as&quot;,&quot;boring&quot;,&quot;as&quot;,&quot;watching&quot;,&quot;paint&quot;,&quot;dry.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;And&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;Boring.&quot;,&quot;More,&quot;,&quot;a&quot;,&quot;little&quot;,&quot;more&quot;,&quot;text.&quot;,&quot;The&quot;,&quot;end,&quot;,&quot;and&quot;,&quot;just&quot;,&quot;as&quot;,&quot;well.&quot;],&quot;arrWordsMeta&quot;:{&quot;PAGE&quot;:2,&quot;LINE&quot;:16,&quot;WORD&quot;:178},&quot;jobId&quot;:&quot;404690b8c11597367e05d96590f6ba659451060b2577e458c39c46e84b280c4c&quot;,&quot;key&quot;:&quot;321acc3f-d7ef-4422-8c88-e5e2bb995198&quot;,&quot;ext&quot;:&quot;pdf&quot;}]"></sf-i-uploader></sf-i-uploader>

      `;
const htmlContent2 = html `

<sf-i-uploader max="10" apiId="1peg5170d3" allowedExtensions="[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;]" extract="yes" dataPassthrough="test123" callbackUrlHost="webhook.site" callbackUrlPath="d2f50e9d-8d27-47db-b457-b6691c3477e5" prepopulatedInputArr="[{&quot;jobId&quot;:&quot;404690b8c11597367e05d96590f6ba659451060b2577e458c39c46e84b280c4c&quot;,&quot;key&quot;:&quot;321acc3f-d7ef-4422-8c88-e5e2bb995198&quot;,&quot;ext&quot;:&quot;pdf&quot;}]"></sf-i-uploader></sf-i-uploader>

    `;
const htmlContent3 = html `

    <sf-i-uploader max="10" apiId="1peg5170d3" allowedExtensions="[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;]" extract="yes" dataPassthrough="test123" callbackUrlHost="webhook.site" callbackUrlPath="d2f50e9d-8d27-47db-b457-b6691c3477e5" prepopulatedInputArr="[{&quot;key&quot;:&quot;321acc3f-d7ef-4422-8c88-e5e2bb995198&quot;,&quot;ext&quot;:&quot;pdf&quot;}]"></sf-i-uploader></sf-i-uploader>

          `;
const htmlContent4 = html `

    <sf-i-uploader max="10" apiId="1peg5170d3" allowedExtensions="[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;]" extract="yes" dataPassthrough="test123" callbackUrlHost="webhook.site" callbackUrlPath="d2f50e9d-8d27-47db-b457-b6691c3477e5" prepopulatedInputArr="[{&quot;ext&quot;:&quot;pdf&quot;,&quot;file&quot;:{&quot;name&quot;: &quot;abc&quot;, &quot;ext&quot;: &quot;pdf&quot;}}]"></sf-i-uploader></sf-i-uploader>

        `;
const htmlContent5 = html `

    <sf-i-uploader max="10" apiId="1peg5170d3" allowedExtensions="[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;]" extract="yes" dataPassthrough="test123" callbackUrlHost="webhook.site" callbackUrlPath="d2f50e9d-8d27-47db-b457-b6691c3477e5" prepopulatedInputArr="[{&quot;key&quot;:&quot;321acc3f-d7ef-4422-8c88-e5e2bb995198&quot;,&quot;file&quot;:{&quot;name&quot;: &quot;abc&quot;, &quot;ext&quot;: &quot;pdf&quot;}}]"></sf-i-uploader></sf-i-uploader>

        `;
// var clickEvent = new MouseEvent("click", {
//   "view": window,
//   "bubbles": true,
//   "cancelable": false
// });
// const changeEvent = new Event('change');
// const TIMEOUT_500 = 500;
const TIMEOUT_2000 = 2000;
//const TIMEOUT = 2000;
suite('sf-i-uploader > basics', () => {
    test('is defined', () => {
        const el = document.createElement('sf-i-uploader');
        assert.instanceOf(el, SfIUploader);
    });
    test('prepop render 1', async () => {
        // basic button load
        const el = (await fixture(htmlContent1));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        const row = el.shadowRoot.querySelector('#upload-row-0');
        assert.ok(row.innerHTML.indexOf('178 Words') >= 0);
        const selectedValues = el.selectedValues();
        assert.ok(selectedValues[0]['jobId'].indexOf("404690b8c11597367e05d96590f6ba659451060b2577e458c39c46e84b280c4c") >= 0);
    });
    test('prepop render 2', async () => {
        // basic button load
        const el = (await fixture(htmlContent2));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        const selectedValues = el.selectedValues();
        assert.ok(selectedValues[0]['jobId'].indexOf("404690b8c11597367e05d96590f6ba659451060b2577e458c39c46e84b280c4c") >= 0);
    });
    test('prepop render 3', async () => {
        // basic button load
        const el = (await fixture(htmlContent3));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        const selectedValues = el.selectedValues();
        assert.ok(selectedValues[0]['key'].indexOf("321acc3f-d7ef-4422-8c88-e5e2bb995198") >= 0);
    });
    test('prepop render 4', async () => {
        // basic button load
        const el = (await fixture(htmlContent3));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        const selectedValues = el.selectedValues();
        assert.ok(selectedValues.length === 1);
    });
    test('prepop set success', async () => {
        // basic button load
        const el = (await fixture(htmlContent1));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        el.setSuccess('Successful!');
        assert.equal(el.shadowRoot.querySelector('.div-row-success').style.display, "flex");
    });
    test('prepop update progress', async () => {
        // basic button load
        const el = (await fixture(htmlContent4));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        el.inputArr = [];
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        el.inputArr = [{ "key": "321acc3f-d7ef-4422-8c88-e5e2bb995198", "progress": "49", "file": { "name": "abc", "ext": "pdf" } }];
        el.populateInputs();
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        el.uploadProgressUpdater(el.shadowRoot.querySelector('#upload-container'), 49 + "");
        assert.equal(el.shadowRoot.querySelector('#progress-bar-left-0').style.width, "49%");
    });
    test('prepop update render key data img', async () => {
        // basic button load
        const el = (await fixture(htmlContent3));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        el.renderKeyData("png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=");
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        assert.equal(el.shadowRoot.querySelector('#detail-container').style.display, "block");
    });
    test('prepop update render key data pdf', async () => {
        // basic button load
        const el = (await fixture(htmlContent3));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        el.renderKeyData("pdf", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=");
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        assert.ok(el.shadowRoot.querySelector('#detail-container').innerHTML.indexOf('File is ready for download') >= 0);
        assert.equal(el.shadowRoot.querySelector('#detail-container').style.display, "block");
    });
    test('chunkify', async () => {
        // basic button load
        const el = (await fixture(htmlContent3));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        const chunks = el.chunkify("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=");
        assert.equal(chunks === null || chunks === void 0 ? void 0 : chunks.length, 1);
    });
    test('clear uploads', async () => {
        // basic button load
        const el = (await fixture(htmlContent5));
        await el.updateComplete;
        await new Promise((r) => setTimeout(r, TIMEOUT_2000));
        el.clearUploads();
        el.populateInputs();
        assert.equal(el.selectedValues().length, 0);
    });
    test('input render 5', async () => {
        const el = (await fixture(htmlContent5));
        await el.updateComplete;
    });
});
//# sourceMappingURL=sf-i-uploader_prepop_test.js.map