declare const exportFunctions: {
    uploadBlock: (key: string, block: string, data: string, apiId: string, _SfLoader: any, callbackError: any) => Promise<void>;
    uploadMeta: (key: string, ext: string, numblocks: string, apiId: string, _SfLoader: any, callbackError: any) => Promise<void>;
    getExtractStatus: (jobid: string, apiId: string, _SfLoader: any, callbackError: any) => Promise<any>;
    getExtract: (key: string, fileIndex: string, dataPassthrough: any, apiId: string, _SfLoader: any, callbackError: any, callbackUrlHost: string, callbackUrlPath: string) => Promise<any>;
    getKeyData: (key: string, apiId: string, _SfLoader: any, callbackSuccess: any, callbackError: any) => Promise<void>;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
};
export default exportFunctions;
//# sourceMappingURL=api.d.ts.map