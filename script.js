document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Dynamic Health Score Animation ---
    const targetScore = 82;
    const scoreElement = document.getElementById("score-number");
    const progressCircle = document.getElementById("score-circle");
    
    // Calculate circumference (2 * pi * r) where r=40
    const circumference = 2 * Math.PI * 40; 
    
    setTimeout(() => {
        let currentScore = 0;
        const interval = setInterval(() => {
            if (currentScore >= targetScore) {
                clearInterval(interval);
            } else {
                currentScore++;
                scoreElement.innerText = currentScore;
                // Animate SVG stroke
                const offset = circumference - (currentScore / 100) * circumference;
                progressCircle.style.strokeDashoffset = offset;
            }
        }, 20); // Speed of animation
    }, 500); // Delay before starting

    // --- 2. Bottom Navigation Logic ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if(!targetId) return;

            // Update Active States
            navButtons.forEach(b => b.classList.remove('active'));
            if(!btn.classList.contains('fab-scan')) btn.classList.add('active');

            // Switch Views
            views.forEach(view => {
                if (view.id === targetId) {
                    view.classList.remove('hidden');
                } else {
                    view.classList.add('hidden');
                }
            });
        });
    });

    // --- 3. Camera Scanner Simulation ---
    const captureBtn = document.getElementById('capture-btn');
    const scanLine = document.getElementById('scan-line');
    const cameraText = document.getElementById('camera-text');
    const scanResult = document.getElementById('scan-result');

    captureBtn.addEventListener('click', () => {
        // Start AI Scanning Simulation
        cameraText.innerHTML = "Analyzing Macronutrients...<br>🤖";
        scanLine.classList.remove('hidden');
        scanResult.classList.add('hidden');
        
        // Simulate Processing Delay
        setTimeout(() => {
            scanLine.classList.add('hidden');
            cameraText.innerHTML = "<i class='fa-solid fa-check text-green'></i><br>Scan Complete";
            scanResult.classList.remove('hidden'); // Show Results Modal
        }, 2500);
    });
});

// Helper function attached to the modal button
function closeScanner() {
    document.getElementById('scan-result').classList.add('hidden');
    document.getElementById('camera-text').innerHTML = "<i class='fa-solid fa-camera'></i><br>Aim at your meal";
    // Navigate back to home
    document.querySelector('[data-target="view-dashboard"]').click();
}