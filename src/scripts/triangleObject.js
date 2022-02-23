class TriangleObject {
    constructor(
        triangle,
        side1, 
        side2, 
        side3, 
        angle1, 
        angle2, 
        angle3, 
        median1, 
        median2, 
        median3, 
        angleBisector1,
        angleBisector2,
        angleBisector3,
        area,
        perimeter
    ) {
        this.triangle = triangle,
        this.side1 = side1,
        this.side2 = side2,
        this.side3 = side3,
        this.angle1 = angle1,
        this.angle2 = angle2,
        this.angle3 = angle3,
        this.median1 = median1,
        this.median2 = median2,
        this.median3 = median3,
        this.angleBisector1 = angleBisector1,
        this.angleBisector2 = angleBisector2,
        this.angleBisector3 = angleBisector3,
        this.area = area,
        this.perimeter = perimeter
        this.components = []
    }
}
export class RightTriangleObject extends TriangleObject {
    constructor(height1, rightAngle, hypotenuse) {
        super()
        this.height1 = height1
        this.rightAngle = rightAngle
        this.hypotenuse = hypotenuse
    }
}