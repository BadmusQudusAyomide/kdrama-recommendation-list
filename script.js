document.addEventListener("DOMContentLoaded", function () {
  const listElement = document.getElementById("kdrama-list");
  const inputElement = document.getElementById("new-drama");
  const addButton = document.getElementById("add-drama");

  let kdramas = JSON.parse(localStorage.getItem("kdramas")) || [];

  function saveDramas() {
    localStorage.setItem("kdramas", JSON.stringify(kdramas));
  }

  function addDrama(kdrama) {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = kdrama.checked;
    checkbox.addEventListener("change", function () {
      kdrama.checked = checkbox.checked;
      saveDramas();
      if (checkbox.checked) {
        listItem.classList.add("checked");
      } else {
        listItem.classList.remove("checked");
      }
    });

    const label = document.createElement("label");
    label.textContent = kdrama.name;
    label.className = "drama-label"; // Add class for styling

    // Toggle checked state on label click
    label.addEventListener("click", function () {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
      listElement.removeChild(listItem);
      kdramas = kdramas.filter((d) => d !== kdrama);
      saveDramas();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);

    if (checkbox.checked) {
      listItem.classList.add("checked");
    }

    listElement.appendChild(listItem);
  }

  kdramas.forEach(addDrama);

  addButton.addEventListener("click", function () {
    const newDramaName = inputElement.value.trim();
    if (newDramaName) {
      const newDrama = { name: newDramaName, checked: false };
      kdramas.push(newDrama);
      addDrama(newDrama);
      saveDramas();
      inputElement.value = "";
    }
  });

  inputElement.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addButton.click();
    }
  });
});
