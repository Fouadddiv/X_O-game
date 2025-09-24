document.addEventListener("DOMContentLoaded",function(){
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
    const liveRegion = document.getElementById("live-region");
    if (!liveRegion) {
        let div = document.createElement("div");
        div.id = "live-region";
        div.setAttribute("aria-live", "polite");
        div.setAttribute("role", "status");
        div.style.position = "absolute";
        div.style.left = "-9999px";
        document.body.appendChild(div);
    }
    document.getElementById("live-region").textContent = message;
}

document.addEventListener("keydown", function(e) {
    if (gameOver) return;

    let num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
        let index = num - 1;
        let square = squares[index];

        if (square.textContent !== "X" && square.textContent !== "O") {
            square.textContent = turn;

            // فحص الفائز
            let winnerPattern = checkWinner();
            if (winnerPattern) {
                gameOver = true;

                // تلوين الصف الفائز بالأخضر
                winnerPattern.forEach(i => squares[i].style.backgroundColor = "green");

                title.textContent = turn + " فاز 🎉";
                announce(turn + " فاز"); // إخطار قارئ الشاشة

                // إعادة ضبط الصفحة بعد 7 ثواني
                setTimeout(() => location.reload(), 7000);
                return;
            }

            // فحص التعادل
            if ([...squares].every(sq => sq.textContent === "X" || sq.textContent === "O")) {
                gameOver = true;

                // تلوين كل المربعات باللون الأحمر الغامق
                squares.forEach(sq => sq.style.backgroundColor = "darkred");

                title.textContent = "تعادل 🤝";
                announce("تعادل"); // إخطار قارئ الشاشة

                setTimeout(() => location.reload(), 7000);
                return;
            }

            // تبديل الدور
            turn = (turn === "X") ? "O" : "X";
            title.textContent = "الدور: " + turn;
            announce("الدور: " + turn); // إخطار قارئ الشاشة
        }
    }
});

// دالة فحص الفائز وإرجاع الصف الفائز
function checkWinner() {
    for (let pattern of winPatterns) {
        if (pattern.every(i => squares[i].textContent === turn)) {
            return pattern; // إرجاع الصف الفائز لتلوينه
        }
    }
    return null;
}

})