class Vector3 {
    x;
    y;
    z;
    constructor(x, y, z, va, vb) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.va = va;
    }
    distance(){
       return Math.sqrt((this.va.x - this.vb.x)^2 + (this.va.y - this.vb.y)^2 + (this.va.z - this.vb.z)^2);
    }

}

function main() {
    const vector3 = new Vector3(1, 2, 3, {x: 1, y: 2, z: 3}, {x: 4, y: 5, z: 6});
    console.log(vector3.distance());
}

main()