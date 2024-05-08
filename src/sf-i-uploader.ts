/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import {LitElement, html, css, PropertyValueMap} from 'lit';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
// import {SfISelect} from 'sf-i-select';
// import {SfISubSelect} from 'sf-i-sub-select';
import {customElement, query, property} from 'lit/decorators.js';
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
@customElement('sf-i-uploader')
export class SfIUploader extends LitElement {
  
  @property()
  prepopulatedInputArr: string = "[]";


  @property()
  readOnly: boolean = false;

  @property()
  max: string = "1";

  @property()
  dataPassthrough: string = "{}";

  @property()
  callbackUrlHost: string = "eoma59bzxizzjlf.m.pipedream.net";

  @property()
  callbackUrlPath: string = "processresult";

  getMax = () => {

    try {
      return parseInt(this.max)
    } catch (e) {
      return 0;
    }

  }


  @property()
  projectId: string = "";

  @property()
  maxSize: number = 512000;

  @property()
  apiId: string = "qegqubqm14";

  @property()
  extract: string = "yes";

  @property()
  newButtonText: string = "New Upload";

  @property()
  allowedExtensions: string = "[\"jpg\", \"png\", \"pdf\"]";

  @property()
  extractJobId: string = "";

  @property()
  docType: string = "";

  getAllowedExtensions = () => {
    return JSON.parse(this.allowedExtensions)
  }

  // setAllowedExtensions = (arr: any) => {
  //   this.allowedExtensions = JSON.stringify(arr);
  // }

  selectedValues = () => {
    const values = [];

    for(var i = 0; i < this.inputArr.length; i++) {
      if(this.inputArr[i]['key'] != null) {

        if(this.inputArr[i]['arrWords'] != null) {
          values.push({
            arrWords: this.inputArr[i]['arrWords'],
            arrWordsMeta: this.inputArr[i]['arrWordsMeta'],
            jobId: this.inputArr[i]['jobId'],
            key: this.inputArr[i]['key'],
            ext: this.inputArr[i]['ext']
          })
        } else if(this.inputArr[i]['jobId'] != null) {
          values.push({
            jobId: this.inputArr[i]['jobId'],
            key: this.inputArr[i]['key'],
            ext: this.inputArr[i]['ext']
          })
        } else if(this.inputArr[i]['ext'] != null) {
          values.push({
            key: this.inputArr[i]['key'],
            ext: this.inputArr[i]['ext']
          })
        } else {
          values.push({
            key: this.inputArr[i]['key'],
            ext: this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1]
          })
        }
      }
    }

    return values;
  }

  inputArr: any[] = [];

  uploadProgress: any = {progress: 0};
  uploadProgressReceiver: any = null;

  current: number = 0;

  arrWords: any = [];
  arrWordsMeta: any = {};
  documentParsed: string = "";
  possibleMatches: Array<string> = [];

  @property()
  flow: string = "";

  static override styles = css`

    
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

  @query('.div-row-error')
  _SfRowError: any;

  @query('.div-row-error-message')
  _SfRowErrorMessage: any;

  @query('.div-row-success')
  _SfRowSuccess: any;

  @query('.div-row-success-message')
  _SfRowSuccessMessage: any;

  @query('.loader-element')
  _SfLoader: any;

  @query('#upload-container')
  _SfUploadContainer: any;

  @query('#detail-container')
  _SfDetailContainer: any;

  @query('#button-add')
  _SfButtonAdd: any;

  // prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    
  //   if(loaderElement != null) {
  //     loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
  //   }
  //   return await Util.callApi(url, data, authorization);

  // }

  clearMessages = () => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setError = (msg: string) => {
    this._SfRowError.style.display = 'flex';
    this._SfRowErrorMessage.innerHTML = msg;
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setSuccess = (msg: string) => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'flex';
    this._SfRowSuccessMessage.innerHTML = msg;
  }

  uploadProgressUpdater = (element: HTMLElement | null, value: string) => {

    element!.querySelector('.progress-number')!.innerHTML = value + '% Uploaded';
    (element!.querySelector('.progress-bar-right') as HTMLDivElement)!.style.width = (100 - parseInt(value)) + '%';
    (element!.querySelector('.progress-bar-left') as HTMLDivElement)!.style.width = value + '%';

  }
  
  renderKeyData = (ext: string, data: string) => {

    (this._SfDetailContainer as HTMLDivElement).style.display = 'block';

    var html = '';

    html += '<div class="d-flex justify-between m-10">';
    html += '<button class="invisible" part="button-icon"><span class="material-icons">close</span></button>'
    html += '<button id="button-detail-cancel" part="button-icon"><span class="material-icons">close</span></button>'
    html += '</div>';

    if(ext == "png" || ext == "jpg") {

      
      html += '<div class="d-flex justify-center">';
      html += '<img src="'+data+'" alt="picture" />'
      html += '</div>';


    } else {

      html += '<div class="d-flex justify-center align-center">';
      html += '<div part="sf-uploader-download-message">File is ready for download!</div>&nbsp;&nbsp;&nbsp;&nbsp;'
      html += '<button part="button-icon" id="download-button"><span class="material-icons">cloud_download</span></button>'
      html += '</div>';

    }

    (this._SfDetailContainer as HTMLDivElement).innerHTML = html;

    // console.log('rendering key data', html);

    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-cancel')?.addEventListener('click', () => {

      (this._SfDetailContainer as HTMLDivElement).innerHTML = '';
      (this._SfDetailContainer as HTMLDivElement).style.display = 'none';

    });

    (this._SfDetailContainer as HTMLDivElement).querySelector('#download-button')?.addEventListener('click', () => {

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = data;
      a.download = "download_"+new Date().getTime()+".pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); 

    });

  }

  chunkify = (base64String: string) => {

    const chunks = base64String.match(/.{1,4096}/g)
    return chunks;

  }

  executeExtract = async (jobId: string) => {

    var resultExtractStatus;

    do {

      resultExtractStatus = await Api.getExtractStatus(jobId, this.apiId, this._SfLoader, this.setError, this.projectId);

      await Util.sleep(5000);

    } while (resultExtractStatus != null && resultExtractStatus.status == "IN_PROGRESS");

    if(resultExtractStatus != null && resultExtractStatus.status == "SUCCEEDED") {

      this.arrWords = [];
      this.arrWordsMeta = {};
      this.documentParsed = "";

      this.arrWords = JSON.parse(resultExtractStatus.arrWords.S);
      this.arrWordsMeta = JSON.parse(resultExtractStatus.arrWordsMeta.S);
      this.documentParsed = this.docType == "" ? "" : resultExtractStatus.documentParsed ? "yes" : "no";
      this.possibleMatches = this.docType == "" ? [] : resultExtractStatus.documentParsed ? resultExtractStatus.possibleMatches : [];

    }

  }

  processExtract = async (key: string, fileIndex: string) => {

    // this.extractState.state = 1;
    const resultExtract = await Api.getExtract(key, fileIndex, this.dataPassthrough, this.apiId, this._SfLoader, this.setError, this.callbackUrlHost, this.callbackUrlPath, this.docType, this.projectId);

    const jobId = resultExtract.jobId;
    return jobId;
  
  }

  executeAndUpdateExtract = async (jobId: string, fileIndex: number) => {

    await this.executeExtract(jobId);
    this.inputArr[fileIndex]["arrWords"] = this.arrWords;
    this.inputArr[fileIndex]["arrWordsMeta"] = this.arrWordsMeta;
    this.inputArr[fileIndex]["documentParsed"] = this.documentParsed;
    const event2 = new CustomEvent('analysisCompleted', {detail: {meta: this.arrWordsMeta, words: this.arrWords}, bubbles: true, composed: true});
    this.dispatchEvent(event2);
    
  }

  beginUploadJob = (fileIndex: any, file: any) => {

    const fileName = file.name;
    const ext = fileName.split(".")[file.name.split(".").length - 1];
    const key = Util.newUuidV4();
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {

      const run = async () => {

        const chunks = this.chunkify(reader.result as string);
        await Api.uploadMeta(key, ext, chunks?.length + "", this.apiId, this._SfLoader, this.setError, this.projectId)
        for(var i = 0; i < chunks!.length; i++) {
          this.uploadProgressReceiver = (this._SfUploadContainer as HTMLDivElement).querySelector('#upload-row-'+fileIndex);
          await Api.uploadBlock(key, i + "", chunks![i] + "", this.apiId, this._SfLoader, this.setError, this.projectId);
          this.uploadProgress.progress = parseInt((((i+1)*100)/chunks!.length) + "");
        }
        for(var i = 0; i < this.inputArr.length; i++) {
          this.inputArr[i]["progress"] = false;
        }
        this.inputArr[fileIndex]["key"] = key;
        this.inputArr[fileIndex]["ext"] = ext;

        const keys = [];
        for(i = 0; i < this.inputArr.length; i++) {
          if(this.inputArr[i]['key'] != null && this.inputArr[i]['key'].length > 5) {
            keys.push(this.inputArr[i]['key']);
          }
        }
        const event = new CustomEvent('uploadCompleted', {detail: keys, bubbles: true, composed: true});
        this.dispatchEvent(event);

        if(this.extract.toLowerCase() == "yes") {

          const jobId = await this.processExtract(key, fileIndex);
          this.inputArr[fileIndex]["jobId"] = jobId;
          const event1 = new CustomEvent('analysisInProgress', {detail: jobId, bubbles: true, composed: true});
          this.dispatchEvent(event1);

          this.executeAndUpdateExtract(jobId, fileIndex);

        }

      }
      run();

    }

  }

  clearUploads = () => {
    this.inputArr = [];    
  }
  

  populateInputs = () => {

    var htmlStr = '';
    
    for(var i = 0; i < this.inputArr.length; i++) {
      htmlStr += '<div part="input" id="upload-row-'+i+'">';
        htmlStr += '<div class="d-flex align-center justify-between flex-wrap">';
        if(this.inputArr[i].file == null) {

          htmlStr += '<input id="file-'+i+'" type="file" />';
          htmlStr += '<div class="d-flex align-center justify-between flex-wrap">';
          htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>')
          htmlStr += '<button id="button-delete-'+i+'" part="button-icon"><span class="material-icons">delete</span></button>';
          htmlStr += '</div>';

        } else if (this.inputArr[i]["arrWords"] != null) {

          const fileName = this.inputArr[i]['file'].name;
          const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
          htmlStr += '<div class="w-100 d-flex align-center justify-between">';
            htmlStr += '<div class="mr-10"><sf-i-elastic-text text="'+fileName+'" minLength="20"></sf-i-elastic-text></div>';
            htmlStr += '<div class="d-flex align-center">';
              htmlStr += '<button id="button-delete-'+i+'" class="mr-10" part=""><span class="material-icons">delete</span></button>';
              htmlStr += '<div class="mr-10 upload-status" part="upload-status">Analysis Complete</div>';
              htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>');
              htmlStr += '<div part="ext-badge" class="ext-badge mr-10">'+ext+'</div>';
              htmlStr += '<button id="button-open-'+i+'" part="button-icon" class=""><span class="material-icons">open_in_new</span></button>';
            htmlStr += '</div>';
          htmlStr += '</div>';
          htmlStr += '<div part="extracted-meta" class="d-flex align-center mt-10 w-100">';
            htmlStr += '<div part="extracted-text-chip">'+this.inputArr[i]["arrWordsMeta"]['PAGE']+' Pages</div>';
            htmlStr += '<div part="extracted-text-chip">'+this.inputArr[i]["arrWordsMeta"]['LINE']+' Lines</div>';
            htmlStr += '<div part="extracted-text-chip">'+this.inputArr[i]["arrWordsMeta"]['WORD']+' Words</div>';
            htmlStr += this.documentParsed.length > 0 ? ( this.documentParsed == "yes" ? ('<div part="extracted-text-chip-parsed" class="d-flex align-center"><span>Document Check Successful</span>&nbsp;&nbsp;<span class="material-symbols-outlined parsing-result">verified</span></div>') : ('<div part="extracted-text-chip-failed" class="d-flex align-center"><span>Document Check Failed</span>&nbsp;&nbsp;<span class="material-symbols-outlined parsing-result">release_alert</span></div>')) : "";
          htmlStr += '</div>'; 
          if(this.documentParsed) {
            htmlStr += '<div class="mt-20 w-100">';
              htmlStr += '<div part="matches-title">Possible Matches</div>';
              htmlStr += '<div part="extracted-meta" class="d-flex align-center w-100">';
                for(var j = 0; j < this.possibleMatches.length; j++) {
                  htmlStr += ('<div part="matches" class="mr-5">'+this.possibleMatches[j]+'</div>');
                }
              htmlStr += '</div>';
            htmlStr += '</div>';
          }
          htmlStr += '<div class="mt-20 w-100">';
            htmlStr += '<div part="extracted-title">Extracted Text</div>';
            htmlStr += '<div part="extracted-text" class="d-flex align-center">';
            htmlStr += '<sf-i-elastic-text text="'+this.inputArr[i]["arrWords"].join(' ')+'" minLength="100"></sf-i-elastic-text>';
            htmlStr += '</div>';
          htmlStr += '</div>';

        } else if (this.inputArr[i]["jobId"] != null) {

          const fileName = this.inputArr[i]['file'].name;
          const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
          htmlStr += '<div class="mr-10"><sf-i-elastic-text text="'+fileName+'" minLength="20"></sf-i-elastic-text></div>';
          htmlStr += '<div class="d-flex align-center">';
          htmlStr += '<div class="mr-10 upload-status" part="upload-status">Analyzing</div><div class="mr-10 mt-10 analyzing-loader"></div>';
          htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>');
          htmlStr += '<div part="ext-badge" class="ext-badge mr-10">'+ext+'</div>';
          htmlStr += '</div>';

        } else if (this.inputArr[i]["key"] != null) {
          const fileName = this.inputArr[i]['file'].name;
          const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
          htmlStr += '<div class="mr-10"><sf-i-elastic-text text="'+fileName+'" minLength="20"></sf-i-elastic-text></div>';
          htmlStr += '<div class="d-flex align-center">';
          htmlStr += '<div class="progress-number mr-10 upload-status" part="upload-status"></div>';
          htmlStr += '<div class="mr-10 upload-status" part="upload-status">Upload Complete</div>';
          htmlStr += '<div part="ext-badge" class="ext-badge mr-10">'+ext+'</div>';
          htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>');
          htmlStr += '<button id="button-open-'+i+'" part="button-icon" class=""><span class="material-icons">open_in_new</span></button>';
          htmlStr += '</div>';
        }else {
          const fileName = this.inputArr[i]['file'].name;
          const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
          htmlStr += '<div class="mr-10"><sf-i-elastic-text text="'+fileName+'" minLength="20"></sf-i-elastic-text></div>';
          htmlStr += '<div class="d-flex align-center">';
          htmlStr += '<div class="progress-number mr-10 upload-status" part="upload-status"></div>';
          htmlStr += (this.docType == "" ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>');
          htmlStr += '<div part="ext-badge" class="ext-badge mr-10">'+ext+'</div>';
          if(this.inputArr[i]["progress"] == null || !this.inputArr[i]["progress"]) {
            htmlStr += '<button id="button-cancel-'+i+'" part="button-icon" class="mr-10"><span class="material-icons">close</span></button>';
            htmlStr += '<button id="button-upload-'+i+'" part="button-icon" class="d-flex align-center"><h3 class="m-5">Upload</h3> <span class="material-icons">upload</span></button>';
          }
          htmlStr += '</div>';
        }
        htmlStr += '</div>';
        if(this.inputArr[i]["progress"]) {
          htmlStr += '<div class="d-flex">'
          htmlStr += '<div class="progress-bar progress-bar-left" id="progress-bar-left-'+i+'"></div>'
          htmlStr += '<div class="progress-bar progress-bar-right" id="progress-bar-right-'+i+'"></div>'
          htmlStr += '</div>'
        }
      htmlStr += '</div>';
      
      
    }

    if(!this.readOnly && this.inputArr.length < parseInt(this.max)) {
      htmlStr += '<button id="button-add" part="button" class="mt-10">'+this.newButtonText+'</button>';
    }

    (this._SfUploadContainer as HTMLDivElement).innerHTML = htmlStr;

    (this._SfUploadContainer as HTMLDivElement).querySelector('#button-add')?.addEventListener('click', () => {
      if(this.current < this.getMax()) {
        this.current++;
        this.inputArr.push({})
      }
      
    });

    for(i = 0; i < this.inputArr.length; i++) {

      (this._SfUploadContainer as HTMLDivElement).querySelector('#button-delete-'+i)?.addEventListener('click', (ev: any) => {
        const index = ev.currentTarget.id.split("-")[2];
        this.inputArr.splice(index, 1)
      });

      (this._SfUploadContainer as HTMLDivElement).querySelector('#file-'+i)?.addEventListener('change', (ev: any) => {
        const index = ev.target.id.split("-")[1];
        const input = (ev.target as HTMLInputElement);
        this.inputArr[index]['file'] = input.files![0];
        const ext = input.files![0].name.split(".")[input.files![0].name.split(".").length - 1]
        if(input.files![0].size > this.maxSize) {
          this.setError('Maximum allowed file size is ' + (this.maxSize/1024) + ' KB');
          setTimeout(() => {
            this.clearMessages();
            this.inputArr[index] = {};
          }, 3000);
          return;
        }

        if(!this.getAllowedExtensions().includes(ext)) {
          this.setError('This file extension is not allowed');
          setTimeout(() => {
            this.clearMessages();
            this.inputArr[index] = {};
          }, 3000);
          return;
        }
      });

      (this._SfUploadContainer as HTMLDivElement).querySelector('#button-cancel-'+i)?.addEventListener('click', (ev: any) => {
        const index = ev.currentTarget.id.split("-")[2];
        this.inputArr[index] = "";
      });

      (this._SfUploadContainer as HTMLDivElement).querySelector('#button-upload-'+i)?.addEventListener('click', (ev: any) => {
        const index = ev.currentTarget.id.split("-")[2];
        for(var i = 0; i < this.inputArr.length; i++) {
          this.inputArr[i]["progress"] = true;
        }
        
        this.beginUploadJob(index, this.inputArr[index]['file']);
      });

      (this._SfUploadContainer as HTMLDivElement).querySelector('#button-open-'+i)?.addEventListener('click', (ev: any) => {
        const index = ev.currentTarget.id.split("-")[2];
        Api.getKeyData(this.inputArr[index]['key'], this.apiId, this._SfLoader, this.renderKeyData, this.setError, this.projectId)
      });

    }

  }

  processChangeInput = () => {
    this.populateInputs();
  }

  processChangeUploadProgress = () => {
    if(this.uploadProgressReceiver != null) {
      this.uploadProgressUpdater(this.uploadProgressReceiver, this.uploadProgress.progress);
    }
  }

  initListeners = () => {

    Util.listenForChange(this.inputArr, this.processChangeInput)
    Util.listenForChange(this.uploadProgress, this.processChangeUploadProgress)

  }

  prepopulateInputs = () => {

    const arr = JSON.parse(this.prepopulatedInputArr);
    
    this.inputArr = [];
    for(var i = 0; i < arr.length; i++) {
      const obj: any = {};
      obj['key'] = arr[i]['key'];
      obj['file'] = {};
      obj['file']['name'] = arr[i]['key'] + '.' + arr[i]['ext'];
      obj['file']['ext'] = arr[i]['ext'];
      obj['ext'] = arr[i]['ext'];
      if(arr[i]['jobId'] != null) {
        obj['jobId'] = arr[i]['jobId']
      }
      if(arr[i]['arrWords'] != null) {
        obj['arrWords'] = arr[i]['arrWords']
        obj['arrWordsMeta'] = arr[i]['arrWordsMeta']
      }
      this.inputArr.push(obj);
    }
    if(arr.length === 0) {
      this.inputArr = [];
    }
    for(var i = 0; i < arr.length; i++) {
      if(arr[i]['jobId'] != null && arr[i]['arrWords'] == null) {
        this.executeAndUpdateExtract(arr[i]['jobId'], i);
      }
    }

  }

  loadMode = async () => {

    this.prepopulateInputs();
    this.populateInputs();
    this.initListeners();

  }

  constructor() {
    super();
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

    this.loadMode();

  }
  
  override connectedCallback() {
    super.connectedCallback()
  }
  
  override render() {

    return html`
          
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

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-i-uploader': SfIUploader;
  }
}
