const controlsColumn = controls.querySelector(".controls__column");
const navButtons = Array.from(
  controlsColumn.getElementsByClassName("nav-button")
);
const nameProjects = Array.from(document.getElementsByClassName("nameproject"));

const columns = Array.from(document.getElementsByClassName("column"));
let columnBefore;
let cardBefore;
// console.log(applyAfter);

isMobile.addEventListener("change", () => {
  // console.log(isMobile.matches);
  renderBoard();
});

function addListenerControlsColumns() {
  controlsColumn.addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-button")) {
      navButtons.forEach((element, index) => {
        element.classList.remove("active");

        if (event.target.dataset.column === navButtons[index].dataset.column) {
          event.target.classList.add("active");
          user.boardActive.columnActive = event.target.dataset.column;
          console.log(user.boardActive.columnActive);
          renderBoard();
        }
      });
    }
  });
}

addListenerControlsColumns();

mainColumn.addEventListener("click", (e) => {
  const card = e.target.closest(".column__card");
  if (card) {
    console.log(card.dataset.id);
    showModal(modalEditCard, card.dataset.id);
  }
});

document.addEventListener("dragstart", (event) => {
  event.target.classList.add("dragging");
  cardBefore = event.target.closest(".column__card");
  if (isMobile.matches) {
    columnBefore = user.boardActive.columnActive;
  } else {
    columnBefore = cardBefore.closest(".column").dataset.id;
  }
});

document.addEventListener("dragend", (event) => {
  event.target.classList.remove("dragging");

  const draggedCard = event.target.closest(".column__card");
  const cardId = draggedCard.dataset.id;

  let tags = Array.from(draggedCard.querySelectorAll(".column__card__tags p"));
  tags = tags.map((tag) => {
    return tag.innerText;
  });
  const newCard = new Card(
    draggedCard.dataset.title,
    draggedCard.querySelector(".column__card__description").innerText,
    tags,
    cardId
  );

  let insertIndex = 0;

  const forIndex = Number(cardBefore.dataset.index);

  if (applyAfter && applyAfter.dataset && applyAfter.dataset.index) {
    const toIndex = Number(applyAfter.dataset.index);
    insertIndex = toIndex;
    if (toIndex < forIndex) {
      insertIndex++;
    } else if (!isMobile.matches) {
      insertIndex++;
    }
  }
  if (isMobile.matches) {
    console.log(applyAfter);

    user.removeCardFromColumn(columnBefore, cardBefore.dataset.id);
    user.addCardToColumn(user.boardActive.columnActive, newCard, insertIndex);
    console.log(insertIndex);
    renderBoard();
  } else {
    console.log(cardBefore.dataset.index);

    user.removeCardFromColumn(columnBefore, cardBefore.dataset.id);
    user.addCardToColumn(
      event.target.closest(".column").dataset.id,
      newCard,
      insertIndex
    );
    console.log(insertIndex);
    renderBoard();
  }
});

document.addEventListener("dragover", (event) => {
  const scrollSpeed = 5;
  const threshold = 100;
  const Y = event.clientY;
  const X = event.clientX;
  const mainColumnBox = mainColumn.getBoundingClientRect();

  if (window.innerHeight - Y < threshold) {
    window.scrollBy(0, scrollSpeed);
  }

  if (Y < threshold) {
    window.scrollBy(0, -scrollSpeed);
  }

  if (mainColumnBox.width - X < threshold) {
    mainColumn.scrollLeft += scrollSpeed;
  }

  if (X < threshold) {
    mainColumn.scrollLeft -= scrollSpeed;
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

nameProjects.forEach((project) => {
  project.addEventListener("click", () => {
    showModal(modalEditProject);
  });
}); 