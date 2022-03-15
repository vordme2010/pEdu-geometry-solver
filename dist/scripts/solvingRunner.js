import {RightTriangleFormulas} from "./rightTriangleFormulas.js"
export class SolvingRunner {
    constructor(objects, toFind) {
        this.objects = objects
        this.toFind = toFind
        // math methods
        this.rightTriangleFormulas = new RightTriangleFormulas
        this.currentSolving = []
        this.runSolving()
    }
    runSolving() {
        this.toFind.forEach((toFind, id)=> {
            const result = this.recourseSolve([toFind])
            if(result != undefined, id + 1 == this.toFind.length) {
                let nodeToSolve = this.createMethodsNode(result)
                // this.solveNodes(nodeToSolve, toFind[0].name)
            }
        })
    }
    recourseSolve(toFindArray, allToFind, solvingMethods = []) {
        let allSolvings = undefined
        let methodsToCheck = []
        toFindArray.forEach(toFind => {
            const toFindValue = toFind[0].value
            if(this.toFind.indexOf(toFind) != -1) {
                allToFind = [toFind]
            }
            if(toFindValue == undefined) {
                let shortestMethodInObj = undefined
                this.objects.forEach(obj=> { 
                    obj.components.forEach(component=> {
                        if(component != undefined && component.value == undefined) {
                            const algorithmObj = {toFind, obj, shortestMethodInObj, allToFind, solvingMethods}
                            const toFindName = toFind[0].name
                            const mainAngleCondition = toFindName != component.name && toFindName.length == 3 && toFind[1] == "angle" && component.name.length == 3 && component.type == "angle"
                            const secondaryAngleCondition = toFindName[1] == component.name[1] && this.checkForAngleInObg(component)
                            if(toFindName == component.name) {
                                shortestMethodInObj = this.pickMethods(algorithmObj)
                            }
                            else if(mainAngleCondition) {
                                if(secondaryAngleCondition) {
                                    shortestMethodInObj = this.pickMethods(algorithmObj)
                                }
                            }
                        }
                    })
                })
                if(shortestMethodInObj != undefined) {
                    methodsToCheck.push(shortestMethodInObj)
                }
                if(this.toFind.indexOf(toFind) != -1) {
                    allSolvings = this.currentSolving
                }
            }
            else{
                alert(`your unknown already has a value! Value: ${toFindValue}`)
            }
        })
        if(methodsToCheck.length == toFindArray.length) {
            this.currentSolving.push(methodsToCheck)
        }
        if(allSolvings != undefined) {
            return allSolvings
        }
    }
    createMethodsNode(allNodes) {
        let answerArea = document.querySelector(".js-workspace__result-solution")
        answerArea.innerHTML = ""
        allNodes.forEach(node=> {
            let lastNodes = []
            let allNodes = []
            node.forEach(methods=> {
                methods.reverse()
                let lastMethods = []
                methods.forEach((method, id)=> {
                    if(id < 2) {
                        lastMethods.push(method)
                    }
                    else {
                        allNodes.push(method)
                    }
                })
                lastNodes.push(lastMethods)
            })
            allNodes = new Set(allNodes)
            allNodes = [...allNodes]
            if(allNodes.length != 0) {
                allNodes.forEach(unknownNode=> {
                    unknownNode[3].forEach(dataName=> {
                        let nodeComponentSolving = this.findUnknownNode(dataName, lastNodes)
                        unknownNode[0] = this.replaceValue(unknownNode[0], nodeComponentSolving[0][0], nodeComponentSolving[0][1])
                        this.setNodeComponentSolving(answerArea, nodeComponentSolving)
                    })
                    let result = nerdamer.solveEquations(unknownNode[0], unknownNode[2])[0].toString()
                    answerArea.insertAdjacentHTML("beforeend", `
                        <p>${unknownNode[1]}</p></br>
                        <p>${unknownNode[0]}</p></br>
                        <p>${unknownNode[2]} = ${result}</p></br>
                    `)
                })
            }
            else {
                let nodeComponentSolving = lastNodes[0]
                this.setNodeComponentSolving(answerArea, nodeComponentSolving)
            }
            answerArea.style.height = "300px"
            // console.log(lastNodes)
            // console.log(allNodes)
        })
    }
    setNodeComponentSolving(answerArea, nodeComponentSolving) {
        answerArea.insertAdjacentHTML("beforeend", `
            <p>${nodeComponentSolving[1][1]}</p></br>
            <p>${nodeComponentSolving[1][0]}</p></br>
            <p>${nodeComponentSolving[0][1]} = ${nodeComponentSolving[0][0]}</p></br>
        `)
    }
    findUnknownNode(dataName, lastNodes) {
        let nodeToFind 
        lastNodes.forEach(node=> {
            if(node[0][1] == dataName) {
                nodeToFind = node
            }
        })
        return nodeToFind
    }
    replaceValue(string, value, name) {
        let index = string.indexOf(name)
        let splittedArr = string.split("")
        let newArr = splittedArr.splice(index, name.length, `(${value})`)
        return splittedArr.join("")
    }
    pickMethods(algorithmObj) {
        let toFind = algorithmObj.toFind
        let obj = algorithmObj.obj
        let shortestMethodInObj = algorithmObj.shortestMethodInObj
        let allToFind = algorithmObj.allToFind 
        let solvingMethods = algorithmObj.solvingMethods
        const formulas = this.rightTriangleFormulas
        const methods = formulas.pickUpAMethod(toFind)
        let toSolve = []
        let solved = undefined
        methods.forEach(method=> {
            let newMethods
            let result
            result = method(
                obj, 
                toFind[0], 
                allToFind, 
                formulas.checkForWrongData, 
                formulas.determineOppositeAngle, 
                formulas.checkValueForMethods, 
                formulas.getSin,
                formulas.getSinX,
                formulas.sinTheorem
            )
            if(result[1] != undefined) {
                newMethods = [...solvingMethods, [result[1], result[2], result[3], result[4]]]
            }
            else{
                newMethods = [...solvingMethods]
            }
            if(result[0] != undefined){
                if(Array.isArray(result[0])) {
                    toSolve.push([result[0], [...allToFind, ...result[0]], newMethods])
                }
                else {
                    newMethods.push([result[0], result[3]])
                    if(solved == undefined) {
                        solved = newMethods
                    }
                    else if(solved.length > newMethods.length){
                        solved = newMethods
                    }
                }
            }
        })
        if(solved == undefined) {
            toSolve.forEach(method=> {
                this.recourseSolve(...method)
            })
        }
        else {
            if(shortestMethodInObj == undefined) {
                shortestMethodInObj = solved
            }
            else if(shortestMethodInObj.length > solved.length){
                shortestMethodInObj = solved  
            }
        }
        return shortestMethodInObj
    }
    checkForAngleInObg(item) {
        console.log("angleExists")
        let angleExists = true
        this.objects.forEach(currentObj=> {
            currentObj.components.forEach(component=> {
                if(component != undefined) {
                    const segmentNotASide = component.name != currentObj.side1.name && component.name != currentObj.side2.name && component.name != currentObj.side3.name
                    if(segmentNotASide && component.type == "height" || component.type == "angle-bisector" || component.type == "median") {
                        if(item.name[1] == component.name[0] || item.name[1] == component.name[1]) {
                            angleExists = false
                        }
                    }
                }
            })
        })
        return angleExists
    }
}