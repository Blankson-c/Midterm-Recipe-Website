//
// Source - https://stackoverflow.com/a/68909928
// Posted by Mendi Barel, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-05, License - CC BY-SA 4.0
//

fetch('nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})
