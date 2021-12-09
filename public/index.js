const socket = io();

socket.on("message_back", (data) => {
  console.log(data);
  render(data);
  socket.emit("message_client", "Hey!!.. i am theClient");
});

// creo una funcion render
const render = (data) => {
  let html = data
    .map((x) => {
      return `
            <p> <b>${x.name}:</b> ${x.userMsn} </p>
        `;
    })
    .join("");

  document.querySelector("#box").innerHTML = html;
};

// funcion para capturar info del formulario
const addInfo = () => {
  let dataObj = {
    name: document.querySelector("#nmUser").value,
    userMsn: document.querySelector("#msnUser").value,
  };
  console.log(dataObj);

  // envio los datos al back
  socket.emit("dataMns", dataObj);
  document.querySelector("#msnUser").value = "";

  return false;
};
