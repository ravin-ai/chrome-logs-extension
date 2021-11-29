document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(document.location.search);
    const str = params.get('str');
    if (str) {
        actionQuery(str);
    } else {
        actionClickedExtension();
    }

}, false);

const actionQuery = (str) => {
    const objLike = convertStrToObjLike(str, 'html_collapse');
    document.getElementById("output").appendChild(objLike);
    // document.getElementById("output").innerHTML = objLike;
}

const actionClickedExtension = () => {
    chrome.tabs.executeScript({
        code: `document.getElementById("microConsole-Logs").contentWindow.getSelection().toString()`
    }, function (selection) {
        document.getElementById("output").innerHTML = convertStrToObjLike(selection[0], 'string');
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
                    selectionObj['msgArr'] = selectionObj['msg'].split('|').map(cell => cell.trim());
                }
            }
        }

        if (returnType === 'html_collapse') {
            objLike = renderjson.set_icons('+', '-')
                .set_show_to_level("all")
                (selectionObj);
        }

        if (returnType === 'string') {
            objLike = JSON.stringify(selectionObj, null, 2);
        }
    } catch (error) {
        objLike = str;
    }

    return objLike;
}
