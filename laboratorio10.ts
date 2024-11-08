class NodeRBT {
    private data: number;
    private father: NodeRBT | null = null;
    private leftChild: NodeRBT | null = null;
    private rightChild: NodeRBT | null = null;
    private color: string;

    constructor(data: number, isLeaf: boolean = false) {
        this.data = data;
        this.color = isLeaf ? "BLACK" : "RED";
    }

    public getData(): number {
        return this.data;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT | null {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT | null {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT | null {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public getColor(): string {
        return this.color;
    }
}

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather()?.getColor() === "RED") {
            if (testNode.getFather() === testNode.getFather()?.getFather()?.getLeftChild()) {
                let uncle = testNode.getFather()?.getFather()?.getRightChild() as NodeRBT;
                if (uncle.getColor() === "RED") {
                    testNode.getFather()?.setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather()?.getFather()?.setNodeAsRed();
                    testNode = testNode.getFather()?.getFather() as NodeRBT;
                } else {
                    if (testNode === testNode.getFather()?.getRightChild()) {
                        testNode = testNode.getFather() as NodeRBT;
                        this.leftRotate(testNode);
                    }
                    testNode.getFather()?.setNodeAsBlack();
                    testNode.getFather()?.getFather()?.setNodeAsRed();
                    this.rightRotate(testNode.getFather()?.getFather() as NodeRBT);
                }
            } else {
                let uncle = testNode.getFather()?.getFather()?.getLeftChild() as NodeRBT;
                if (uncle.getColor() === "RED") {
                    testNode.getFather()?.setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather()?.getFather()?.setNodeAsRed();
                    testNode = testNode.getFather()?.getFather() as NodeRBT;
                } else {
                    if (testNode === testNode.getFather()?.getLeftChild()) {
                        testNode = testNode.getFather() as NodeRBT;
                        this.rightRotate(testNode);
                    }
                    testNode.getFather()?.setNodeAsBlack();
                    testNode.getFather()?.getFather()?.setNodeAsRed();
                    this.leftRotate(testNode.getFather()?.getFather() as NodeRBT);
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y = x.getRightChild() as NodeRBT;
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() !== this.leaf)
            y.getLeftChild()?.setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather()?.getLeftChild()) {
            x.getFather()?.setLeftChild(y);
        } else {
            x.getFather()?.setRightChild(y);
        }
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y = x.getLeftChild() as NodeRBT;
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() !== this.leaf)
            y.getRightChild()?.setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather()?.getRightChild()) {
            x.getFather()?.setRightChild(y);
        } else {
            x.getFather()?.setLeftChild(y);
        }
        y.setRightChild(x);
        x.setFather(y);
    }

    public insert(data: number): void {
        let newNode = new NodeRBT(data);
        let parent = this.leaf;
        let current = this.root;
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);

        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild() as NodeRBT;
            } else {
                current = current.getRightChild() as NodeRBT;
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }
        if (newNode.getFather()?.getFather() === this.leaf) return;

        this.fixInsert(newNode);
    }

    public buscar(data: number): NodeRBT | null {
        let current = this.root;
        while (current !== this.leaf && current.getData() !== data) {
            if (data < current.getData()) {
                current = current.getLeftChild() as NodeRBT;
            } else {
                current = current.getRightChild() as NodeRBT;
            }
        }
        if(current === this.leaf) return null
        return current;
    }

    private inOrderPrint(node: NodeRBT): void {
        if (node !== this.leaf) {
            this.inOrderPrint(node.getLeftChild() );
            console.log(node.getData());
            this.inOrderPrint(node.getRightChild() );
        }
    }

    public printInOrder(): void {
        this.inOrderPrint(this.root);
    }
}


const rbTree = new RBTree();
rbTree.insert(10);
rbTree.insert(20);
rbTree.insert(5);
rbTree.insert(15);
rbTree.insert(115);
//aqui le puse un numero para que viera el metodo buscar si busca bien 
const datoAbuscar = rbTree.buscar(115);
if(datoAbuscar){
  console.log(`El numero si existe: ${datoAbuscar.getData()}`)
}else{
  console.log("El numero no existe")
}

console.log("Numeros de manera ascendente")
rbTree.printInOrder();
