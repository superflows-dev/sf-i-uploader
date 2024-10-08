/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */


import {LitElement, html, css, PropertyValueMap} from 'lit';
import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
import Api from './api';
import pdfjs from '@bundled-es-modules/pdfjs-dist';

// pdfjs.GlobalWorkerOptions.workerSrc =
//   '/node_modules/@bundled-es-modules/pdfjs-dist/build/pdf.worker.min.js';
// pdfjs.GlobalWorkerOptions.workerSrc =
//   '/node_modules/@bundled-es-modules/pdfjs-dist/build/pdf.worker.min.js';
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
  // prepopulatedInputArr: string = "[{\"key\":\"2c39a366-1532-49a1-891e-bdcca8d5d215\",\"ext\": \"jpg\"},{\"key\": \"730e310f-5ae6-4641-a2af-eae3a535b6e9\",\"ext\": \"jpg\"}]";
  // prepopulatedInputArr: string = "[{\"key\":\"45f25547-3dce-43e7-bf9e-585fe94a08eb\",\"ext\":\"jpg\"}]";
  // prepopulatedInputArr: string = "[{\"key\":\"b70fead2-0068-4d9a-a210-5e2a0ff469ab\",\"ext\":\"pdf\"}]";
  // prepopulatedInputArr: string = "[{\"key\":\"e59d2652-2dc8-4748-956a-3634553736bc\",\"ext\":\"pdf\"}]";
  // prepopulatedInputArr: string = "[{\"key\":\"b70fead2-0068-4d9a-a210-5e2a0ff469ab\",\"ext\":\"pdf\"},{\"key\":\"430f0879-15c3-4fb5-a011-7616f9f696ee\",\"ext\":\"xlsx\"}]";
  // prepopulatedInputArr: string = "[{\"key\":\"430f0879-15c3-4fb5-a011-7616f9f696ee\",\"ext\":\"xlsx\"}]";
  prepopulatedInputArr: string = "[]";

  
  @property()
  mode: string = "edit";

  @property()
  maximize: string = "no";

  @property()
  hidepreview: string = "no";

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
  extractableExtensions: string = "[\"jpg\", \"png\", \"pdf\"]";

  @property()
  extractJobId: string = "";

  @property()
  docType: string = "";

  @property()
  chunkSize: number = 102800;

  @property()
  allowDownload: string = "no";

  getAllowedExtensions = () => {
    return JSON.parse(this.allowedExtensions)
  }

  getExtractableExtensions = () => {
    return JSON.parse(this.extractableExtensions)
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

  selectedTexts = () => {
    const values = [];

    for(var i = 0; i < this.inputArr.length; i++) {
      if(this.inputArr[i]['key'] != null) {

        if(this.inputArr[i]['arrWords'] != null) {
          values.push(JSON.stringify({
            arrWords: this.inputArr[i]['arrWords'],
            arrWordsMeta: this.inputArr[i]['arrWordsMeta'],
            jobId: this.inputArr[i]['jobId'],
            key: this.inputArr[i]['key'],
            ext: this.inputArr[i]['ext']
          }))
        } else if(this.inputArr[i]['jobId'] != null) {
          values.push(JSON.stringify({
            jobId: this.inputArr[i]['jobId'],
            key: this.inputArr[i]['key'],
            ext: this.inputArr[i]['ext']
          }))
        } else if(this.inputArr[i]['ext'] != null) {
          values.push(JSON.stringify({
            key: this.inputArr[i]['key'],
            ext: this.inputArr[i]['ext']
          }))
        } else {
          values.push(JSON.stringify({
            key: this.inputArr[i]['key'],
            ext: this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1]
          }))
        }
      }
    }

    return values;
  }

  inputArr: any[] = [];

  inputArrInterval: any = null;
  uploadProgressInterval: any = null;

  uploadProgress: any = {progress: 0};
  uploadProgressReceiver: any = null;

  current: number = 0;

  arrWords: any = [];
  arrWordsMeta: any = {};
  documentParsed: Array<string> = [""];
  possibleMatches: Array<Array<string>> = [[]];
  matchArr: Array<Array<string>> = [[]];

  uploadValid = false

  @property()
  flow: string = "";

  static override styles = css`

    
    .SfIUploaderC {
      width: 100%
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
    .pdf-canvas-thumbnail {
      width:200px
    }
    .pdf-canvas {
      // width:90%;
      // margin-left: 5%;
      // mergin-right: 5%;
      align-self: center
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

  @query('#message-container')
  _SfMessageContainer: any;

  @query('#button-add')
  _SfButtonAdd: any;

  // prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    
  //   if(loaderElement != null) {
  //     loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
  //   }
  //   return await Util.callApi(url, data, authorization);

  // }
  pageNum = 1;
  pageRendering = false;
  pageNumPending:any = null;
  pdfDoc:any = null
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
  
  renderMessageData = (message: string, verify: [string], match: [string]) => {

    (this._SfMessageContainer as HTMLDivElement).style.display = 'block';

    var html = '';

    html += '<div class="d-flex">';
    html += '<div part="sf-upload-message">' + message + '</div>'
    html += '</div>';

    if(verify.length > 0){
      html += '<div class="d-flex">';
      html += '<div part="sf-upload-submessage">It must contain following words</div>';
      html += '</div>';
      html += '<div class="d-flex">';
      verify.forEach(verifyWord => {
        html += '<div class="mr-10 upload-status" part="doctype-verify-badge">'+verifyWord+'</div>';  
      });
      html += '</div>';
    }


    (this._SfMessageContainer as HTMLDivElement).innerHTML = html;
    this.matchArr[0] = match
  }

  renderPdfPage = (num:number, canvas: any, scale: any, ctx: any) => {
    this.pageRendering = true;
    // Using promise to fetch the page
    let thisObj = this
    this.pdfDoc.getPage(num).then(function(page:any) {
      var viewport = page.getViewport({scale: scale});
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);

      // Wait for rendering to finish
      
      renderTask.promise.then(function() {
        thisObj.pageRendering = false;
        if (thisObj.pageNumPending !== null) {
          // New page rendering is pending
          thisObj.renderPdfPage(thisObj.pageNumPending, canvas, scale, ctx);
          thisObj.pageNumPending = null;
        }
      });
    });
    console.log("rendering page", this._SfDetailContainer.querySelector('#pdf-page-num'), num)
    if(this._SfDetailContainer.querySelector('#pdf-page-num') != null){
      this._SfDetailContainer.querySelector('#pdf-page-num').innerHTML = num + ""
    }
  }

  queueRenderPage = (num:number, canvas: any, scale: any, ctx: any) => {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPdfPage(num, canvas, scale, ctx);
    }
  }

  onPrevPage = (canvas: any, scale: any, ctx: any)=>{
    if (this.pageNum <= 1) {
      return;
    }
    this.pageNum--;
    this.queueRenderPage(this.pageNum, canvas, scale, ctx);
  }

  onNextPage = (canvas: any, scale: any, ctx: any)=>{
    if (this.pageNum >= this.pdfDoc.numPages) {
      return;
    }
    this.pageNum++;
    this.queueRenderPage(this.pageNum, canvas, scale, ctx);
  }

  expandPdfDetail = async (ext: string, data: string) => {
    let detailHtml = '';
    detailHtml += '<div class="d-flex justify-between align-center m-10" part="details-controls-container">';
      if(this.allowDownload == "yes"){
        detailHtml += '<button part="button-icon" id="download-pdf-button"><span class="material-icons">cloud_download</span></button>'
      }else{
        detailHtml += '<button class="invisible" part="button-icon"><span class="material-icons">close</span></button>'
      }
      detailHtml += '<div id="pdf-controls-container" part="pdf-controls-container" class="d-flex justify-end align-center ml-10 mr-10">'
        detailHtml += '<button id="pdf-prev" part="button-icon"><span class="material-icons">arrow_back</span></button>'
        detailHtml += '<span class="m-5" part="pdf-pages">Page: <span id="pdf-page-num" part="pdf-page-num"></span> / <span id="pdf-page-count" part="pdf-page-count"></span></span>';
        detailHtml += '<button id="pdf-next" part="button-icon"><span class="material-icons">arrow_forward</span></button>'
      detailHtml += '</div>'  
      detailHtml += '<button id="button-detail-cancel" part="button-icon"><span class="material-icons">close</span></button>'
    detailHtml += '</div>';
    detailHtml += '<canvas id="pdf-canvas" class="pdf-canvas mb-20", part="pdf-canvas"></canvas>';

    (this._SfDetailContainer as HTMLDivElement).innerHTML = detailHtml;
    (this._SfDetailContainer as HTMLDivElement).style.display = 'flex';
    (this._SfDetailContainer as HTMLDivElement).querySelector('#download-pdf-button')?.addEventListener('click', () => {

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = data;
      a.download = "download_"+new Date().getTime()+"." + ext;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); 

    });
    (this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-cancel')?.addEventListener('click', () => {

      (this._SfDetailContainer as HTMLDivElement).innerHTML = '';
      (this._SfDetailContainer as HTMLDivElement).style.display = 'none';

    });
    pdfjs.GlobalWorkerOptions.workerSrc = await this.loadWorkerURL("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js");
    const pdfjsLib = pdfjs;
    var loadingTask = pdfjsLib.getDocument({data: atob(data.replace("data:application/pdf;base64,",""))});
    var canvas:any = this._SfDetailContainer.querySelector('#pdf-canvas');
    var ctx = canvas.getContext('2d');
    var scale = 1.2;
    let thisObj = this;
    
    this._SfDetailContainer.querySelector('#pdf-prev')?.addEventListener('click', () => {
      thisObj.onPrevPage(canvas, scale, ctx)
    });
    this._SfDetailContainer.querySelector('#pdf-next')?.addEventListener('click', () => {
      thisObj.onNextPage(canvas, scale, ctx)
    });
    loadingTask.promise.then(function(pdf:any) {
      console.log('PDF loaded', canvas);
      thisObj.pdfDoc = pdf
      thisObj.pageNum = 1,
      thisObj.pageRendering = false;
      thisObj.pageNumPending = null;
      thisObj._SfDetailContainer.querySelector('#pdf-page-count').innerHTML = pdf.numPages + ""
      thisObj._SfDetailContainer.querySelector('#pdf-controls-container').style.display = (pdf.numPages == 1) ? "none" : "flex"
      thisObj.renderPdfPage(thisObj.pageNum, canvas, scale, ctx)
    }, function (reason: any) {
      // PDF loading error
      console.error(reason);
    });
  }
  
  loadWorkerURL = async (url:string) => {
    let cachedJSDfd = new pdfjs.PromiseCapability();
    var xmlhttp: XMLHttpRequest;
    xmlhttp=new XMLHttpRequest();

    //the callback function to be callled when AJAX request comes back
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            var workerJSBlob = new Blob([xmlhttp.responseText], {
                type: "text/javascript"
            });
            cachedJSDfd.resolve(window.URL.createObjectURL(workerJSBlob));
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    return cachedJSDfd.promise;
}

  renderMaximize = async (ext: string, data: string) => {
    if(ext == "png" || ext == "jpg") {
      const contentType: any = (data.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/) ?? [""])[0];

      const byteCharacters = atob(data.substr(`data:${contentType};base64,`.length));
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
          const slice = byteCharacters.slice(offset, offset + 1024);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, {type: contentType});
      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, '_blank');
    }
  }

  renderDownload = async (ext: string, data: string) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = data;
    a.download = "download_"+new Date().getTime()+"." + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); 
  }
  
  renderKeyData = async (ext: string, data: string, hidePreview: boolean = false) => {

    var html = '';
    console.log("key Data", data, ext, this.mode)
    if(this.mode == "view"){
      if(ext == "png" || ext == "jpg") {

        html += '<div class="d-flex justify-center align-center" part="image-container">';
        if(!hidePreview){
          html += '<img src="'+data+'" alt="picture" part="image-component" class="mr-10"/>'
        }
        if(this.maximize == "yes"){
          html += '<button id="button-open-in-new-tab" part="button-icon"><span class="material-icons">open_in_new</span></button>'
        }
        html += '</div>';
        (this._SfUploadContainer as HTMLDivElement).innerHTML = html;
        (this._SfUploadContainer as HTMLDivElement).style.display = 'flex';
        if(this.maximize == "yes"){
          (this._SfUploadContainer.querySelector('#button-open-in-new-tab') as HTMLButtonElement).addEventListener('click',()=>{
            if(hidePreview){
              Api.getKeyData(this.inputArr[0]['key'], this.apiId, this._SfLoader, this.renderMaximize, (errMsg: string)=>{this.setError(errMsg);setTimeout(() => {
                this.clearMessages();
              }, 3000)}, this.projectId)
            }else{
              console.log('opening in new tab')
              
              const contentType: any = (data.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/) ?? [""])[0];

              const byteCharacters = atob(data.substr(`data:${contentType};base64,`.length));
              const byteArrays = [];

              for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                  const slice = byteCharacters.slice(offset, offset + 1024);

                  const byteNumbers = new Array(slice.length);
                  for (let i = 0; i < slice.length; i++) {
                      byteNumbers[i] = slice.charCodeAt(i);
                  }

                  const byteArray = new Uint8Array(byteNumbers);

                  byteArrays.push(byteArray);
              }
              const blob = new Blob(byteArrays, {type: contentType});
              const blobUrl = URL.createObjectURL(blob);

              window.open(blobUrl, '_blank');
            }
            
          })
        }
      }else if(ext == "pdf"){
        html += '<div class="d-flex justify-center align-center" part="pdf-thumbnail-container">';
        if(!hidePreview){
          html += '<canvas id="pdf-canvas-thumbnail" class="pdf-canvas-thumbnail", part="pdf-canvas-thumbnail"></canvas>';
        }
        if(this.maximize == "yes"){
          html += '<button id="button-expand-pdf" part="button-icon"><span class="material-icons">open_in_new</span></button>';
        }
        html += '</div>';
        (this._SfUploadContainer as HTMLDivElement).innerHTML = html;
        console.log(html, (this._SfUploadContainer as HTMLDivElement), (this._SfUploadContainer as HTMLDivElement).innerHTML );
        (this._SfUploadContainer as HTMLDivElement).style.display = 'flex';

        if(this.maximize == "yes"){
          (this._SfUploadContainer.querySelector('#button-expand-pdf') as HTMLButtonElement).addEventListener('click',()=>{
            if(hidePreview){
              Api.getKeyData(this.inputArr[0]['key'], this.apiId, this._SfLoader, this.expandPdfDetail, (errMsg: string)=>{this.setError(errMsg);setTimeout(() => {
                this.clearMessages();
              }, 3000)}, this.projectId)
            }else{
              this.expandPdfDetail(ext, data)
            }
          })
        }
        if(!hidePreview){
          pdfjs.GlobalWorkerOptions.workerSrc = await this.loadWorkerURL("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js");
          const pdfjsLib = pdfjs;
          
          // Using DocumentInitParameters object to load binary data.
          var loadingTask = pdfjsLib.getDocument({data: atob(data.replace("data:application/pdf;base64,",""))});
          
          var canvas:any = this._SfUploadContainer.querySelector('#pdf-canvas-thumbnail');
          var ctx = canvas.getContext('2d');
          var scale = 0.8;
          let thisObj = this;
          
          loadingTask.promise.then(function(pdf:any) {
            console.log('PDF loaded');
            thisObj.pdfDoc = pdf
            thisObj.pageNum = 1,
            thisObj.pageRendering = false;
            thisObj.pageNumPending = null;
            // thisObj._SfUploadContainer.querySelector('#pdf-page-count').innerHTML = pdf.numPages + ""
            // thisObj._SfUploadContainer.querySelector('#pdf-controls-container').style.display = (pdf.numPages == 1) ? "none" : "block"
            thisObj.renderPdfPage(thisObj.pageNum, canvas, scale, ctx)
          }, function (reason: any) {
            // PDF loading error
            console.error(reason);
          });
        }
      }else if(this.maximize == "yes"){
        html += '<div class="d-flex justify-center align-center">';
        html += '<button class="d-flex justify-center align-center" part="button-icon" id="download-button"><span>Download </span><span class="material-icons ml-10">cloud_download</span></button>'
        html += '</div>';

        (this._SfUploadContainer as HTMLDivElement).innerHTML = html;
        (this._SfUploadContainer as HTMLDivElement).style.display = 'flex';
        (this._SfUploadContainer as HTMLDivElement).querySelector('#download-button')?.addEventListener('click', () => {
          if(hidePreview){
            Api.getKeyData(this.inputArr[0]['key'], this.apiId, this._SfLoader, this.renderDownload, (errMsg: string)=>{this.setError(errMsg);setTimeout(() => {
              this.clearMessages();
            }, 3000)}, this.projectId)
          }else{
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = data;
            a.download = "download_"+new Date().getTime()+"." + ext;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a); 
          }
  
        });
      }
    }else{
      (this._SfDetailContainer as HTMLDivElement).style.display = 'flex';
      let flagSetHtml = true;
      html += '<div class="d-flex justify-between m-10">';
      html += '<button class="invisible" part="button-icon"><span class="material-icons">close</span></button>'
      html += '<button id="button-detail-cancel" part="button-icon"><span class="material-icons">close</span></button>'
      html += '</div>';

      if(ext == "png" || ext == "jpg") {

        
        html += '<div class="d-flex justify-center">';
        html += '<img src="'+data+'" alt="picture" />'
        html += '</div>';


      } else if(ext == "pdf"){
        this.expandPdfDetail(ext, data)
        flagSetHtml = false
      } else {

        html += '<div class="d-flex justify-center align-center">';
        html += '<div part="sf-uploader-download-message">File is ready for download!</div>&nbsp;&nbsp;&nbsp;&nbsp;'
        html += '<button part="button-icon" id="download-button"><span class="material-icons">cloud_download</span></button>'
        html += '</div>';

      }

      if(flagSetHtml){
        (this._SfDetailContainer as HTMLDivElement).innerHTML = html;
      }

      // console.log('rendering key data', html);

      (this._SfDetailContainer as HTMLDivElement).querySelector('#button-detail-cancel')?.addEventListener('click', () => {

        (this._SfDetailContainer as HTMLDivElement).innerHTML = '';
        (this._SfDetailContainer as HTMLDivElement).style.display = 'none';

      });

      (this._SfDetailContainer as HTMLDivElement).querySelector('#download-button')?.addEventListener('click', () => {

        const a = document.createElement("a");
        a.style.display = "none";
        a.href = data;
        a.download = "download_"+new Date().getTime()+"." + ext;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); 

      });
    }

  }

  chunkify = (base64String: string) => {
    let regex = new RegExp(`.{1,${this.chunkSize}}`,'g')
    const chunks = base64String.match(regex)
    return chunks;

  }

  executeExtract = async (jobId: string) => {

    var resultExtractStatus;

    do {

      resultExtractStatus = await Api.getExtractStatus(jobId, this.apiId, this._SfLoader, this.setError, this.projectId);
      console.log(resultExtractStatus)
      await Util.sleep(5000);

    } while (resultExtractStatus != null && resultExtractStatus.status == "IN_PROGRESS");

    if(resultExtractStatus != null && resultExtractStatus.status == "SUCCEEDED") {
      let index = 0
      for (let i = 0; i < this.inputArr.length; i++) {
        if(this.inputArr[i]['jobId'] == jobId){
          index = i;
          break;
        }
      }
      this.arrWords = [];
      this.arrWordsMeta = {};
      this.documentParsed[index] = "";

      this.arrWords = JSON.parse(resultExtractStatus.arrWords.S);
      this.arrWordsMeta = JSON.parse(resultExtractStatus.arrWordsMeta.S);
      this.documentParsed[index] = this.docType == "" ? "" : resultExtractStatus.documentParsed ? "yes" : "no";
      this.possibleMatches[index] = this.docType == "" ? [] : resultExtractStatus.documentParsed ? resultExtractStatus.possibleMatches : [];

    }

  }

  processExtract = async (key: string, fileIndex: string) => {

    // this.extractState.state = 1;
    const resultExtract = await Api.getExtract(key, fileIndex, this.dataPassthrough, this.apiId, this._SfLoader, this.setError, this.callbackUrlHost, this.callbackUrlPath, parseInt(fileIndex) == 0 ? this.docType : "", this.projectId);

    const jobId = resultExtract.jobId;
    return jobId;
  
  }

  executeAndUpdateExtract = async (jobId: string, fileIndex: number) => {

    await this.executeExtract(jobId);
    let index = 0
      for (let i = 0; i < this.inputArr.length; i++) {
        if(this.inputArr[i]['jobId'] == jobId){
          index = i;
          break;
        }
      }
    this.inputArr[fileIndex]["arrWords"] = this.arrWords;
    this.inputArr[fileIndex]["arrWordsMeta"] = this.arrWordsMeta;
    this.inputArr[fileIndex]["documentParsed"] = this.documentParsed[index];
    const event2 = new CustomEvent('analysisCompleted', {detail: {meta: this.arrWordsMeta, words: this.arrWords}, bubbles: true, composed: true});
    this.dispatchEvent(event2);
    this.isUploadValid()
  }

  beginUploadJob = (fileIndex: any, file: any) => {

    const fileName = file.name;
    const ext = fileName.split(".")[file.name.split(".").length - 1].toLowerCase();
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

        if(this.extract.toLowerCase() == "yes" && this.getExtractableExtensions().indexOf(ext) >= 0) {

          const jobId = await this.processExtract(key, fileIndex);
          this.inputArr[fileIndex]["jobId"] = jobId;
          const event1 = new CustomEvent('analysisInProgress', {detail: jobId, bubbles: true, composed: true});
          this.dispatchEvent(event1);

          this.executeAndUpdateExtract(jobId, fileIndex);

        }

        this.isUploadValid()

      }
      run();

    }

  }

  clearUploads = () => {
    this.inputArr = [];    
  }
  

  populateInputs = () => {

    var htmlStr = '';
    if(this.mode == "view"){
      console.log("populating view input", this.inputArr, this.projectId)
      if(this.inputArr.length > 0){
        if(this.hidepreview == "yes"){
          this.renderKeyData(this.inputArr[0]['ext'],"", true);
        }else{
          Api.getKeyData(this.inputArr[0]['key'], this.apiId, this._SfLoader, this.renderKeyData, (errMsg: string)=>{this.setError(errMsg);setTimeout(() => {
            this.clearMessages();
          }, 3000)}, this.projectId)
        }
      }
      // for(var i = 0; i < this.inputArr.length; i++){
      //   if(this.inputArr[i].file == null) {
      //     //no file

      //   } else if (this.inputArr[i]["arrWords"] != null) {

      //     // file with analysis complete

      //   } else if (this.inputArr[i]["jobId"] != null) {

      //     //file with analysis not complete

      //   } else if (this.inputArr[i]["key"] != null) {
      //     // file with upload complete
      //   }
      // }
    }else{
      for(var i = 0; i < this.inputArr.length; i++) {
        htmlStr += '<div part="input" id="upload-row-'+i+'">';
          htmlStr += '<div class="d-flex align-center justify-between flex-wrap">';
          if(this.inputArr[i].file == null) {

            htmlStr += '<input id="file-'+i+'" type="file" />';
            htmlStr += '<div class="d-flex align-center justify-between flex-wrap" part="upload-buttons-container">';
            htmlStr += (this.docType == "" || i > 0 ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>')
            htmlStr += '<button id="button-delete-'+i+'" part="button-icon"><span class="material-icons">delete</span></button>';
            htmlStr += '</div>';

          } else if (this.inputArr[i]["arrWords"] != null) {

            const fileName = this.inputArr[i]['file'].name;
            const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
            htmlStr += '<div class="w-100 d-flex align-center justify-between">';
              htmlStr += '<div class="mr-10"><sf-i-elastic-text text="'+fileName+'" minLength="20"></sf-i-elastic-text></div>';
              htmlStr += '<div class="d-flex align-center" part="upload-buttons-container">';
                // htmlStr += '<button id="button-delete-'+i+'" class="mr-10" part=""><span class="material-icons">delete</span></button>';
                htmlStr += '<div class="mr-10 upload-status" part="upload-status">Analysis Complete</div>';
                htmlStr += (this.docType == "" || i > 0? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>');
                htmlStr += '<div part="ext-badge" class="ext-badge mr-10">'+ext+'</div>';
                if(this.inputArr[i]["delete"]){
                  htmlStr += '<button id="button-delete-file-cancel-'+i+'" part="button-icon" class="button-icon"><span class="material-icons">close</span></button>'
                  htmlStr += '<button id="button-delete-file-confirm-'+i+'" part="button-icon" class="button-icon"><span class="material-icons">delete</span><span class="material-icons">done</span></button>'
                }else{
                  htmlStr += '<button id="button-delete-file-'+i+'" part="button-icon" class="button-icon"><span class="material-icons">delete</span></button>'
                  htmlStr += '<button id="button-open-'+i+'" part="button-icon" class=""><span class="material-icons">open_in_new</span></button>';
                }
              htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '<div part="extracted-meta" class="d-flex align-center mt-10 w-100">';
              if(this.inputArr[i]["arrWordsMeta"]['PAGE'] != null){
                htmlStr += '<div part="extracted-text-chip">'+this.inputArr[i]["arrWordsMeta"]['PAGE'] +' Page(s)</div>';
              }else{
                htmlStr += '<div part="extracted-text-chip">0 Page(s)</div>';
              }
              if(this.inputArr[i]["arrWordsMeta"]['LINE'] != null){
                htmlStr += '<div part="extracted-text-chip">'+this.inputArr[i]["arrWordsMeta"]['LINE'] +' Line(s)</div>';
              }else{
                htmlStr += '<div part="extracted-text-chip">0 Line(s)</div>';
              }
              if(this.inputArr[i]["arrWordsMeta"]['WORD'] != null){
                htmlStr += '<div part="extracted-text-chip">'+this.inputArr[i]["arrWordsMeta"]['WORD'] +' Word(s)</div>';
              }else{
                htmlStr += '<div part="extracted-text-chip">0 Word(s)</div>';
              }
              htmlStr += i == 0 ? this.documentParsed[i].length > 0 ? ( this.documentParsed[i] == "yes" ? ('<div part="extracted-text-chip-parsed" class="d-flex align-center"><span>Document Check Successful</span>&nbsp;&nbsp;<span class="material-symbols-outlined parsing-result">verified</span></div>') : ('<div part="extracted-text-chip-failed" class="d-flex align-center"><span>Document Check Failed</span>&nbsp;&nbsp;<span class="material-symbols-outlined parsing-result">release_alert</span></div>')) : "" : "";
            htmlStr += '</div>'; 
            if(this.documentParsed[i] && this.matchArr[0].length > 0 && this.possibleMatches[i].length > 0) {
              htmlStr += '<div class="mt-20 w-100">';
                htmlStr += '<div part="matches-title">Possible Matches</div>';
                htmlStr += '<div part="extracted-meta" class="d-flex align-center w-100">';
                  for(var j = 0; j < this.possibleMatches[i].length; j++) {
                    htmlStr += ('<div part="matches" class="mr-10">'+this.possibleMatches[i][j]+'</div>');
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
            htmlStr += '<div class="d-flex align-center" part="upload-buttons-container">';
            htmlStr += '<div class="mr-10 upload-status" part="upload-status">Analyzing</div><div class="mr-10 analyzing-loader"></div>';
            htmlStr += (this.docType == "" || i > 0 ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>');
            htmlStr += '<div part="ext-badge" class="ext-badge mr-10">'+ext+'</div>';
            htmlStr += '</div>';

          } else if (this.inputArr[i]["key"] != null) {
            const fileName = this.inputArr[i]['file'].name;
            const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
            htmlStr += '<div class="mr-10"><sf-i-elastic-text text="'+fileName+'" minLength="20"></sf-i-elastic-text></div>';
            htmlStr += '<div class="d-flex align-center" part="upload-buttons-container">';
            htmlStr += '<div class="progress-number mr-10 upload-status" part="upload-status"></div>';
            htmlStr += '<div class="mr-10 upload-status" part="upload-status">Upload Complete</div>';
            htmlStr += '<div part="ext-badge" class="ext-badge mr-10">'+ext+'</div>';
            htmlStr += (this.docType == "" || i > 0 ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>');
            if(this.inputArr[i]["delete"]){
              htmlStr += '<button id="button-delete-file-cancel-'+i+'" part="button-icon" class="mr-10 button-icon"><span class="material-icons">close</span></button>'
              htmlStr += '<button id="button-delete-file-confirm-'+i+'" part="button-icon" class="button-icon"><span class="material-icons">delete</span><span class="material-icons">done</span></button>'
            }else{
              if(this.extract.toLowerCase() != "yes" && this.getExtractableExtensions().indexOf(ext) < 0){
                htmlStr += '<button id="button-delete-file-'+i+'" part="button-icon" class="mr-10 button-icon"><span class="material-icons">delete</span></button>'
                
              }
              htmlStr += '<button id="button-open-'+i+'" part="button-icon" class=""><span class="material-icons">open_in_new</span></button>';
            }
            htmlStr += '</div>';
            
          }else {
            const fileName = this.inputArr[i]['file'].name;
            const ext = this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1];
            htmlStr += '<div class="mr-10"><sf-i-elastic-text text="'+fileName+'" minLength="20"></sf-i-elastic-text></div>';
            htmlStr += '<div class="d-flex align-center" part="upload-buttons-container">';
            htmlStr += '<div class="progress-number mr-10 upload-status" part="upload-status"></div>';
            htmlStr += (this.docType == "" || i > 0 ? "" : '<div class="mr-10 upload-status" part="doctype-badge">'+this.docType+'</div>');
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

          if(this.inputArr[i].file != null && this.getExtractableExtensions().indexOf(this.inputArr[i]['file'].name.split(".")[this.inputArr[i]['file'].name.split(".").length - 1]) < 0){
            htmlStr += '<div id="disclaimer-message-container" part="disclaimer-message-container">Text analysis is not supported for this file type.</div>'
          }
          if(this.inputArr[i].file == null || (this.inputArr[i]["jobId"] == null && this.inputArr[i]["arrWords"] == null && this.inputArr[i]["key"] == null && this.inputArr[i]["progress"] == null)){
            htmlStr += '<div id="message-container" class="hide" part="message-container"></div>'
          }
        htmlStr += '</div>';
        if(this.docType.length > 2 && i == 0) {
          if(this.inputArr[i].file == null || (this.inputArr[i]["jobId"] == null && this.inputArr[i]["arrWords"] == null && this.inputArr[i]["key"] == null && this.inputArr[i]["progress"] == null)){
            Api.getMessageByDocType(this.docType,this.apiId, this._SfLoader, this.renderMessageData, this.setError);
          }
        }
      }
    
      if(!this.readOnly && this.inputArr.length < parseInt(this.max) && this.mode != "view") {
        htmlStr += '<button id="button-add" part="button" class="mt-10">'+this.newButtonText+'</button>';
      }
      if((this._SfUploadContainer as HTMLDivElement) == null){
        return;
      }
      (this._SfUploadContainer as HTMLDivElement).innerHTML = htmlStr;

      (this._SfUploadContainer as HTMLDivElement).querySelector('#button-add')?.addEventListener('click', () => {
        if(this.current < this.getMax()) {
          this.current++;
          this.inputArr.push({})
        }
        this.isUploadValid()
      });

      for(i = 0; i < this.inputArr.length; i++) {

        (this._SfUploadContainer as HTMLDivElement).querySelector('#button-delete-'+i)?.addEventListener('click', (ev: any) => {
          const index = ev.currentTarget.id.split("-")[2];
          this.inputArr.splice(index, 1)
          this.isUploadValid()
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

          if(!this.getAllowedExtensions().includes(ext.toLowerCase())) {
            this.setError('This file extension is not allowed');
            setTimeout(() => {
              this.clearMessages();
              this.inputArr[index] = {};
            }, 3000);
            return;
          }
        });
        
        (this._SfUploadContainer as HTMLDivElement).querySelector('#button-delete-file-'+i)?.addEventListener('click', (ev:any) => {
          const index = ev.currentTarget.id.split("-")[3];
          console.log('button clicked', index)
          this.inputArr[index]['delete'] = true
        });
        (this._SfUploadContainer as HTMLDivElement).querySelector('#button-delete-file-cancel-'+i)?.addEventListener('click', (ev:any) => {
          const index = ev.currentTarget.id.split("-")[4];
          this.inputArr[index]['delete'] = false
        });
        (this._SfUploadContainer as HTMLDivElement).querySelector('#button-delete-file-confirm-'+i)?.addEventListener('click', (ev:any) => {
          const index = ev.currentTarget.id.split("-")[4];
          console.log("confirming delete", index, this.inputArr[index])
          this.inputArr.splice(index, 1)
          this.isUploadValid()
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
          Api.getKeyData(this.inputArr[index]['key'], this.apiId, this._SfLoader, this.renderKeyData, (errMsg: string)=>{this.setError(errMsg);setTimeout(() => {
            this.clearMessages();
          }, 3000)}, this.projectId)
        });

      }
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

    this.inputArrInterval = Util.listenForChange(this.inputArr, this.processChangeInput)
    this. uploadProgressInterval = Util.listenForChange(this.uploadProgress, this.processChangeUploadProgress)

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

    if(this.mode == "view"){
      console.log("uploader view mode")
    }

  }

  loadMode = async () => {

    this.prepopulateInputs();
    this.populateInputs();
    this.initListeners();
    this.isUploadValid();
  }

  isUploadValid = async () => {
    let flag = true
    if(this.inputArr.length === 0){
      flag = false
    }else{
      for(var j = 0; j < this.inputArr.length; j++) {
        if(this.inputArr[j].file == null) {
          flag = false
          break
        } else if (this.inputArr[j]["arrWords"] != null) {

        } else if (this.inputArr[j]["jobId"] != null) {
          if(this.extract.toLowerCase() == "yes" && this.getExtractableExtensions().indexOf(this.inputArr[j]["ext"]) >= 0){
            flag = false;
            break
          }
        } else if (this.inputArr[j]["key"] != null) {
          if(this.extract.toLowerCase() == "yes" && this.getExtractableExtensions().indexOf(this.inputArr[j]["ext"]) >= 0){
            flag = false;
            break;
          }
          
        }else {
          flag = false
          break;
        }
      }
    }
    console.log("isUploadVaid called", flag, this.inputArr);
    this.uploadValid = flag
    const event = new CustomEvent('uploadValid', {detail: {uploadValid: this.uploadValid}, bubbles: true, composed: true});
    this.dispatchEvent(event);
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

  override disconnectedCallback() {
    if(this.inputArrInterval != null){
      clearInterval(this.inputArrInterval);
    }
    if(this.uploadProgressInterval != null){
      clearInterval(this.uploadProgressInterval);
    }
    super.disconnectedCallback()
  }
  
  override render() {
    if(this.mode == "view"){
      if(this.hidepreview == "yes"){
        return html`
              
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <div class="SfIUploaderC">
            <div id="upload-container">

            </div>
            <div id="detail-container" class="hide d-flex flex-col" part="detail-container">

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
      }else{
        return html`
              
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <div class="SfIUploaderC">
            <div id="upload-container">

            </div>
            <div id="detail-container" class="hide d-flex flex-col" part="detail-container">

            </div>
          </div>
        `;
      }
    }else{
      return html`
            
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <div class="SfIUploaderC">
          <div id="upload-container">

          </div>

          <div id="detail-container" class="hide d-flex flex-col" part="detail-container">

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

}

declare global {
  interface HTMLElementTagNameMap {
    'sf-i-uploader': SfIUploader;
  }
}
