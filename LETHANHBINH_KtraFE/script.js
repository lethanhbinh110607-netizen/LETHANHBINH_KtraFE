
document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.querySelectorAll(".cart-item");
    const cartBadge = document.getElementById("cart-count");
    const totalQtyElements = document.querySelectorAll(".total-qty");
    const subtotalAmount = document.getElementById("subtotal-amount");
    const sidebarSubtotalAmount = document.getElementById("sidebar-subtotal-amount");

    function updateCartTotal() {
        let grandTotal = 0;
        let totalItemsCount = 0;

        const currentItems = document.querySelectorAll(".cart-item");

        currentItems.forEach((item) => {
            const unitPrice = parseFloat(item.getAttribute("data-price"));
            const qtySelect = item.querySelector(".qty-select");
            const qty = parseInt(qtySelect.value);

            // Tính giá trị trị từng mặt hàng = Đơn giá * Số lượng
            const itemTotal = unitPrice * qty;
            item.querySelector(".item-total").innerText = itemTotal.toFixed(2);

            grandTotal += itemTotal;
            totalItemsCount += qty;
        });

        // Cập nhật tổng số lượng mặt hàng lên icon giỏ hàng và phần Subtotal
        cartBadge.innerText = totalItemsCount;
        totalQtyElements.forEach((el) => {
            el.innerText = totalItemsCount;
        });

        // Cập nhật tổng số tiền
        const formattedTotal = grandTotal.toFixed(2);
        subtotalAmount.innerText = formattedTotal;
        sidebarSubtotalAmount.innerText = formattedTotal;
    }

    // Sự kiện khi thay đổi số lượng (Select Box)
    cartItems.forEach((item) => {
        const qtySelect = item.querySelector(".qty-select");
        qtySelect.addEventListener("change", updateCartTotal);

        // Sự kiện xóa sản phẩm
        const deleteBtn = item.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            item.nextElementSibling?.tagName === "HR" && item.nextElementSibling.remove();
            item.remove();
            updateCartTotal();
        });
    });

    // Chạy tính toán lần đầu khi load trang
    updateCartTotal();
});
