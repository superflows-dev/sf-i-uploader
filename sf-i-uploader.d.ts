/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
import { LitElement, PropertyValueMap } from 'lit';
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
export declare class SfIUploader extends LitElement {
    prepopulatedInputArr: string;
    mode: string;
    maximize: string;
    hidepreview: string;
    readOnly: boolean;
    max: string;
    dataPassthrough: string;
    callbackUrlHost: string;
    callbackUrlPath: string;
    displayDetail: string;
    getMax: () => number;
    projectId: string;
    maxSize: number;
    apiId: string;
    apiIdRegion: string;
    extract: string;
    newButtonText: string;
    allowedExtensions: string;
    extractableExtensions: string;
    extractJobId: string;
    docType: string;
    chunkSize: number;
    allowDownload: string;
    emailcontent: string;
    getAllowedExtensions: () => any;
    getExtractableExtensions: () => any;
    selectedValues: () => ({
        arrWords: any;
        arrWordsMeta: any;
        jobId: any;
        filename: any;
        key: any;
        ext: any;
    } | {
        jobId: any;
        filename: any;
        key: any;
        ext: any;
        arrWords?: undefined;
        arrWordsMeta?: undefined;
    } | {
        key: any;
        filename: any;
        ext: any;
        arrWords?: undefined;
        arrWordsMeta?: undefined;
        jobId?: undefined;
    })[];
    selectedTexts: () => ({
        arrWords: any;
        arrWordsMeta: any;
        jobId: any;
        filename: any;
        key: any;
        ext: any;
    } | {
        jobId: any;
        filename: any;
        key: any;
        ext: any;
        arrWords?: undefined;
        arrWordsMeta?: undefined;
    } | {
        key: any;
        filename: any;
        ext: any;
        arrWords?: undefined;
        arrWordsMeta?: undefined;
        jobId?: undefined;
    })[];
    inputArr: any[];
    inputArrInterval: any;
    uploadProgressInterval: any;
    uploadProgress: any;
    uploadProgressReceiver: any;
    current: number;
    arrWords: any;
    arrWordsMeta: any;
    documentParsed: Array<string>;
    possibleMatches: Array<Array<string>>;
    matchArr: Array<Array<string>>;
    uploadValid: boolean;
    jobIds: Array<string>;
    flow: string;
    static styles: import("lit").CSSResult;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfLoader: any;
    _SfUploadContainer: any;
    _SfDetailContainer: any;
    _SfMessageContainer: any;
    _SfButtonAdd: any;
    pageNum: number;
    pageRendering: boolean;
    pageNumPending: any;
    pdfDoc: any;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    uploadProgressUpdater: (element: HTMLElement | null, value: string) => void;
    renderMessageData: (message: string, verify: [string], match: [string]) => void;
    renderPdfPage: (num: number, canvas: any, scale: any, ctx: any) => void;
    queueRenderPage: (num: number, canvas: any, scale: any, ctx: any) => void;
    onPrevPage: (canvas: any, scale: any, ctx: any) => void;
    onNextPage: (canvas: any, scale: any, ctx: any) => void;
    private showPasswordModal;
    private isPasswordIncorrect;
    private passwordCallback;
    expandPdfDetail: (ext: string, data: string, fromMaximize?: boolean) => Promise<void>;
    handlePasswordSubmit(): void;
    handlePasswordClose(): void;
    loadWorkerURL: (url: string) => Promise<string>;
    renderMaximize: (ext: string, data: string) => Promise<void>;
    renderDownload: (ext: string, data: string) => Promise<void>;
    renderKeyData: (ext: string, data: string, hidePreview?: boolean) => Promise<void>;
    mimeToExtMap: Record<string, string>;
    downloadBase64: (base64Input: string, fallbackExt?: string, fallbackMime?: string) => void;
    chunkify: (base64String: string) => RegExpMatchArray | null;
    executeExtract: (jobId: string) => Promise<void>;
    processExtract: (key: string, fileIndex: any) => Promise<any>;
    setErrorMaliciousContent: (msg: string, fileIndex: any) => void;
    executeAndUpdateExtract: (jobId: string, fileIndex: number) => Promise<void>;
    beginUploadJob: (fileIndex: any, file: any) => void;
    clearUploads: () => void;
    populateInputs: () => void;
    processChangeInput: () => void;
    processChangeUploadProgress: () => void;
    initListeners: () => void;
    prepopulateInputs: () => void;
    loadMode: () => Promise<void>;
    isUploadValid: () => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-uploader': SfIUploader;
    }
}
//# sourceMappingURL=sf-i-uploader.d.ts.map