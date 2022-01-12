import {TriangleVectorModel} from "./triangleVectorModel.js "
export class RightTriangleVectorModel extends TriangleVectorModel {
    constructor(parentTriangleName, triangles, innerSegments, sides, angles, parentRightAngle, parentHypotenuse) {
        super()
        // data
        this.triangles = triangles
        this.innerSegments = innerSegments
        this.sides = sides
        this.angles = angles
        // unique for parent right triangle
        this.parentTriangleName = parentTriangleName
        this.parentRightAngle = parentRightAngle
        this.parentHypotenuse = parentHypotenuse
        // counter for random intersect dots
        this.intersectDotsCounter = 0
        // funcs
        this.setInitialTriangleData(this.parentTriangleName)
        this.setParentTriangleCoordinates()
        this.setParentTriangleComponents()
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
            this.sides.push(this.createComponents.createSide(hypotenuseName, undefined, "hypotenuse"))
        }
        else if(this.parentRightAngle.length == 0 && this.parentHypotenuse.length == 1) {
            hypotenuseName =  this.parentHypotenuse[0].name
            const rightAngle = this.findRightAngle(hypotenuseName)
            this.angles.push(this.createComponents.createAngle(rightAngle, "90", "angle"))
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
                    console.log(this.sidesComponents)
                }
            }
        }
    }
    // needs for determining first dot of segment and opposite side 
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
        let secondDotCoordiantes
        // opposite side equation
        const oppositeSideEquation = this.getEquation(oppositeSide.coordinates)[0]
        const equationRatios = this.getEquation(oppositeSide.coordinates)[1]
        // dots equation
        const dotsEquationSlopeRatio = nerdamer.solveEquations(`m*${equationRatios[1][1]}=-1`, "m")[0].toString()
        const dotsEquationSteepRatio = nerdamer.solveEquations(`${firstDotCoordinates[1]}=${dotsEquationSlopeRatio}*${firstDotCoordinates[0]}+(b)`, "b")[0].toString()
        const dotsEquation = `y=${dotsEquationSlopeRatio}*x+(${dotsEquationSteepRatio})`
        secondDotCoordiantes = [nerdamer.solveEquations([oppositeSideEquation, dotsEquation])[0][1], nerdamer.solveEquations([oppositeSideEquation, dotsEquation])[1][1]]
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
        this.checkForIntersect(height, dotsEquation, firstDotCoordinates, secondDotName, oppositeSide.name)
        console.log(this.trianglesComponents)
        console.log(this.anglesComponents)
    }
    getEquation(coordinates) {
            if(coordinates[0] == coordinates[2] && coordinates[1] != coordinates[3]) {
                return [`0*y=-x+(${coordinates[0]})`, [["b", coordinates[0]], ["m", -1]]]
            }
            else if(coordinates[0] != coordinates[2] && coordinates[1] == coordinates[3]) {
                return [`y=0*x+(${coordinates[1]})`, [["b", coordinates[1]], ["m", 1]]]
            }
            else {
                const firstEquation = `${coordinates[1]}=m*${coordinates[0]}+(b)`
                const secondEquation = `${coordinates[3]}=m*${coordinates[2]}+(b)`
                const equationRatios = nerdamer.solveEquations([firstEquation, secondEquation])
                return [`y=${equationRatios[1][1]}*x+(${equationRatios[0][1]})`, equationRatios]
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
                    // console.log(this.checkForOneSegmentSides(sideEquation, firstDotSide.coordinates), firstDotSide, side)
                    // console.log(this.checkForOneSegmentSides(sideEquation, secondDotSide.coordinates), secondDotSide, side)
                    const firstDotSideRatios = this.getEquation(firstDotSide.coordinates)[1]
                    const secondDotSideRatios = this.getEquation(secondDotSide.coordinates)[1]
                    // console.log(this.getEquation([firstDotSide.coordinates[0], firstDotSide.coordinates[1], secondDotSide.coordinates[0], secondDotSide.coordinates[1]])[0])
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


    checkForIntersect(initialSegment, segmentEquation, firstDotCoordinates, secondDotName, oppositeSideName) {
        const initialSegmentName = initialSegment.name
        this.sidesComponents.forEach(arraySegment => {
            if(initialSegmentName != arraySegment.name) {
                const arraySegmentEquation = this.getEquation(arraySegment.coordinates)[0]
                try {  
                    const result = nerdamer.solveEquations([segmentEquation, arraySegmentEquation])
                    const coordinates = [result[0][1], result[1][1]]
                    if(firstDotCoordinates[0] != coordinates[0] && firstDotCoordinates[1] != coordinates[1]) {
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
                            console.log(this.trianglesComponents)
                        })
                    }
                } catch (error) {
                }
            }
        })
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
        this.checkForItemsDuplicateData([this.side1, this.side2, this.side3], this.sides, this.triangles[0])
        this.sidesComponents.push(this.side1, this.side2, this.side3)
        this.checkForItemsDuplicateData([this.angle1, this.angle2, this.angle3], this.angles, this.triangles[0])
        this.anglesComponents.push(this.angle1, this.angle2, this.angle3)
    }
    // finds out if previously known data was used
    checkForItemsDuplicateData(itemArray, array, closestParent) {
        itemArray.forEach(item => {
            array.forEach(arrayItem => {
                if(arrayItem.name == item.name || arrayItem.name == item.name.split("").reverse().join("")) {
                    item.value = arrayItem.value
                    item.equal = arrayItem.equal
                    item.type = arrayItem.type
                    item.layoutItem = arrayItem.layoutItem
                }
                item.closestParent = closestParent
            })
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