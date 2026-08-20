// ============================================================
// 1. DỮ LIỆU
// ============================================================

const loveAccount = {
    balance: 1000000000,
    accountNumber: 'LOVE - 14082026',
    owner: 'Người thương',
    loveMessages: [
        'Anh yêu em nhiều lắm! ❤️',
        'Em là cả bầu trời của anh 🌟',
        'Trái tim anh chỉ dành cho em 💕',
        'Mỗi ngày bên em là một món quà 🎁',
        'Anh sẽ yêu em mãi mãi 💖',
        'Em đẹp nhất trong mắt anh 😍',
        'Cảm ơn em đã đến bên anh 🙏'
    ]
};

// ============================================================
// 2. HÀM TIỆN ÍCH
// ============================================================

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN').format(num);
}

function showToast(message, duration = 3000) {
    const oldToast = document.querySelector('.toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration);
}

// ============================================================
// 3. CLASS LOVEBANK - XỬ LÝ CHÍNH
// ============================================================

class LoveBank {
    constructor(account) {
        this.account = account;
        this.balanceElement = document.getElementById('balanceAmount');
        this.messageElement = document.getElementById('messageText');
        this.greetingElement = document.getElementById('greetingText');

        this.updateUI();
        this.bindEvents();
        this.createFloatingHearts();
    }

    // Cập nhật số dư
    updateUI() {
        if (this.balanceElement) {
            this.balanceElement.textContent = `❤️ ${formatNumber(this.account.balance)}`;
        }
    }

    // 💝 Gửi thêm yêu thương
    deposit() {
        const amount = randomInt(50000, 500000);
        this.account.balance += amount;

        const loveMsg = randomItem(this.account.loveMessages);
        this.updateUI();

        if (this.messageElement) {
            const originalText = this.messageElement.innerHTML;
            this.messageElement.innerHTML = `
                ✨ ${loveMsg} <br/>
                <small style="color:#e75480;">(+${formatNumber(amount)} yêu thương)</small>
            `;
            setTimeout(() => {
                if (this.messageElement) {
                    this.messageElement.innerHTML = originalText;
                }
            }, 3000);
        }

        showToast(`💝 Đã gửi thêm ${formatNumber(amount)} yêu thương!`);
        this.triggerHeartBurst();
    }

    // 💖 Rút trái tim (đọc thông điệp)
    withdraw() {
        if (this.account.balance <= 0) {
            showToast('💔 Hết yêu thương rồi! Hãy gửi thêm đi... 😢');
            return;
        }

        const amount = randomInt(10000, 100000);
        this.account.balance = Math.max(0, this.account.balance - amount);

        const loveMsg = randomItem(this.account.loveMessages);
        this.updateUI();

        if (this.messageElement) {
            const originalText = this.messageElement.innerHTML;
            this.messageElement.innerHTML = `
                💖 "${loveMsg}" <br/>
                <small style="color:#6c5ce7;">(Rút ${formatNumber(amount)} yêu thương)</small>
            `;
            setTimeout(() => {
                if (this.messageElement) {
                    this.messageElement.innerHTML = originalText;
                }
            }, 3000);
        }

        showToast(`💖 Đã rút: "${loveMsg}"`);
        this.triggerHeartBurst();
    }

    // 🎁 Quà bất ngờ - Hiện thư tình + Confetti
    surprise() {
        // Hiện thư tình
        const letter = document.getElementById('loveLetter');
        if (letter) {
            letter.style.display = 'flex';

            // Xử lý nút đóng
            const closeBtn = document.getElementById('closeLetter');
            if (closeBtn) {
                const newCloseBtn = closeBtn.cloneNode(true);
                closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
                newCloseBtn.addEventListener('click', () => {
                    if (letter) letter.style.display = 'none';
                });
            }

            // Click ra ngoài cũng đóng
            letter.addEventListener('click', (e) => {
                if (e.target === letter) {
                    letter.style.display = 'none';
                }
            });
        }

        // Đổi message tạm thời
        if (this.messageElement) {
            const originalText = this.messageElement.innerHTML;
            this.messageElement.innerHTML = '🎉 Bất ngờ chưa! Anh yêu em nhiều lắm đó! 💕';
            setTimeout(() => {
                if (this.messageElement) {
                    this.messageElement.innerHTML = originalText;
                }
            }, 4000);
        }

        // Hiệu ứng confetti
        this.createConfetti();
        showToast('🎁 Chúc mừng! Bạn đã nhận được một bất ngờ!');
    }

    // Hiệu ứng bùng nổ trái tim
    triggerHeartBurst() {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = randomItem(['❤️', '💕', '💖', '💗', '💝', '💘']);
                heart.style.cssText = `
                    position: fixed;
                    pointer-events: none;
                    z-index: 999;
                    font-size: ${randomInt(20, 45)}px;
                    left: ${randomInt(10, 90)}%;
                    top: ${randomInt(10, 90)}%;
                    animation: floatHeart ${randomInt(2, 4)}s ease forwards;
                    transform: scale(0);
                `;
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 4000);
            }, i * 80);
        }
    }

    // Hiệu ứng Confetti
    createConfetti() {
        const colors = ['#ff6b6b', '#ff9ff3', '#feca57', '#48dbfb', '#ff9f43', '#a29bfe', '#fd79a8'];
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const size = randomInt(6, 12);
                const color = randomItem(colors);
                confetti.style.cssText = `
                    position: fixed;
                    pointer-events: none;
                    z-index: 999;
                    width: ${size}px;
                    height: ${size * 0.6}px;
                    background: ${color};
                    left: ${randomInt(5, 95)}%;
                    top: -20px;
                    border-radius: 2px;
                    opacity: 0.9;
                    transform: rotate(${randomInt(0, 360)}deg);
                    animation: confettiFall ${randomInt(2, 4)}s ease forwards;
                `;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 4500);
            }, i * 40);
        }
    }

    // Tạo trái tim nổi nền
    createFloatingHearts() {
        const container = document.querySelector('.bg-hearts');
        if (!container) return;

        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.textContent = randomItem(['❤️', '💕', '💖', '💗', '💝']);
            heart.style.cssText = `
                position: absolute;
                font-size: ${randomInt(18, 40)}px;
                opacity: ${Math.random() * 0.15 + 0.05};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatHeart ${randomInt(15, 30)}s infinite linear;
                animation-delay: ${Math.random() * 20}s;
                pointer-events: none;
            `;
            container.appendChild(heart);
        }
    }

    // Gắn sự kiện cho các button
    bindEvents() {
        const depositBtn = document.getElementById('btnDeposit');
        const withdrawBtn = document.getElementById('btnWithdraw');
        const surpriseBtn = document.getElementById('btnSurprise');

        depositBtn?.addEventListener('click', () => this.deposit());
        withdrawBtn?.addEventListener('click', () => this.withdraw());
        surpriseBtn?.addEventListener('click', () => this.surprise());

        // Phím Space để nhận quà bất ngờ
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && !e.repeat) {
                e.preventDefault();
                this.surprise();
            }
        });
    }
}

// ============================================================
// 4. KHỞI TẠO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const loveBank = new LoveBank(loveAccount);
    console.log('🏦 Ngân Hàng Tình Yêu đã sẵn sàng!');
    console.log('💕 Chúc bạn và người ấy hạnh phúc!');

    // Debug
    window.loveBank = loveBank;
});
