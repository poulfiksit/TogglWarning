// ==UserScript==
// @name         Toggl Description Plugin
// @namespace    https://fiksit.dk/
// @version      1.0
// @description  Check if Descriptions are longer than 50 characters. Properly...
// @author       Poul Bach Lauritsen @ Fiks IT
// @match        https://track.toggl.com/timer
// @match        https://track.toggl.com/timer/
// @downloadURL  https://github.com/poulfiksit/TogglWarning/blob/main/TogglExtension.js
// @updateURL    https://github.com/poulfiksit/TogglWarning/blob/main/TogglExtension.js
// @grant        none
// ==/UserScript==

(function() {

    const targetNode = document.body
    const config = {attributes: true, childList: true, subtree: true}
    let entryList
    let topdiv

    let VARS = {
    MAX_DESCRIPTION_LENGTH: 50,
    COLOR: "red",
    BORDERCOLOR: "red"
    }

    const callback = function(mutationsList, observer) {

        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                if(mutation.target.className == "content-wrapper pro") {
                    // let collection = document.getElementsByClassName('css-syh4oc-TimeEntryDescription e10vqxue0')
                    let collection = document.getElementsByClassName(' css-1phbu0u-TimeEntryDescription e10vqxue0')
                    // topdiv = document.getElementsByClassName('css-1wbxlms-Description ea2nj4x2')[0]
                    topdiv = document.getElementsByClassName('css-x7uby4-Description-noOverflow ea2nj4x2')[0]
                    entryList = Array.from(collection)
                    initialize(entryList, VARS)
                    refresh(entryList, topdiv, VARS)
                }
                if(mutation.target.className == "css-oqj558-List e9ma3si0") {
                    let collection = document.getElementsByClassName(' css-syh4oc-TimeEntryDescription e10vqxue0')
                    entryList = Array.from(collection)
                    refresh(entryList, topdiv, VARS)
                }
                if(mutation.target.className == "css-yht0st-Root et8m3zx1") {
                    let collection = document.getElementsByClassName(' css-syh4oc-TimeEntryDescription e10vqxue0')
                    entryList = Array.from(collection)
                    refresh(entryList, topdiv, VARS)
                }
                if(mutation.target.className.includes("e1ln5t0v1")) {
                    let shitput = document.getElementsByClassName("e1ln5t0v1 css-ep8ani-Input-InputCss-FluidTextInputStyled ewv0efw0")[0]
                   refresh(entryList, topdiv, VARS, shitput)
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
          refresh(entryList, topdiv, VARS, shitput)
      } else {
          refresh(entryList, topdiv, VARS)
      }

  })
    document.body.addEventListener('onclick', (event) => {

        if(event.target.className == "css-1xmqmav-TimerButton-button ew4ipl50") {
                        refresh(entryList, topdiv, VARS)
        }
    })
})();

function initialize(entryList, VARS) {

     for(let i = 0; i < entryList.length; i++) {
      let lol = null
      if(entryList[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-718bxe-Root-Root-Root e1jfstgf0")[0] != null) {
          lol = entryList[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-718bxe-Root-Root-Root e1jfstgf0")[0]
      } else if(entryList[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-1yywgj5-Root-Root e1jfstgf0")[0] != null) {
          lol = entryList[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("css-1yywgj5-Root-Root e1jfstgf0")[0]
      }

      if(lol != null) {
      createCharCounter(lol, VARS)
      }
    }
    if(document.getElementsByClassName("css-1a08mon-TimerFormContent e191y2gl1")[0]) {
      createCharCounter(document.getElementsByClassName("css-1a08mon-TimerFormContent e191y2gl1")[0], VARS, true)
    }
}

function refresh(entryList, topdiv, VARS, shitput = null) {

    updateCharCounter(topdiv.parentNode.parentNode, topdiv.innerHTML.length, VARS, true)
    if(topdiv.innerHTML.length > VARS.MAX_DESCRIPTION_LENGTH) {
         topdiv.style.border = '2px solid ' + VARS.BORDERCOLOR
         topdiv.style.setProperty('color', VARS.COLOR, 'important')
         if(shitput != null) {
         shitput.style.border = '2px solid ' + VARS.BORDERCOLOR
         shitput.style.setProperty('color', VARS.COLOR, 'important')
         }
    } else {
          topdiv.style.border = 'none'
          topdiv.style.color = ''
         if(shitput != null) {
          shitput.style.border = 'none'
          shitput.style.color = '' }
    }

     for(let i = 0; i < entryList.length; i++) {
      updateCharCounter(entryList[i], entryList[i].innerHTML.length, VARS)
      if(entryList[i].innerHTML.length > VARS.MAX_DESCRIPTION_LENGTH) {
         entryList[i].style.border = '2px solid ' + VARS.BORDERCOLOR
         entryList[i].style.setProperty('color', VARS.COLOR, 'important')
      } else {
          entryList[i].style.border = 'none'
          entryList[i].style.color = ''
      }
    }
}

function updateCharCounter(entry, length, VARS, top = false) {

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

          lol.innerHTML = length + '/' + VARS.MAX_DESCRIPTION_LENGTH.toString()
          if(length > VARS.MAX_DESCRIPTION_LENGTH) {

              lol.style.setProperty('color', VARS.COLOR, 'important')
          }
          else {
          lol.style.color = ''
          }
      }
}

function createCharCounter(div, VARS, top = false) {

            const charCounterCurrent = document.createElement('div')
            charCounterCurrent.innerHTML = '0/' + VARS.MAX_DESCRIPTION_LENGTH.toString()
            charCounterCurrent.style.padding = '10px'
            charCounterCurrent.style.textAlign = 'right'
            charCounterCurrent.style.color = 'darkgrey'
            charCounterCurrent.id = 'inputLengthField'
            charCounterCurrent.className = 'funkyFields'

    if(div.getElementsByClassName("funkyFields").length == 0 && !top) {
        div.insertBefore(charCounterCurrent, div.getElementsByClassName("css-ah4f6o-TriggerRoot e1jfstgf1")[0])
    }
    else if(div.getElementsByClassName("funkyFields").length == 0 && top) {
        div.insertBefore(charCounterCurrent, div.getElementsByClassName("css-134nh38-Container e1s1kndh5")[0])
    }
}
