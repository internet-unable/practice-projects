// import Shape from "./Shape";

const SIZE = 40;

// export default class Square extends Shape {
//     constructor(x, y, size = SIZE, color) {
//         super(x, y, color);
//         this.size = size;
//         this.draw();
//     }

//     draw() {
//         super.draw();
//         this.graphics.rect(this.x, this.y, this.size, this.size);
//         this.graphics.fill();
//     }

//     getArea() {
//         return this.size * this.size;
//     }
// }

import Shape from "./Shape";

export default class Square extends Shape {
    constructor(x, y, size = SIZE, color) {
        super(x, y, color);
        this.size = size;
        this.draw();
    }

    draw() {
        super.draw();
        
        // const halfSize = this.size / 2;
        // this.graphics.rect(-halfSize, -halfSize, this.size, this.size);
        // this.graphics.fill();
        // this.graphics.x = this.x;
        // this.graphics.y = this.y;
        
        this.graphics.rect(0, 0, this.size, this.size);
        this.graphics.fill();
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    getArea() {
        return this.size * this.size;
    }
}
