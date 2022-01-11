import {CreateComponents} from "./createComponents.js"
export class TriangleVectorModel {
    constructor() {
        this.createComponents = new CreateComponents
        this.trianglesComponents = []
        this.sidesComponents = []
        this.dotsComponents = []
        this.anglesComponents = []
    }
    setInitialTriangleData(triangleName) {
        this.side1 = this.createComponents.createSide(triangleName[0] + triangleName[1], undefined, "side")
        this.side2 = this.createComponents.createSide(triangleName[1] + triangleName[2], undefined, "side")
        this.side3 = this.createComponents.createSide(triangleName[2] + triangleName[0], undefined, "side")
        this.angle1 = this.createComponents.createAngle(triangleName[2] + triangleName[0] + triangleName[1], undefined, "angle")
        this.angle2 = this.createComponents.createAngle(triangleName[0] + triangleName[1] + triangleName[2], undefined, "angle")
        this.angle3 = this.createComponents.createAngle(triangleName[1] + triangleName[2] + triangleName[0], undefined, "angle")
        this.dot1 = this.createComponents.createDot(triangleName[0])
        this.dot2 = this.createComponents.createDot(triangleName[1])
        this.dot3 = this.createComponents.createDot(triangleName[2])
    }
}
