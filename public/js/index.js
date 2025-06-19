  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click", () => {
    let taxToggle = document.getElementsByClassName("tax-toggle");
    for (tax of taxToggle) {
      if (tax.style.display != "inline") {
        tax.style.display = "inline";
      } else {
        tax.style.display = "none";
      }
    }
  });
