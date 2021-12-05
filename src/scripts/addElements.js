class AddElements {
    constructor() {
        //condition wrapper
        this.conditionInputWrapper = document.querySelector(".js-workspace__condition-inputs")
        
        //tofind wrapper
        this.tofindInputWrapper = document.querySelector(".js-workspace__tofind-inputs")

        //layout for condition
        this.conditionAdditionalLayout = `<div class="u-equal-sign">=</div>
        <input class="u-input workspace__condition-input-value js-workspace__condition-input-value" placeholder="value" maxlength="3" type="text">
        <select class="u-select workspace__condition-select js-workspace__condition-select" name="select">
        <option class="workspace__condition-select-option" value="choose" selected disabled>what's it?</option>
        <option class="workspace__condition-select-option" value="right-triangle">Right Triangle</option>
        <option class="workspace__condition-select-option" value="angle">Angle</option>
        <option class="workspace__condition-select-option" value="side">Side</option>
        <option class="workspace__condition-select-option" value="median">Median</option>
        <option class="workspace__condition-select-option" value="angle-bisector">Angle Bisector</option>
        <option class="workspace__condition-select-option" value="height">Height</option>
        <option class="workspace__condition-select-option" value="hypotenuse">Hypotenuse</option>
        </select>`

        //method call for 2 unique cases
        this.changeInputs(this.conditionInputWrapper, "condition", this.conditionAdditionalLayout)
        this.changeInputs(this.tofindInputWrapper, "tofind", "")

        //reset inputs settings
        this.resetInputsSettings()
    }

    inputsSettings(target, classification) {
        const addBtn = document.body.querySelector(`.js-workspace__${classification}-add-btn`)
        const itemWrapper = target.closest(`.workspace__${classification}-item`)
        const allItemWrapper = document.body.querySelectorAll(`.workspace__${classification}-item`)
        if (target.value == "height" || target.value == "angle-bisector" || target.value == "median" || target.value == "hypotenuse") {
            if (itemWrapper.querySelectorAll(`.js-workspace__${classification}-input-angle`).length < 1) {
                itemWrapper.querySelector(`.js-workspace__${classification}-input-value`).insertAdjacentHTML("afterend", `
                <input class="u-input workspace__${classification}-input-angle js-workspace__${classification}-input-angle" placeholder="angle" maxlength="3" type="text">`
                ) 
                itemWrapper.querySelector(".u-equal-sign").style.display = "block"
                itemWrapper.querySelector(`.js-workspace__${classification}-input-value`).style.display = "block"
                itemWrapper.style.width = "409px"
                if(allItemWrapper[allItemWrapper.length - 1] == itemWrapper) {
                    addBtn.style.left = "428px"
                }
            }
        }
        else if (target.value == "right-triangle" || target.value == "equilateral-triangle" || target.value == "isosceles-triangle") {
            itemWrapper.querySelector(".u-equal-sign").style.display = "none"
            itemWrapper.querySelector(`.js-workspace__${classification}-input-value`).style.display = "none"
            itemWrapper.style.width = "239px"
            if(allItemWrapper[allItemWrapper.length - 1] == itemWrapper) {
                addBtn.style.left = "259px"
            }
            const inputAngle = itemWrapper.querySelector(`.js-workspace__${classification}-input-angle`)
            if (inputAngle) {
                inputAngle.remove()
            }
        }
        else {
            itemWrapper.querySelector(".u-equal-sign").style.display = "block"
            itemWrapper.querySelector(`.js-workspace__${classification}-input-value`).style.display = "block"
            const inputAngle =  itemWrapper.querySelector(`.js-workspace__${classification}-input-angle`)
            if (inputAngle) {
                inputAngle.remove()
            }
            itemWrapper.style.width = "330px"
            if(allItemWrapper[allItemWrapper.length - 1] == itemWrapper) {
                addBtn.style.left = "349px"
            }
        }
    }

    //buttons setting for previous item
    deletedInputsSetings(classification) {
        const allItemWrapper = document.body.querySelectorAll(`.workspace__${classification}-item`)
        const addBtn = document.body.querySelector(`.js-workspace__${classification}-add-btn`)
        if(allItemWrapper[allItemWrapper.length - 2].querySelector(`.js-workspace__${classification}-input-angle`)) {
            addBtn.style.left = "428px"
        }
        else if(allItemWrapper[allItemWrapper.length - 2].querySelector(".u-equal-sign").style.display == "none") {
            addBtn.style.left = "259px"
        }
        else {
            addBtn.style.left = "349px"
        }
    }
    
    // ------ addInput() arguments: ------
    // inputWrapper - arg for item wrapper & item btn
    // classification - arg for item affiliation to its style in CSS
    // elemCondition - arg for item affiliation to its layout in HTML

    changeInputs(inputWrapper, classification, elemCondition) {
        inputWrapper.addEventListener("click", (event) => {
            //if() to avoid using loops and changing variables after re-occurrence of elements
            if(event.target.classList.contains(`js-workspace__${classification}-add-btn`) || event.target.classList.contains('js-add-path')) {
                this.addItems(inputWrapper, classification, elemCondition)
                if(event.target.classList.contains("js-workspace__condition-add-btn") || event.target.classList.contains("js-condition-add-path")) {
                    document.body.querySelector(`.js-workspace__${classification}-add-btn`).style.left = "349px"
                }
            }
            //if() to avoid using loops and changing variables after re-occurrence of elements
            else if(event.target.classList.contains(`js-workspace__${classification}-del-btn`) || event.target.classList.contains('js-del-path')) {
                if(document.querySelectorAll(`.workspace__${classification}-item`).length > 1) {
                    this.deletedInputsSetings(classification)
                    event.target.closest(`.workspace__${classification}-item`).remove()
                }
            }
        })  
        inputWrapper.addEventListener("change", (event) => {
            if (event.target.classList.contains(`js-workspace__${classification}-select`)) {
                this.inputsSettings(event.target, classification)
            }
        })
    }

    //adding new items (layout)
    addItems(wrapper, classification, elemCondition) {
        wrapper.insertAdjacentHTML("beforeend", 
            `<div class="u-item workspace__${classification}-item">
            <div class="u-item-wrapper workspace__${classification}-item-wrapper">
            <input class="u-input workspace__${classification}-input-name js-workspace__${classification}-input-name" placeholder="name"  maxlength="3" type="text">
            ${elemCondition} 
            </div><div class="u-input-btn">
            <svg width="30" height="30" class="u-svg-btn workspace__${classification}-del-btn js-workspace__${classification}-del-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="js-del-path" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 
            16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 
            7.59876 4 12V12.172ZM17 13H7V11H17V13Z" fill="rgba(0, 0, 0, 0.650)"/></svg></div>`
        )
    }
    
    deleteAllInputs(classification) {
        document.body.querySelectorAll(`.workspace__${classification}-item`).forEach(elem => {
            elem.remove()
        })
    }

    resetInputsSettings() {
        document.body.addEventListener("click", (event) => {
            if(event.target.classList.contains("js-workspace__tofind-reset-btn")) {
                this.deleteAllInputs("condition")
                this.deleteAllInputs("tofind")
                this.addItems(this.conditionInputWrapper, "condition", this.conditionAdditionalLayout)
                this.addItems(this.tofindInputWrapper, "tofind", "")
                document.body.querySelector(`.js-workspace__condition-add-btn`).style.left = "349px"
            }
        })
    }
}
const addElements = new AddElements

//verified, no bugs found