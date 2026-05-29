import Util from './util';
const prepareXhr = async (data, url, loaderElement, authorization) => {
    if (loaderElement != null) {
        loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);
};
const prepareXhrPresignedGet = async (url, loaderElement, loaderText = '') => {
    if (loaderElement != null) {
        loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
        loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
    }
    return await Util.callApiPresignedGet(url);
};
const prepareXhrPresignedDelete = async (url, loaderElement, loaderText = '') => {
    if (loaderElement != null) {
        loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
        loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
    }
    return await Util.callApiPresignedDelete(url);
};
const uploadBlock = async (key, block, data, apiId, apiIdRegion, _SfLoader, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/upload";
    const body = { "type": "data", "key": key, "data": data, "block": block };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    console.log('uploading block', projectId);
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    if (_SfLoader != null) {
        _SfLoader.innerHTML = '';
    }
    if (xhr.status == 200) {
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const uploadMeta = async (key, filename, ext, numblocks, apiId, apiIdRegion, _SfLoader, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/upload";
    const body = { "type": "meta", "key": key, "ext": ext, "numblocks": numblocks, "filename": filename };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    if (_SfLoader != null) {
        _SfLoader.innerHTML = '';
    }
    if (xhr.status == 200) {
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const getMessageByDocType = async (docType, apiId, apiIdRegion, _SfLoader, callbackSuccess, callbackError) => {
    let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/getmessage";
    const body = { "docType": docType };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    if (_SfLoader != null) {
        _SfLoader.innerHTML = '';
    }
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackSuccess(jsonRespose.message, jsonRespose.verify, jsonRespose.match);
        return;
    }
    else if (xhr.status == 404) {
        console.log('No message found for this docType');
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const getExtractStatus = async (jobid, apiId, apiIdRegion, _SfLoader, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/getextractstatus";
    const body = { "jobid": jobid };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    if (_SfLoader != null) {
        _SfLoader.innerHTML = '';
    }
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        return jsonRespose;
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const getExtract = async (key, fileIndex, dataPassthrough, apiId, apiIdRegion, _SfLoader, callbackError, callbackUrlHost, callbackUrlPath, docType, projectId, filename, emailcontent) => {
    let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/getextract";
    var data = {};
    data.fileIndex = fileIndex;
    data.key = key;
    data.data = dataPassthrough;
    const body = { "key": key, "datapassthrough": JSON.stringify(data), "callbackurlhost": callbackUrlHost, "callbackurlpath": callbackUrlPath, "doctype": docType, "filename": filename, "emailcontent": emailcontent };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    if (_SfLoader != null) {
        _SfLoader.innerHTML = '';
    }
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        return jsonRespose;
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const getKeyData = async (key, apiId, apiIdRegion, _SfLoader, callbackSuccess, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/get1";
    const body = { "key": key };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    if (_SfLoader != null) {
        if (_SfLoader != null) {
            _SfLoader.innerHTML = '';
        }
    }
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        console.log(jsonRespose);
        const jsonResponseData = await fetchPresignedUrl(jsonRespose.signedUrlGet, _SfLoader);
        await fetchPresignedUrlDelete(jsonRespose.signedUrlDelete, _SfLoader);
        callbackSuccess(jsonRespose.ext, jsonResponseData.data);
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const largeFileWarning = async (fileSize, apiId, apiIdRegion, _SfLoader, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api." + apiIdRegion + ".amazonaws.com/test/largefilewarning";
    const body = { "filesize": fileSize };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    if (_SfLoader != null) {
        if (_SfLoader != null) {
            _SfLoader.innerHTML = '';
        }
    }
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        console.log(jsonRespose);
        // callbackSuccess('Sent successfully');
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const fetchPresignedUrl = async (url, _SfLoader) => {
    const xhr = (await prepareXhrPresignedGet(url, _SfLoader, 'Downloading'));
    if (_SfLoader != null) {
        _SfLoader.innerHTML = '';
    }
    if (xhr.status == 200) {
        const jsRespose = JSON.parse(xhr.responseText);
        console.log('jsRespose', jsRespose);
        return jsRespose;
    }
};
const fetchPresignedUrlDelete = async (url, _SfLoader) => {
    const xhr = (await prepareXhrPresignedDelete(url, _SfLoader));
    if (_SfLoader != null) {
        _SfLoader.innerHTML = '';
    }
    if (xhr.status == 200) {
        const jsRespose = JSON.parse(xhr.responseText);
        console.log('jsRespose', jsRespose);
        return jsRespose;
    }
};
const exportFunctions = {
    uploadBlock, uploadMeta, getExtractStatus, getExtract, getKeyData, fetchPresignedUrl, fetchPresignedUrlDelete, prepareXhr, prepareXhrPresignedGet, prepareXhrPresignedDelete, getMessageByDocType, largeFileWarning
};
export default exportFunctions;
//# sourceMappingURL=api.js.map