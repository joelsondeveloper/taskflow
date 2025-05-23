const controlsColumn = controls.querySelector(".controls__column");
const navButton = controlsColumn.getElementsByClassName("nav-button");
// console.log(navButton[0].dataset.column);

isMobile.addEventListener("change", () => {
  // console.log(isMobile.matches);
  renderBoard();
});

controlsColumn.addEventListener("click", (event) => {
  if (event.target.classList.contains("nav-button")) {
    [...navButton].forEach((element, index) => {
      element.classList.remove("active");

      if (event.target.dataset.column === navButton[index].dataset.column) {
        event.target.classList.add("active");
        user.board.columnActive = event.target.dataset.column;
        console.log(user.board.columnActive);
        renderBoard();
      }
    });
  }
});
