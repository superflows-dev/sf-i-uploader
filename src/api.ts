import Util from './util';

const prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

    if(loaderElement != null) {
        loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

}


const uploadBlock = async (key: string, block: string, data: string, apiId: string, _SfLoader: any, callbackError: any, projectId: string) => {

    let url = "https://"+apiId+".execute-api.us-east-1.amazonaws.com/test/upload";

    const body: any = { "type": "data", "key": key, "data": data, "block": block} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if(projectId.length > 0) {
      body["projectid"] = projectId
    }
    console.log('uploading block', projectId);
    const xhr : any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
    _SfLoader.innerHTML = '';

    if(xhr.status == 200) {
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      callbackError(jsonRespose.error);
    }

  }


const uploadMeta = async (key: string, ext: string, numblocks: string, apiId: string, _SfLoader: any, callbackError: any, projectId: string) => {

    let url = "https://"+apiId+".execute-api.us-east-1.amazonaws.com/test/upload";

    const body: any = { "type": "meta", "key": key, "ext": ext, "numblocks": numblocks} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if(projectId.length > 0) {
      body["projectid"] = projectId
    }
    const xhr : any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
    _SfLoader.innerHTML = '';
    
    if(xhr.status == 200) {
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      callbackError(jsonRespose.error);
    }

}

const getMessageByDocType = async (docType: string, apiId: string, _SfLoader: any, callbackSuccess: any, callbackError: any) => {

  let url = "https://"+apiId+".execute-api.us-east-1.amazonaws.com/test/getmessage";

  const body: any = { "docType": docType} 
  const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
  const xhr : any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
  _SfLoader.innerHTML = '';
  
  if(xhr.status == 200) {

    const jsonRespose = JSON.parse(xhr.responseText);
    callbackSuccess(jsonRespose.message, jsonRespose.verify, jsonRespose.match);
    return;
    
  } else {
    const jsonRespose = JSON.parse(xhr.responseText);
    callbackError(jsonRespose.error)
  }

}

const getExtractStatus = async (jobid: string, apiId: string, _SfLoader: any, callbackError: any, projectId: string) => {

    let url = "https://"+apiId+".execute-api.us-east-1.amazonaws.com/test/getextractstatus";

    const body: any = { "jobid": jobid} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if(projectId.length > 0) {
      body["projectid"] = projectId
    }
    const xhr : any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
    _SfLoader.innerHTML = '';
    
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      return jsonRespose;
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      callbackError(jsonRespose.error)
    }

}

const getExtract = async (key: string, fileIndex: string, dataPassthrough: any, apiId: string, _SfLoader: any, callbackError: any, callbackUrlHost: string, callbackUrlPath: string, docType: string, projectId: string) => {

    let url = "https://"+apiId+".execute-api.us-east-1.amazonaws.com/test/getextract";

    var data: any = {};

    data.fileIndex = fileIndex;
    data.key = key;
    data.data = dataPassthrough;

    const body: any = { "key": key, "datapassthrough": JSON.stringify(data), "callbackurlhost": callbackUrlHost, "callbackurlpath": callbackUrlPath, "doctype": docType};
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if(projectId.length > 0) {
      body["projectid"] = projectId
    }
    const xhr : any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
    _SfLoader.innerHTML = '';
    
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      return jsonRespose;

    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      callbackError(jsonRespose.error);
    }

  }


const getKeyData = async (key: string, apiId: string, _SfLoader: any, callbackSuccess: any, callbackError: any, projectId: string) => {

    let url = "https://"+apiId+".execute-api.us-east-1.amazonaws.com/test/get";

    const body: any = { "key": key} 
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if(projectId.length > 0) {
      body["projectid"] = projectId;
    }
    const xhr : any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
    _SfLoader.innerHTML = '';
    
    if(xhr.status == 200) {

      const jsonRespose = JSON.parse(xhr.responseText);
      callbackSuccess(jsonRespose.ext, jsonRespose.data);
      
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      callbackError(jsonRespose.error);
    }

}

const exportFunctions = {
    uploadBlock, uploadMeta, getExtractStatus, getExtract, getKeyData, prepareXhr, getMessageByDocType
 };
 
 export default exportFunctions;