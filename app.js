document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    const books = window.books || [];
    let cart = [];
    const SHIPPING = 100;

    // --- DOM Elements ---
    const booksGrid = document.getElementById('books-grid');
    const cartBtn = document.getElementById('cart-btn');
    const cartCount = document.getElementById('cart-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const submitOrderBtn = document.querySelector('.submit-order-btn');

    const checkoutModal = document.getElementById('checkout-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const toast = document.getElementById('toast');

    // --- Initialization ---
    renderBooks();

    // --- Rendering Functions ---
    function renderBooks() {
        booksGrid.innerHTML = '';
        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <div style="overflow: hidden;">
                    <img src="${book.image}" alt="${book.title}" class="book-img" loading="lazy">
                </div>
                <div class="book-info">
                    <h4 class="book-title">${book.title}</h4>
                    <p class="book-desc">${book.description}</p>
                    <div class="data-status">
                        <div class="status-item ${book.dataComplete ? 'status-checked' : ''}">
                            <span class="checkbox-sq">${book.dataComplete ? '✓' : ''}</span>
                            資料齊全
                        </div>
                        <div class="status-item ${!book.dataComplete ? 'status-checked' : ''}">
                            <span class="checkbox-sq">${!book.dataComplete ? '✓' : ''}</span>
                            資料不齊全
                        </div>
                    </div>
                    <div class="usb-status ${book.hasUsb ? 'usb-yes' : 'usb-no'}">
                        <span class="usb-checkbox">${book.hasUsb ? '✓' : ''}</span>
                        附贈隨身碟
                    </div>
                    <div class="book-footer">
                        <span class="book-price">NT$ ${book.price}</span>
                        <button class="add-to-cart-btn" data-id="${book.id}">加入購物車</button>
                    </div>
                </div>
            `;
            booksGrid.appendChild(card);
        });

        // Add event listeners to buttons dynamically
        const addBtns = document.querySelectorAll('.add-to-cart-btn');
        addBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.getAttribute('data-id'));
                addToCart(bookId);
            });
        });
    }

    function renderCart() {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        let total = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">您的購物車是空的</p>';
            checkoutBtn.disabled = true;
        } else {
            cartItemsContainer.innerHTML = '';
            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">NT$ ${item.price}</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn dec-btn" data-id="${item.id}">-</button>
                            <span class="cart-item-qty">${item.quantity}</span>
                            <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
                            <button class="remove-btn" data-id="${item.id}">移除</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemEl);
            });
            checkoutBtn.disabled = false;
        }

        cartTotalPrice.textContent = `NT$ ${total + SHIPPING}`;

        // Re-attach event listeners for cart controls
        document.querySelectorAll('.inc-btn').forEach(btn =>
            btn.addEventListener('click', (e) => updateQuantity(parseInt(e.target.getAttribute('data-id')), 1))
        );
        document.querySelectorAll('.dec-btn').forEach(btn =>
            btn.addEventListener('click', (e) => updateQuantity(parseInt(e.target.getAttribute('data-id')), -1))
        );
        document.querySelectorAll('.remove-btn').forEach(btn =>
            btn.addEventListener('click', (e) => removeFromCart(parseInt(e.target.getAttribute('data-id'))))
        );
    }

    // --- Cart Logic ---
    function addToCart(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) return;

        const existingItem = cart.find(item => item.id === bookId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }

        renderCart();

        // Add subtle animation to cart icon
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
    }

    function updateQuantity(bookId, delta) {
        const item = cart.find(item => item.id === bookId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                removeFromCart(bookId);
            } else {
                renderCart();
            }
        }
    }

    function removeFromCart(bookId) {
        cart = cart.filter(item => item.id !== bookId);
        renderCart();
    }

    // --- UI Interactions ---
    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openModal() {
        closeCart();

        // 填入下單明細
        const summaryItems = document.getElementById('order-summary-items');
        const summaryTotal = document.getElementById('order-summary-total-price');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        summaryItems.innerHTML = cart.map(item => `
            <div class="order-summary-row">
                <span class="order-item-title">${item.title}</span>
                <span class="order-item-qty">x${item.quantity}</span>
                <span class="order-item-price">NT$ ${item.price * item.quantity}</span>
            </div>
        `).join('') + `
            <div class="order-summary-row shipping-row">
                <span class="order-item-title">運費</span>
                <span class="order-item-qty"></span>
                <span class="order-item-price">NT$ ${SHIPPING}</span>
            </div>
        `;
        summaryTotal.textContent = `NT$ ${total + SHIPPING}`;

        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    /* Event Listeners setup */
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    checkoutBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal on outside click
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeModal();
        }
    });

    // --- Checkout Logic ---
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // --- 設定您的 Formspree 接收網址 ---
        // 1. 請到 https://formspree.io/ 註冊免費帳號
        // 2. 點選 "New project" -> "New form" (名稱可取為 Bookstore)
        // 3. 複製它給您的 "Endpoint URL" (長得像 https://formspree.io/f/xxxxxxxx)
        // 4. 將那段網址貼在下方替換 YOUR_FORMSPREE_ENDPOINT
        const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdjbpyz";

        // 設定備用信箱 (Formspree 會將資料寄到您註冊的信箱)
        // 若要寄給多個人，可以在 Formspree 後台的 Settings -> Emails 中新增 Target Email
        const emails = "100分教育資源整合中心";

        if (cart.length === 0) {
            alert('購物車是空的！');
            return;
        }

        if (FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT") {
            alert('系統提示：請尚未在 app.js 中設定 Formspree Endpoint 網址，訂單無法送出。');
            return;
        }

        // 改變按鈕狀態為載入中
        const originalBtnText = submitOrderBtn.textContent;
        submitOrderBtn.textContent = '訂單處理中...';
        submitOrderBtn.disabled = true;

        // 整理購物車內容為文字
        let orderDetails = cart.map(item => `- ${item.title} x ${item.quantity} (NT$ ${item.price * item.quantity})`).join('\\n');
        orderDetails += `\\n- 運費：NT$ ${SHIPPING}`;
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + SHIPPING;

        // 收集表單資料
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // 準備傳送給 Formspree 的資料
        const data = {
            "主旨": `新訂單通知：來自 ${name} 的貨到付款訂單`,
            "顧客姓名": name,
            "收件人信箱": email,
            "連絡電話": phone,
            "收件地址": address,
            "訂購明細": orderDetails,
            "總金額": `NT$ ${totalPrice}`,
            "通知信箱": emails // 註記在信件內容中
        };

        try {
            // 發送 API 請求到 Formspree 以寄送信件
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // 訂單送出成功
                closeModal();
                cart = [];
                renderCart();
                checkoutForm.reset();

                // 顯示成功 Toast
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            } else {
                console.error("Error from Formspree:", response);
                alert('訂單建立失敗，請確認 Endpoint 網址是否設定正確或稍後再試。');
            }
        } catch (error) {
            console.error(error);
            alert('網路連線發生問題，請稍後再試。');
        } finally {
            // 恢復按鈕狀態
            submitOrderBtn.textContent = originalBtnText;
            submitOrderBtn.disabled = false;
        }
    });
});
