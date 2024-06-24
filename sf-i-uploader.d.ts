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
    dataPassthrough: string;
    callbackUrlHost: string;
    callbackUrlPath: string;
    getMax: () => number;
    projectId: string;
    maxSize: number;
    apiId: string;
    extract: string;
    newButtonText: string;
    allowedExtensions: string;
    extractJobId: string;
    docType: string;
    getAllowedExtensions: () => any;
    selectedValues: () => ({
        arrWords: any;
        arrWordsMeta: any;
        jobId: any;
        key: any;
        ext: any;
    } | {
        jobId: any;
        key: any;
        ext: any;
        arrWords?: undefined;
        arrWordsMeta?: undefined;
    } | {
        key: any;
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
    documentParsed: string;
    possibleMatches: Array<string>;
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
    clearMessages: () => void;
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    uploadProgressUpdater: (element: HTMLElement | null, value: string) => void;
    renderMessageData: (message: string, verify: [string]) => void;
    renderKeyData: (ext: string, data: string) => void;
    chunkify: (base64String: string) => RegExpMatchArray | null;
    executeExtract: (jobId: string) => Promise<void>;
    processExtract: (key: string, fileIndex: string) => Promise<any>;
    executeAndUpdateExtract: (jobId: string, fileIndex: number) => Promise<void>;
    beginUploadJob: (fileIndex: any, file: any) => void;
    clearUploads: () => void;
    populateInputs: () => void;
    processChangeInput: () => void;
    processChangeUploadProgress: () => void;
    initListeners: () => void;
    prepopulateInputs: () => void;
    loadMode: () => Promise<void>;
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