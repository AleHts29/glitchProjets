const socket = io();

// document.querySelector("#nmUser").value = prompt("Ingrese su nombre");
Swal.fire("Any fool can use a computer");

(async () => {
  const { value: url } = await Swal.fire({
    width: 500,
    padding: "3em",
    color: "#716add",
    background: "#fff url(/images/trees.png)",
    backdrop: `
    rgba(0,0,123,0.4)
    url("https://media1.giphy.com/media/IeKlzSDKvYNbtlYPvb/giphy.gif?cid=ecf05e47sl3w2m8jnv6urnovjleeabrg9d1lj2uwaxchp2pl&rid=giphy.gif&ct=s")
    
    top
    no-repeat
    
  `,
    input: "text",
    inputPlaceholder: "Enter your userName",
  });

  if (url) {
    Swal.fire(`userName: ${url}`);
  }
  document.querySelector("#nmUser").value = url;
})();

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
