const createNode = require("./Node");

function createTree(arr) {
  function sortAndRemoveDuplicates(arr) {
    arr.sort();
    const duplicatesRemoved = [...new Set(arr)];
    return duplicatesRemoved;
  }

  function buildTree(arr, low, high) {
    if (low > high) {
      return null;
    }
    const mid = Math.floor((low + high) / 2);
    const rootNode = createNode(arr[mid]);
    rootNode.left = buildTree(arr, low, mid - 1);
    rootNode.right = buildTree(arr, mid + 1, high);

    return rootNode;
  }

  const sortedArr = sortAndRemoveDuplicates(arr);
  let root = buildTree(sortedArr, 0, sortedArr.length - 1);

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  function print() {
    console.log(prettyPrint(root));
  }

  return {
    print,
  };
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = createTree(arr);
tree.print();
