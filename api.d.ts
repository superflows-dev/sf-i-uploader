declare const exportFunctions: {
    uploadBlock: (key: string, block: string, data: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, projectId: string) => Promise<void>;
    uploadMeta: (key: string, filename: string, ext: string, numblocks: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, projectId: string) => Promise<void>;
    getExtractStatus: (jobid: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, projectId: string) => Promise<any>;
    getExtract: (key: string, fileIndex: string, dataPassthrough: any, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, callbackUrlHost: string, callbackUrlPath: string, docType: string, projectId: string, filename: string, emailcontent: string) => Promise<any>;
    getKeyData: (key: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackSuccess: any, callbackError: any, projectId: string) => Promise<void>;
    fetchPresignedUrl: (url: string, _SfLoader: HTMLElement) => Promise<any>;
    fetchPresignedUrlDelete: (url: string, _SfLoader: HTMLElement) => Promise<any>;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    prepareXhrPresignedGet: (url: string, loaderElement: any, loaderText?: string) => Promise<unknown>;
    prepareXhrPresignedDelete: (url: string, loaderElement: any, loaderText?: string) => Promise<XMLHttpRequest>;
    getMessageByDocType: (docType: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackSuccess: any, callbackError: any) => Promise<void>;
    largeFileWarning: (fileSize: string, apiId: string, apiIdRegion: string, _SfLoader: any, callbackError: any, projectId: string) => Promise<void>;
};
export default exportFunctions;
//# sourceMappingURL=api.d.ts.map