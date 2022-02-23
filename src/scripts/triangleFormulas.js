export class TriangleFormulas {
    constructor() {}
    anglesFormula(angle1, angle2, angle3, toFind) {
        let result 
        let anglesToFind = []
        if(toFind.name == angle1.name) {
            if(angle2.value != undefined && angle3.value != undefined) {
                result = nerdamer.solveEquations(`180 - ${angle2.value} - ${angle3.value} = a`, "a")[0].toString()
            }
            else {
                if(angle2.value == undefined) {
                    anglesToFind.push(angle2)
                }
                if(angle3.value == undefined) {
                    anglesToFind.push(angle3)
                }
            }
        }
        else if(toFind.name == angle2.name) {
            if(angle1.value != undefined && angle3.value != undefined) {
                result = nerdamer.solveEquations(`180 - ${angle1.value} - ${angle3.value} = a`, "a")[0].toString()
            }
            else {
                if(angle1.value == undefined) {
                    anglesToFind.push(angle1)
                }
                if(angle3.value == undefined) {
                    anglesToFind.push(angle3)
                }
            }
        }
        else if(toFind.name == angle3.name) {
            if(angle2.value != undefined && angle1.value != undefined) {
                result = nerdamer.solveEquations(`180 - ${angle2.value} - ${angle1.value} = a`, "a")[0].toString()
            }
            else {
                if(angle2.value == undefined) {
                    anglesToFind.push(angle2)
                }
                if(angle1.value == undefined) {
                    anglesToFind.push(angle1)
                }
            }
        }
        if(anglesToFind.length == 0) {
            return result
        }
        else {
            return anglesToFind
        }
    }
}