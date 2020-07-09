const keyTemplate = document.querySelector("template");
const keyboard = document.querySelector(".keyboard");

const getBind = (el) => {
  return el.id || (el.parentElement ? getBind(el.parentElement) : null);
};

const playBind = (key) => {
  if (key && data[key]) {
    new Audio(data[key]).play();
  }
};

// Render keys in keyboard.
Object.keys(data).forEach((keybind) => {
  const key = keyTemplate.content.cloneNode(true);
  const trigger = key.querySelector(".key");
  const bind = key.querySelector(".bind");

  trigger.id = keybind;
  bind.innerHTML = keybind;

  keyboard.appendChild(key);
});

// Cache audio files.
for (const bind in data) {
  new Audio(data[bind]);
}

// Bind keyboard clicks to audio.
keyboard.addEventListener("click", (event) => {
  const bind = getBind(event.target);
  playBind(bind);
});

// Bind keyboard key presses to audio.
document.addEventListener("keydown", (event) => {
  playBind(event.key);
});
