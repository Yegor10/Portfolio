document.addEventListener('DOMContentLoaded', function() {
    
    const ctx = document.getElementById('mainChart');
    if (ctx) {
        const context = ctx.getContext('2d');
        const initialData = [];
        const labels = [];
        let price = 64000;
        
        for (let i = 0; i < 24; i++) {
            labels.push(`${i}:00`);
            price = price + (Math.random() - 0.5) * 1000; 
            initialData.push(price);
        }

        const gradient = context.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        const mainChart = new Chart(context, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: initialData,
                    borderColor: '#3b82f6',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
                },
                interaction: { mode: 'nearest', axis: 'x', intersect: false }
            }
        });

        const btcPriceEl = document.querySelector('.asset-item:first-child .price');
        setInterval(() => {
            const currentData = mainChart.data.datasets[0].data;
            const lastPrice = currentData[currentData.length - 1];
            const newPrice = lastPrice + (Math.random() - 0.5) * 200; 
            currentData.shift();
            currentData.push(newPrice);
            mainChart.update('none');
            if(btcPriceEl) btcPriceEl.textContent = '$' + Math.floor(newPrice).toLocaleString();
        }, 2000);
    }

    const notifBtn = document.querySelector('.notif-badge');
    const profileBtn = document.querySelector('.avatar');
    const notifMenu = document.querySelector('.notif-dropdown');
    const profileMenu = document.querySelector('.profile-dropdown');

    if (notifBtn && notifMenu) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifMenu.classList.toggle('active');
            if(profileMenu) profileMenu.classList.remove('active');
        });
    }

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('active');
            if(notifMenu) notifMenu.classList.remove('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (notifMenu && !notifMenu.contains(e.target)) {
            notifMenu.classList.remove('active');
        }
        if (profileMenu && !profileMenu.contains(e.target)) {
            profileMenu.classList.remove('active');
        }
    });

    console.log("Crypto Dashboard Initialized 🚀");
});
