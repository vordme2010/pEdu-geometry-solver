export class Triangle {
    constructor(){}
    set name(name) {
        this._name = name
    }
    get name() {
        return this._name
    }

    set value(value) {
        this._value = value
    }
    get value() {
        return this._value
    }

    // type in Triangle class: Right Triangle / Equilateral Triangle / Isosceles Triangle ...
    set type(type) {
        this._type = type
    }
    get type() {
        return this._type
    }

    set valueType(valueType) {
        this._valueType = valueType
    }
    get valueType() {
        return this._valueType
    }

    set layoutItem(layoutItem) {
        this._layoutItem = layoutItem
    }
    get layoutItem() {
        return this._layoutItem
    }
}

// angle of triangle
export class Angle {
    constructor() {}
    set name(name) {
        this._name = name
    }
    get name() {
        return this._name
    }

    set value(value) {
        this._value = value
    }
    get value() {
        return this._value
    }

    set closestParent(closestParent) {
        this._closestParent = closestParent
    }
    get closestParent() {
        return this._closestParent
    }

    set equal(equal) {
        this._equal = equal
    }
    get equal() {
        return this._equal
    }

    set type(type) {
        this._type = type
    }
    get type() {
        return this._type
    }

    set layoutItem(layoutItem) {
        this._layoutItem = layoutItem
    }
    get layoutItem() {
        return this._layoutItem
    }
}

//side of triangle
export class Side extends Angle{
    constructor() {
        super()
    }
    set coordinates(coordinates) {
        this._coordinates = coordinates
    }
    get coordinates() {
        return this._coordinates
    }
    set innerDots(innerDots) {
        this._innerDots = innerDots
    }
    get innerDots() {
        return this._innerDots
    }
}

//median, height, angle-bisector
export class InnerSegments extends Side{
    constructor() {
        super()
    }
    set angle(angle) {
        this._angle = angle
    }
    get angle() {
        return this._angle
    }
    
    // type in extended Angel class: median / height / angle-bisector
}

