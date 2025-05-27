const modalAddCard = document.querySelector(".modal__addCard");
const modalEditCard = document.querySelector(".modal__editCard");

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

buttonAddClose.addEventListener("click", () => {
  hideModal(modalAddCard);
});
buttonAddCancel.addEventListener("click", () => {
  hideModal(modalAddCard);
});
buttonAddAdd.addEventListener("click", () => {
  addCard();
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

function showModal(modal, card) {
  modal.classList.remove("modal-hide");
  if (card) {
    modal.setAttribute("data-id", card);
  }
}

function hideModal(modal) {
  modal.classList.add("modal-hide");
}

function addCard() {
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
  user.addCardToColumn(user.board.columnActive, card);

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

  modalEditCard.setAttribute("data-id", user.board.columnActive);

  if (!cardTitle || !cardDescription || !cardTags) {
    alert("Preencha todos os campos");
    return;
  }

  const card = new Card(cardTitle, cardDescription, cardTags, dataId);
  console.log(modalEditCard.dataset.id);
  user.editCardToColumn(user.board.columnActive, card);

  hideModal(modalEditCard);
  renderBoard();

  document.getElementById("cardEditTitle").value = "";
  document.getElementById("cardEditDescription").value = "";
  document.getElementById("cardEditTags").value = "";
}

function deleteCard() {
  const dataId = modalEditCard.getAttribute("data-id")
  user.removeCardFromColumn(user.board.columnActive, dataId);
  hideModal(modalEditCard);
  renderBoard();
}