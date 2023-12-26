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
    readOnly: boolean;
    max: string;
    getMax: () => number;
    maxSize: number;
    apiId: string;
    extract: string;
    allowedExtensions: string;
    extractedWords: string;
    extractJobId: string;
    getAllowedExtensions: () => any;
    setAllowedExtensions: (arr: any) => void;
    getExtractedWords: () => any;
    setExtractedWords: (arr: any) => void;
    selectedValues: () => {
        key: any;
        ext: any;
    }[];
    inputArr: any[];
    uploadProgress: any;
    uploadProgressReceiver: any;
    extractState: any;
    current: number;
    arrWords: any;
    arrWordsMeta: any;
    flow: string;
    static styles: import("lit").CSSResult;
    _SfRowError: any;
    _SfRowErrorMessage: any;
    _SfRowSuccess: any;
    _SfRowSuccessMessage: any;
    _SfLoader: any;
    _SfUploadContainer: any;
    _SfDetailContainer: any;
    _SfButtonAdd: any;
    prepareXhr: (data: any, url: string, loaderElement: any, authorization: any) => Promise<unknown>;
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    uploadProgressUpdater: (element: HTMLElement, value: string) => void;
    renderKeyData: (ext: string, data: string) => void;
    getKeyData: (key: string) => Promise<void>;
    getExtract: (key: string) => Promise<any>;
    getExtractStatus: (jobid: string) => Promise<any>;
    uploadMeta: (key: string, ext: string, numblocks: string) => Promise<void>;
    uploadBlock: (key: string, block: string, data: string) => Promise<void>;
    chunkify: (base64String: string) => RegExpMatchArray | null;
    executeExtract: (jobId: string) => Promise<void>;
    processExtract: (key: string) => Promise<any>;
    beginUploadJob: (fileIndex: any, file: any) => void;
    clearUploads: () => void;
    populateInputs: () => void;
    processChangeInput: () => void;
    processChangeUploadProgress: () => void;
    processExtractState: () => void;
    initListeners: () => void;
    prepopulateInputs: () => void;
    loadMode: () => Promise<void>;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sf-i-uploader': SfIUploader;
    }
}
//# sourceMappingURL=sf-i-uploader.d.ts.map