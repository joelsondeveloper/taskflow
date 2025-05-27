const mainColumn = document.querySelector(".main__column");
const controls = document.querySelector(".controls");
const isMobile = window.matchMedia("(max-width: 48rem)");
let applyAfter;
// console.log(user.board.columns[0].cards);

renderBoard();

function renderBoard() {
  mainColumn.innerHTML = "";
  if (isMobile.matches) {
    renderControlsMobile(user.board);
    renderColumnMobile(findColumn(user.board.columnActive));
  } else {
    renderDesktop(user.board.columns);
  }
  user.saveToLocalStorage();
}

function renderControlsMobile(board) {
  const nameProjectTitle = document.querySelectorAll(".nameproject__title");
  const controlsColumn = document.querySelector(".controls__column");

  controlsColumn.innerHTML = "";

  nameProjectTitle[1].textContent = board.name;

  board.columns.forEach((element) => {
    controlsColumn.innerHTML += `
      <button
      class="nav-button"
      data-column="${element.id}"
    >
      <p>${element.title}</p>
      <span class="counter">${element.cards.length}</span>
    </button>
      `;

    const navButton = document.querySelectorAll(".nav-button");
    navButton.forEach((element, index) => {
      if (board.columnActive === element.dataset.column) {
        element.classList.add("active");
      }
    });
  });

  controlsColumn.innerHTML += `
    <button class="nav-button--add">
      <img src="images/plus.svg" alt="logo de um mais" />
    </button>
    `;
}

function renderColumnMobile(dataColumn) {
  const column = document.createElement("section");

  column.innerHTML = `
        <article class="column__card-add mobile-only">
            <img src="images/plus.svg" alt=" logo de um mais" />
            <p class="column__card-add__text">Add a card</p>
          </article>
    `;
  dataColumn.forEach((element, index) => {
    column.innerHTML += `
            <article
            class="column__card"
            draggable="true"
            data-id="${element.id}"
            data-title="${element.title}"
            data-description="${element.description}"
            data-date="${element.date}"
            data-index="${index}"
          >
            <div class="column__card__tags">
            </div>
            <p class="column__card__description">
              ${element.description}
            </p>
            <div class="column__card__information">
              <div class="column__card__information__date">
                <img
                  src="images/Calendar Icon.svg"
                  alt=" logo de um calendário"
                />
                <p>${formatDate(new Date(element.date))}</p>
              </div>
              <div class="column__card__information__profile">
                <img src="${
                  element.profile
                }" alt="foto do perfil responsavel pela task" />
              </div>
            </div>
          </article>
        `;

    const columnCardTags = column.querySelectorAll(".column__card__tags");

    getAndAddTags(columnCardTags[index], dataColumn[index]);
  });

  column.classList.add("column");

  column.addEventListener("dragover", (event) => {
    const dragging = document.querySelector(".dragging");
    applyAfter = getNewPosition(column, event.clientY);
    const columnCardAdd = column.querySelector(".column__card-add");
    // console.log(columnCardAdd);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      columnCardAdd.insertAdjacentElement("afterend", dragging);
    }
  });

  mainColumn.appendChild(column);
}

function renderDesktop(dataColumns) {
  dataColumns.forEach((element, index) => {
    const column = document.createElement("section");

    column.innerHTML = `
    <div class="header__column desktop-only">
      <h2 class="header__column__title">${element.title}</h2>
      <span class="counter">${element.cards.length}</span>
      <div class="column__card-add desktop-only">
        <img src="images/plus.svg" alt=" logo de um mais" />
      </div>
    </div>
    `;

    element.cards.forEach((card, index) => {
      column.innerHTML += `
      <article
            class="column__card"
            draggable="true"
            data-id="${card.id}"
            data-title="${card.title}"
            data-description="${card.description}"
            data-date="${card.date}"
            data-index="${index}"

          >
            <div class="column__card__tags">
            </div>
            <p class="column__card__description">
              ${card.description}
            </p>
            <div class="column__card__information">
              <div class="column__card__information__date">
                <img
                  src="images/Calendar Icon.svg"
                  alt=" logo de um calendário"
                />
                <p>${formatDate(new Date(card.date))}</p>
              </div>
              <div class="column__card__information__profile">
                <img src="${
                  card.profile
                }" alt="foto do perfil responsavel pela task" />
              </div>
            </div>
          </article>
        `;

      const columnCardTags = column.querySelectorAll(".column__card__tags");

      getAndAddTags(columnCardTags[index], card);
    });

    column.classList.add("column");

    column.addEventListener("dragover", (event) => {
      const dragging = document.querySelector(".dragging");
      applyAfter = getNewPosition(column, event.clientY);
      const columnCardAdd = column.querySelector(".column__card-add");
      // console.log(columnCardAdd);

      if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", dragging);
      } else {
        column.firstElementChild.insertAdjacentElement("afterend", dragging);
      }
    });
    // console.log(element.id);
    column.setAttribute("data-id", element.id);

    mainColumn.appendChild(column);
  });
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getAndAddTags(columnCardTags, dataColumnCards) {
  dataColumnCards.tags?.forEach((tag) => {
    const tagElement = document.createElement("p");
    tagElement.classList.add("column__card__tags__text");
    tagElement.textContent = tag;
    columnCardTags.appendChild(tagElement);
  });
}

function findColumn(id) {
  const column = user.board.columns.find((element) => element.id === id);
  return column.cards;
}
