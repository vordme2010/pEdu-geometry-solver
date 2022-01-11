import {Triangle, Angle, Side, InnerSegments} from "./triangleComponents.js"
import {ToFind, Dots} from "./components.js"
export class CreateComponents {
    constructor() {
    }
    createTriangle(name, value, type, valueType, layoutItem) {
        const triangle = new Triangle
        triangle.name = name
        triangle.value = value
        triangle.type = type
        triangle.valueType = valueType
        triangle.layoutItem = layoutItem
        return triangle
    }
    createInnerSegments(name, value, type, equal, angle, layoutItem, coordinates = [], innerDots = []) {
        const innerSegment = new InnerSegments
        innerSegment.name = name
        innerSegment.value = value
        innerSegment.type = type
        innerSegment.equal = equal
        innerSegment.angle = angle
        innerSegment.layoutItem = layoutItem
        innerSegment.coordinates = coordinates
        innerSegment.innerDots = innerDots
        return innerSegment
    }
    createAngle(name, value, type, equal, layoutItem) {
        const angle = new Angle
        angle.name = name
        angle.value = value
        angle.type = type
        angle.equal = equal
        angle.layoutItem = layoutItem
        return angle
    }
    createSide(name, value, type, equal, layoutItem, coordinates = [], innerDots = []) {
        const side = new Side
        side.name = name
        side.value = value
        side.type = type
        side.equal = equal
        side.layoutItem = layoutItem
        side.coordinates = coordinates
        side.innerDots = innerDots
        return side
    }
    createToFind(name, type, layoutItem) {
        const toFind = new ToFind
        toFind.name = name
        toFind.type = type
        toFind.layoutItem = layoutItem
        return toFind
    }
    createDot(name, coordinates = []) {
        const dots = new Dots
        dots.name = name
        dots.coordinates = coordinates
        return dots
    }
}