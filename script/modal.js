const modalAddCard = document.querySelector(".modal__addCard");
const modalEditCard = document.querySelector(".modal__editCard");
const modalAddColumn = document.querySelector(".modal__addColumn");
const modalEditProject = document.querySelector(".modal__editProject");
const modalEditColumn = document.querySelector(".modal__editColumn");


const buttonAddAdd = document.querySelector(".modal__addCard__button__add");
const buttonAddClose = document.querySelector(".modal__addCard__close");


const buttonEditAdd = document.querySelector(".modal__editCard__button__add");
const buttonEditClose = document.querySelector(".modal__editCard__close");
const buttonEditDelete = document.querySelector(
  ".modal__editCard__button__delete"
);

const buttonAddColumnAdd = document.querySelector(
  ".modal__addColumn__button__add"
);
const buttonAddColumnClose = document.querySelector(".modal__addColumn__close");


const buttonEditProjectAdd = document.querySelector(
  ".modal__editProject__button__add"
);
const buttonEditProjectClose = document.querySelector(
  ".modal__editProject__close"
);

const buttonEditColumnAdd = document.querySelector(
  ".modal__editColumn__button__add"
);
const buttonEditColumnClose = document.querySelector(
  ".modal__editColumn__close"
);
const buttonEditColumnDelete = document.querySelector(
  ".modal__editColumn__button__delete"
);

buttonAddClose.addEventListener("click", () => {
  hideModal(modalAddCard);
});
buttonAddAdd.addEventListener("click", (event) => {
  console.log(event.target.closest(".modais").dataset.id);
  addCard(event.target.closest(".modais").dataset.id);
});

buttonEditClose.addEventListener("click", () => {
  hideModal(modalEditCard);
});
buttonEditAdd.addEventListener("click", () => {
  editCard();
});
buttonEditDelete.addEventListener("click", (event) => {
  deleteCard(event.target.closest(".modais").dataset.id);
});

buttonAddColumnClose.addEventListener("click", () => {
  hideModal(modalAddColumn);
});
buttonAddColumnAdd.addEventListener("click", () => {
  addColumn();
});

buttonEditProjectClose.addEventListener("click", () => {
  hideModal(modalEditProject);
});
buttonEditProjectAdd.addEventListener("click", () => {
  editProject();
});

buttonEditColumnClose.addEventListener("click", () => {
  hideModal(modalEditColumn);
});
buttonEditColumnAdd.addEventListener("click", () => {
  editColumn();
});
buttonEditColumnDelete.addEventListener("click", () => {
  removeColumn(modalEditColumn.getAttribute("data-id"));
  hideModal(modalEditColumn);
});


function showModal(modal, cardElement, column, card) {
  const firstInput = modal.querySelector("input");
  modal.classList.remove("modal-hide");
  if (card) {
    modal.setAttribute("data-id", card || user.boardActive.columnActive);
  }
  if (column) {
    modal.setAttribute("data-column", column || user.boardActive.columnActive);
  }
  if (modal === modalEditCard) {
    const containerInputTags = document.querySelector(".modais:not(.modal-hide) .modal__container__input__tags");
    document.getElementById("cardEditTitle").value = cardElement.dataset.title;
    document.getElementById("cardEditDescription").value = cardElement.dataset.description;
    cardEditColumn.value = cardElement.closest(".column").dataset.id;
    renderContainerTags(containerInputTags, cardElement.dataset.tags.split(","), cardElement.dataset.colortags.split(","));
  } else if (modal === modalEditColumn) {
    document.getElementById("columnEditTitle").value = column;
  } else if (modal === modalEditProject) {
    document.getElementById("projectEditTitle").value = user.boardActive.name;
  }
  firstInput.focus();
}

function hideModal(modal) {
  modal.classList.add("modal-hide");
}

function addCard(column) {
  const cardTitle = document.getElementById("cardAddTitle").value;
  const cardDescription = document.getElementById("cardAddDescription").value;
  const cardTags = document
    .getElementById("cardAddTags")
    .value.split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");

  if (!cardTitle || !cardDescription || !cardTags) {
    alert("Preencha todos os campos");
    return;
  }

  const card = new Card(cardTitle, cardDescription, cardTags);
  console.log(card);
  user.addCardToColumn(column || user.boardActive.columnActive, card);

  hideModal(modalAddCard);
  renderBoard();

  document.getElementById("cardAddTitle").value = "";
  document.getElementById("cardAddDescription").value = "";
  document.getElementById("cardAddTags").value = "";
}

function editCard() {
  const cardTitle = document.getElementById("cardEditTitle").value;
  const cardDescription = document.getElementById("cardEditDescription").value;
  let cardTags = Array.from(document.querySelectorAll(".modal__container__input__tags__list p"));
  const cardTagsColors = cardTags.map((tag) => tag.dataset.color);
  cardTags = cardTags.map((tag) => tag.textContent);
  console.log(cardTagsColors);
  const editColumn = cardEditColumn.value;
  const dataId = modalEditCard.getAttribute("data-id");
  const dataDate = modalEditCard.getAttribute("data-date");

  if ((!cardTitle || !cardDescription || !cardTags) && !editColumn) {
    alert("Preencha todos os campos");
    return;
  }

  const card = new Card(cardTitle, cardDescription, cardTags, cardTagsColors, dataId, dataDate);
  user.removeCardFromColumn(modalEditCard.dataset.column, dataId);
  // modalEditCard.setAttribute("data-id", user.boardActive.columnActive);
  user.addCardToColumn(editColumn || user.boardActive.columnActive, card);

  hideModal(modalEditCard);
  renderBoard();

  document.getElementById("cardEditTitle").value = "";
  document.getElementById("cardEditDescription").value = "";
}

function deleteCard(column) {
  // console.log(column);
  const dataId = modalEditCard.getAttribute("data-id");
  const columnId = modalEditCard.getAttribute("data-column");
  user.removeCardFromColumn(columnId || user.boardActive.columnActive, dataId);
  hideModal(modalEditCard);
  renderBoard();
}

function addColumn() {
  const columnName = document.getElementById("columnAddTitle").value.trim();
  if (!columnName) {
    alert("Preencha todos os campos");
    return;
  }
  user.addColumn(columnName);
  hideModal(modalAddColumn);
  document.getElementById("columnAddTitle").value = "";
  
  if (user.boardActive.columns.length === 1) {
    console.log(user.boardActive.columns);
    user.boardActive.columnActive = user.boardActive.columns[0].id;
  }
  renderBoard();
  addListenerControlsColumns();
}

function editProject() {
  const projectName = document.getElementById("projectEditTitle").value.trim();
  if (!projectName) {
    alert("Preencha todos os campos");
    return;
  }
  user.editProjectName(projectName);
  hideModal(modalEditProject);
  renderBoard();
  document.getElementById("projectEditTitle").value = "";
}

function editColumn() {
  const columnName = document.getElementById("columnEditTitle").value.trim();
  const columnId = modalEditColumn.getAttribute("data-column");
  if (!columnName) {
    alert("Preencha todos os campos");
    return;
  }
  user.editColumnName(columnId, columnName);
  hideModal(modalEditColumn);
  renderBoard();
  document.getElementById("columnEditTitle").value = "";
}

function removeColumn(column) {
  const columnId = modalEditColumn.getAttribute("data-column");
  user.removeColumn(columnId);
  hideModal(modalEditColumn);
  
  if (user.boardActive.columnActive === columnId) {
    user.boardActive.columnActive = user.boardActive.columns[0].id;
  }
  renderBoard();
}