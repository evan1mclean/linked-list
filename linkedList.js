//Factory function to create a node object that contains data, and a link to the next object
const node = (data = null, next = null) => {
  return { data, next };
};

//A factory function to create a linked list object
const linkedList = () => {
  //Instantiates the default head value as null as well as a counter variable for indexing purposes
  let headNode = null;
  let counter = 0;

  //Appends a node to the end of the linked list
  const append = (value) => {
    const newNode = node(value);
    if (headNode === null) {
      headNode = newNode;
    } else {
      let tailNode = tail();
      tailNode.next = newNode;
    }
  };

  //Adds a new node to the beginning of the list and changes the head to point at the new node
  const prepend = (value) => {
    const newNode = node(value);
    if (headNode === null) {
      headNode = newNode;
    } else {
      let currentNode = headNode;
      headNode = newNode;
      headNode.next = currentNode;
    }
  };

  //Traverses all the nodes of the list and increments a counter to show how many nodes exist
  const size = () => {
    let currentNode = headNode;
    if (headNode === null) {
      return 0;
    } else {
      let i = 1;
      while (currentNode.next != null) {
        currentNode = currentNode.next;
        i++;
      }
      return i;
    }
  };

  //Returns the head of the list
  const head = () => {
    return headNode;
  };

  //Returns the tail of the list
  const tail = () => {
    if (headNode === null) {
      return;
    }
    let currentNode = headNode;
    while (currentNode.next != null) {
      currentNode = currentNode.next;
    }
    return currentNode;
  };

  //Returns the value of the node at a given index
  const at = (index) => {
    if (headNode === null) {
      return;
    }
    let currentNode = headNode;
    for (let i = 0; i < index; i++) {
      if (currentNode.next != null) {
        currentNode = currentNode.next;
      } else {
        return "Value doesn't exist";
      }
    }
    return currentNode;
  };

  //Removes the last node of the list by setting the 2nd to last elements next value to null
  const pop = () => {
    if (headNode === null) {
      return;
    } else if (size() === 1) {
      return (headNode = null);
    }
    let currentNode = headNode;
    let previousNode;
    while (currentNode.next != null) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = null;
  };

  //Returns true if value exists in the list or false if not. Since find() utilizes contains, a counter variable is incremented as the list is traversed
  const contains = (value) => {
    if (headNode === null) {
      return;
    }

    let currentNode = headNode;
    while (currentNode.next != null) {
      if (currentNode.data === value) {
        return true;
      }
      currentNode = currentNode.next;
      counter++;
    }

    if (currentNode.data === value) {
      return true;
    } else {
      return false;
    }
  };

  //Utilizes contains() to return the index of a given value if the value exists
  const find = (value) => {
    counter = 0;
    if (headNode === null) {
      return;
    }
    if (contains(value)) {
      return counter;
    }
    return "Value doesn't exist";
  };

  //Inserts a new node at a given index and sets the new node.next value to the next node as well as setting the previous node.nexts value to the new node
  const insertAt = (value, index) => {
    let listSize = size();
    const newNode = node(value);
    if (headNode === null) {
      return;
    }
    //Handles what happens if the index value is too big or too small
    if (index > listSize) {
      return "Index is greater than list size";
    } else if (index < 0) {
      return "Index must be greater than or equal to 0";
    }
    let currentNode = headNode;
    let previousNode;
    for (let i = 0; i < index; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = newNode;
    newNode.next = currentNode;
  };

  //Removes a node at a given index by taking the current node.next pointer and assigning it to the previous node.next pointer
  const removeAt = (index) => {
    let listSize = size();
    if (headNode === null) {
      return;
    }
    //handles what happens when you try to remove the list under certain conditions. the prvious/current logic below doesn't work for all cases without this block to filter what happens.
    if (index > listSize - 1) {
      return "Index is greater than list size";
    } else if (listSize === 1) {
      return (headNode = null);
    } else if (index < 0) {
      return "Index must be greater than or equal to 0";
    } else if (index === listSize - 1) {
      return pop();
    }
    let currentNode = headNode;
    let previousNode;
    for (let i = 0; i < index; i++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = currentNode.next;
  };

  //Traverses the linked list and displays the node values in string form
  const toString = () => {
    let listString = "";
    if (headNode === null) {
      listString = "[ Null ]";
      return listString;
    }
    let currentNode = headNode;
    while (currentNode.next !== null) {
      listString += `[ ${currentNode.data} ] --> `;
      currentNode = currentNode.next;
    }
    listString += `[ ${currentNode.data} ] --> [ Null ]`;
    return listString;
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};
