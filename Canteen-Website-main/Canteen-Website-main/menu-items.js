// Sample data (you can fetch this from backend API later)
let menuItems = [
    { id: 1, name: "Idli Sambar", category: "Breakfast", price: 30, stock: 50 },
    { id: 2, name: "Masala Dosa", category: "Breakfast", price: 45, stock: 40 },
    { id: 3, name: "Sambar Rice", category: "Lunch", price: 50, stock: 30 }
  ];
  
  // Elements
  const tableBody = document.getElementById("menu-items-table");
  const formModal = document.getElementById("item-form-modal");
  const form = document.getElementById("item-form");
  
  // Show modal to add new item
  function showAddForm() {
    document.getElementById("form-title").innerText = "Add Menu Item";
    form.reset();
    document.getElementById("item-id").value = '';
    formModal.style.display = "block";
  }
  
  // Close modal
  function closeForm() {
    formModal.style.display = "none";
  }
  
  // Populate table
  function renderTable() {
    tableBody.innerHTML = '';
    menuItems.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>₹${item.price}</td>
        <td>${item.stock}</td>
        <td>
          <button onclick="editItem(${item.id})">Edit</button>
          <button onclick="deleteItem(${item.id})" class="danger">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Add or Update Item
  form.onsubmit = function (e) {
    e.preventDefault();
    const id = document.getElementById("item-id").value;
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = parseInt(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);
  
    if (id) {
      // Update
      const index = menuItems.findIndex(item => item.id == id);
      if (index > -1) {
        menuItems[index] = { id: parseInt(id), name, category, price, stock };
      }
    } else {
      // Add new
      const newItem = {
        id: Date.now(),
        name,
        category,
        price,
        stock
      };
      menuItems.push(newItem);
    }
  
    renderTable();
    closeForm();
  };
  
  // Edit item
  function editItem(id) {
    const item = menuItems.find(item => item.id === id);
    if (item) {
      document.getElementById("form-title").innerText = "Edit Menu Item";
      document.getElementById("item-id").value = item.id;
      document.getElementById("name").value = item.name;
      document.getElementById("category").value = item.category;
      document.getElementById("price").value = item.price;
      document.getElementById("stock").value = item.stock;
      formModal.style.display = "block";
    }
  }
  
  // Delete item
  function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      menuItems = menuItems.filter(item => item.id !== id);
      renderTable();
    }
  }
  
  // Initial load
  renderTable();
  
  // Close modal when clicking outside
  window.onclick = function (event) {
    if (event.target == formModal) {
      closeForm();
    }
  };
  