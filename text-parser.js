const tagString = ["**", "~~", "__"];
const tagName = ["bold", "strikethrough", "italic"];

const handler = (event) => {
  let text = event.target.value;
  document.querySelector("#result").innerHTML = parse(text);
};

const isTagStart = (c) => {
  for (let tag of tagString) {
    if (tag[0] == c) return true;
  }

  return false;
};

const getTag = (i, text) => {
  for (let j = 0; j < tagString.length; j++) {
    let flag = true;
    let tag = tagString[j];
    for (let k = 0; k < tag.length; k++) {
      if (tag[k] != text[i + k]) {
        flag = false;
        break;
      }
    }
    if (flag) return tagName[j];
  }

  return null;
};

const parse = (text) => {
  const stack = [""];
  const tags = [];

  let index = 0;
  for (let i = 0; i < text.length; i++) {
    if (isTagStart(text[i])) {
      let currentTag = getTag(i, text);

      if (tags.length > 0 && currentTag == tags[tags.length - 1]) {
        tags.pop();
        stack[index - 1] += `<${currentTag}>${stack.pop()}</${currentTag}>`;
        index--;
      } else {
        stack.push("");
        tags.push(currentTag);
        index++;
      }
      i++;
    } else {
      stack[index] += text[i];
    }
  }

  // console.log(stack);
  return stack[0];
  // return `<span>${text}</span>`;
};

document.querySelector("#textarea").addEventListener("keyup", handler);
