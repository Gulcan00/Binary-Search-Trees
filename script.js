const createTree = require("./Tree.js");

/***
 * Tie it all together
Write a driver script that does the following:

Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
Confirm that the tree is balanced by calling isBalanced.
Print out all elements in level, pre, post, and in order.
Unbalance the tree by adding several numbers > 100.
Confirm that the tree is unbalanced by calling isBalanced.
Balance the tree by calling rebalance.
Confirm that the tree is balanced by calling isBalanced.
Print out all elements in level, pre, post, and in order.
 */
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
