const createTree = require("./Tree.js");
function generate100Nums() {
  return Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
}

const tree = createTree(generate100Nums());
tree.print();
console.log("isBalanced: ", tree.isBalanced());
console.log("level it:", tree.levelOrderIt());
console.log("level rec:", tree.levelOrderRec());
console.log("pre:", tree.preOrder());
console.log("post:", tree.postOrder());
console.log("in order:", tree.inOrder());

console.log("insert 120:");
tree.insert(120);
tree.print();

console.log("insert 490:");
tree.insert(490);
tree.print();

console.log("insert 111:");
tree.insert(111);
tree.print();

console.log("insert 240:");
tree.insert(240);
tree.print();

console.log("isBalanced: ", tree.isBalanced());

tree.reBalance();
console.log("rebalance, isBalanced: ", tree.isBalanced());
console.log("level it:", tree.levelOrderIt());
console.log("level rec:", tree.levelOrderRec());
console.log("pre:", tree.preOrder());
console.log("post:", tree.postOrder());
console.log("in order:", tree.inOrder());
