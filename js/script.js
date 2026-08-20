// ============================================================
// DỮ LIỆU
// ============================================================

const loveAccount = {
    balance: 1000000000,
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

const history = [];

// ============================================================
// HÀM TIỆN ÍCH
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

function getTime() {
    const now = new Date();
    return now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

function showToast(message, duration = 2800) {
    const old = document.querySelector('.toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), duration);
}

// ============================================================
// HOA ĐÀO RƠI
// ============================================================

function createBlossoms() {
    const container = document.getElementById('blossomContainer');
    const emojis = ['🌸', '🌺', '💮', '🌸', '🌸'];
    for (let i = 0; i < 25; i++) {
        const el = document.createElement('div');
        el.className = 'blossom';
        el.textContent = randomItem(emojis);
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = randomInt(16, 32) + 'px';
        el.style.animationDuration = randomInt(12, 26) + 's';
        el.style.animationDelay = Math.random() * 20 + 's';
        el.style.opacity = Math.random() * 0.3 + 0.2;
        container.appendChild(el);
    }
}

// ============================================================
// CLASS LOVEBANK
// ============================================================

class LoveBank {
    constructor() {
        this.balanceEl = document.getElementById('balanceAmount');
        this.messageEl = document.getElementById('messageText');
        this.historyEl = document.getElementById('historyList');

        this.updateUI();
        this.bindEvents();
        this.renderHistory();
        createBlossoms();
    }

    updateUI() {
        this.balanceEl.textContent = formatNumber(this.account.balance);
    }

    get account() {
        return loveAccount;
    }

    // 💝 Gửi yêu thương
    deposit() {
        const amount = randomInt(50000, 500000);
        this.account.balance += amount;

        const msg = randomItem(this.account.loveMessages);
        this.updateUI();

        this.addHistory('💝', `+${formatNumber(amount)}`, 'positive');

        // Hiệu ứng
        this.triggerHearts(10);
        showToast(`💝 Gửi thêm ${formatNumber(amount)} yêu thương!`);

        // Đổi message tạm
        const orig = this.messageEl.innerHTML;
        this.messageEl.innerHTML = `✨ "${msg}" <br/><span style="font-size:0.75rem;color:#e91e63;">+${formatNumber(amount)}</span>`;
        setTimeout(() => {
            this.messageEl.innerHTML = orig;
        }, 2500);
    }

    // 💖 Nhận thông điệp
    withdraw() {
        if (this.account.balance <= 10000) {
            showToast('💔 Hết yêu thương rồi! Hãy gửi thêm nhé!');
            return;
        }

        const amount = randomInt(10000, 80000);
        this.account.balance = Math.max(0, this.account.balance - amount);

        const msg = randomItem(this.account.loveMessages);
        this.updateUI();

        this.addHistory('💖', `-${formatNumber(amount)}`, 'negative');

        this.triggerHearts(6);
        showToast(`💖 "${msg}"`);

        const orig = this.messageEl.innerHTML;
        this.messageEl.innerHTML = `💖 "${msg}" <br/><span style="font-size:0.75rem;color:#7c4dff;">-${formatNumber(amount)}</span>`;
        setTimeout(() => {
            this.messageEl.innerHTML = orig;
        }, 2500);
    }

    // 🎁 Quà bất ngờ
    surprise() {
        // Mở modal
        const modal = document.getElementById('loveLetterModal');
        modal.classList.add('active');

        // Confetti
        this.createConfetti();

        showToast('🎁 Bất ngờ! Thư tình đang chờ em!');

        const orig = this.messageEl.innerHTML;
        this.messageEl.innerHTML = '🎉 Bất ngờ chưa! Anh yêu em rất nhiều! 💕';
        setTimeout(() => {
            this.messageEl.innerHTML = orig;
        }, 3000);

        this.addHistory('🎁', '🎉 Quà bất ngờ!', 'special');
    }

    // ============================================================
    // HIỆU ỨNG
    // ============================================================

    triggerHearts(count = 8) {
        const emojis = ['❤️', '💕', '💖', '💗', '💝', '💘'];
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.textContent = randomItem(emojis);
                el.style.cssText = `
                    position: fixed;
                    pointer-events: none;
                    z-index: 999;
                    font-size: ${randomInt(22, 48)}px;
                    left: ${randomInt(5, 90)}%;
                    top: ${randomInt(5, 90)}%;
                    animation: blossomFall ${randomInt(2, 4)}s ease forwards;
                    transform: scale(0);
                `;
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 4000);
            }, i * 70);
        }
    }

    createConfetti() {
        const colors = ['#e91e63', '#7c4dff', '#ff6f00', '#00bfa5', '#ffab00', '#d500f9', '#ff1744'];
        for (let i = 0; i < 55; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                const size = randomInt(6, 12);
                el.style.cssText = `
                    position: fixed;
                    pointer-events: none;
                    z-index: 999;
                    width: ${size}px;
                    height: ${size * 0.5}px;
                    background: ${randomItem(colors)};
                    left: ${randomInt(2, 98)}%;
                    top: -10px;
                    border-radius: 2px;
                    opacity: 0.9;
                    transform: rotate(${randomInt(0, 360)}deg);
                    animation: blossomFall ${randomInt(2, 4)}s ease forwards;
                `;
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 4500);
            }, i * 35);
        }
    }

    // ============================================================
    // LỊCH SỬ
    // ============================================================

    addHistory(icon, text, type) {
        history.unshift({ icon, text, type, time: getTime() });
        if (history.length > 30) history.pop();
        this.renderHistory();
    }

    renderHistory() {
        if (!this.historyEl) return;
        if (history.length === 0) {
            this.historyEl.innerHTML =
                '<div class="history-empty">Chưa có giao dịch nào</div>';
            return;
        }
        this.historyEl.innerHTML = history.map(item =>
            `<div class="history-item">
                <span class="h-icon">${item.icon}</span>
                <span class="h-amount ${item.type}">${item.text}</span>
                <span class="h-time">${item.time}</span>
            </div>`
        ).join('');
    }

    clearHistory() {
        history.length = 0;
        this.renderHistory();
        showToast('🗑️ Đã xóa lịch sử');
    }

    // ============================================================
    // SỰ KIỆN
    // ============================================================

    bindEvents() {
        document.getElementById('btnDeposit')?.addEventListener('click', () => this.deposit());
        document.getElementById('btnWithdraw')?.addEventListener('click', () => this.withdraw());
        document.getElementById('btnSurprise')?.addEventListener('click', () => this.surprise());

        document.getElementById('closeLetter')?.addEventListener('click', () => {
            document.getElementById('loveLetterModal').classList.remove('active');
        });

        document.getElementById('loveLetterModal')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                e.currentTarget.classList.remove('active');
            }
        });

        document.getElementById('btnClearHistory')?.addEventListener('click', () => this.clearHistory());

        // Phím Space
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && !e.repeat) {
                e.preventDefault();
                this.surprise();
            }
            if (e.key === 'Escape') {
                document.getElementById('loveLetterModal').classList.remove('active');
            }
        });
    }
}

// ============================================================
// KHỞI TẠO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const app = new LoveBank();
    console.log('🌸 Ngân Hàng Tình Yêu đã sẵn sàng!');
    window.app = app;
});
