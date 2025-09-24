let squares = document.querySelectorAll(".sq");
let turn = "X";
let gameOver = false;
const title = document.querySelector(".title");

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // صفوف
    [0,3,6], [1,4,7], [2,5,8], // أعمدة
    [0,4,8], [2,4,6]           // أقطار
];

// دالة لإرسال رسالة لقارئ الشاشة
function announce(message) {
    let liveRegion = document.getElementById("live-region");
    if (!liveRegion) {
        liveRegion = document.createElement("div");
        liveRegion.id = "live-region";
        liveRegion.setAttribute("aria-live", "polite");
        liveRegion.setAttribute("role", "status");
        liveRegion.style.position = "absolute";
        liveRegion.style.left = "-9999px";
        document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
}

// التعامل مع الضغط أو اللمس على المربعات
squares.forEach((square, index) => {
    square.addEventListener("click", () => playMove(index));
    square.addEventListener("touchstart", () => playMove(index));
});

// التعامل مع الكيبورد
document.addEventListener("keydown", function(e) {
    if (gameOver) return;

    let num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
        playMove(num - 1);
    }
});

function playMove(index) {
    if (gameOver) return;
    let square = squares[index];

    if (square.textContent !== "X" && square.textContent !== "O") {
        square.textContent = turn;

        let winnerPattern = checkWinner();
        if (winnerPattern) {
            gameOver = true;
            winnerPattern.forEach(i => squares[i].style.backgroundColor = "green");
            title.textContent = turn + " فاز 🎉";
            announce(turn + " فاز");

            // إعادة اللعبة بعد 7 ثواني
            setTimeout(() => location.reload(), 7000);
            return;
        }

        if ([...squares].every(sq => sq.textContent === "X" || sq.textContent === "O")) {
            gameOver = true;
            squares.forEach(sq => sq.style.backgroundColor = "darkred");
            title.textContent = "تعادل 🤝";
            announce("تعادل");

            setTimeout(() => location.reload(), 7000);
            return;
        }

        turn = (turn === "X") ? "O" : "X";
        title.textContent = "الدور: " + turn;
        announce("الدور: " + turn);
    }
}

// دالة فحص الفائز وإرجاع الصف الفائز
function checkWinner() {
    for (let pattern of winPatterns) {
        if (pattern.every(i => squares[i].textContent === turn)) {
            return pattern;
        }
    }
    return null;
}
