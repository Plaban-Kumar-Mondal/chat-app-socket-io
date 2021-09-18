const typeBox = document.getElementById("typebox");

// Message submit
typeBox.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.message.value;
  console.log(msg);
  // emitting a message to server
  //   socket.emit("chatMessage", msg);

  // clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});
