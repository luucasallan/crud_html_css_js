window.addEventListener('load', start);

var globalNames = ['um', 'dois', 'tres', 'quatros', 'cinco'];
var inputName = null;
var curerentIdex = null;
var isEditing = false;

function start() {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateInput();
  render();
  // console.log('start')
}
function preventFormSubmit() {
  function handleFormSubmit(e) {
    e.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}
function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }
  function updadeName(newName) {
    console.log(newName);
    console.log(curerentIdex);
    globalNames[curerentIdex] = newName;
  }
  function handleTyping(e) {
    //
    var hasText = !!event.target.value && e.target.value.trim() !== '';
    if (!hasText) {
      clearInput();
      return;
    }
    if (e.key === 'Enter') {
      if (isEditing) {
        updadeName(e.target.value);
        console.log('editing...');
      } else {
        insertName(e.target.value);
        console.log('inserting..');
      }
      isEditing = false;
      clearInput();
      render();
    }
  }
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function creatDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }
  function creatSpan(name, index) {
    function aditItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      curerentIdex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', aditItem);

    return span;
  }
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  var ul = document.createElement('ul');
  for (var i = 0; i < globalNames.length; i++) {
    var currentNames = globalNames[i];

    var li = document.createElement('li');
    var button = creatDeleteButton(i);
    var span = creatSpan(currentNames, i);

    span.textContent = currentNames;
    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}
function clearInput() {
  inputName.value = '';
  inputName.focus();
}
