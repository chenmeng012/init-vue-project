/**
 * 将扁平化数据根据父子关系整理成树状数据
 * pid 父级id
 * id 本级id
 * （pid id） 可以是其他的参数
 */
import ArrayUtils from "./ArrayUtils";
import _ from "./ObjectUtils";


const toTree = (data, pid, id) => {
  let pos={};
  let tree=[];
  let i=0;

  while(data.length !== 0){
    if(!ArrayUtils.getItemBy(tree,id,data[i][pid])){
      tree.push({
        ...data[i],
        level: 0,
        shrink: false,
        isOpen: false,
        children:[]
      });
      pos[data[i][id]]=[tree.length-1];
      data.splice(i,1);
      i--;
    }else{
      let posArr=pos[data[i][pid]];
      if(posArr !== undefined){

        let obj=tree[posArr[0]];
        let j ;
        for(j=1;j<posArr.length;j++){
          obj=obj.children[posArr[j]];
        }

        obj.children.push({
          ...data[i],
          level: j,
          shrink: false,
          isOpen: false,
          children:[]
        });
        pos[data[i][id]]=posArr.concat([obj.children.length-1]);
        data.splice(i,1);
        i--;
      }
    }
    i++;
    if(i>data.length-1){
      i=0;
    }
  }
  return tree;
};


const  listToTree = (list,pId,myId, levelStatus = true) => {

  let nodes = [];
  for(let i=0; i<list.length; i++){
    let row = list[i];
    if (!ArrayUtils.getItemBy(list,myId,list[i][pId])){
      nodes.push(row);
    }
  }

  let toDo = [];
  for(let i=0; i<nodes.length; i++){
    toDo.push(nodes[i]);
  }
  while(toDo.length){
    let node = toDo.shift();
    let row = {};
    for(let i=0; i<list.length; i++){
      row = list[i];
      if (row[pId] === node[myId] && (row[myId] !== node[myId] || row[pId] !== node[pId])){
        if (node.children){
          node.children.push(row);
        } else {
          node.children = [row];
        }
        toDo.push(row);
      }
    }
  }

  if(levelStatus){
    jsonToLevel(nodes,0);
  }

  return nodes;
};


const jsonToLevel = (nodes,level) => {
  let len = nodes.length;
  for (let i =0; i < len; i++) {
    let node = nodes[i];
    if (node.children) {
      node.shrink = false;
      node.isOpen = false;
      node.level = level;
      jsonToLevel(node.children,level+1);
    }else{
      node.shrink = false;
      node.isOpen = false;
      node.level = level;
    }
  }

};

const toTreeData = (data, pid, id) => {

  let resData = data;
  let tree = [];

  for (let i = 0; i < resData.length; i++) {
    if (resData[i][pid] === 0 || resData[i][pid] === 1) {
      let obj = {
        ...resData[i],
        children: []
      };
      tree.push(obj);
      resData.splice(i, 1);
      i--;
    }
  }

  const run = (chiArr) => {
    if (resData.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i][id] === resData[j][pid]) {
            let obj = {
              ...resData[j],
              children: []
            };
            chiArr[i].children.push(obj);
            resData.splice(j, 1);
            j--;
          }
        }
        run(chiArr[i].children);
      }
    }
  };

  run(tree);

  return tree;
};

const treeTransArray = (nodes, parentId = '') => {
  if (!nodes) return [];
  var childKey = 'children';
  var r = [];
  if (nodes instanceof Array) {
    for (var item of nodes) {
      var node = {};
      for (var key in item) {
        if (key != childKey) {
          node[key] = item[key]
        }else{
          node[childKey] = null;
        }
      }

      node['_parent'] = '';

      r.push(node);
      if (item[childKey]) {
        r = r.concat(treeTransArray(item[childKey], item.id))
      }
    }
  } else {
    r.push(nodes);
    if (nodes[childKey]) {
      r = r.concat(treeTransArray(nodes[childKey]))
    }
  }
  return r
};

/**
 * 查找树形结构中制定条件的节点--广度优先遍历
 * @param tree 要查找的树形结构数据
 * @param type 要查找的条件
 * @param id   要查找的值
 * @returns {*}
 */
const breadthTreeQuery = (tree, type, id) => {
  let stark = [];

  stark = stark.concat(tree);
  while(stark.length) {
    var temp = stark.shift();
    if(temp.children) {
      stark = stark.concat(temp.children);
    }
    if(temp[type] == id) {
      return temp;
    }
  }
  return null
};


/**
 * 查找树形结构中制定条件的节点--深度优先遍历的原则,递归实现
 * @param tree 要查找的树形结构数据
 * @param type 要查找的条件
 * @param id   要查找的值
 * @returns {*}
 */
const deepRecursionQuery = (tree, type, id) =>{
  let stark = [];
  stark = stark.concat(tree);
  while(stark.length) {
    var temp = stark.shift();
    if(temp.children) {
      stark = temp.children.concat(stark);
    }
    if(id === temp[type]) {
      return temp;
    }
  }
};

/**
 * 查找树形结构中制定条件的节点--深度优先遍历的原则,非递归
 * @param tree 要查找的树形结构数据
 * @param type 要查找的条件
 * @param id   要查找的值
 * @returns {*}
 */
const deepQuery = (tree, type, id) => {
  var isGet = false;
  var retNode = null;
  function deepSearch(tree,id){
    for(var i = 0; i<tree.length; i++) {
      if(tree[i].children && tree[i].children.length>0) {
        deepSearch(tree[i].children,id);
      }
      if(id === tree[i][type] || isGet) {
        isGet||(retNode = tree[i]);
        isGet = true;
        break;
      }
    }
  }
  deepSearch(tree,id);
  return retNode;
}




export default {
  toTreeData,
  toTree,
  listToTree,
  treeTransArray,
  breadthTreeQuery
}
