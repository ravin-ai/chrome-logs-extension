document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(document.location.search);
    const str = params.get('str');
    if (str) {
        actionQuery(str);
    } else {
        actionClickedExtention();
    }

}, false);

const actionQuery = (str) => {
    const objLike = convertStrToObjLike(str, 'html_collapse');
    document.getElementById("output").appendChild(objLike);
    // document.getElementById("output").innerHTML = objLike;
}

const actionClickedExtention = () => {
    chrome.tabs.executeScript({
        code: `document.getElementById("microConsole-Logs").contentWindow.getSelection().toString()`
    }, function (selection) {
        const objLike = convertStrToObjLike(selection[0], 'string');
        document.getElementById("output").innerHTML = objLike;
    });
}

const findAndParseStrToJson = (str) => {
    let parsed = null;

    const start = str.indexOf('{');
    const end = str.lastIndexOf('}');
    if ((start < 0) || (end < 0)) {
        // json not valid
    } else {
        try {
            parsed = JSON.parse(str.substring(start, end + 1));
        } catch (error) {
            // failed to find and convert string to json
        }
    }
    return parsed;
}

const convertStrToObjLike = (str, returnType) => {
    let objLike = null;
    try {
        const selectionObj = findAndParseStrToJson(str) || {str, msgErr: "Cannot convert string to json"};

        if (selectionObj['meta']) {
            selectionObj['meta'] = JSON.parse(selectionObj['meta']);
        }

        if (selectionObj['msg']) {
            const msgObj = findAndParseStrToJson(selectionObj['msg']);
            if (msgObj) {
                selectionObj['msgObj'] = msgObj;
            } else {
                if (selectionObj['msg'].includes('|')) {
                    const msgArr = selectionObj['msg'].split('|').map(cell => cell.trim());
                    selectionObj['msgArr'] = msgArr;
                }
            }
        }

        // if (selectionObj['msg']?.startsWith(`amqp::post to queue`)) {
        //     const startMessage = str.indexOf(`message: {`);
        //     const endMessage = str.indexOf(`}, priority:`);
        //
        //     if (endMessage < 0) return;
        //
        //     const messageLength = (endMessage - 8) - startMessage;
        //     const message = str.substr(startMessage + 9, messageLength);
        //     selectionObj['msgObj'] = JSON.parse(JSON.parse(`"${message}"`));
        // }

        // if (selectionObj['msg']?.startsWith(`BootStrapper::[[`)) {
        //     const bootStrapperArray = selectionObj['msg'].replace(`BootStrapper::`, "");
        //     selectionObj['msgObj'] = JSON.parse(bootStrapperArray);
        // }

        // if (selectionObj['msg']?.startsWith(`UserPermissions init:`)) {
        //     const slimbeUserPermissions = selectionObj['msg'].replace(`UserPermissions init: permissions `, "");
        //     selectionObj['msgObj'] = JSON.parse(slimbeUserPermissions);
        // }

        // if (selectionObj['msg']?.startsWith(`handlingAQMP::Received, from:`)) {
        //     const arrObj = selectionObj['msg'].split(`msg:`)
        //     selectionObj['msgObj'] = JSON.parse(arrObj[1]);
        // }

        // if (selectionObj['msg']?.startsWith(`redis::addPairKeyString:`)) {
        //     const arrObj = selectionObj['msg'].split(`value:`);
        //     selectionObj['msgObj'] = JSON.parse(arrObj[1]);
        // }

        // if (selectionObj['msg']?.startsWith(`handlingAQMP::Received, from:`)) {
        //
        // }

        if (returnType === 'html_collapse') {
            const jsonAsHtmlWithCollapse = renderjson.set_icons('+', '-')
                .set_show_to_level("all")
                (selectionObj);
            objLike = jsonAsHtmlWithCollapse;
        }

        if (returnType === 'string') {
            objLike = JSON.stringify(selectionObj, null, 2);
        }
    } catch (error) {
        objLike = str;
    }

    return objLike;
}
