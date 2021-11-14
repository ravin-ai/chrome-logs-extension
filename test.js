// setTimeout(() => {
//     let logs = document
//         .getElementById("microConsole-Logs")
//         .contentDocument
//         .getElementsByClassName('logs__log-events-table__timestamp-cell');
//
//     for (var i = 0, l = logs.length; i < l; i++) {
//         logs[i].innerHTML = `<span onclick="chrome.tabs.create({'url': chrome.extension.getURL(\popup.html})}, function (tab) {
//     });">${logs[i].innerHTML}</span>`
//         // logs[i].innerHTML = `<a href="${chrome.extension.getURL(`popup.html`)}" target="_blank">${logs[i].innerHTML}</a>`;
//     }
//
// }, 10000)

// setTimeout(() => {
//     let elements = document
//         .getElementById("microConsole-Logs")
//         .contentDocument
//         .getElementsByClassName('awsui-table-nowrap');
//
//     let tableEl = elements[0];
//
//     tableEl.addEventListener("change", function () {
//         console.log('asdf');
//     });
//
//     let aa = document
//         .getElementById("microConsole-Logs")
//         .contentDocument
//         .getElementsByClassName('awsui-table-container')
//
//     aa[0].addEventListener('change', function () {
//         console.log('ssss');
//     })
// }, 5000);
