import {Triangle, Angle, Side, InnerSegments} from "./triangleComponents.js"

class InitialData {
    constructor() {
        this.initialData = []
        this.additionalData = []
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
        this.triangles.length = 0
        this.innerSegments.length = 0
        this.sides.length = 0
        this.angles.length = 0
        const dataItems = document.querySelectorAll(".js-workspace__condition-item")
        let erroredDataItem = []
        try {
            dataItems.forEach(dataItem => {
                const value = dataItem.querySelector(".js-workspace__condition-input-value").value
                const hasOnlyString = !/\d/.test(value)
                let dataValue 
                let dataEqual
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
                const dataType = dataItem.querySelector(".js-workspace__condition-select").value
                const dataName = dataItem.querySelector(".js-workspace__condition-input-name").value
                const dataAngle = dataItem.querySelector(".js-workspace__condition-input-angle").value
                let dataValueType = dataItem.querySelector(".js-workspace__condition-select-triangle").value
                if(dataType != "choose" && dataName != "") {
                    this.setTriangle(dataName, dataValue, dataType, dataValueType, dataItem, erroredDataItem)
                    this.setInnerSegment(dataName, dataValue, dataEqual, dataType, dataAngle, dataItem, erroredDataItem)
                    this.setAngle(dataName, dataValue, dataEqual, dataType, dataItem, erroredDataItem)
                    this.setSide(dataName, dataValue, dataEqual, dataType, dataItem, erroredDataItem) 
                }
            })
            // for (let i = 0; i < this.initialData.length; i++) {
            //     const data = this.initialData[i]
               
            // }
            if(erroredDataItem.length != 0) {
                throw erroredDataItem
            }
            else {
                // console.log(this.initialData)
                this.simplifyData()
            }
        } 
        catch (erroredDataItem) {
            for (let i = 0; i < erroredDataItem.length; i++) {
                erroredDataItem[i].style.border = "1px solid red"
            }
        }
       
    }

    simplifyData() {
        // console.log(this.triangles, this.innerSegments, this.sides, this.angles)
        // console.log(this.initialData.filter(el => {
        //     return el.name == el.name
        // })) 
        // let arr = []
        // for (var len = this.initialData.length, i = len; --i >= 0;) {
        //     if (this.initialData[this.initialData[i]]) {
        //         this.initialData[this.initialData[i]] += 1;
        //         this.initialData.splice(i, 1);
        //     } else {
        //         this.initialData[this.initialData[i]] = 1;
        //     }
        //   }
        // console.log( this.initialData)
        // var arr = [6, 4, 3, 3, 1, 5, 12, 4, 1, 2, 7, 2, 1];
        // let test = []
        // for (let i = 0; i < this.initialData.length; i++) {
        //     const element = this.initialData[i];
            

        //obj[item.name].split("").reverse().join("")
        // console.log("ivan".split("").reverse().join(""))

        let obj = {};
        this.initialData.forEach(item => {
            if(obj[item.name]){
                obj[item.name].push(item);
            }
            // else if(obj[item.name].split("").reverse().join("") == obj[item.name]) {
            //     obj[item.name].push(item);
            // }
            else{
                obj[item.name] = [];
                obj[item.name].push(item);
            }
        })
        // console.log(obj.AD);
        for (const key in obj) {
           let itemObj = obj[key]
           if(itemObj.length != 1) {
                itemObj.forEach(itemToMark => {
                    itemToMark.layoutItem.style.border = "1px solid red"
                })
           }
        }
        console.log(this.initialData)
        // for (let i = 0; i < arr.length; i++) {
        //     const console.log(itemArr = arr[i]
        //     if(arr[i].length != 1) {
        //         for (let j = 0; i < itemArr; j++) {
        //             itemArr[j].layoutItem.style.border = "1px solid red"
        //         }
        //     }
        // }

        // for (const i of obj) {
        //     console.log(obj[i])
        // }

        // obj.forEach(itemArr => {
        //     console.log(itemArr)
        // })


        // arr.forEach(itemArr => {
        //     if(itemArr.length > 1) {
        //         itemArr.forEach(itemToDelete => {
        //             itemToDelete.layoutItem.style.border = "1px solid red"
        //         })
        //     }
        // })





        // const classify = list => list.reduce((result, currentItem) => {
        //     (result[currentItem.name] || (result[currentItem.name] = [])).push(currentItem)
        //     return result
        // }, {})
        
        // console.log(classify(this.initialData))


        // }
        // for (let i = 0; i < this.initialData.length; i++) {
        //     const element = this.initialData[i];
            
        // }
        // uniq = [...new Set(array)];
        // let test = [1,1,2,3,4,4,5,6,3];
        //  test = test.filter(function (elem, pos, arr) {
        //     return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
        // });
        // console.log(new Set(one));
        // // console.log(res);
    }

    //set
    setTriangle(dataName, dataValue, dataType, dataValueType, dataItem, erroredDataItem) {
        if(dataType == "right-triangle" || dataType == "equilateral-triangle" || dataType == "isosceles-triangle") {
            const checkStrings = dataName.length == 3 && !/(.).*\1/.test(dataName)
            if(checkStrings) {
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
            }
            else {
                erroredDataItem.push(dataItem)
            }
        }
    }
    setInnerSegment(dataName, dataValue, dataEqual, dataType, dataAngle, dataItem, erroredDataItem) {
        if(dataType == "median" || dataType == "angle-bisector" || dataType == "height") {
            const checkStrings = dataName.length == 2 && dataAngle.length == 3 && !/(.).*\1/.test(dataName) && !/(.).*\1/.test(dataAngle) && !dataAngle.includes(dataName)
            const checkAngles = dataAngle[1] == dataName[0] && !dataAngle.includes(dataName[1]) || dataAngle[1] == dataName[1] && !dataAngle.includes(dataName[0])
            const checkDataEqual = dataEqual != undefined && dataEqual.length == 2 && dataEqual != dataName && !/(.).*\1/.test(dataEqual) || dataEqual == undefined
            if(checkStrings && checkAngles && checkDataEqual) {
                dataItem.style.border = "1px solid rgba(128, 128, 128, 0.377)"
                const obj = this.createInnerSegments(dataName, dataValue, dataEqual, dataType, dataAngle, dataItem)
                this.innerSegments.push(obj)
                this.initialData.push(obj)
            }
            else {
                erroredDataItem.push(dataItem)
            }
        }
    }
    setAngle(dataName, dataValue, dataEqual, dataType, dataItem, erroredDataItem) {
        if(dataType == "angle") {
            const checkStrings = dataName.length == 3 && !/(.).*\1/.test(dataName)
            const checkDataEqual = dataEqual != undefined && dataEqual.length == 3  && dataEqual != dataName && !/(.).*\1/.test(dataEqual) || dataEqual == undefined
            if(checkStrings && checkDataEqual) {
                dataItem.style.border = "1px solid rgba(128, 128, 128, 0.377)"
                const obj = this.createAngle(dataName, dataValue, dataEqual, dataType, dataItem)
                this.angles.push(obj)
                this.initialData.push(obj)
            }
            else {
                erroredDataItem.push(dataItem)
            }
        }
    }
    setSide(dataName, dataValue, dataEqual, dataType, dataItem, erroredDataItem) {
        if(dataType == "side") {
            const checkStrings = dataName.length == 2 && !/(.).*\1/.test(dataName)
            const checkDataEqual = dataEqual != undefined && dataEqual.length == 2  && dataEqual != dataName && !/(.).*\1/.test(dataEqual)|| dataEqual == undefined
            if(checkStrings && checkDataEqual) {
                dataItem.style.border = "1px solid rgba(128, 128, 128, 0.377)"
                const obj = this.createSide(dataName, dataValue, dataEqual, dataType, dataItem)
                this.sides.push(obj)
                this.initialData.push(obj)
            }
            else {
                erroredDataItem.push(dataItem)
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
}
const initialData = new InitialData
