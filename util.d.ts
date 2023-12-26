export declare const newUuidV4: () => string;
declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare function sleep(ms: number): Promise<unknown>;
declare const exportFunctions: {
    callApi: typeof callApi;
    validateName: (name: string) => boolean;
    readCookie: typeof readCookie;
    listenForChange: (_var: any, cb: any) => void;
    truncate: (str: string, n: number, useWordBoundary: boolean) => string;
    newUuidV4: () => string;
    sleep: typeof sleep;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map