/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
// import {SfISelect} from 'sf-i-select';
// import {SfISubSelect} from 'sf-i-sub-select';
import { customElement, query, property } from 'lit/decorators.js';
import Util from './util';
import Api from './api';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
/*

Modes: View, Add, Edit, Delete, Admin
DB: partitionKey, rangeKey, values

*/
/**
 * SfIUploader element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
let SfIUploader = class SfIUploader extends LitElement {
    constructor() {
        super();
        this.prepopulatedInputArr = "[]";
        this.readOnly = false;
        this.max = "1";
        this.dataPassthrough = "{}";
        this.callbackUrlHost = "eoma59bzxizzjlf.m.pipedream.net";
        this.callbackUrlPath = "processresult";
        this.getMax = () => {
            try {
                return parseInt(this.max);
            }
            catch (e) {
                return 0;
            }
        };
        this.projectId = "";
        this.maxSize = 512000;
        this.apiId = "qegqubqm14";
        this.extract = "yes";
        this.newButtonText = "New Upload";
        this.allowedExtensions = "[\"jpg\", \"png\", \"pdf\"]";
        this.extractJobId = "";
        this.docType = "";
        this.getAllowedExtensions = () => {
            return JSON.parse(this.allowedExtensions);
        };
        // setAllowedExtensions = (arr: any) => {
        //   this.allowedExtensions = JSON.stringify(arr);
        // }
        this.selectedValues = () => {
            const values = [];
            for (var i = 0; i < this.inputArr.length; i++) {
                if (this.inputArr[i]['key'] != null) {
                    if (this.inputArr[i]['arrWords'] != null) {
                        values.push({
                            arrWords: this.inputArr[i]['arrWords'],
                            arrWordsMeta: this.inputArr[i]['arrWordsMeta'],
                            jobId: this.inputArr[i]['jobId'],
                            key: this.inputArr[i]['key'],
                            ext: this.inputArr[i]['ext']
                        });
                    }
                    else if (this.inputArr[i]['jobId'] != null) {
                        values.push({
                            jobId: this.inputArr[i]['jobId'],
                            key: this.inputArr[i]['key'],
                            ext: this.inputArr[i]['ext']
                        });
                    }
                    else if (this.inputArr[i]['ext'] != null) {
                        values.push({
                            key: this.inputArr[i]['key'],
                            ext: this.inputArr[i]['ext']
                        });
                    }
                    else {
                        values.push({
                            key: this.inputArr[i]['key'],
                            ext: this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1]
                        });
                    }
                }
            }
            return values;
        };
        this.inputArr = [];
        this.inputArrInterval = null;
        this.uploadProgressInterval = null;
        this.uploadProgress = { progress: 0 };
        this.uploadProgressReceiver = null;
        this.current = 0;
        this.arrWords = [];
        this.arrWordsMeta = {};
        this.documentParsed = "";
        this.possibleMatches = [];
        this.flow = "";
        // prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {
        //   if(loaderElement != null) {
        //     loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
        //   }
        //   return await Util.callApi(url, data, authorization);
        // }
        this.clearMessages = () => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setError = (msg) => {
            this._SfRowError.style.display = 'flex';
            this._SfRowErrorMessage.innerHTML = msg;
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setSuccess = (msg) => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'flex';
            this._SfRowSuccessMessage.innerHTML = msg;
        };
        this.uploadProgressUpdater = (element, value) => {
            element.querySelector('.progress-number').innerHTML = value + '% Uploaded';
            element.querySelector('.progress-bar-right').style.width = (100 - parseInt(value)) + '%';
            element.querySelector('.progress-bar-left').style.width = value + '%';
        };
        this.renderMessageData = (message, verify) => {
            this._SfMessageContainer.style.display = 'block';
            var html = '';
            html += '<div class="d-flex">';
            html += '<div part="sf-upload-message">' + message + '</div>';
            html += '</div>';
            if (verify.length > 0) {
                html += '<div class="d-flex">';
                html += '<div part="sf-upload-submessage">It must contain following words</div>';
                html += '</div>';
                html += '<div class="d-flex">';
                verify.forEach(verifyWord => {
                    html += '<div class="mr-10 upload-status" part="doctype-verify-badge">' + verifyWord + '</div>';
                });
                html += '</div>';
            }
            this._SfMessageContainer.innerHTML = html;
        };
        this.renderKeyData = (ext, data) => {
            var _a, _b;
            this._SfDetailContainer.style.display = 'block';
            var html = '';
            html += '<div class="d-flex justify-between m-10">';
            html += '<button class="invisible" part="button-icon"><span class="material-icons">close</span></button>';
            html += '<button id="button-detail-cancel" part="button-icon"><span class="material-icons">close</span></button>';
            html += '</div>';
            if (ext == "png" || ext == "jpg") {
                html += '<div class="d-flex justify-center">';
                html += '<img src="' + data + '" alt="picture" />';
                html += '</div>';
            }
            else {
                html += '<div class="d-flex justify-center align-center">';
                html += '<div part="sf-uploader-download-message">File is ready for download!</div>&nbsp;&nbsp;&nbsp;&nbsp;';
                html += '<button part="button-icon" id="download-button"><span class="material-icons">cloud_download</span></button>';
                html += '</div>';
            }
            this._SfDetailContainer.innerHTML = html;
            // console.log('rendering key data', html);
            (_a = this._SfDetailContainer.querySelector('#button-detail-cancel')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this._SfDetailContainer.innerHTML = '';
                this._SfDetailContainer.style.display = 'none';
            });
            (_b = this._SfDetailContainer.querySelector('#download-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = data;
                a.download = "download_" + new Date().getTime() + ".pdf";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        };
        this.chunkify = (base64String) => {
            const chunks = base64String.match(/.{1,4096}/g);
            return chunks;
        };
        this.executeExtract = async (jobId) => {
            var resultExtractStatus;
            do {
                resultExtractStatus = await Api.getExtractStatus(jobId, this.apiId, this._SfLoader, this.setError, this.projectId);
                await Util.sleep(5000);
            } while (resultExtractStatus != null && resultExtractStatus.status == "IN_PROGRESS");
            if (resultExtractStatus != null && resultExtractStatus.status == "SUCCEEDED") {
                this.arrWords = [];
                this.arrWordsMeta = {};
                this.documentParsed = "";
                this.arrWords = JSON.parse(resultExtractStatus.arrWords.S);
                this.arrWordsMeta = JSON.parse(resultExtractStatus.arrWordsMeta.S);
                this.documentParsed = this.docType == "" ? "" : resultExtractStatus.documentParsed ? "yes" : "no";
                this.possibleMatches = this.docType == "" ? [] : resultExtractStatus.documentParsed ? resultExtractStatus.possibleMatches : [];
            }
        };
        this.processExtract = async (key, fileIndex) => {
            // this.extractState.state = 1;
            const resultExtract = await Api.getExtract(key, fileIndex, this.dataPassthrough, this.apiId, this._SfLoader, this.setError, this.callbackUrlHost, this.callbackUrlPath, this.docType, this.projectId);
            const jobId = resultExtract.jobId;
            return jobId;
        };
        this.executeAndUpdateExtract = async (jobId, fileIndex) => {
            await this.executeExtract(jobId);
            this.inputArr[fileIndex]["arrWords"] = this.arrWords;
            this.inputArr[fileIndex]["arrWordsMeta"] = this.arrWordsMeta;
            this.inputArr[fileIndex]["documentParsed"] = this.documentParsed;
            const event2 = new CustomEvent('analysisCompleted', { detail: { meta: this.arrWordsMeta, words: this.arrWords }, bubbles: true, composed: true });
            this.dispatchEvent(event2);
        };
        this.beginUploadJob = (fileIndex, file) => {
            const fileName = file.name;
            const ext = fileName.split(".")[file.name.split(".").length - 1];
            const key = Util.newUuidV4();
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const run = async () => {
                    const chunks = this.chunkify(reader.result);
                    await Api.uploadMeta(key, ext, (chunks === null || chunks === void 0 ? void 0 : chunks.length) + "", this.apiId, this._SfLoader, this.setError, this.projectId);
                    for (var i = 0; i < chunks.length; i++) {
                        this.uploadProgressReceiver = this._SfUploadContainer.querySelector('#upload-row-' + fileIndex);
                        await Api.uploadBlock(key, i + "", chunks[i] + "", this.apiId, this._SfLoader, this.setError, this.projectId);
                        this.uploadProgress.progress = parseInt((((i + 1) * 100) / chunks.length) + "");
                    }
                    for (var i = 0; i < this.inputArr.length; i++) {
                        this.inputArr[i]["progress"] = false;
                    }
                    this.inputArr[fileIndex]["key"] = key;
                    this.inputArr[fileIndex]["ext"] = ext;
                    const keys = [];
                    for (i = 0; i < this.inputArr.length; i++) {
                        if (this.inputArr[i]['key'] != null && this.inputArr[i]['key'].length > 5) {
                            keys.push(this.inputArr[i]['key']);
                        }
                    }
                    const event = new CustomEvent('uploadCompleted', { detail: keys, bubbles: true, composed: true });
                    this.dispatchEvent(event);
                    if (this.extract.toLowerCase() == "yes") {
                        const jobId = await this.processExtract(key, fileIndex);
                        this.inputArr[fileIndex]["jobId"] = jobId;
                        const event1 = new CustomEvent('analysisInProgress', { detail: jobId, bubbles: true, composed: true });
                        this.dispatchEvent(event1);
                        this.executeAndUpdateExtract(jobId, fileIndex);
                    }
                };
                run();
            };
        };
        this.clearUploads = () => {
            this.inputArr = [];
        };
        this.populateInputs = () => {
            var _a, _b, _c, _d, _e, _f;
            var htmlStr = '';
            for (var i = 0; i < this.inputArr.length; i++) {
                htmlStr += '<div part="input" id="upload-row-' + i + '">';
                htmlStr += '<div class="d-flex align-center justify-between flex-wrap">';
                if (this.inputArr[i].file == null) {
                    htmlStr += '<input id="file-' + i + '" type="file" />';
                    htmlStr += '<div class="d-flex align-center justify-between flex-wrap" part="upload-buttons-container">';
                    htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">' + this.docType + '</div>');
                    htmlStr += '<button id="button-delete-' + i + '" part="button-icon"><span class="material-icons">delete</span></button>';
                    htmlStr += '</div>';
                }
                else if (this.inputArr[i]["arrWords"] != null) {
                    const fileName = this.inputArr[i]['file'].name;
                    const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
                    htmlStr += '<div class="w-100 d-flex align-center justify-between">';
                    htmlStr += '<div class="mr-10"><sf-i-elastic-text text="' + fileName + '" minLength="20"></sf-i-elastic-text></div>';
                    htmlStr += '<div class="d-flex align-center" part="upload-buttons-container">';
                    htmlStr += '<button id="button-delete-' + i + '" class="mr-10" part=""><span class="material-icons">delete</span></button>';
                    htmlStr += '<div class="mr-10 upload-status" part="upload-status">Analysis Complete</div>';
                    htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">' + this.docType + '</div>');
                    htmlStr += '<div part="ext-badge" class="ext-badge mr-10">' + ext + '</div>';
                    htmlStr += '<button id="button-open-' + i + '" part="button-icon" class=""><span class="material-icons">open_in_new</span></button>';
                    htmlStr += '</div>';
                    htmlStr += '</div>';
                    htmlStr += '<div part="extracted-meta" class="d-flex align-center mt-10 w-100">';
                    if (this.inputArr[i]["arrWordsMeta"]['PAGE'] != null) {
                        htmlStr += '<div part="extracted-text-chip">' + this.inputArr[i]["arrWordsMeta"]['PAGE'] + ' Page(s)</div>';
                    }
                    else {
                        htmlStr += '<div part="extracted-text-chip">0 Page(s)</div>';
                    }
                    if (this.inputArr[i]["arrWordsMeta"]['LINE'] != null) {
                        htmlStr += '<div part="extracted-text-chip">' + this.inputArr[i]["arrWordsMeta"]['LINE'] + ' Line(s)</div>';
                    }
                    else {
                        htmlStr += '<div part="extracted-text-chip">0 Line(s)</div>';
                    }
                    if (this.inputArr[i]["arrWordsMeta"]['WORD'] != null) {
                        htmlStr += '<div part="extracted-text-chip">' + this.inputArr[i]["arrWordsMeta"]['WORD'] + ' Word(s)</div>';
                    }
                    else {
                        htmlStr += '<div part="extracted-text-chip">0 Word(s)</div>';
                    }
                    htmlStr += this.documentParsed.length > 0 ? (this.documentParsed == "yes" ? ('<div part="extracted-text-chip-parsed" class="d-flex align-center"><span>Document Check Successful</span>&nbsp;&nbsp;<span class="material-symbols-outlined parsing-result">verified</span></div>') : ('<div part="extracted-text-chip-failed" class="d-flex align-center"><span>Document Check Failed</span>&nbsp;&nbsp;<span class="material-symbols-outlined parsing-result">release_alert</span></div>')) : "";
                    htmlStr += '</div>';
                    if (this.documentParsed) {
                        htmlStr += '<div class="mt-20 w-100">';
                        htmlStr += '<div part="matches-title">Possible Matches</div>';
                        htmlStr += '<div part="extracted-meta" class="d-flex align-center w-100">';
                        for (var j = 0; j < this.possibleMatches.length; j++) {
                            htmlStr += ('<div part="matches" class="mr-10">' + this.possibleMatches[j] + '</div>');
                        }
                        htmlStr += '</div>';
                        htmlStr += '</div>';
                    }
                    htmlStr += '<div class="mt-20 w-100">';
                    htmlStr += '<div part="extracted-title">Extracted Text</div>';
                    htmlStr += '<div part="extracted-text" class="d-flex align-center">';
                    htmlStr += '<sf-i-elastic-text text="' + this.inputArr[i]["arrWords"].join(' ') + '" minLength="100"></sf-i-elastic-text>';
                    htmlStr += '</div>';
                    htmlStr += '</div>';
                }
                else if (this.inputArr[i]["jobId"] != null) {
                    const fileName = this.inputArr[i]['file'].name;
                    const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
                    htmlStr += '<div class="mr-10"><sf-i-elastic-text text="' + fileName + '" minLength="20"></sf-i-elastic-text></div>';
                    htmlStr += '<div class="d-flex align-center" part="upload-buttons-container">';
                    htmlStr += '<div class="mr-10 upload-status" part="upload-status">Analyzing</div><div class="mr-10 analyzing-loader"></div>';
                    htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">' + this.docType + '</div>');
                    htmlStr += '<div part="ext-badge" class="ext-badge mr-10">' + ext + '</div>';
                    htmlStr += '</div>';
                }
                else if (this.inputArr[i]["key"] != null) {
                    const fileName = this.inputArr[i]['file'].name;
                    const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
                    htmlStr += '<div class="mr-10"><sf-i-elastic-text text="' + fileName + '" minLength="20"></sf-i-elastic-text></div>';
                    htmlStr += '<div class="d-flex align-center" part="upload-buttons-container">';
                    htmlStr += '<div class="progress-number mr-10 upload-status" part="upload-status"></div>';
                    htmlStr += '<div class="mr-10 upload-status" part="upload-status">Upload Complete</div>';
                    htmlStr += '<div part="ext-badge" class="ext-badge mr-10">' + ext + '</div>';
                    htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">' + this.docType + '</div>');
                    htmlStr += '<button id="button-open-' + i + '" part="button-icon" class=""><span class="material-icons">open_in_new</span></button>';
                    htmlStr += '</div>';
                }
                else {
                    const fileName = this.inputArr[i]['file'].name;
                    const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
                    htmlStr += '<div class="mr-10"><sf-i-elastic-text text="' + fileName + '" minLength="20"></sf-i-elastic-text></div>';
                    htmlStr += '<div class="d-flex align-center" part="upload-buttons-container">';
                    htmlStr += '<div class="progress-number mr-10 upload-status" part="upload-status"></div>';
                    htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">' + this.docType + '</div>');
                    htmlStr += '<div part="ext-badge" class="ext-badge mr-10">' + ext + '</div>';
                    if (this.inputArr[i]["progress"] == null || !this.inputArr[i]["progress"]) {
                        htmlStr += '<button id="button-cancel-' + i + '" part="button-icon" class="mr-10"><span class="material-icons">close</span></button>';
                        htmlStr += '<button id="button-upload-' + i + '" part="button-icon" class="d-flex align-center"><h3 class="m-5">Upload</h3> <span class="material-icons">upload</span></button>';
                    }
                    htmlStr += '</div>';
                }
                htmlStr += '</div>';
                if (this.inputArr[i]["progress"]) {
                    htmlStr += '<div class="d-flex">';
                    htmlStr += '<div class="progress-bar progress-bar-left" id="progress-bar-left-' + i + '"></div>';
                    htmlStr += '<div class="progress-bar progress-bar-right" id="progress-bar-right-' + i + '"></div>';
                    htmlStr += '</div>';
                }
                if (this.inputArr[i].file == null || (this.inputArr[i]["jobId"] == null && this.inputArr[i]["arrWords"] == null && this.inputArr[i]["key"] == null && this.inputArr[i]["progress"] == null)) {
                    htmlStr += '<div id="message-container" class="hide" part="message-container"></div>';
                }
                htmlStr += '</div>';
                if (this.docType.length > 2) {
                    if (this.inputArr[i].file == null || (this.inputArr[i]["jobId"] == null && this.inputArr[i]["arrWords"] == null && this.inputArr[i]["key"] == null && this.inputArr[i]["progress"] == null)) {
                        Api.getMessageByDocType(this.docType, this.apiId, this._SfLoader, this.renderMessageData, this.setError);
                    }
                }
            }
            if (!this.readOnly && this.inputArr.length < parseInt(this.max)) {
                htmlStr += '<button id="button-add" part="button" class="mt-10">' + this.newButtonText + '</button>';
            }
            this._SfUploadContainer.innerHTML = htmlStr;
            (_a = this._SfUploadContainer.querySelector('#button-add')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                if (this.current < this.getMax()) {
                    this.current++;
                    this.inputArr.push({});
                }
            });
            for (i = 0; i < this.inputArr.length; i++) {
                (_b = this._SfUploadContainer.querySelector('#button-delete-' + i)) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (ev) => {
                    const index = ev.currentTarget.id.split("-")[2];
                    this.inputArr.splice(index, 1);
                });
                (_c = this._SfUploadContainer.querySelector('#file-' + i)) === null || _c === void 0 ? void 0 : _c.addEventListener('change', (ev) => {
                    const index = ev.target.id.split("-")[1];
                    const input = ev.target;
                    this.inputArr[index]['file'] = input.files[0];
                    const ext = input.files[0].name.split(".")[input.files[0].name.split(".").length - 1];
                    if (input.files[0].size > this.maxSize) {
                        this.setError('Maximum allowed file size is ' + (this.maxSize / 1024) + ' KB');
                        setTimeout(() => {
                            this.clearMessages();
                            this.inputArr[index] = {};
                        }, 3000);
                        return;
                    }
                    if (!this.getAllowedExtensions().includes(ext.toLowerCase())) {
                        this.setError('This file extension is not allowed');
                        setTimeout(() => {
                            this.clearMessages();
                            this.inputArr[index] = {};
                        }, 3000);
                        return;
                    }
                });
                (_d = this._SfUploadContainer.querySelector('#button-cancel-' + i)) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (ev) => {
                    const index = ev.currentTarget.id.split("-")[2];
                    this.inputArr[index] = "";
                });
                (_e = this._SfUploadContainer.querySelector('#button-upload-' + i)) === null || _e === void 0 ? void 0 : _e.addEventListener('click', (ev) => {
                    const index = ev.currentTarget.id.split("-")[2];
                    for (var i = 0; i < this.inputArr.length; i++) {
                        this.inputArr[i]["progress"] = true;
                    }
                    this.beginUploadJob(index, this.inputArr[index]['file']);
                });
                (_f = this._SfUploadContainer.querySelector('#button-open-' + i)) === null || _f === void 0 ? void 0 : _f.addEventListener('click', (ev) => {
                    const index = ev.currentTarget.id.split("-")[2];
                    Api.getKeyData(this.inputArr[index]['key'], this.apiId, this._SfLoader, this.renderKeyData, this.setError, this.projectId);
                });
            }
        };
        this.processChangeInput = () => {
            this.populateInputs();
        };
        this.processChangeUploadProgress = () => {
            if (this.uploadProgressReceiver != null) {
                this.uploadProgressUpdater(this.uploadProgressReceiver, this.uploadProgress.progress);
            }
        };
        this.initListeners = () => {
            this.inputArrInterval = Util.listenForChange(this.inputArr, this.processChangeInput);
            this.uploadProgressInterval = Util.listenForChange(this.uploadProgress, this.processChangeUploadProgress);
        };
        this.prepopulateInputs = () => {
            const arr = JSON.parse(this.prepopulatedInputArr);
            this.inputArr = [];
            for (var i = 0; i < arr.length; i++) {
                const obj = {};
                obj['key'] = arr[i]['key'];
                obj['file'] = {};
                obj['file']['name'] = arr[i]['key'] + '.' + arr[i]['ext'];
                obj['file']['ext'] = arr[i]['ext'];
                obj['ext'] = arr[i]['ext'];
                if (arr[i]['jobId'] != null) {
                    obj['jobId'] = arr[i]['jobId'];
                }
                if (arr[i]['arrWords'] != null) {
                    obj['arrWords'] = arr[i]['arrWords'];
                    obj['arrWordsMeta'] = arr[i]['arrWordsMeta'];
                }
                this.inputArr.push(obj);
            }
            if (arr.length === 0) {
                this.inputArr = [];
            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]['jobId'] != null && arr[i]['arrWords'] == null) {
                    this.executeAndUpdateExtract(arr[i]['jobId'], i);
                }
            }
        };
        this.loadMode = async () => {
            this.prepopulateInputs();
            this.populateInputs();
            this.initListeners();
        };
    }
    firstUpdated(_changedProperties) {
        this.loadMode();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        if (this.inputArrInterval != null) {
            clearInterval(this.inputArrInterval);
        }
        if (this.uploadProgressInterval != null) {
            clearInterval(this.uploadProgressInterval);
        }
        super.disconnectedCallback();
    }
    render() {
        return html `
          
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div class="SfIUploaderC">
        <div id="upload-container">

        </div>

        <div id="detail-container" class="hide" part="detail-container">

        </div>

      </div>
      <div class="d-flex justify-between">
          <div class="lb"></div>
          <div>
            <div class="div-row-error div-row-submit gone">
              <div part="errormsg" class="div-row-error-message"></div>
            </div>
            <div class="div-row-success div-row-submit gone">
              <div part="successmsg" class="div-row-success-message"></div>
            </div>
          </div>
          <div class="rb"></div>
      </div>
      <div class="d-flex justify-center">
        <div class="loader-element"></div>
      </div>

    `;
    }
};
SfIUploader.styles = css `

    
    .SfIUploaderC {
    }

    .left-sticky {
      left: 0px;
      position: sticky;
    }

    .parsing-result {
      font-size: 120%;
      padding-bottom: 2px;
    }

    .invisible {
      visibility: hidden
    }

    #message-container {
      left: 0px;
      top: 0px;
      overflow-y: auto;
      z-index: 97;
    }

    #detail-container {
      width: 90%;
      margin-left: 5%;
      height: 90vh;
      margin-top: 5vh;
      position: fixed;
      left: 0px;
      top: 0px;
      background-color: #efefef;
      box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25), -1px -1px 10px 0 rgba(255, 255, 255, 0.6);
      border-top: solid 1px rgba(255, 255, 255, 0.3);
      border-left: solid 1px rgba(255, 255, 255, 0.3);
      border-bottom: solid 1px rgba(0, 0, 0, 0.1);
      border-right: solid 1px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      border-radius: 10px;
      z-index: 97;
    }

    .w-100 {
      width: 100%;
    }

    .ext-badge {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      border-radius: 10px;
      border: solid 1px gray;
      color: gray;
      line-height: 100%;
      text-transform: uppercase;
      font-size: 80%;
    }

    .progress-bar {
      height: 3px;
    }

    .progress-bar-left {
      background-color: #20a39e;
      width: 0%;
    }

    .progress-bar-right {
      width: 100%;
    }

    .upload-status {
      color: gray;
    }

    .link {
      text-decoration: underline;
      cursor: pointer;
    }

    .gone {
      display: none
    }

    .loader-element {
      position: fixed;
      right: 10px;
      top: 10px;
      margin-left: 5px;
    }

    .flex-wrap {
      flex-wrap: wrap;
    }

    .td-head {
      text-transform: capitalize;
    }

    .td-body {
      padding: 5px;
    }

    .td-dark {
      background-color: #e9e9e9;
    }

    .td-highlight {
      background-color: black;
      color: white;
    }

    .td-light {
      background-color: #f6f6f6;
    }

    td {
      white-space: nowrap;
    }

    .d-flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .justify-end {
      justify-content: flex-end;
    }

    .flex-grow {
      flex-grow: 1;
    }

    .align-start {
      align-items: flex-start;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-center {
      align-items: center;
    }
    
    .lds-dual-ring {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 50px;
      height: 50px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      background-color: white;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .div-row-error {
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    .bg-white {
      background-color: white;
    }

    .p-5 {
      padding: 5px;
    }

    .m-5 {
      margin: 5px;
    }

    .m-0 {
      margin: 0px;
    }

    .m-20 {
      margin: 20px;
    }

    .mt-20 {
      margin-top: 20px;
    }

    .mb-20 {
      margin-bottom: 20px;
    }

    .ml-20 {
      margin-left: 20px;
    }

    .mr-20 {
      margin-right: 20px;
    }

    .m-10 {
      margin: 20px;
    }

    .mt-10 {
      margin-top: 10px;
    }

    .mb-10 {
      margin-bottom: 10px;
    }

    .ml-10 {
      margin-left: 10px;
    }

    .mr-10 {
      margin-right: 10px;
    }

    @media (orientation: landscape) {

      .lb {
        width: 30%
      }
      .rb {
        width: 30%
      }

    }

    .analyzing-loader {
      width: 20px;
      aspect-ratio: 4;
      --_g: no-repeat radial-gradient(circle closest-side,gray 90%,#0000);
      background: 
        var(--_g) 0%   50%,
        var(--_g) 50%  50%,
        var(--_g) 100% 50%;
      background-size: calc(100%/3) 100%;
      animation: l7 1.5s infinite linear;
    }
    @keyframes l7 {
        33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
        50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
        66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
    }
  `;
__decorate([
    property()
], SfIUploader.prototype, "prepopulatedInputArr", void 0);
__decorate([
    property()
], SfIUploader.prototype, "readOnly", void 0);
__decorate([
    property()
], SfIUploader.prototype, "max", void 0);
__decorate([
    property()
], SfIUploader.prototype, "dataPassthrough", void 0);
__decorate([
    property()
], SfIUploader.prototype, "callbackUrlHost", void 0);
__decorate([
    property()
], SfIUploader.prototype, "callbackUrlPath", void 0);
__decorate([
    property()
], SfIUploader.prototype, "projectId", void 0);
__decorate([
    property()
], SfIUploader.prototype, "maxSize", void 0);
__decorate([
    property()
], SfIUploader.prototype, "apiId", void 0);
__decorate([
    property()
], SfIUploader.prototype, "extract", void 0);
__decorate([
    property()
], SfIUploader.prototype, "newButtonText", void 0);
__decorate([
    property()
], SfIUploader.prototype, "allowedExtensions", void 0);
__decorate([
    property()
], SfIUploader.prototype, "extractJobId", void 0);
__decorate([
    property()
], SfIUploader.prototype, "docType", void 0);
__decorate([
    property()
], SfIUploader.prototype, "flow", void 0);
__decorate([
    query('.div-row-error')
], SfIUploader.prototype, "_SfRowError", void 0);
__decorate([
    query('.div-row-error-message')
], SfIUploader.prototype, "_SfRowErrorMessage", void 0);
__decorate([
    query('.div-row-success')
], SfIUploader.prototype, "_SfRowSuccess", void 0);
__decorate([
    query('.div-row-success-message')
], SfIUploader.prototype, "_SfRowSuccessMessage", void 0);
__decorate([
    query('.loader-element')
], SfIUploader.prototype, "_SfLoader", void 0);
__decorate([
    query('#upload-container')
], SfIUploader.prototype, "_SfUploadContainer", void 0);
__decorate([
    query('#detail-container')
], SfIUploader.prototype, "_SfDetailContainer", void 0);
__decorate([
    query('#message-container')
], SfIUploader.prototype, "_SfMessageContainer", void 0);
__decorate([
    query('#button-add')
], SfIUploader.prototype, "_SfButtonAdd", void 0);
SfIUploader = __decorate([
    customElement('sf-i-uploader')
], SfIUploader);
export { SfIUploader };
//# sourceMappingURL=sf-i-uploader.js.map