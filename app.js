Array.from(document.querySelectorAll(".zb-checkbox")).forEach(el => {
    el.children[0].click()
})
Array.from(document.querySelectorAll(".title")).filter(x => x.innerHTML == "Start").forEach(element => {
    element.click()
})
document.querySelector(".definition-match-payload").scrollIntoView({behavior:"smooth"})
setTimeout(() => {
    Array.from(document.querySelectorAll(".pause-button")).forEach(element => {
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (element.classList.contains('rotate-180')) {
                        observer.disconnect()
                    } else if (element.classList.contains('play-button')) {
                        element.click()
                    }
                }
            })
        })
        observer.observe(element, { attributes: true })
    })
}, 100)
function setupMultipleChoiceMutationObservers() {
    Array.from(document.querySelectorAll(".multiple-choice-question")).forEach(el => {
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if(mutation.addedNodes.length > 0) {
                    if(mutation.addedNodes[0].classList != null) {
                        setTimeout(() => {
                            if (mutation.addedNodes[0].classList.contains('incorrect')) {
                                handleRadio()
                            } else if (!mutation.addedNodes[0].classList.contains('correct')) {
                                handleRadio()
                            } else {
                                observer.disconnect()
                            }
                        }, 100);
                    }
                }
            })
        })
        observer.observe(el, {childList: true,  attributes: true })
    })
}
function handleRadio() {
    if(Array.from(document.querySelectorAll(".multiple-choice-question")).length != 0) {
        Array.from(document.querySelectorAll(".multiple-choice-question")).forEach(el => {
            if(el.querySelector(".zb-explanation").className.includes("incorrect")) {
                el.setAttribute("guessedQuestion", parseInt(el.getAttribute("guessedQuestion")) + 1)
                Array.from(el.querySelectorAll(".zb-radio-button"))[el.getAttribute("guessedQuestion")].children[0].click()
            } else if(!el.querySelector(".zb-explanation").className.includes("correct")) {
                Array.from(el.querySelectorAll(".zb-radio-button"))[0].children[0].click()
                el.setAttribute("guessedQuestion", 0)
            }
        })
    }
}
if(Array.from(document.querySelectorAll(".multiple-choice-question")).length != 0) {
    setupMultipleChoiceMutationObservers()
    handleRadio()
}
Array.from(document.querySelectorAll(".short-answer-question")).forEach(el => {
    Array.from(document.querySelectorAll(".title")).filter(x => x.innerHTML == "Show answer").forEach(el => {
        el.click()
        el.click()
    })
    setTimeout(() => {
        var textArea = el.querySelector(".ember-text-area");
        textArea.value =  el.querySelector(".forfeit-answer").innerHTML.toString()
        textArea.dispatchEvent(new Event('input', { bubbles: true }))
        textArea.dispatchEvent(new Event('change', { bubbles: true }))
        el.querySelector(".check-button").click()
    }, 100);
})
