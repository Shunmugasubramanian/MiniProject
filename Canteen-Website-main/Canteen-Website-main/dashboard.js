// public/dashboard.js or linked in dashboard.html
/*document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/admin/orders")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("orders-table");
      tableBody.innerHTML = "";

      if (Array.isArray(data) && data.length > 0) {
        data.forEach(order => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${order.orderId || "N/A"}</td>
            <td>${order.username || "N/A"}</td>
            <td>₹${order.totalAmount || 0}</td>
            <td>${order.status || "Pending"}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="4">No orders found</td>`;
        tableBody.appendChild(row);
      }
    })
    .catch(error => {
      console.error("Error fetching orders:", error);
    });
});
*/

window.onload = function () {
  const verificationId = localStorage.getItem('verificationId') || 'N/A';
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const totalAmount = localStorage.getItem('totalAmount') || '0';

  const tableBody = document.getElementById('order-table-body'); // Your tbody id

  let rows = '';
  cartItems.forEach((item, index) => {
    rows += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name || 'Item'}</td>
        <td>${item.quantity || 1}</td>
        <td>&#8377;${item.price || 0}</td>
      </tr>
    `;
  });

  tableBody.innerHTML = rows;

  // Also display Order ID and Total separately
  document.getElementById('verification-id').innerText = verificationId;
  document.getElementById('total-amount').innerText = `₹${totalAmount}`;
};
