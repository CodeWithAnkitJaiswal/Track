'use strict';

const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.querySelector(".item-list");
const deleteBtn = document.getElementById("delete-list");
const clearBtn = document.getElementById("clear-list-btn");
const feedback = document.querySelector(".feedback");
const feedback_text = document.getElementById("feedback-text");

// To-Do List items, check if in localStorage
let itemData = JSON.parse(localStorage.getItem("list")) || [];
if (itemData.length > 0) {
    itemData.forEach(addItem);
}

// Form submission
itemForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const textValue = itemInput.value;

    // Empty text warning
    if (textValue === "") {
        itemInput.classList.add("add-text");
        itemInput.setAttribute("placeholder", "Add Something");
    } else {
        // Add item
        addItem(textValue);
        // add to array
        itemData.push(textValue);
        // Update local storage
        localStorage.setItem("list", JSON.stringify(itemData));
        // Clear form after submit
        itemInput.value = "";
        itemInput.classList.remove("add-text");
        itemInput.setAttribute("placeholder", "New Task...");
    }
});

// Add list item
function addItem(textValue) {
    const div = document.createElement("div");
    div.classList.add(
        "item",
        "list-group-item",
        "animated",
        "fadeInDown"
    );
    div.innerHTML = `<h5 class="item-name d-flex text-capitalize text-truncate text-left">${textValue}</h5>
  <div class="item-icons d-flex justify-content-end">
    <a href="#" class="complete-item mx-1 item-icon"
    data-toggle="tooltip" data-placement="top" title="Task Complete">
      <i class="far fa-check-circle"></i></a>
    <a href="#" class="edit-item mx-1 item-icon"
    data-toggle="tooltip" data-placement="top" title="Edit Task">
      <i class="far fa-edit"></i></a>
    <a href="#" class="delete-item item-icon"
    data-toggle="tooltip" data-placement="top" title="Delete Task">
      <i class="far fa-trash-alt"></i></a>
  </div>`;

    itemList.appendChild(div);
    // Handle icon functioning
    handleItem(textValue);
}

// Icon functionality
function handleItem(textValue) {
    const items = itemList.querySelectorAll(".item");
    items.forEach(function(item) {
        if (item.querySelector(".item-name").textContent === textValue) {
            // Completed item
            item
                .querySelector(".complete-item")
                .addEventListener("click", function() {
                    item.querySelector(".item-name").classList.toggle("completed");
                    item.querySelector(".item-name").classList.add("animated");
                    item.querySelector(".item-name").classList.toggle("shake");
                    this.classList.toggle("visibility");
                });
            // Edit item
            item.querySelector(".edit-item").addEventListener("click", function() {
                item.classList.add("animate", "fadeOutUp");

                function editItem() {
                    itemInput.value = textValue;
                    itemList.removeChild(item);
                    itemData = itemData.filter(function(item) {
                        return item !== textValue;
                    });
                    localStorage.setItem("list", JSON.stringify(itemData));
                }
                // Add time to allow animation
                setTimeout(editItem, 1000);
            });
            // Delete item
            item.querySelector(".delete-item").addEventListener("click", function() {
                function deleteItem() {
                    itemList.removeChild(item);
                    itemData = itemData.filter(function(item) {
                        return item !== textValue;
                    });
                    localStorage.setItem("list", JSON.stringify(itemData));
                    showFeedback('Item deleted.')
                }
                item.classList.add("animated", "hinge");
                // Add time to allow animation
                setTimeout(deleteItem, 1200);
            });
        }
    });
}

// Clear to-do list
clearBtn.addEventListener("click", function() {

    itemData = [];
    localStorage.removeItem("list");
    itemList.classList.add("animated", "zoomOutLeft");

    function deleteLocalstorage() {
        const items = itemList.querySelectorAll(".item");
        if (items.length > 0) {
            items.forEach(function(item) {
                itemList.removeChild(item);
            });
        }
        itemList.classList.remove("zoomOutLeft");
    }
    // Add time to allow animation
    setTimeout(deleteLocalstorage, 800);
});

// Initialize tool-tips
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
});