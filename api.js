import Util from './util';
const prepareXhr = async (data, url, loaderElement, authorization) => {
    if (loaderElement != null) {
        loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);
};
const uploadBlock = async (key, block, data, apiId, _SfLoader, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api.us-east-1.amazonaws.com/test/upload";
    const body = { "type": "data", "key": key, "data": data, "block": block };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    console.log('uploading block', projectId);
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    _SfLoader.innerHTML = '';
    if (xhr.status == 200) {
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const uploadMeta = async (key, ext, numblocks, apiId, _SfLoader, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api.us-east-1.amazonaws.com/test/upload";
    const body = { "type": "meta", "key": key, "ext": ext, "numblocks": numblocks };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    _SfLoader.innerHTML = '';
    if (xhr.status == 200) {
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const getMessageByDocType = async (docType, apiId, _SfLoader, callbackSuccess, callbackError) => {
    let url = "https://" + apiId + ".execute-api.us-east-1.amazonaws.com/test/getmessage";
    const body = { "docType": docType };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    _SfLoader.innerHTML = '';
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackSuccess(jsonRespose.message, jsonRespose.verify);
        return;
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const getExtractStatus = async (jobid, apiId, _SfLoader, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api.us-east-1.amazonaws.com/test/getextractstatus";
    const body = { "jobid": jobid };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    _SfLoader.innerHTML = '';
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        return jsonRespose;
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const getExtract = async (key, fileIndex, dataPassthrough, apiId, _SfLoader, callbackError, callbackUrlHost, callbackUrlPath, docType, projectId) => {
    let url = "https://" + apiId + ".execute-api.us-east-1.amazonaws.com/test/getextract";
    var data = {};
    data.fileIndex = fileIndex;
    data.key = key;
    data.data = dataPassthrough;
    const body = { "key": key, "datapassthrough": JSON.stringify(data), "callbackurlhost": callbackUrlHost, "callbackurlpath": callbackUrlPath, "doctype": docType };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    _SfLoader.innerHTML = '';
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        return jsonRespose;
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const getKeyData = async (key, apiId, _SfLoader, callbackSuccess, callbackError, projectId) => {
    let url = "https://" + apiId + ".execute-api.us-east-1.amazonaws.com/test/get";
    const body = { "key": key };
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    if (projectId.length > 0) {
        body["projectid"] = projectId;
    }
    const xhr = (await prepareXhr(body, url, _SfLoader, authorization));
    _SfLoader.innerHTML = '';
    if (xhr.status == 200) {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackSuccess(jsonRespose.ext, jsonRespose.data);
    }
    else {
        const jsonRespose = JSON.parse(xhr.responseText);
        callbackError(jsonRespose.error);
    }
};
const exportFunctions = {
    uploadBlock, uploadMeta, getExtractStatus, getExtract, getKeyData, prepareXhr, getMessageByDocType
};
export default exportFunctions;
//# sourceMappingURL=api.js.map