// ==UserScript==
// @name       东北大学评教全自动
// @namespace   Violentmonkey Scripts
// @match http://210.30.204.138/*
// @match https://*/*
// @match http://localhost:5500/*
// @grant       none
// @version     1.0
// @description 2024/11/26 22:00:42
// @author      2649263674@qq.com
// @description 2024/11/26 22:00:42
// ==/UserScript==

(function () {
    'use strict';
    const htmlStr = `<div id="btnBox" style="width: 100px;height: 100px;background-color: plum;position: absolute;left: 0px; top: 0px;z-index: 9999;">
        <button id="runSingle" >
            <span>单个</span>
        </button >
        <button id="runAll" >
            <span>全部</span>
        </button>
        <div class="hint" >
            <button onclick=" document.querySelector(
    '#hintDetail').style.display == 'none'?document.querySelector('#hintDetail').style.display =
    'block':document.querySelector('#hintDetail').style.display = 'none'">
                <span>提示</span>
            </button>
            <div id="hintDetail" style="width: 400px;display: none;">
                when the first button is clicked,
                you should already clicked '开始测评'
                when the second button is clicked,
                you should at the start page where there is a list of btns to click
            </div>
        </div>
    </div > `;
    let div = document.createElement("div");
    document.body.appendChild(div);
    div.id = "scriptBox";
    div.innerHTML = htmlStr;
    console.log("Tampermonkey running");
    let runSingle = document.getElementById("runSingle");
    runSingle.addEventListener("click", doRunSingle);
    let runAll = document.getElementById("runAll");
    runAll.addEventListener("click", doRunclick);
    // doRunSingle();
    // 在脚本初始化时检查是否有未完成的任务
    (function checkPendingTasks() {
        const op = sessionStorage.getItem('op');
        console.log(sessionStorage.getItem('op'));
        switch (op) {
            case "doRunSingle":
                setTimeout(() => {
                    // 你想延迟执行的代码
                    console.log("这段代码会在一秒后执行");
                    // 执行 doRunSingle 函数
                    doRunSingle();
                }, 2000); // 1000毫秒 = 1秒
                break;
            case "doRunClick":
                setTimeout(() => {
                    // 你想延迟执行的代码
                    console.log("这段代码会在一秒后执行");
                    doRunclick();
                }, 2000); // 1000毫秒 = 1秒
        }
    }
    )();
})();


function doRunclick() {

    console.log("doRunAll clicked");
    let l0 = document.querySelectorAll(".btn.btn-outline.btn-primary.btn-xs");
    let i = 1e3;
    while (l0.length == 0 && i--) {
        l0 = document.querySelectorAll(".btn.btn-outline.btn-primary.btn-xs");
    }
    setTimeout(() => {
        l0[0].click();
    }, 500);
    sessionStorage.setItem("op", "doRunSingle");
}

function doRunSingle() {
    let i = 1e3;
    while (i--) {

    }
    console.log("doRunSingle clicked");
    // return;
    const mainTbale = document.querySelector("#evlTable");
    let trList = document.querySelectorAll("#evlTable>tbody tr");
    console.log(trList);
    let lastChoice = null;
    trList.forEach((tr) => {
        // console.log(tr);
        let tdList = tr.querySelectorAll("td");
        // console.log(tdList);
        for (let i = 0; i < tdList?.length; i++) {
            // console.log(tdList[i]);
            if (tdList[i].querySelector("input")) {
                lastChoice = tr;
                tdList[i].querySelector("input").checked = true;
                console.log("checked");
                break;
            }
        }

    });
    let tdList = lastChoice.querySelectorAll("td");
    let has = 0;
    console.log(lastChoice);
    console.log(tdList);
    for (let i = 0; i < tdList.length; i++) {
        console.log("enter");
        if (tdList[i].querySelector("input")) {
            if (has == 1) {
                tdList[i].querySelector("input").checked = true;
                console.log("rechecked");
                break;
            }
            has++;
        }
    }
    document.getElementById("btn-saveResult").click();
    // setTimeout(, 10);

    while (!document.querySelector(".confirm")) {
        console.log("waiting");
    }
    setTimeout(() => {
        document.querySelector(".confirm").click();
    }, 500);

    setTimeout(() => {
        document.getElementById("btn-goBack").click();
        console.log("return clicked");
    }, 1000);
    sessionStorage.setItem("op", "doRunClick");
    return true;
};