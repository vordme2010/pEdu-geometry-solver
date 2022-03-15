import {TriangleFormulas} from "./triangleFormulas.js"
export class RightTriangleFormulas extends TriangleFormulas {
    constructor() {
        super()
    }
    pickUpAMethod(toFind) {
        if(toFind[1] == "side" || toFind[1] == "hypotenuse") {
            return [
                this.pythagoreanTheorem,
                // this.sinTheorem1,
                // this.sinTheorem2,
                // this.sinTheorem3,
            ]
        }
        else if(toFind[1] == "angle") {
            return [
                this.sinTheorem1,
                this.sinTheorem2,
                this.sinTheorem3,
            ]
        }
    }
    sinTheorem1(object, toFind, toFindArray, checkForWrongData, determineOppositeAngle, checkValueForMethods, getSin, getSinX, sinTheorem) {
        const anglesArr = [object.angle1, object.angle2, object.angle3]
        let side1 = object.side1
        let side2 = object.side2
        let side3 = object.side3
        let oppositeAngle1 = determineOppositeAngle(side1, anglesArr)
        let oppositeAngle2 = determineOppositeAngle(side2, anglesArr)
        let oppositeAngle3 = determineOppositeAngle(side3, anglesArr)
        return sinTheorem(toFind, toFindArray, checkForWrongData, checkValueForMethods, getSin, getSinX, side1, side2, oppositeAngle1, oppositeAngle2)
    }
    sinTheorem2(object, toFind, toFindArray, checkForWrongData, determineOppositeAngle, checkValueForMethods, getSin, getSinX, sinTheorem) {
        const anglesArr = [object.angle1, object.angle2, object.angle3]
        let side1 = object.side1
        let side2 = object.side2
        let side3 = object.side3
        let oppositeAngle1 = determineOppositeAngle(side1, anglesArr)
        let oppositeAngle2 = determineOppositeAngle(side2, anglesArr)
        let oppositeAngle3 = determineOppositeAngle(side3, anglesArr)
        return sinTheorem(toFind, toFindArray, checkForWrongData, checkValueForMethods, getSin, getSinX, side2, side3, oppositeAngle2, oppositeAngle3)
    }
    sinTheorem3(object, toFind, toFindArray, checkForWrongData, determineOppositeAngle, checkValueForMethods, getSin, getSinX, sinTheorem) {
        const anglesArr = [object.angle1, object.angle2, object.angle3]
        let side1 = object.side1
        let side2 = object.side2
        let side3 = object.side3
        let oppositeAngle1 = determineOppositeAngle(side1, anglesArr)
        let oppositeAngle2 = determineOppositeAngle(side2, anglesArr)
        let oppositeAngle3 = determineOppositeAngle(side3, anglesArr)
        return sinTheorem(toFind, toFindArray, checkForWrongData, checkValueForMethods, getSin, getSinX, side1, side3, oppositeAngle1, oppositeAngle3)
    }
    sinTheorem(toFind, toFindArray, checkForWrongData, checkValueForMethods, getSin, getSinX, side1, side2, oppositeAngle1, oppositeAngle2) {
        let result
        let equation
        let generalEquation
        let wrongItem = false
        let elementsToFind = []
        let elementsNamesToFind = []
        if(toFind.name == side1.name || toFind.name == side2.name || toFind.name == oppositeAngle1.name || toFind.name == oppositeAngle2.name) {
            let flag = false
            let checkArr = [side1, side2, oppositeAngle1, oppositeAngle2]
            let falseCheckArr = []
            checkArr.forEach(data=> {
                const exists = checkForWrongData(toFindArray, data)
                if(!exists && data == toFind) {
                    falseCheckArr.push(true)
                }
            })
            if(falseCheckArr.length == 1) {
                flag = true
            }
            if(flag) {
                generalEquation = `${side1.name} / sin(${oppositeAngle1.name}) = ${side2.name} / sin(${oppositeAngle2.name})`
                side1 = checkValueForMethods(side1)
                side2 = checkValueForMethods(side2)
                oppositeAngle1 = checkValueForMethods(oppositeAngle1)
                oppositeAngle2 = checkValueForMethods(oppositeAngle2)
                let checkValueArr = []
                let checkNameArr = []
                let namesArr = []
                let elements = [side1, side2, oppositeAngle1, oppositeAngle2]
                elements.forEach(elem=> {
                    if(elem[1] == "value") {
                        checkValueArr.push(elem)
                    }
                    else if(elem[1] == "name") {
                        if(elem[0].length == 2) {
                            checkNameArr.push([elem[0], "side"])
                            namesArr.push(elem[0])
                        }
                        else if(elem[0].length == 3) {
                            checkNameArr.push([elem[0], "angle"])
                            namesArr.push(elem[0])
                        }
                    }
                })
                equation = `${side1[0]} / sin(${oppositeAngle1[0]}) = ${side2[0]} / sin(${oppositeAngle2[0]})`
                if(checkValueArr.length == 3) {
                    if(oppositeAngle1[1] != "name") {
                        oppositeAngle1[0] = getSin(oppositeAngle1[0])
                    }
                    if(oppositeAngle2[1] != "name") {
                        oppositeAngle2[0] = getSin(oppositeAngle2[0])
                    }
                    result = nerdamer.solveEquations(`${side1[0]} / ${oppositeAngle1[0]} = ${side2[0]} / ${oppositeAngle2[0]}`, checkNameArr[0][0])[0]
                    result = `${getSinX(result)}`
                }
                else {
                    elementsToFind.push(...checkNameArr)
                    elementsNamesToFind.push(...namesArr)
                }

            }
            else {
                wrongItem = true
            }
        }
        else {
            return [undefined]
        }
        if(wrongItem) {
            return [undefined]
        }
        else if(elementsToFind.length == 0) {
            return [result, equation, generalEquation, toFind.name]
        }
        else {
            return [elementsToFind, equation, generalEquation, toFind.name, elementsNamesToFind]
        }
    }
    pythagoreanTheorem(object, toFind, toFindArray, checkForWrongData) {
        let hypotenuse = object.hypotenuse
        let sides = []
        let result 
        let equation
        let generalEquation
        let sidesToFind = []
        let sidesNameToFind = []
        let wrongItem = false
        const sidesArr = [object.side1, object.side2, object.side3]
        sidesArr.forEach(side => {
            if(side.name != hypotenuse.name) {
                sides.push(side)
            }
        })
        if(toFind.name == sides[0].name) {
            if(checkForWrongData(toFindArray, hypotenuse) && checkForWrongData(toFindArray, sides[1])) {
                generalEquation = `sqrt(${hypotenuse.name}^2 - ${sides[1].name}^2) = ${toFind.name}`
                if(sides[1].value != undefined && hypotenuse.value != undefined) {
                    equation = `sqrt(${hypotenuse.value}^2 - ${sides[1].value}^2) = ${toFind.name}`
                    result = nerdamer.solveEquations(`sqrt(${hypotenuse.value}^2 - ${sides[1].value}^2) = a`, "a")[0].toString()
                }
                else {
                    if(hypotenuse.value == undefined && sides[1].value == undefined) {
                        equation = `sqrt(${hypotenuse.name}^2 - ${sides[1].name}^2) = ${toFind.name}`
                        sidesToFind.push([hypotenuse, "side"], [sides[1], "side"])
                        sidesNameToFind.push(hypotenuse.name, sides[1].name)
                    }
                    else if(sides[1].value == undefined) {
                        equation = `sqrt(${hypotenuse.value}^2 - ${sides[1].name}^2) = ${toFind.name}`
                        sidesToFind.push([sides[1], "side"])
                        sidesNameToFind.push(sides[1].name)
                    }
                    else if(hypotenuse.value == undefined) {
                        equation = `sqrt(${hypotenuse.name}^2 - ${sides[1].value}^2) = ${toFind.name}`
                        sidesToFind.push([hypotenuse, "side"])
                        sidesNameToFind.push(hypotenuse.name)
                    }
                }
            }
            else {
                wrongItem = true
            }
        }
        else if(toFind.name == sides[1].name) {
            if(checkForWrongData(toFindArray, hypotenuse) && checkForWrongData(toFindArray, sides[0])) {
                generalEquation = `sqrt(${hypotenuse.name}^2 - ${sides[0].name}^2) = ${toFind.name}`
                if(sides[0].value != undefined && hypotenuse.value != undefined) {
                    console.log(sides[0].value,  hypotenuse.value)
                    equation = `sqrt(${hypotenuse.value}^2 - ${sides[0].value}^2) = ${toFind.name}`
                    result = nerdamer.solveEquations(`sqrt(${hypotenuse.value}^2 - ${sides[0].value}^2) = a`, "a")[0].toString()
                }
                else {
                    if(sides[0].value == undefined && hypotenuse.value == undefined) {
                        equation = `sqrt(${hypotenuse.name}^2 - ${sides[0].name}^2) = ${toFind.name}`
                        sidesToFind.push([sides[0], "side"], [hypotenuse, "side"])
                        sidesNameToFind.push(hypotenuse.name, sides[0].name)
                    }
                    else if(sides[0].value == undefined) {
                        equation = `sqrt(${hypotenuse.value}^2 - ${sides[0].name}^2) = ${toFind.name}`
                        sidesToFind.push([sides[0], "side"])
                        sidesNameToFind.push(sides[0].name)
                    }
                    else if(hypotenuse.value == undefined) {
                        equation = `sqrt(${hypotenuse.name}^2 - ${sides[0].value}^2) = ${toFind.name}`
                        sidesToFind.push([hypotenuse, "side"])
                        sidesNameToFind.push(hypotenuse.name)
                    }
                }
            }
            else {
                wrongItem = true
            }
        }
        else if(toFind.name == hypotenuse.name) {
            if(checkForWrongData(toFindArray, sides[1]) && checkForWrongData(toFindArray, sides[0])) {
                generalEquation = `sqrt(${sides[0].name}^2 + ${sides[1].name}^2) = ${toFind.name}`
                if(sides[1].value != undefined && sides[0].value != undefined) {
                    equation = `sqrt(${sides[0].value}^2 + ${sides[1].value}^2) = ${toFind.name}`
                    result = nerdamer.solveEquations(`sqrt(${sides[0].value}^2 + ${sides[1].value}^2) = a`, "a")[0].toString()
                }
                else {
                    if(sides[0].value == undefined && sides[1].value == undefined) {
                        equation = `sqrt(${sides[0].name}^2 + ${sides[1].name}^2) = ${toFind.name}`
                        sidesToFind.push([sides[0], "side"], [sides[1], "side"])
                        sidesNameToFind.push(sides[0].name, sides[1].name)
                    }
                    else if(sides[0].value == undefined) {
                        equation = `sqrt(${sides[0].name}^2 + ${sides[1].value}^2) = ${toFind.name}`
                        sidesToFind.push([sides[0], "side"])
                        sidesNameToFind.push(sides[0].name)
                    }
                    else if(sides[1].value == undefined) {
                        equation = `sqrt(${sides[0].value}^2 + ${sides[1].name}^2) = ${toFind.name}`
                        sidesToFind.push([sides[1], "side"])
                        sidesNameToFind.push(sides[1].name)
                    }
                }
            }
            else {
                wrongItem = true
            }
        }
        else {
            return [undefined]
        }
        if(wrongItem) {
            return [undefined]
        }
        else if(sidesToFind.length == 0) {
            return [result, equation, generalEquation, toFind.name]
        }
        else {
            return [sidesToFind, equation, generalEquation, toFind.name, sidesNameToFind]
        }
    }
    getSin(angleValueDeg) {
        return Math.sin(angleValueDeg * Math.PI / 180).toString()
    }
    getSinX(value) {
        if(value <= 1 && value >= -1) {
            return Math.round(180 * Math.asin(value)/Math.PI)
        }
        else{
            return value.toString()
        }
    }
    checkValueForMethods(element) {
        if(element.value != undefined) {
            return [element.value, "value"]
        }
        else {
            return [element.name, "name"]
        }
    }
    determineOppositeAngle(side, anglesArr) {
        let oppositeAngle
        anglesArr.forEach(angle => {
            if(side.name.includes(angle.name[0]) && side.name.includes(angle.name[2])) {
                oppositeAngle = angle
            }
        })
        return oppositeAngle
    }
    checkForWrongData(toFindArray, data) {
        let wrongData = false
        toFindArray.forEach(toFind=> {
            if(toFind[0].name == data.name){
                wrongData = true
            }
        })
        if(wrongData) {
            return false
        }
        else {
            return true
        }
    }
}