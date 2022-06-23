const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const translateButton = document.querySelector("button");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const countryCode in countries) {
        let selected;
        if (id === 0 && countryCode === "en-GB") {
            selected = "selected"
        } else if (id === 1 && countryCode === "hi-IN") {
            selected = "selected"
        }
        let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); /* Adding options inside the select tag */
    }
})

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

translateButton.addEventListener("click", () => {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}&de=devabhiram@gmail.com`;
    axios.get(apiURL)
        .then((res) => {
            toText.value = res.data.responseData.translatedText;
        })
        .catch((e) => {
            console.log(e);
        })
})
