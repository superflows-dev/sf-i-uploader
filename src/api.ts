import Util from './util';

const prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {

  if (loaderElement != null) {
    loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
  }
  return await Util.callApi(url, data, authorization);

}

const prepareXhrPresignedGet = async (url: string, loaderElement: any, loaderText: string = '') => {


  if (loaderElement != null) {
    loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
  }
  return await Util.callApiPresignedGet(url);

}

const prepareXhrPresignedDelete = async (url: string, loaderElement: any, loaderText: string = '') => {


  if (loaderElement != null) {
    loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
  }
  return await Util.callApiPresignedDelete(url);

}


const uploadBlock = async (key: string, block: string, data: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, projectId: string) => {

  let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/upload";

  const body: any = { "type": "data", "key": key, "data": data, "block": block }
  const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
  if (projectId.length > 0) {
    body["projectid"] = projectId
  }
  console.log('uploading block', projectId);
  const xhr: any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
  if (_SfLoader != null) {
    _SfLoader.innerHTML = '';
  }

  if (xhr.status == 200) {

  } else {
    const jsonRespose = JSON.parse(xhr.responseText);
    callbackError(jsonRespose.error);
  }

}


const uploadMeta = async (key: string, filename: string, ext: string, numblocks: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, projectId: string) => {

  let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/upload";

  const body: any = { "type": "meta", "key": key, "ext": ext, "numblocks": numblocks, "filename": filename }
  const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
  if (projectId.length > 0) {
    body["projectid"] = projectId
  }
  const xhr: any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
  if (_SfLoader != null) {
    _SfLoader.innerHTML = '';
  }

  if (xhr.status == 200) {

  } else {
    const jsonRespose = JSON.parse(xhr.responseText);
    callbackError(jsonRespose.error);
  }

}


const getMessageByDocType = async (docType: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackSuccess: any, callbackError: any) => {

  let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/getmessage";

  const body: any = { "docType": docType }
  const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
  const xhr: any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
  if (_SfLoader != null) {
    _SfLoader.innerHTML = '';
  }

  if (xhr.status == 200) {

    const jsonRespose = JSON.parse(xhr.responseText);
    callbackSuccess(jsonRespose.message, jsonRespose.verify, jsonRespose.match);
    return;

  } else if (xhr.status == 404) {
    console.log('No message found for this docType');
  } else {
    const jsonRespose = JSON.parse(xhr.responseText);
    callbackError(jsonRespose.error)
  }

}

const getExtractStatus = async (jobid: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, projectId: string) => {

  let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/getextractstatus";

  const body: any = { "jobid": jobid }
  const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
  if (projectId.length > 0) {
    body["projectid"] = projectId
  }
  const xhr: any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
  if (_SfLoader != null) {
    _SfLoader.innerHTML = '';
  }

  if (xhr.status == 200) {

    const jsonRespose = JSON.parse(xhr.responseText);
    return jsonRespose;

  } else {
    const jsonRespose = JSON.parse(xhr.responseText);
    callbackError(jsonRespose.error)
  }

}

const getExtract = async (key: string, fileIndex: string, dataPassthrough: any, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, callbackUrlHost: string, callbackUrlPath: string, docType: string, projectId: string, filename: string, emailcontent: string) => {

  let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/getextract";

  var data: any = {};

  data.fileIndex = fileIndex;
  data.key = key;
  data.data = dataPassthrough;

  const body: any = { "key": key, "datapassthrough": JSON.stringify(data), "callbackurlhost": callbackUrlHost, "callbackurlpath": callbackUrlPath, "doctype": docType, "filename": filename, "emailcontent": emailcontent };
  const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
  if (projectId.length > 0) {
    body["projectid"] = projectId
  }
  const xhr: any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
  if (_SfLoader != null) {
    _SfLoader.innerHTML = '';
  }

  if (xhr.status == 200) {

    const jsonRespose = JSON.parse(xhr.responseText);
    return jsonRespose;

  } else {
    const jsonRespose = JSON.parse(xhr.responseText);
    callbackError(jsonRespose.error);
  }

}


const getKeyData = async (key: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackSuccess: any, callbackError: any, projectId: string) => {

  let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/get1";

  const body: any = { "key": key }
  const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
  if (projectId.length > 0) {
    body["projectid"] = projectId;
  }
  const xhr: any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
  if (_SfLoader != null) {
    if (_SfLoader != null) {
      _SfLoader.innerHTML = '';
    }
  }

  if (xhr.status == 200) {

    const jsonRespose = JSON.parse(xhr.responseText);
    console.log(jsonRespose)
    const jsonResponseData = await fetchPresignedUrl(jsonRespose.signedUrlGet, _SfLoader);
    await fetchPresignedUrlDelete(jsonRespose.signedUrlDelete, _SfLoader)
    callbackSuccess(jsonRespose.ext, jsonResponseData.data);

  } else {
    const jsonRespose = JSON.parse(xhr.responseText);
    callbackError(jsonRespose.error);
  }

}

const largeFileWarning = async (fileSize: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, projectId: string) => {

  let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/largefilewarning";

  const body: any = { "filesize": fileSize }
  const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
  if (projectId.length > 0) {
    body["projectid"] = projectId;
  }
  const xhr: any = (await prepareXhr(body, url, _SfLoader, authorization)) as any;
  if (_SfLoader != null) {
    if (_SfLoader != null) {
      _SfLoader.innerHTML = '';
    }
  }

  if (xhr.status == 200) {

    const jsonRespose = JSON.parse(xhr.responseText);
    console.log(jsonRespose)
    // callbackSuccess('Sent successfully');

  } else {
    const jsonRespose = JSON.parse(xhr.responseText);
    callbackError(jsonRespose.error);
  }

}

const fetchPresignedUrl = async (url: string, _SfLoader: HTMLElement) => {
  const xhr: any = (await prepareXhrPresignedGet(url, _SfLoader, 'Downloading')) as any;
  if (_SfLoader != null) {
    _SfLoader.innerHTML = '';
  }
  if (xhr.status == 200) {
    const jsRespose = JSON.parse(xhr.responseText);
    console.log('jsRespose', jsRespose);
    return jsRespose;
  }
}

const fetchPresignedUrlDelete = async (url: string, _SfLoader: HTMLElement) => {
  const xhr: any = (await prepareXhrPresignedDelete(url, _SfLoader)) as any;
  if (_SfLoader != null) {
    _SfLoader.innerHTML = '';
  }
  if (xhr.status == 200) {
    const jsRespose = JSON.parse(xhr.responseText);
    console.log('jsRespose', jsRespose);
    return jsRespose;
  }
}

const exportFunctions = {
  uploadBlock, uploadMeta, getExtractStatus, getExtract, getKeyData, fetchPresignedUrl, fetchPresignedUrlDelete, prepareXhr, prepareXhrPresignedGet, prepareXhrPresignedDelete, getMessageByDocType, largeFileWarning
};

export default exportFunctions;