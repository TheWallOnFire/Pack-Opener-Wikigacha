/**
 * Wait-and-Switch Auto-Clicker
 * Waits for Button A, clicks it, then waits for Button B.
 * @param {string} selector1 - JS Path or Selector for Button A
 * @param {string} selector2 - JS Path or Selector for Button B
 * @param {number} gapTime - Delay after a click before looking for the next button (ms)
 */
async function startAlternatingClicker(selector1, selector2, gapTime = 800) {
    console.log("%c 🔄 Alternating Observer Started", "color: #00d4ff; font-weight: bold;");

    let lookingFor = 1; // Start by looking for Button 1

    while (true) {
        // 1. Determine which selector to target
        const currentSelector = (lookingFor === 1) ? selector1 : selector2;
        const target = document.querySelector(currentSelector);

        // 2. Check if the current target is visible
        if (target && target.offsetWidth > 0 && target.offsetHeight > 0) {
            console.log(`%c Found Button ${lookingFor}! Clicking...`, "color: #00ff00;");

            target.click();

            // 3. Switch state: If we just clicked 1, now look for 2 (and vice-versa)
            lookingFor = (lookingFor === 1) ? 2 : 1;

            // 4. Short gap time after a successful click
            await new Promise(r => setTimeout(r, gapTime));
        } else {
            // 5. If target not found, wait a tiny bit (100ms) and check again
            // This prevents the CPU from maxing out while "idling"
            await new Promise(r => setTimeout(r, 100));
        }
    }
}

// --- CONFIGURATION ---
// Paste your JS Paths here as STRINGS (in quotes)
// We use the full path to avoid the "Long Class" SyntaxError
const path1 = "#gacha-pack-container > div.absolute.inset-0.z-30 > div";
const path2 = "body > main > div > div > div.fixed.bottom-0.left-0.right-0.py-3.sm\\:py-6.px-3.sm\\:px-4.bg-gradient-to-t.from-black.via-black\\/95.to-transparent.z-50.flex.flex-col.items-center.animate-fade-in-up > div.mt-4.sm\\:mt-8.w-full.max-w-xl > button";

// --- RUN ---
startAlternatingClicker(path1, path2, 1000); // 1 second gap after each click