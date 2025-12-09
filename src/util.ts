
const validateName = (name: string) => {
    if ((name + "").length > 2) {
        return true;
    }
    return false;
}

const truncate = (str: string, n: number, useWordBoundary: boolean) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n - 1); // the original check
    return (useWordBoundary
        ? subString.slice(0, subString.lastIndexOf(" "))
        : subString) + "&hellip;";
};

const listenForChange = (_var: any, cb: any) => {

    var prevValue = JSON.stringify(_var)

    return setInterval(() => {

        if (JSON.stringify(_var) != prevValue) {
            prevValue = JSON.stringify(_var);
            cb();
        }

    }, 200);

}

export const newUuidV4 = () => {

    var d = new Date().getTime();//Timestamp
    var d2 = 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

}

function readCookie(key: string) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function callApi(url: string, data: string, authorization: any) {

    return new Promise((resolve: any) => {

        const jsonData = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr != null) {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if (authorization != null) {
            xhr.setRequestHeader('Authorization', 'Basic ' + authorization);
        }
        xhr.send(jsonData);

        return xhr;

    })

}

// async function callApiPresignedDelete(url: string) {

//     return new Promise((resolve: any) => {

//         var xhr = new XMLHttpRequest();
//         xhr.addEventListener("readystatechange", () => {
//             if (xhr != null) {
//                 if (xhr.readyState === 4) {
//                     resolve(xhr);
//                 }
//             }
//         });
//         xhr.open("DELETE", url);
//         xhr.timeout = 1800000;
//         xhr.setRequestHeader("Content-Type", "application/json");
//         xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//         xhr.send(null);

//         return xhr;

//     })

// }

async function callApiPresignedDelete(url: string): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("DELETE", url);
        xhr.timeout = 30000; // 30 seconds is usually enough

        // DO NOT set Content-Type unless absolutely necessary
        // For S3 pre-signed DELETE URLs, no headers are usually needed
        // xhr.setRequestHeader("Content-Type", "application/json"); ❌ REMOVE THIS

        // Optional: identify request as AJAX
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
                } else {
                    reject(new Error(`HTTP ${xhr.status}: ${xhr.responseText}`));
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network error"));
        };

        xhr.ontimeout = () => {
            reject(new Error("Request timed out"));
        };

        xhr.send(); // or xhr.send(null);
    });
}


async function callApiPresignedGet(url: string) {

    return new Promise((resolve: any) => {

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr != null) {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("GET", url);
        xhr.timeout = 1800000;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(null);

        return xhr;

    })

}

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    const kb = bytes / 1024;
    if (kb < 1024) {
        return `${kb.toFixed(2)} KB`;
    }

    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
}

const exportFunctions = {
    callApi, callApiPresignedGet, callApiPresignedDelete, validateName, readCookie, listenForChange, truncate, newUuidV4, sleep, formatFileSize
};

export default exportFunctions;