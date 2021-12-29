import {Triangle, Angle, Side, InnerSegments} from "./triangleComponents.js"
import {ToFind} from "./components.js"
class InitialData {
    constructor() {
        this.initialData = []
        this.tofind = []
        this.additionalData = []
        this.checkForTriangleArr = []
        this.erroredDataItem = []
        this.triangles = []
        this.innerSegments = []
        this.sides = []
        this.angles = []
        this.runSolving()
    }
    runSolving() {
        const runButton = document.querySelector(".js-workspace__tofind-submit-btn")
        runButton.addEventListener("click", this.gatherInitialData.bind(this))
        document.body.addEventListener("keypress", event => {
            if (event.keyCode == 13) {
                runButton.click()
            }
        })
    }
    gatherInitialData() {
        this.initialData.length = 0
        this.tofind.length = 0
        this.checkForTriangleArr.length = 0
        this.erroredDataItem.length = 0
        this.triangles.length = 0
        this.innerSegments.length = 0
        this.sides.length = 0
        this.angles.length = 0
        const dataItemsCondition = document.querySelectorAll(".js-workspace__condition-item")
        const dataItemsToFind = document.querySelectorAll(".js-workspace__tofind-item")
        try {
            this.setAllItems(dataItemsCondition, "condition")
            this.setAllItems(dataItemsToFind, "tofind")
            const conditionForRightTriangle = this.checkForRightTriangle()
            if(this.erroredDataItem.length != 0) {
                throw this.erroredDataItem
            }
            else if(this.tofind.length == 0 && this.initialData.length != 0) {
                alert("Nothing to find :(")
            }
            else if(this.tofind.length != 0 && this.initialData.length == 0) {
                alert("There's no condition :(")
            }
            else if(this.tofind.length == 0 && this.initialData.length == 0) {
                alert(`You haven't entered any of needed information for solving yet! Please use the "condition" and "what we need to find" input fields to start working with this app`)
            }
            else if(this.checkForTriangleArr.length > 1) {
                this.setAllWrong("triangle")
            }
            else if(this.checkForTriangleArr.length == 0) {
                alert("There's no Triangle to solve")
            }
            else if(!conditionForRightTriangle) {
                alert("Incorrect condition for Right triangle case")
            }
            else if(this.initialData.length == 1) {
                this.initialData[0].layoutItem.style.border = "1px solid red"
            }
            else {
                console.log(this.initialData)
                console.log(this.tofind)
            }
        } 
        catch (erroredDataItem) {
            for (let i = 0; i < erroredDataItem.length; i++) {
                erroredDataItem[i].style.border = "1px solid red"
            }
        }
    }
    setAllItems(dataItems, classification) {
        dataItems.forEach(dataItem => {
            let dataValue 
            let dataEqual
            let dataAngle
            let dataValueType
            const dataType = dataItem.querySelector(`.js-workspace__${classification}-select`).value
            const dataName = dataItem.querySelector(`.js-workspace__${classification}-input-name`).value
            if(classification == "condition") {
                const value = dataItem.querySelector(".js-workspace__condition-input-value").value
                const hasOnlyString = !/\d/.test(value)
                if(value != undefined) {
                    if(hasOnlyString) {
                        if(value == "") {
                            dataEqual = undefined
                        } 
                        else {
                            dataEqual = value
                        }
                    }
                    else {
                        dataValue = value
                    }
                }
                dataAngle = dataItem.querySelector(".js-workspace__condition-input-angle").value
                dataValueType = dataItem.querySelector(".js-workspace__condition-select-triangle").value
            }
            if(dataType != "choose" && dataName != "") {
                if(classification == "condition") {
                    this.setTriangle(dataName, dataValue, dataType, dataValueType, dataItem)
                    this.setInnerSegment(dataName, dataValue, dataEqual, dataType, dataAngle, dataItem)
                    this.setAngle(dataName, dataValue, dataEqual, dataType, dataItem)
                    this.setSide(dataName, dataValue, dataEqual, dataType, dataItem) 
                }
                else if (classification == "tofind") {
                    this.setToFind(dataName, dataType, dataItem)
                }
            }
            
        })
    }
    checkForDuplicates(value, key, arrayToCheck, flag) {
        let hasDuplicates = false
        arrayToCheck.forEach(valuesToCheck => {
            const hasEqualNames = value == valuesToCheck[key] || value.split("").reverse().join("") == valuesToCheck[key]
            const hasValue = valuesToCheck.value != undefined
            if(valuesToCheck.type != "right-triangle" && valuesToCheck.type != "equilateral-triangle" && valuesToCheck.type != "isosceles-triangle") {
                if (flag != "tofind" && hasEqualNames) {
                    valuesToCheck.layoutItem.style.border = "1px solid red"
                    hasDuplicates = true
                }
                else if(flag == "tofind" && hasEqualNames && hasValue) {
                    valuesToCheck.layoutItem.style.border = "1px solid red"
                    hasDuplicates = true
                }
            }
        })
        if(hasDuplicates) {
            return false
        }
        else {
            return true
        }
    }
    checkForRightTriangle() {
        const triangle = this.checkForTriangleArr[0]
        if(triangle.type == "right-triangle") {
            const triangleName = triangle.name
            let checkAngleArr = []
            let checkHypotenuseArr = []
            let hypotenuseArr = []
            this.initialData.forEach(item => {
                if(item.type == "angle") {
                    if(item.name.includes(triangleName[0]) && item.name.includes(triangleName[1]) && item.name.includes(triangleName[2]) && item.value == "90") {
                        checkAngleArr.push(item)
                    }
                }
                else if(item.type == "hypotenuse") {
                    hypotenuseArr.push(item)
                    if(item.name.includes(triangleName[0]) && item.name.includes(triangleName[1])) {
                        checkHypotenuseArr.push(item)
                    }
                    else if(item.name.includes(triangleName[0]) && item.name.includes(triangleName[2])) {
                        checkHypotenuseArr.push(item)
                    }
                    else if(item.name.includes(triangleName[1]) && item.name.includes(triangleName[2])) {
                        checkHypotenuseArr.push(item)
                    }
                }
            })
            if(hypotenuseArr.length > 1) {
                return false
            }
            else if(checkAngleArr.length == 1 && checkHypotenuseArr.length == 1 && !checkHypotenuseArr[0].name.includes(checkAngleArr[0].name[1])) {
                return true
            }
            else if(checkAngleArr.length == 1 && checkHypotenuseArr.length == 0) {
                return true
            }
            else if(checkAngleArr.length == 0 && checkHypotenuseArr.length == 1) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return true
        } 
    }
    setAllWrong(wrongItem) {
        this.initialData.forEach(item => {
            const triangleCondition = wrongItem == "triangle" && item.type == "right-triangle" || item.type == "equilateral-triangle" || item.type == "isosceles-triangle"
            if(triangleCondition) {
                item.layoutItem.style.border = "1px solid red"
            }
        })
    }
    //set
    setTriangle(dataName, dataValue, dataType, dataValueType, dataItem) {
        if(dataType == "right-triangle" || dataType == "equilateral-triangle" || dataType == "isosceles-triangle") {
            const checkStrings = dataName.length == 3 && !/(.).*\1/.test(dataName)
            const validValue = dataValue > 0 || dataValue == undefined
            if(checkStrings && validValue) {
                dataItem.style.border = "1px solid rgba(128, 128, 128, 0.377)"
                if(dataValueType == "choose") {
                    dataValueType = undefined
                    dataValue = undefined
                }
                if(dataValue == undefined) {
                    dataValueType = undefined
                }
                const obj = this.createTriangle(dataName, dataValue, dataType, dataValueType, dataItem)
                this.triangles.push(obj)
                this.initialData.push(obj)
                this.checkForTriangleArr.push(obj)
            }
            else {
                this.erroredDataItem.push(dataItem)
            }
        }
    }
    setInnerSegment(dataName, dataValue, dataEqual, dataType, dataAngle, dataItem) {
        if(dataType == "median" || dataType == "angle-bisector" || dataType == "height") {
            const checkStrings = dataName.length == 2 && dataAngle.length == 3 && !/(.).*\1/.test(dataName) && !/(.).*\1/.test(dataAngle) && !dataAngle.includes(dataName)
            const checkAngles = dataAngle[1] == dataName[0] && !dataAngle.includes(dataName[1]) || dataAngle[1] == dataName[1] && !dataAngle.includes(dataName[0])
            const checkDataEqual = dataEqual != undefined && dataEqual.length == 2 && dataEqual != dataName && dataEqual.split("").reverse().join("") != dataName && !/(.).*\1/.test(dataEqual) || dataEqual == undefined
            const validValue = dataValue > 0 || dataValue == undefined
            const noNameDuplicates = this.checkForDuplicates(dataName, "name", this.initialData)
            const noAngleDuplicates = this.checkForDuplicates(dataAngle, "angle", this.initialData)
            if(checkStrings && checkAngles && checkDataEqual && noNameDuplicates && noAngleDuplicates && validValue) {
                dataItem.style.border = "1px solid rgba(128, 128, 128, 0.377)"
                const obj = this.createInnerSegments(dataName, dataValue, dataEqual, dataType, dataAngle, dataItem)
                this.innerSegments.push(obj)
                this.initialData.push(obj)
            }
            else {
                this.erroredDataItem.push(dataItem)
            }
        }
    }
    setAngle(dataName, dataValue, dataEqual, dataType, dataItem) {
        if(dataType == "angle") {
            const checkStrings = dataName.length == 3 && !/(.).*\1/.test(dataName)
            const checkDataEqual = dataEqual != undefined && dataEqual.length == 3 && dataEqual != dataName && dataEqual.split("").reverse().join("") != dataName && !/(.).*\1/.test(dataEqual) || dataEqual == undefined
            const validValue = dataValue > 0 && dataValue < 360 || dataValue == undefined
            const noNameDuplicates = this.checkForDuplicates(dataName, "name", this.initialData)
            if(checkStrings && checkDataEqual && noNameDuplicates && validValue) {
                dataItem.style.border = "1px solid rgba(128, 128, 128, 0.377)"
                const obj = this.createAngle(dataName, dataValue, dataEqual, dataType, dataItem)
                this.angles.push(obj)
                this.initialData.push(obj)
            }
            else {
                this.erroredDataItem.push(dataItem)
            }
        }
    }
    setSide(dataName, dataValue, dataEqual, dataType, dataItem) {
        if(dataType == "side" || dataType == "hypotenuse") {
            const checkStrings = dataName.length == 2 && !/(.).*\1/.test(dataName)
            const checkDataEqual = dataEqual != undefined && dataEqual.length == 2  && dataEqual != dataName && dataEqual.split("").reverse().join("") != dataName && !/(.).*\1/.test(dataEqual)|| dataEqual == undefined
            const validValue = dataValue > 0 || dataValue == undefined
            const noNameDuplicates = this.checkForDuplicates(dataName, "name", this.initialData)
            if(checkStrings && checkDataEqual && noNameDuplicates && validValue) {
                    dataItem.style.border = "1px solid rgba(128, 128, 128, 0.377)"
                    const obj = this.createSide(dataName, dataValue, dataEqual, dataType, dataItem)
                    this.sides.push(obj)
                    this.initialData.push(obj)
            }
            else {
                this.erroredDataItem.push(dataItem)
            }
        }
    }
    setToFind(dataName, dataType, dataItem) {
        if(dataType == "value" || dataType == "area" || dataType == "perimeter") {
            const checkStrings = dataName.length != 1 && !/(.).*\1/.test(dataName) 
            const noNameDuplicates = this.checkForDuplicates(dataName, "name", this.tofind)
            const noWrongToFind = this.checkForDuplicates(dataName, "name", this.initialData, "tofind")
            if(checkStrings && noNameDuplicates && noWrongToFind) {
                dataItem.style.border = "1px solid rgba(128, 128, 128, 0.377)"
                const obj = this.createToFind(dataName, dataType, dataItem)
                this.tofind.push(obj)
            }
            else {
                this.erroredDataItem.push(dataItem)
            }
        }
    }
    //create 
    createTriangle(name, value, type, valueType, layoutItem) {
        const triangle = new Triangle
        triangle.name = name
        triangle.value = value
        triangle.type = type
        triangle.valueType = valueType
        triangle.layoutItem = layoutItem
        return triangle
    }
    createInnerSegments(name, value, equal, type, angle, layoutItem) {
        const innerSegment = new InnerSegments
        innerSegment.name = name
        innerSegment.value = value
        innerSegment.equal = equal
        innerSegment.type = type
        innerSegment.angle = angle
        innerSegment.layoutItem = layoutItem
        return innerSegment
    }
    createAngle(name, value, equal, type, layoutItem) {
        const angle = new Angle
        angle.name = name
        angle.value = value
        angle.equal = equal
        angle.type = type
        angle.layoutItem = layoutItem
        return angle
    }
    createSide(name, value, equal, type, layoutItem) {
        const side = new Side
        side.name = name
        side.value = value
        side.equal = equal
        side.type = type
        side.layoutItem = layoutItem
        return side
    }
    createToFind(name, type, layoutItem) {
        const toFind = new ToFind
        toFind.name = name
        toFind.type = type
        toFind.layoutItem = layoutItem
        return toFind
    }
}
const initialData = new InitialData
