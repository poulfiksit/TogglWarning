// ==UserScript==
// @name         Toggl Description Extension
// @namespace    https://fiksit.dk/
// @version      1.0
// @description  Check if Descriptions are longer than 50 characters.
// @author       Poul Bach Lauritsen @ FiksIT
// @match        https://track.toggl.com/timer
// @downloadURL  https://github.com/poulfiksit/TogglWarning/blob/main/TogglExtension.js
// @updateURL    https://github.com/poulfiksit/TogglWarning/blob/main/TogglExtension.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

    const targetNode = document.body
    const config = {attributes: true, childList: true, subtree: true}
    let entryList
    let topdiv

    const callback = function(mutationsList, observer) {

        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                if(mutation.target.className == "content-wrapper pro") {
                    let collection = document.getElementsByClassName(' css-syh4oc-TimeEntryDescription e10vqxue0')
                    topdiv = document.getElementsByClassName('css-1wbxlms-Description ea2nj4x2')[0]
                    entryList = Array.from(collection)
                    refresh(entryList, topdiv)
                }
                if(mutation.target.className == "css-oqj558-List e9ma3si0") {
                    let collection = document.getElementsByClassName(' css-syh4oc-TimeEntryDescription e10vqxue0')
                    entryList = Array.from(collection)
                    refresh(entryList, topdiv)
                }
                if(mutation.target.className == "css-yht0st-Root et8m3zx1") {
                    let collection = document.getElementsByClassName(' css-syh4oc-TimeEntryDescription e10vqxue0')
                    entryList = Array.from(collection)
                    refresh(entryList, topdiv)
                }
                if(mutation.target.className.includes("e1ln5t0v1")) {
                    let shitput = document.getElementsByClassName("e1ln5t0v1 css-ep8ani-Input-InputCss-FluidTextInputStyled ewv0efw0")[0]
                   refresh(entryList, topdiv, shitput)
                }
            }
        }
    }
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback)

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config)

  document.body.addEventListener('input', async (event) => {

      await new Promise(r => setTimeout(r, 69));
      if(event.target.className == "e1ln5t0v1 css-ep8ani-Input-InputCss-FluidTextInputStyled ewv0efw0")
      {
          let shitput = document.getElementsByClassName("e1ln5t0v1 css-ep8ani-Input-InputCss-FluidTextInputStyled ewv0efw0")[0]
          refresh(entryList, topdiv, shitput)
      } else {
          refresh(entryList, topdiv)
      }

  })
    document.body.addEventListener('onclick', (event) => {

        if(event.target.className == "css-1xmqmav-TimerButton-button ew4ipl50") {
                        refresh(entryList, topdiv)
        }
    })
})();


function refresh(entryList, topdiv, shitput = null) {
    if(topdiv.innerHTML.length > 50) {
         topdiv.style.border = '2px solid red'
         topdiv.style.setProperty('color', 'red', 'important')
         if(shitput != null) {
         shitput.style.border = '2px solid red'
         shitput.style.setProperty('color', 'red', 'important')
         }
    } else {
          topdiv.style.border = 'none'
          topdiv.style.color = ''
         if(shitput != null) {
          shitput.style.border = 'none'
          shitput.style.color = '' }
    }

     for(let i = 0; i < entryList.length; i++) {
      if(entryList[i].innerHTML.length > 50) {
         entryList[i].style.border = '2px solid red'
         entryList[i].style.setProperty('color', 'red', 'important')
      } else {
          entryList[i].style.border = 'none'
          entryList[i].style.color = ''
      }
    }
}




