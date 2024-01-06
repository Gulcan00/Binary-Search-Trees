const createNode = require("./Node");

function createTree(arr) {
  function sortAndRemoveDuplicates(arr) {
    arr.sort((a, b) => a - b);
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

  function insert(value, node = root) {
    if (!node) {
      return createNode(value);
    }
    if (value < node.data) {
      node.left = insert(value, node.left);
    } else {
      node.right = insert(value, node.right);
    }

    return node;
  }

  function remove(value, node = root) {
    if (!node) {
      return null;
    }
    if (value < node.data) {
      node.left = remove(value, node.left);
    } else if (value > node.data) {
      node.right = remove(value, node.right);
    } else {
      if (!node.left && !node.right) {
        return null;
      } else if (node.left && node.right) {
        let inOrderSuccessor = node.right;
        while (inOrderSuccessor.left) {
          inOrderSuccessor = inOrderSuccessor.left;
        }
        node.data = inOrderSuccessor.data;
        node.right = remove(inOrderSuccessor.data, node.right);
      } else {
        return node.left || node.right;
      }
    }

    return node;
  }

  function find(value, node = root) {
    if (!node) {
      return null;
    }
    if (value === node.data) {
      return node;
    }
    if (value < node.data) {
      return find(value, node.left);
    } else {
      return find(value, node.right);
    }
  }

  function levelOrderIt(cb) {
    const queue = [root];
    const values = [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node === null) {
        continue;
      }
      if (cb) {
        cb(node);
      } else {
        values.push(node.data);
      }
      queue.push(node.left);
      queue.push(node.right);
    }
    if (!cb) {
      return values;
    }
  }

  function levelOrderRec(cb, queue = [root], values = []) {
    if (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        if (cb) {
          cb(node);
        } else {
          values.push(node.data);
        }
        queue.push(node.left);
        queue.push(node.right);
      }
    }

    if (queue.length > 0) {
      levelOrderRec(cb, queue, values);
    }

    if (!cb) {
      return values;
    }
  }

  function inOrder(cb, node = root, values = []) {
    if (node) {
      inOrder(cb, node.left, values);
      if (cb) {
        cb(node.data);
      } else {
        values.push(node.data);
      }
      inOrder(cb, node.right, values);
    }

    if (!cb) {
      return values;
    }
  }

  function preOrder(cb, node = root, values = []) {
    if (node) {
      if (cb) {
        cb(node.data);
      } else {
        values.push(node.data);
      }
      inOrder(cb, node.left, values);
      inOrder(cb, node.right, values);
    }

    if (!cb) {
      return values;
    }
  }

  function postOrder(cb, node = root, values = []) {
    if (node) {
      inOrder(cb, node.left, values);
      inOrder(cb, node.right, values);
      if (cb) {
        cb(node.data);
      } else {
        values.push(node.data);
      }
    }

    if (!cb) {
      return values;
    }
  }

  function height(node) {
    if (!node) {
      return 0;
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  function depth(node, root = this.root) {
    if (!root) {
      return -1;
    }

    if (root.data === node.data) {
      return 0;
    }

    const left = depth(node, root.left);
    const right = depth(node, node.right);

    if (left === -1 && right === -1) {
      return -1;
    }
    return 1 + Math.max(left, right);
  }

  function isBalanced(node = root) {
    if (!node) {
      return true;
    }
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return isBalanced(node.left) && isBalanced(node.right);
  }

  function reBalance() {
    const newArr = [];
    inOrder(newArr.push);
    root = buildTree(newArr);
  }

  return {
    print,
    insert,
    remove,
    find,
    levelOrderIt,
    levelOrderRec,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
}

module.exports = createTree;
