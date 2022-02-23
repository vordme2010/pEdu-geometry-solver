import {TriangleVectorModel} from "./triangleVectorModel.js"
import {RightTriangleObject} from "./triangleObject.js"
import {SolvingRunner} from "./solvingRunner.js"
export class RightTriangleVectorModel extends TriangleVectorModel {
    constructor(parentTriangleName, triangles, innerSegments, sides, angles, toFind, parentRightAngle, parentHypotenuse) {
        super()
        // data
        this.triangles = triangles
        this.innerSegments = innerSegments
        this.sides = sides
        this.angles = angles
        this.toFind = toFind
        // unique for parent right triangle
        this.parentTriangleName = parentTriangleName
        this.parentRightAngle = parentRightAngle
        this.parentHypotenuse = parentHypotenuse
        // objects for solvingRunner
        this.objectsToSolve = []
        // funcs
        this.setInitialTriangleData(this.parentTriangleName)
        this.setParentTriangleCoordinates()
        this.setParentTriangleComponents()
        this.groupData()
    }
    setParentTriangleCoordinates() {
        this.side1.coordinates = [0, 0, 0, 3]
        this.side2.coordinates = [0, 3, 4, 0]
        this.side3.coordinates = [4, 0, 0, 0]
        this.dot1.coordinates = [0, 0]
        this.dot2.coordinates = [0, 3]
        this.dot3.coordinates = [4, 0]
    }
    setParentTriangleComponents() {
        let rightAngleDot
        let hypotenuseName 
        if(this.parentRightAngle.length == 1 && this.parentHypotenuse.length == 1) {
            rightAngleDot = this.parentRightAngle[0].name[1]
            hypotenuseName =  this.parentHypotenuse[0].name
        }
        else if(this.parentRightAngle.length == 1 && this.parentHypotenuse.length == 0) {
            rightAngleDot = this.parentRightAngle[0].name[1]
            hypotenuseName = this.parentRightAngle[0].name[0] + this.parentRightAngle[0].name[2]
            this.parentHypotenuse.push(this.createComponents.createSide(hypotenuseName, undefined, "hypotenuse"))
        }
        else if(this.parentRightAngle.length == 0 && this.parentHypotenuse.length == 1) {
            hypotenuseName =  this.parentHypotenuse[0].name
            const rightAngle = this.findRightAngle(hypotenuseName)
            this.parentRightAngle.push(this.createComponents.createAngle(rightAngle, "90", "angle"))
            rightAngleDot = rightAngle[1]
        }
        // right angle dot condition
        this.addComponentWithRightAngleCondition(rightAngleDot, this.parentTriangleName, 0, 1, 2)
        this.addComponentWithRightAngleCondition(rightAngleDot, this.parentTriangleName, 1, 2, 0)
        this.addComponentWithRightAngleCondition(rightAngleDot, this.parentTriangleName, 2, 0, 1)
        if(this.innerSegments.length != 0) {
            this.setInnersegmentsCoordinates()
        }
    }
    groupData() {
        const correctEqualData = this.checkForWrongEqualData(this.angles, this.anglesComponents) && this.checkForWrongEqualData(this.sides, this.sidesComponents)
        const correctData = this.checkForItemsDuplicateData(this.angles, this.anglesComponents) && this.checkForItemsDuplicateData(this.sides, this.sidesComponents)

        const correctToFind = this.checkForCorrectToFind(this.toFind, [...this.anglesComponents, ...this.sidesComponents, ...this.trianglesComponents]) 
        if(correctEqualData && correctData && correctToFind.length != 0 && correctToFind.length != undefined && this.createRightTriangleObjects()) {
            this.runCanvas()
            const solvingRunner = new SolvingRunner(this.objectsToSolve, correctToFind)
        }
    }
    runCanvas() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");

        ctx.font = "20px Arial";
 
            if(this.sidesComponents.length > 3) {
                ctx.fillText(this.sidesComponents[3].name[1], 1.44 * 47, 0.9 * 47);
                ctx.moveTo(0 * 45,  3.3 * 45);
                ctx.lineTo(1.44 * 45, 1.38 * 45);
            }
            ctx.fillText(this.sidesComponents[0].name[1], 0.37 * 47, 0.37 * 47);
            ctx.moveTo(0 * 45, 0.3 * 45);
            ctx.lineTo(0 * 45, 3.3 * 45);

            ctx.fillText(this.sidesComponents[2].name[1], 0.37 * 47, 3 * 47);
            ctx.moveTo(0 * 45, 3.3 * 45);
            ctx.lineTo(4 * 45, 3.3 * 45);

            ctx.fillText(this.sidesComponents[1].name[1], 3.9 * 47, 3 * 47);
            ctx.moveTo(4 * 45, 3.3 * 45);
            ctx.lineTo(0 * 45, 0.3 * 45);
        ctx.stroke();
    }
    createRightTriangleObjects() {
        let notCorrectData = false
        this.trianglesComponents.forEach(trinagle => {
            const triangleName = trinagle.name
            let sides = []
            let angles = []
            let heights = []
            let medians = []
            let angleBisectors = []
            let anglesSum = []
            let sidesSum = []
            let rightAngle = undefined
            let hypotenuse = undefined
            const sidesComponents = this.sidesComponents
            const anglesComponents = this.anglesComponents
            const anglesSumCondition = anglesSum.length == 3 && anglesSum[0] + anglesSum[1] + anglesSum[2] == 180
            const sidesSumCondition = sidesSum.length == 3 && sidesSum[0] + sidesSum[1] > sidesSum[2] && sidesSum[0] + sidesSum[2] > sidesSum[1] && sidesSum[2] + sidesSum[1] > sidesSum[0]
            let correctData = false
            let correctDataArr = []
            anglesComponents.forEach(angle => {
                if(angle.name.includes(triangleName[0]) && angle.name.includes(triangleName[1]) && angle.name.includes(triangleName[2])) {
                    angles.push(angle)
                    if(angle.parentItem != true && angle.parentItem != false) {
                        if(trinagle == this.triangles[0]) {
                            angle.parentItem = true
                        }
                        else {
                            angle.parentItem = false
                        }
                    }
                    if(angle.value != undefined) {
                        anglesSum.push(angle.value)
                    }
                    if(angle.value == "90") {
                        rightAngle = angle
                    }
                }
            })
            sidesComponents.forEach(side => {
                const sideCase1 = side.name.includes(triangleName[0]) && side.name.includes(triangleName[1])
                const sideCase2 = side.name.includes(triangleName[1]) && side.name.includes(triangleName[2])
                const sideCase3 = side.name.includes(triangleName[2]) && side.name.includes(triangleName[0])
                if(sideCase1 || sideCase2 || sideCase3) {
                    sides.push(side)
                    if(side.parentItem != true && side.parentItem != false) {
                        if(trinagle == this.triangles[0]) {
                            side.parentItem = true
                        }
                        else {
                            side.parentItem = false
                        }
                    }
                    if(side.value != undefined) {
                        sidesSum.push(side.value)
                    }
                    if(side.type == "hypotenuse") {
                        hypotenuse = side
                    }
                    if(side.name.includes(rightAngle.name[0]) && side.name.includes(rightAngle.name[2])) {
                        hypotenuse = side
                    }
                }
                else if(side.type == "height" || side.type == "angle-bisector" || side.type == "median") {
                    if(side.closestParent.name == triangleName) {
                        if(side.parentItem != true && side.parentItem != false) {
                            if(trinagle == this.triangles[0]) {
                                side.parentItem = true
                            }
                            else {
                                side.parentItem = false
                            }
                        }
                        if(side.type == "height") {
                            heights.push(side)
                        }
                        else if(side.type == "angle-bisector") {
                            angleBisectors.push(side)
                        }
                        else if(side.type == "median") {
                            medians.push(side)
                        }
                    }
                }
            })
            if(anglesSumCondition) {
                if(sidesSumCondition) {
                    correctData = true
                }
                else if(sidesSum.length != 3) {
                    correctData = true
                }
                else {
                    alert("wrong declared sides. This triangle does not exist!")
                }
            }
            else if(anglesSum.length != 3) {
                if(sidesSumCondition) {
                    correctData = true
                }
                else if(sidesSum.length != 3) {
                    correctData = true
                }
                else {
                    alert("wrong declared sides. This triangle does not exist!")
                }
            }
            else {
                alert("wrong declared angles!")
            }
            correctDataArr.push(correctData)
            if(correctData) {
                if(trinagle.type == "right-triangle") {
                    const triangleObject = new RightTriangleObject(heights[0], rightAngle, hypotenuse)
                    triangleObject.triangle = trinagle
                    triangleObject.side1 = sides[0]
                    triangleObject.side2 = sides[1]
                    triangleObject.side3 = sides[2]
                    triangleObject.angle1 = angles[0]
                    triangleObject.angle2 = angles[1]
                    triangleObject.angle3 = angles[2]
                    triangleObject.median1 = medians[0]
                    triangleObject.median2 = medians[1]
                    triangleObject.median3 = medians[2]
                    triangleObject.angleBisector1 = angleBisectors[0]
                    triangleObject.angleBisector2 = angleBisectors[1]
                    triangleObject.angleBisector3 = angleBisectors[2]
                    triangleObject.components = [
                        sides[0], 
                        sides[1],  
                        sides[2],
                        angles[0],
                        angles[1],
                        angles[2],
                        medians[0],
                        medians[1],
                        medians[2],
                        angleBisectors[0],
                        angleBisectors[1],
                        angleBisectors[2],
                        heights[0],
                    ]
                    this.objectsToSolve.push(triangleObject)
                }
            }
            correctDataArr.forEach(data=> {
                if(!data) {
                    notCorrectData = true
                }
            })
        })
        if(!notCorrectData) {
            return true
        }
        else {
            return false
        }
    }
    setInnersegmentsCoordinates() {
        let segmentsArr = this.innerSegments
        while(segmentsArr.length != 0) {
            let segmentExist = false
            let segmentToBuild
            let sideOppositeSegment
            let firstDotOfSegment
            segmentsArr.forEach((segment, id) => {
                const segmentAngle = segment.angle
                this.trianglesComponents.forEach(triangle => {
                    const triangleName = triangle.name
                    const segmentExists = triangleName.includes(segmentAngle[0]) && triangleName.includes(segmentAngle[1]) && triangleName.includes(segmentAngle[2])
                    if(segmentExists) {
                        segmentExist = true 
                        segment.closestParent = triangle
                        segmentToBuild = segment
                        sideOppositeSegment = this.findSegmentComponent(segmentAngle[0] + segmentAngle[2], this.sidesComponents)
                        firstDotOfSegment = this.findSegmentComponent(segmentAngle[1], this.dotsComponents)
                        segmentsArr.splice(id, 1)
                        //------------BUG-------------
                    }
                }) 
            })
            if(!segmentExist) {
                alert("some inner segments aren't exist")
                break
            }
            else if(segmentToBuild.type == "height" && !this.checkForRightAngle(segmentToBuild.angle)) {
                alert("in a right triangle, height can be located ONLY from an angle of 90 degrees")
                segmentToBuild.layoutItem.style.border = "1px solid red"
                break
            }
            else{ 
                if(segmentToBuild.type == "median") {
                    this.addMedian(segmentToBuild, sideOppositeSegment, firstDotOfSegment)
                }
                else if(segmentToBuild.type == "angle-bisector") {
                    this.addBisector(segmentToBuild, sideOppositeSegment, firstDotOfSegment)
                }
                else if(segmentToBuild.type == "height") {
                    this.addHight(segmentToBuild, sideOppositeSegment, firstDotOfSegment)
                }
            }
        }
    }
    // finds out if previously known data was used
    checkForItemsDuplicateData(dataArr, componentsArr) {
        let dataExists = true
        dataArr.forEach(data => {
            let flag = false
            let wrongName = true
            componentsArr.forEach(componentData => {
                if(componentData.name == data.name || componentData.name == data.name.split("").reverse().join("")) {
                    wrongName = false
                    if(data.value != componentData.value && data.value != undefined && componentData.value != undefined) {
                        alert(`${componentData.type} value is already declared. Declared value: ${componentData.value}`)
                        data.layoutItem.style.border = "1px solid red"
                    }
                    else if(data.equal != componentData.equal && data.equal != undefined && componentData.equal != undefined) {
                        alert(`${componentData.type} value is already declared. Declared value: ${componentData.equal}`)
                        data.layoutItem.style.border = "1px solid red"
                    }
                    else if(data.value != undefined && componentData.value == undefined) {
                        flag = true
                        if(data.equal == undefined && componentData.equal != undefined) {
                            componentData.value = data.value
                        }
                        else if(data.equal != undefined && componentData.equal == undefined) {
                            componentData.value = data.value
                            componentData.equal = data.equal
                        }
                        else {
                            componentData.value = data.value
                        }
                    }
                    else if(data.value == undefined && componentData.value != undefined || data.value == undefined && componentData.value == undefined) {
                        flag = true 
                        if(data.equal != undefined && componentData.equal == undefined) {
                            componentData.equal = data.equal
                        }
                    }
                    else{
                        flag = true 
                    }
                }
            })
            if(!flag) {
                if(wrongName) {
                    alert(`incorrect data name`)
                }
                dataExists = false
                data.layoutItem.style.border = "1px solid red"
            }
        })
        return dataExists
    }
    checkForWrongEqualData(dataArr, componentsArr) {
        let dataExists = true 
        dataArr.forEach(data => {
            if(data.equal != undefined) {
                let flag = false
                componentsArr.forEach(componentData => {
                    if(componentData.name == data.equal || componentData.name == data.equal.split("").reverse().join("")) {
                        flag = true
                        if(componentData.equal == undefined) {
                            componentData.equal = data.name
                        }
                    }
                })
                if(!flag) {
                    alert(`there's no equal item named ${data.equal}`)
                    dataExists = false
                    data.layoutItem.style.border = "1px solid red"
                }
            }
        })
        return dataExists
    }
    checkForCorrectToFind(dataArr, componentsArr) {
        let dataExists = []
        let trianglesAndAnglesEqualNames = []
        componentsArr.forEach(item1 => {
            if(item1.type == "right-triangle" || item1.type == "equilateral-triangle" || item1.type == "isosceles-triangle") {
                componentsArr.forEach(item2 => {
                    if(item2.type == "angle" && item2.name == item1.name) {
                        trianglesAndAnglesEqualNames.push(item2.name)
                    }
                })
            }
            
        })
        dataArr.forEach(data => { 
            let flag = false
            componentsArr.forEach(componentData => {
                let equalNames = false
                if(componentData.name.length == data.name.length) {
                    if(componentData.name.length == 2 && componentData.name.includes(data.name[0]) && componentData.name.includes(data.name[1])) {
                        equalNames = true
                    }
                    else if(componentData.name.length == 3 && componentData.type != "angle" && componentData.name.includes(data.name[0]) && componentData.name.includes(data.name[1]) && componentData.name.includes(data.name[2])) {
                        equalNames = true
                    }
                    else if(componentData.name == data.name && componentData.type == "angle" || componentData.name == data.name.split("").reverse().join("")) {
                        equalNames = true
                    }
                }
                if(equalNames) {
                    if(componentData.type == "median" || componentData.type == "angle-bisector" || componentData.type == "height" || componentData.type == "side" || componentData.type == "hypotenuse") {
                        if(data.type == "value" && data.name.length == 2) {
                            flag = true
                            dataExists.push([componentData, componentData.type])
                        }
                    }
                    else if(componentData.type == "angle" && data.type == "value" && data.name.length == 3) {
                        trianglesAndAnglesEqualNames.forEach(name => {
                            if(componentData.name == name) {
                                flag = true
                                dataExists.push([componentData, componentData.type])
                            }
                        })
                        if(!flag) {
                            flag = true
                            dataExists.push([componentData, componentData.type])
                        }
                    }
                    else if(componentData.type == "right-triangle" || componentData.type == "equilateral-triangle" || componentData.type == "isosceles-triangle") {
                        if(data.type != "value" && data.name.length == 3) {
                            trianglesAndAnglesEqualNames.forEach(name => {
                                if(componentData.name == name) {
                                    flag = true
                                    dataExists.push([componentData, componentData.type])
                                }
                            })
                            if(!flag) {
                                flag = true
                                dataExists.push([componentData, componentData.type])
                            }
                        }
                    }
                }
            })
            if(!flag) {
                alert(`wrong declared what we need to find: ${data.name}`)
                dataExists = false
                data.layoutItem.style.border = "1px solid red"
            }
        })
        return dataExists
    }
    //  for determining first dot of segment and opposite side 
    findSegmentComponent(item, array) {
        let itemToFind
        array.forEach(arrayItem => {
            if(arrayItem.name == item || arrayItem.name == item.split("").reverse().join("")) {
                itemToFind = arrayItem
            }
        }) 
        return itemToFind
    }
    addHight(height, oppositeSide, firstDot) {
        const firstDotCoordinates = firstDot.coordinates
        // opposite side equation
        const oppositeSideEquation = this.getEquation(oppositeSide.coordinates)[0]
        const equationRatios = this.getEquation(oppositeSide.coordinates)[1] 
        const equationType = this.getEquation(oppositeSide.coordinates)[2] 
        let dotsEquation
        if(equationType == "horizontal") {
            dotsEquation = `0*y=-x+(${firstDot.coordinates[0]})`
        }
        else if(equationType == "vertical") {
            dotsEquation = `y=0*x+(${firstDot.coordinates[1]})`
        }
        else {
            // dots equation
            const dotsEquationSlopeRatio = nerdamer.solveEquations(`m*${equationRatios[1][1]}=-1`, "m")[0].toString()
            const dotsEquationSteepRatio = nerdamer.solveEquations(`${firstDotCoordinates[1]}=${dotsEquationSlopeRatio}*${firstDotCoordinates[0]}+(b)`, "b")[0].toString()
            dotsEquation = `y=${dotsEquationSlopeRatio}*x+(${dotsEquationSteepRatio})`
        }
        let secondDotCoordiantes = [nerdamer.solveEquations([oppositeSideEquation, dotsEquation])[0][1], nerdamer.solveEquations([oppositeSideEquation, dotsEquation])[1][1]]
        // // second dot component
        const secondDot = this.createComponents.createDot(this.getSecondDotOfSegment(height.name, firstDot.name), secondDotCoordiantes)
        const secondDotName = secondDot.name
        if(!this.checkForDotDuplicate(secondDot)) {
            this.dotsComponents.push(secondDot)
        }
        // // now we know all the coordinates for our height
        height.coordinates.push(firstDotCoordinates[0], firstDotCoordinates[1], secondDotCoordiantes[0], secondDotCoordiantes[1]) 
        this.setInnerDots(height)
        this.sidesComponents.push(height) 
        // // checking for the intersect to determine additional side components, angles & triangles
        this.checkForIntersect(height, dotsEquation, secondDotName, oppositeSide.name)
    }
    getEquation(coordinates) {
        const coord0 = coordinates[0].toFixed(4)
        const coord1 = coordinates[1].toFixed(4)
        const coord2 = coordinates[2].toFixed(4)
        const coord3 = coordinates[3].toFixed(4)
        if(coord0 == coord2 && coord1 != coord3) {
            return [`0*y=-x+(${coord0})`, [["b", coord0], ["m", -1]], "vertical"]
        }
        else if(coord0 != coord2 && coord1 == coord3) {
            return [`y=0*x+(${coord1})`, [["b", coord1], ["m", 1]], "horizontal"]
        }
        else {
            const firstEquation = `${coord1}=m*${coord0}+(b)`
            const secondEquation = `${coord3}=m*${coord2}+(b)`
            const equationRatios = nerdamer.solveEquations([firstEquation, secondEquation])
            return [`y=${equationRatios[1][1].toFixed(6)}*x+(${equationRatios[0][1].toFixed(6)})`, [['b', equationRatios[0][1].toFixed(6)], ['m', equationRatios[1][1].toFixed(6)]], undefined]
        }
    }
    determineNewInnerTriangles(side, type, secondDotName) {
        let triangleSides = []
        let sidesWithFirstDot = []
        let sidesWithSecondDot = []
        const sideRatios = this.getEquation(side.coordinates)[1]
        this.sidesComponents.forEach(arraySide => {
            if(arraySide.name.includes(side.name[0])) {
                sidesWithFirstDot.push(arraySide)
            }
            else if(arraySide.name.includes(side.name[1])) {
                sidesWithSecondDot.push(arraySide)
            }
        })
        sidesWithFirstDot.forEach(firstDotSide => {
            sidesWithSecondDot.forEach(secondDotSide => {
                if(secondDotSide.name.includes(firstDotSide.name[0]) || secondDotSide.name.includes(firstDotSide.name[1])) {
                    const firstDotSideRatios = this.getEquation(firstDotSide.coordinates)[1]
                    const secondDotSideRatios = this.getEquation(secondDotSide.coordinates)[1]
                    if(this.checkForOneSegmentSides(sideRatios, firstDotSideRatios) && this.checkForOneSegmentSides(sideRatios, secondDotSideRatios)) {
                        triangleSides.push([firstDotSide, side, secondDotSide])
                    }
                }
            })
        })
        triangleSides.forEach(innerComponents => {
            let triangleNameSymbols = []
            innerComponents.forEach(component => {
                triangleNameSymbols.push(...component.name.split(""))
            })
            const triangleName = [...new Set(triangleNameSymbols)].join("")
            let triangleType
            if(type == "height") {
                triangleType = "right-triangle"
                const innerAngles = this.checkForAngleDuplicate(triangleName)
                innerAngles.forEach(angle => {
                    let rightAngleValue = undefined
                    if(angle[1] == secondDotName) {
                        rightAngleValue = "90"
                    }
                   this.anglesComponents.push(this.createComponents.createAngle(angle, rightAngleValue, "angle"))
                })
            }
            else if(type == "side") {
                triangleType = "scalene-triangle"
            }
            const triangle = this.createComponents.createTriangle(triangleName, undefined, triangleType)
            this.trianglesComponents.push(triangle)
        })
    }
    checkForOneSegmentSides(sideRatios, dotsRatios) {
        if(sideRatios[0][1] == dotsRatios[0][1] && sideRatios[1][1] == dotsRatios[1][1]) {
            return false
        }
        else {
            return true
        }
    }
    replaceAt(string, replacement, index) {
        string = string.split('');
        string[index] = replacement;
        return string.join('');
    }
    checkForIntersect(initialSegment, segmentEquation, secondDotName, oppositeSideName) {
        this.sidesComponents.forEach(arraySegment => {
            const notEqualCoordinates = initialSegment.innerDots[0] != arraySegment.innerDots[0] && initialSegment.innerDots[1] != arraySegment.innerDots[1] && initialSegment.innerDots[0] != arraySegment.innerDots[1] && initialSegment.innerDots[1] != arraySegment.innerDots[0]
            if(initialSegment.name != arraySegment.name && notEqualCoordinates) {
                const arraySegmentEquation = this.getEquation(arraySegment.coordinates)[0]
                try {  
                    const result = nerdamer.solveEquations([segmentEquation, arraySegmentEquation])
                    const coordinates = [result[0][1], result[1][1]]
                    if(this.checkForVectorIncluding(arraySegment.coordinates, coordinates, arraySegment, initialSegment, arraySegmentEquation, segmentEquation)) { 
                        let sideName
                        let sideCoordinates
                        let intersectDotName 
                        let sideType
                        if(arraySegment.name == oppositeSideName) {
                            intersectDotName = secondDotName
                            sideType = initialSegment.type
                        }
                        else {
                            intersectDotName = this.randomIntersectDot().name
                            intersectDotName.coordinates = [coordinates[0], coordinates[1]]
                            sideType = "side"
                        }
                        arraySegment.innerDots.forEach(dot => {
                            const firstHorizontalSideCondition = dot[1] != coordinates[0] && dot[1] != 0 || coordinates[0] != 0 && dot[1] < coordinates[0] 
                            const firstVerticalSideCondition = dot[2] < coordinates[1] && dot[1] == coordinates[0]
                            const secondHorizontalSideCondition = dot[1] != coordinates[0] && dot[1] != 0 || coordinates[0] != 0 && dot[1] > coordinates[0] 
                            const secondVerticalSideCondition = dot[2] > coordinates[1] && dot[1] == coordinates[0]
                            if(firstHorizontalSideCondition || firstVerticalSideCondition) {
                                sideName = dot[0] + intersectDotName
                                sideCoordinates = [dot[1], dot[2], coordinates[0], coordinates[1]]
                            }
                            else if(secondHorizontalSideCondition || secondVerticalSideCondition) {
                                sideName = intersectDotName + dot[0]
                                sideCoordinates = [coordinates[0], coordinates[1], dot[1], dot[2]]
                            } 
                            const side = this.createComponents.createSide(sideName, undefined, "side")
                            side.coordinates = sideCoordinates
                            this.determineNewInnerTriangles(side, sideType, intersectDotName)
                            this.setInnerDots(side)
                            this.sidesComponents.push(side)
                            arraySegment.innerItems.push(side)
                        })
                        arraySegment.innerDots.push([intersectDotName, coordinates[0], coordinates[1]])
                    }
                } catch (error) {
                }
            }
        })
    }
    checkForVectorIncluding(intersectSegment, intersectCoord, arraySegment, initialSegment, arraySegmentEquation, segmentEquation) {
        const coord0 = intersectSegment[0]
        const coord1 = intersectSegment[1]
        const coord2= intersectSegment[2]
        const coord3 = intersectSegment[3]
        const intersectCoord0 = intersectCoord[0]
        const intersectCoord1 = intersectCoord[1]
        if(coord0 == coord2 && coord1 > coord3 && intersectCoord1 > coord1) {
            return false
        }
        else if(coord0 == coord2 && coord3 > coord1 && intersectCoord1 > coord3) {
            return false
        }
        else if(coord1 == coord3 && coord0 > coord2 && intersectCoord0 > coord0) {
            return false
        }
        else if(coord1 == coord3 && coord2 > coord0 && intersectCoord0 > coord2) {
            return false
        }
        else if(coord0 > coord2 && coord1 > coord3 && intersectCoord0 > coord0 && intersectCoord1 > coord1) {
            return false
        }
        else if(coord2 > coord0 && coord3 > coord1 && intersectCoord0 > coord2 && intersectCoord1 > coord3) {
            return false
        }
        else if(coord0 < coord2 && coord1 > coord3 && intersectCoord0 < coord0 && intersectCoord1 > coord1) {
            return false
        }
        else if(coord2 < coord0 && coord3 > coord1 && intersectCoord0 < coord2 && intersectCoord1 > coord3) {
            return false
        }
        else {
            return true
        }
    }
    checkForAngleDuplicate(triangleName) {
        const angles = [[triangleName[2], triangleName[0], triangleName[1]], [triangleName[0], triangleName[1], triangleName[2]], [triangleName[1], triangleName[2], triangleName[0]]]
        let noDuplicateAngles = []
        angles.forEach(angleName => {
            let hasDuplicate = false
            this.anglesComponents.forEach(angleComponent => {
                if(angleName == angleComponent) [
                    hasDuplicate = true
                ]
            })
            if(!hasDuplicate) {
                noDuplicateAngles.push(angleName.join(""))
            }
        })
        return noDuplicateAngles
    }
    checkForDotDuplicate(dot) {
        const hasDuplicate = false
        this.dotsComponents.forEach(arrayDot => {
            if(arrayDot.coordinates == dot.coordinates && arrayDot.name == dot.name) {
                hasDuplicate = true
            }
        })
        if(!hasDuplicate) {
            return false
        }
        else {
            return true
        }
    }
    getSecondDotOfSegment(segmentName, firstDotName) {
        if(segmentName[0] == firstDotName) {
            return segmentName[1]
        }
        else {
            return segmentName[0]
        }
    }
    randomIntersectDot() {
        let dotToFind = []
        const dots = ['A','B','C','D','E','F','G','H','I','j','k','l','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        'A1','B1','C1','D1', 'E1','F1','G1','H1','I1','j1','k1','l1','M1','N1','O1','P1','Q1','R1','S1','T1','U1',
        'V1','W1','X1','Y1','Z1']
        dots.forEach(randomDot => {
            this.dotsComponents.forEach(dot => {
                if(randomDot != dot.name) {
                    dotToFind[0] = randomDot
                }
            })
        })
        return this.createComponents.createDot(dotToFind[0])
    }
    addParentTriangleComponents(key1, key2, key3) {
        this.side1.name = this.parentTriangleName[key1] + this.parentTriangleName[key2]
        this.side2.name = this.parentTriangleName[key2] + this.parentTriangleName[key3]
        this.side3.name = this.parentTriangleName[key3] + this.parentTriangleName[key1]
        this.setInnerDots(this.side1)
        this.setInnerDots(this.side2)
        this.setInnerDots(this.side3)
        this.angle1.name = this.parentTriangleName[key3] + this.parentTriangleName[key1] + this.parentTriangleName[key2]
        this.angle2.name = this.parentTriangleName[key1] + this.parentTriangleName[key2] + this.parentTriangleName[key3]
        this.angle3.name = this.parentTriangleName[key2] + this.parentTriangleName[key3] + this.parentTriangleName[key1]
        this.dot1.name = this.parentTriangleName[key1]
        this.dot2.name = this.parentTriangleName[key2]
        this.dot3.name = this.parentTriangleName[key3]
        this.dotsComponents.push(this.dot1, this.dot2, this.dot3)
        this.parentTriangleName = this.parentTriangleName[key1] + this.parentTriangleName[key2] + this.parentTriangleName[key3]
        this.triangles[0].name = this.parentTriangleName
        this.trianglesComponents.push(this.triangles[0])
        this.setUniqueElement([this.side1, this.side2, this.side3], this.parentHypotenuse[0])
        this.sidesComponents.push(this.side1, this.side2, this.side3)
        this.setUniqueElement([this.angle1, this.angle2, this.angle3], this.parentRightAngle[0])
        this.anglesComponents.push(this.angle1, this.angle2, this.angle3)
    }
    setUniqueElement(array, element) {
        array.forEach(item => {
            if(element.name == item.name || element.name == item.name.split("").reverse().join("")) {
                item.value = element.value
                item.type = element.type
                item.layoutItem = element.layoutItem
                item.equal = element.equal
            }
        })
    }
    findRightAngle(hypotenuseName) {
        let angleToFind
        this.parentTriangleName.split("").forEach(triangleSymbol => {
            if(triangleSymbol != hypotenuseName[0] && triangleSymbol != hypotenuseName[1]) {
                angleToFind = hypotenuseName[0] + triangleSymbol + hypotenuseName[1]
            }
        })
        return angleToFind
    }
    addComponentWithRightAngleCondition(rightAngleDot, parentTriangleName, key1, key2, key3) {
        if(rightAngleDot == parentTriangleName[key1]) {
            this.addParentTriangleComponents(key1, key2, key3)
        } 
    }
    checkForRightAngle(segmentAngle) {
        let comesFromRightAngle = false
        this.anglesComponents.forEach(angle => {
            if(angle.name == segmentAngle ||  angle.name == segmentAngle.split("").reverse().join("") && angle.value == 90) {
                comesFromRightAngle = true
            }
        })
        return comesFromRightAngle
    }

    setInnerDots(component) {
        component.innerDots.push([component.name[0], component.coordinates[0], component.coordinates[1]], [component.name[1], component.coordinates[2], component.coordinates[3]])
    }
}
