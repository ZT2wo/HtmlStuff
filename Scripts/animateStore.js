anime({
targets: '#Banner',
duration: 2000,
borderRadius: ['0%', '100px'],
translateY: ['-200px', '0px'],
backgroundColor: "#52FFB8"
});

function ToggleDis(elementID) {
    var x = document.getElementById(elementID);
    var displaySetting = getComputedStyle(x, null).display;
    if (displaySetting === "grid") {
        x.style.display = "none";
    } 
    if (displaySetting === "none") {
        x.style.display = "grid";
    }
}