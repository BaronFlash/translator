const input = document.querySelector("#input");
const output = document.querySelector(".output-text");
const selectFrom = document.querySelector("#select-from");
const selectTo = document.querySelector("#select-to");
const API = "https://translate.iswebdev.ru";

async function main() {
  const response = await fetch(`${API}/languages`);
  const data = await response.json();
  let options = "";
  for (const lang of data) {
    options += `<option value="${lang.code}">${lang.name}</option>`;
  }
  selectFrom.insertAdjacentHTML("afterbegin", options);
  selectTo.insertAdjacentHTML("afterbegin", options);
}
async function handleChange() {
  const body = {
    q: input.value,
    source: selectFrom.value,
    target: selectTo.value,
  };
  const response = await fetch(`${API}/translate`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  output.textContent = data.translatedText;
}
input.addEventListener("input", handleChange);

main();
