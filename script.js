// Variáveis de elementos
const itemInputElement = document.getElementById('item-input');
const addItemElement = document.getElementById('add-button');
const removeItemElement = document.getElementById('remove-button');
const countItemsElement = document.getElementById('items-count');
const itemsListElement = document.getElementById('items-list');

// Demais variáveis
const ITEMS_STORAGE_KEY = 'items';
const ITEM_ID_PROPERTY = 'data-item-id';
let items = getSavedItems();

// Adicionar eventos as funções e executar códigos quando a página carregar
addItemElement.addEventListener('click', handleAddItem);
removeItemElement.addEventListener('click', handleRemoveItem);

renderItems();
updateItemsCount();

// Funções
function handleAddItem() {
  const content = itemInputElement.value;

  itemInputElement.value = '';

  addItem(content);
  saveItems();
  renderItems();
  updateItemsCount();
}

function handleRemoveItem() {
  const selectedItemElement = document.querySelector('.selected');

  if (selectedItemElement === null) {
    window.alert('Você deve selecionar um item!');

    return;
  }

  const id = selectedItemElement.getAttribute(ITEM_ID_PROPERTY);

  removeItem(id);
  saveItems();
  renderItems();
  updateItemsCount();
}

function handleItemClick(event) {
  const currentSelected = document.querySelector('.selected');

  if (currentSelected !== null) {
    currentSelected.classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function updateItemsCount() {
  countItemsElement.innerText = items.length;
}

function getSavedItems() {
  const localData = localStorage.getItem(ITEMS_STORAGE_KEY);

  if (localData === null) return [];

  return JSON.parse(localData);

  // return JSON.parse(localStorage.getItem(ITEMS_STORAGE_KEY) || '[]');
}

function saveItems() {
  localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
}

function addItem(item) {
  items.push({
    id: Date.now().toString(),
    content: item,
  });
}

function removeItem(id) {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) continue;

    newItems.push(item);
  }

  items = newItems;
}

function createItemElement(item) {
  const itemElement = document.createElement('li');

  itemElement.innerText = item.content;
  itemElement.setAttribute(ITEM_ID_PROPERTY, item.id);
  itemElement.addEventListener('click', handleItemClick);

  return itemElement;
}

function renderItems() {
  itemsListElement.innerHTML = '';

  console.log(items);
  for (const item of items) {
    const itemElement = createItemElement(item);

    itemsListElement.appendChild(itemElement);
  }
}
