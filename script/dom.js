const mainColumn = document.querySelector(".main__column");
const controls = document.querySelector(".controls");
const isMobile = window.matchMedia("(max-width: 48rem)");
const cardEditColumn = document.querySelector("#cardEditColumn");
let columnCardAdd;
let applyAfter;
// console.log(user.board.columns[0].cards);

renderBoard();

function renderBoard() {
  mainColumn.innerHTML = "";
  if (user.boardActive.columns.length === 0) {
    user.boardActive.columnActive = "";
    renderControlsMobile(user.boardActive);
    user.saveToLocalStorage();
    return;
  }
  if (isMobile.matches) {
    renderControlsMobile(user.boardActive);
    renderColumnMobile(findColumn(user.boardActive.columnActive));
  } else {
    renderDesktop(user.boardActive.columns);
  }

  cardEditColumn.innerHTML = "";

  user.boardActive.columns.forEach((element) => {
    cardEditColumn.innerHTML += `<option value="${element.id}">${element.title}</option>`;
  });

  user.saveToLocalStorage();
}

function renderControlsMobile(board) {
  const nameProjectTitle = document.querySelectorAll(".nameproject__title");
  const controlsColumn = document.querySelector(".controls__column");

  controlsColumn.innerHTML = "";

  nameProjectTitle[1].textContent = user.boardActive.name;

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

  const navButtonAdd = document.querySelector(".nav-button--add");

  navButtonAdd.addEventListener("click", () => {
    showModal(modalAddColumn);
  });
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
    RenderCards(element, column, index, dataColumn);
  });

  column.classList.add("column");
  column.dataset.id = user.boardActive.columnActive;

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

  columnCardAdd = column.querySelector(".column__card-add");

  columnCardAdd.addEventListener("click", () => {
    showModal(modalAddCard);
    event.stopPropagation();
  });
}

function renderDesktop(dataColumns) {
  const nameProjectTitle = document.querySelectorAll(".nameproject__title");

  nameProjectTitle[0].textContent = user.boardActive.name;

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
      RenderCards(card, column, index, element.cards);
    });

    const columnCardAdd = column.querySelector(".column__card-add");

    columnCardAdd.addEventListener("click", () => {
      showModal(modalAddCard, element.id);
      // event.stopPropagation();
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
  dataColumnCards.tags?.forEach((tag, index) => {
    const tagElement = document.createElement("p");
    const tagColor = dataColumnCards.colorTags[index];
    tagElement.classList.add("column__card__tags__text");
    tagElement.textContent = tag;
    tagElement.style.backgroundColor = tagColors[tagColor];
    columnCardTags.appendChild(tagElement);
  });
}

function findColumn(id) {
  const column = user.boardActive.columns.find((element) => element.id === id);
  if (!column) return null;
  return column.cards;
}

function RenderCards(card, column, index, dataColumn) {
  column.innerHTML += `
            <article
            class="column__card"
            draggable="true"
            data-id="${card.id}"
            data-title="${card.title}"
            data-description="${card.description}"
            data-date="${card.date}"
            data-tags="${card.tags}"
            data-colorTags="${card.colorTags}"
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

  getAndAddTags(columnCardTags[index], dataColumn[index]);
}

function renderContainerTags(container, tags, colors) {
  const datalist = container.querySelector(".datalist-tags");
  const containerList = container.querySelector(
    ".modal__container__input__tags__list"
  );
  const btnAdd = container.querySelector(".modal__container__input__tags__add");
  const input = container.querySelector(
    ".modal__container__input__tags__input input"
  );

  datalist.innerHTML = "";

  Object.keys(tagColors).forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    datalist.appendChild(option);
  });
  containerList.innerHTML = "";
  tags.forEach((tag, index) => {
    const tagElement = document.createElement("p");
    tagElement.classList.add("modal__container__input__tags__list__text");
    tagElement.textContent = tag;
    tagElement.style.backgroundColor = tagColors[colors[index]];
    tagElement.dataset.color = colors[index];
    containerList.appendChild(tagElement);
  });

  btnAdd.onclick = () => {
    const tagValue = input.value.trim();
    if (!tagValue || !tagColors[tagValue]) return;

    const tagElement = document.createElement("p");
    tagElement.classList.add("modal__container__input__tags__list__text");
    tagElement.textContent = tagValue;
    tagElement.style.backgroundColor = tagColors[tagValue];
    tagElement.dataset.color = tagValue;
    containerList.appendChild(tagElement);

    input.value = "";
  };
}
