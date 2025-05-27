const controlsColumn = controls.querySelector(".controls__column");
const navButtons = Array.from(
  controlsColumn.getElementsByClassName("nav-button")
);
const nameProjects = Array.from(document.getElementsByClassName("nameproject"));
const columnCardAdd = document.querySelector(".column__card-add");
const columns = Array.from(document.getElementsByClassName("column"));
let columnBefore;
let cardBefore;
// console.log(applyAfter);

isMobile.addEventListener("change", () => {
  // console.log(isMobile.matches);
  renderBoard();
});

controlsColumn.addEventListener("click", (event) => {
  if (event.target.classList.contains("nav-button")) {
    navButtons.forEach((element, index) => {
      element.classList.remove("active");

      if (event.target.dataset.column === navButtons[index].dataset.column) {
        event.target.classList.add("active");
        user.board.columnActive = event.target.dataset.column;
        console.log(user.board.columnActive);
        renderBoard();
      }
    });
  }
});

columnCardAdd.addEventListener("click", () => {
  showModal(modalAddCard);
  event.stopPropagation();
});

mainColumn.addEventListener("click", (e) => {
  const card = e.target.closest(".column__card");
  if (card) {
    console.log(card.dataset.id);
    showModal(modalEditCard, card.dataset.id);
  }
});

document.addEventListener("dragstart", (event) => {
  event.target.classList.add("dragging");
  columnBefore = user.board.columnActive;
  cardBefore = event.target.closest(".column__card");
});

document.addEventListener("dragend", (event) => {
  event.target.classList.remove("dragging");

  const draggedCard = event.target.closest(".column__card");
  const cardId = draggedCard.dataset.id;
  if (isMobile.matches) {
    

    let tags = Array.from(
      draggedCard.querySelectorAll(".column__card__tags p")

    );
    tags =tags.map((tag) => {
      return tag.innerText;
    });

    const newCard = new Card(
      draggedCard.dataset.title,
      draggedCard.querySelector(".column__card__description").innerText,
      tags,
      cardId
    );

    user.removeCardFromColumn(columnBefore, cardBefore.dataset.id);
    user.addCardToColumn(user.board.columnActive, newCard, applyAfter.dataset.index);
    console.log(applyAfter);
    // renderBoard();
  }
});.

document.addEventListener("dragover", (event) => {
  const scrollSpeed = 5;
  const threshold = 100;
  const Y = event.clientY;

  if (window.innerHeight - Y < threshold) {
    window.scrollBy(0, scrollSpeed);
  }

  if (Y < threshold) {
    window.scrollBy(0, -scrollSpeed);
  }
});

columns.forEach((column) => {});

function getNewPosition(column, mouseY) {
  const cards = column.querySelectorAll(".column__card:not(.dragging)");
  let result;

  for (const refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const cardCenter = box.y + box.height / 2;
    if (mouseY >= cardCenter) {
      result = refer_card;
    }
  }

  return result;
}
