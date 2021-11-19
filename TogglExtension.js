// ==UserScript==
// @name         Toggl Description Extension
// @namespace    https://fiksit.dk/
// @version      1.0
// @description  Check if Descriptions are longer than 50 characters. Properly...
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
                    initialize(entryList)
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

function initialize(entryList) {

     for(let i = 0; i < entryList.length; i++) {
      let lol = null
      if(entryList[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-718bxe-Root-Root-Root e1jfstgf0")[0] != null) {
          lol = entryList[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-718bxe-Root-Root-Root e1jfstgf0")[0]
      } else if(entryList[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-1yywgj5-Root-Root e1jfstgf0")[0] != null) {
          lol = entryList[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-1yywgj5-Root-Root e1jfstgf0")[0]
      }

      if(lol != null) {
      createCharCounter(lol)
      }
    }
    if(document.getElementsByClassName("css-1a08mon-TimerFormContent e191y2gl1")[0]) {
      createCharCounter(document.getElementsByClassName("css-1a08mon-TimerFormContent e191y2gl1")[0], true)
    }
}

function refresh(entryList, topdiv, shitput = null) {
    updateCharCounter(topdiv.parentNode.parentNode, topdiv.innerHTML.length, true)
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
      updateCharCounter(entryList[i], entryList[i].innerHTML.length)
      if(entryList[i].innerHTML.length > 50) {
         entryList[i].style.border = '2px solid red'
         entryList[i].style.setProperty('color', 'red', 'important')
      } else {
          entryList[i].style.border = 'none'
          entryList[i].style.color = ''
      }
    }
}

function updateCharCounter(entry, length, top = false) {
      let lol = null

      if(!top) {
          if(entry.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-718bxe-Root-Root-Root e1jfstgf0")[0] != null) {
              lol = entry.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-718bxe-Root-Root-Root e1jfstgf0")[0].getElementsByClassName("funkyFields")[0]
          } else if(entry.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-1yywgj5-Root-Root e1jfstgf0")[0] != null) {
              lol = entry.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-1yywgj5-Root-Root e1jfstgf0")[0].getElementsByClassName("funkyFields")[0]
          }
      } else {
          lol = entry.getElementsByClassName("funkyFields")[0]
      }
      if(lol != null) {

          lol.innerHTML = length + '/50'
          if(length > 50) {

              lol.style.setProperty('color', 'red', 'important')
          }
          else {
          lol.style.color = ''
          }
      }
}

function createCharCounter(div, top = false) {

            const charCounterCurrent = document.createElement('div')
            charCounterCurrent.innerHTML = '0/50'
            charCounterCurrent.style.padding = '10px'
            charCounterCurrent.style.textAlign = 'right'
            charCounterCurrent.style.color = 'darkgrey'
            charCounterCurrent.id = 'inputLengthField'
            charCounterCurrent.className = 'funkyFields'



    //div.insertBefore(charCounterCurrent, div.getElementsByClassName("css-718bxe-Root-Root-Root e1jfstgf0")[0])
    if(div.getElementsByClassName("funkyFields").length == 0 && !top) {
        div.insertBefore(charCounterCurrent, div.getElementsByClassName("css-ah4f6o-TriggerRoot e1jfstgf1")[0])
    }
    else if(div.getElementsByClassName("funkyFields").length == 0 && top) {
        div.insertBefore(charCounterCurrent, div.getElementsByClassName("css-134nh38-Container e1s1kndh5")[0])
    }
}
