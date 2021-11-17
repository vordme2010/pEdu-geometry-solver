class AddElements {
    constructor() {
        //condition wrapper
        this.conditionInputWrapper = document.querySelector(".js-workspace__condition-inputs")

        //tofind wrapper
        this.tofindInputWrapper = document.querySelector(".js-workspace__tofind-inputs")

        //method call for 2 unique cases
        this.changeInputs(this.conditionInputWrapper, "condition",
            `<div class="u-equal-sign">=</div>
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
        )
        this.changeInputs(this.tofindInputWrapper, "tofind", "")
    }

    // ------ addInput() arguments: ------
    // inputWrapper - arg for item wrapper & item btn
    // classification - arg for item affiliation to its style in CSS
    // elemCondition - arg for item affiliation to its layout in HTML

    changeInputs(inputWrapper, classification, elemCondition) {
        inputWrapper.addEventListener("click", (event) => {
            //if() to avoid using loops and changing variables after re-occurrence of elements
            if(event.target.classList.contains(`js-workspace__${classification}-add-btn`) || event.target.classList.contains('js-add-path')) {
                inputWrapper.insertAdjacentHTML("beforeend", 
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
            //if() to avoid using loops and changing variables after re-occurrence of elements
            else if(event.target.classList.contains(`js-workspace__${classification}-del-btn`) || event.target.classList.contains('js-del-path')) {
                if(document.querySelectorAll(`.workspace__${classification}-item`).length > 1) {
                    event.target.closest(`.workspace__${classification}-item`).remove()
                }
            }
        })      
    }
}
const addElements = new AddElements

//verified, no errors