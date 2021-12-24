const handler = (event) => {
  let text = event.target.value;
  document.querySelector('#result').innerHTML = parse(text);
}

const parse = (text) => {
  return `<span>${text}</span>`
}

document.querySelector("#textarea").addEventListener("keyup", handler);
