const modalAddCard = document.querySelector(".modal__addCard");
const modalEditCard = document.querySelector(".modal__editCard");
const modalAddColumn = document.querySelector(".modal__addColumn");
const modalEditProject = document.querySelector(".modal__editProject");

const buttonAddCancel = document.querySelector(
  ".modal__addCard__button__cancel"
);
const buttonAddAdd = document.querySelector(".modal__addCard__button__add");
const buttonAddClose = document.querySelector(".modal__addCard__close");

const buttonEditCancel = document.querySelector(
  ".modal__editCard__button__cancel"
);
const buttonEditAdd = document.querySelector(".modal__editCard__button__add");
const buttonEditClose = document.querySelector(".modal__editCard__close");
const buttonEditDelete = document.querySelector(".modal__editCard__button__delete");

const buttonAddColumnCancel = document.querySelector(
  ".modal__addColumn__button__cancel"
);
const buttonAddColumnAdd = document.querySelector(
  ".modal__addColumn__button__add"
);
const buttonAddColumnClose = document.querySelector(".modal__addColumn__close");

const buttonEditProjectCancel = document.querySelector(
  ".modal__editProject__button__cancel"
);
const buttonEditProjectAdd = document.querySelector(
  ".modal__editProject__button__add"
);
const buttonEditProjectClose = document.querySelector(
  ".modal__editProject__close"
);

buttonAddClose.addEventListener("click", () => {
  hideModal(modalAddCard);
});
buttonAddCancel.addEventListener("click", () => {
  hideModal(modalAddCard);
});
buttonAddAdd.addEventListener("click", (event) => {
  console.log(event.target.closest(".modais").dataset.id);
  addCard(event.target.closest(".modais").dataset.id);
});

buttonEditClose.addEventListener("click", () => {
  hideModal(modalEditCard);
});
buttonEditCancel.addEventListener("click", () => {
  hideModal(modalEditCard);
});
buttonEditAdd.addEventListener("click", () => {
  editCard();
});
buttonEditDelete.addEventListener("click", () => {
  deleteCard();
});

buttonAddColumnClose.addEventListener("click", () => {
  hideModal(modalAddColumn);
});
buttonAddColumnCancel.addEventListener("click", () => {
  hideModal(modalAddColumn);
});
buttonAddColumnAdd.addEventListener("click", () => {
  addColumn();
});

buttonEditProjectClose.addEventListener("click", () => {
  hideModal(modalEditProject);
});
buttonEditProjectCancel.addEventListener("click", () => {
  hideModal(modalEditProject);
});
buttonEditProjectAdd.addEventListener("click", () => {
  editProject();
});

function showModal(modal, card) {
  modal.classList.remove("modal-hide");
  if (card) {
    modal.setAttribute("data-id", card);
  }
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
  user.addCardToColumn(column ||user.boardActive.columnActive, card);

  hideModal(modalAddCard);
  renderBoard();

  document.getElementById("cardAddTitle").value = "";
  document.getElementById("cardAddDescription").value = "";
  document.getElementById("cardAddTags").value = "";
}

function editCard() {
  const cardTitle = document.getElementById("cardEditTitle").value;
  const cardDescription = document.getElementById("cardEditDescription").value;
  const cardTags = document
    .getElementById("cardEditTags")
    .value.split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");
  const dataId = modalEditCard.getAttribute("data-id")

  modalEditCard.setAttribute("data-id", user.boardActive.columnActive);

  if (!cardTitle || !cardDescription || !cardTags) {
    alert("Preencha todos os campos");
    return;
  }

  const card = new Card(cardTitle, cardDescription, cardTags, dataId);
  console.log(modalEditCard.dataset.id);
  user.editCardToColumn(user.boardActive.columnActive, card);

  hideModal(modalEditCard);
  renderBoard();

  document.getElementById("cardEditTitle").value = "";
  document.getElementById("cardEditDescription").value = "";
  document.getElementById("cardEditTags").value = "";
}

function deleteCard() {
  const dataId = modalEditCard.getAttribute("data-id")
  user.removeCardFromColumn(user.boardActive.columnActive, dataId);
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
  renderBoard();
  document.getElementById("columnAddTitle").value = "";
  addListenerControlsColumns()
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