let myLinks = [];
const inputEl = document.getElementById("input-el");
const tabBtn = document.getElementById("tab-btn");
const inputBtn = document.getElementById("input-btn");
const listEl = document.getElementById("links-list-el");
const deleteBtn = document.getElementById("delete-btn");
const removeBtn = document.getElementsByClassName("remove-btn");
const copyBtn = document.getElementById("copy-btn");
const copiedPopup = document.getElementById("copied-popup");
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks")); // convert strings from localStorage to arrays and assigned to a variable

// check if are any links in localStorage and if it is, renders them out
if (linksFromLocalStorage) {
  myLinks = linksFromLocalStorage;
  renderLinksList();
}

// SAVE TAB BUTTON
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (inputEl.value.length === 0) {
      // if the input is empty do nothing
    } else {
      myLinks.push(inputEl.value);
    }

    myLinks.push(tabs[0].url);
    localStorage.setItem("myLinks", JSON.stringify(myLinks)); // save myLinks to localStorage
    renderLinksList();
  });
});

// DELETE BUTTON
deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLinks = [];
  renderLinksList();
});

// SAVE INPUT BUTTON
inputBtn.addEventListener("click", function () {
  if (inputEl.value.length === 0) {
    // if the input is empty do nothing
  } else {
    myLinks.push(inputEl.value);
  }

  inputEl.value = ""; // after click/save empty the input field
  localStorage.setItem("myLinks", JSON.stringify(myLinks)); // save myLinks to localStorage
  renderLinksList();
});

function renderLinksList() {
  let linksList = ""; // creat an empty variable to manipulate the DOM outside

  for (let i = 0; i < myLinks.length; i++) {
    linksList += `
            <li>
                <a href="${myLinks[i]}" target="_blank">
                    ${myLinks[i]}
                </a>
                
                  <button class="remove-btn">
                    <svg class="close-icon" width="8px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                    </svg>
                  </button>

            </li >
        `;
  }
  listEl.innerHTML = linksList;

  // remove individual item
  for (let i = 0; i < myLinks.length; i++) {
    removeBtn[i].addEventListener("click", function () {
      myLinks.splice(i, 1);
      localStorage.setItem("myLinks", JSON.stringify(myLinks));
      renderLinksList();
    });
  }
}

// COPY BUTTON
copyBtn.onclick = function () {
  navigator.clipboard
    .writeText(document.getElementById("links-list-el").innerText)
    .then(function () {});

  // show copied alert toast
  copiedPopup.className = "show";
  setTimeout(function () {
    copiedPopup.className = copiedPopup.className.replace("show", "");
  }, 2000);
};
