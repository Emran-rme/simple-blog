let element = document.querySelector(".comments");
let alertInfo = document.querySelector("#say-comment");
let commentId = document.querySelector("#comment-id");

element.addEventListener("click", (event) => {
    let text =
        event.target.parentElement.parentElement.children[1].children[0]
            .textContent;
    let author =
        event.target.parentElement.parentElement.children[0].children[0]
            .children[1].children[0].textContent;
    alertInfo.classList.remove("d-none");
    alertInfo.textContent = `در پاسخ به کامنت «${text}» از طرف "${author}"`;
    commentId.value = event.target.getAttribute("data-id");
});
