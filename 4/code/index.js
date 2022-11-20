const result = document.getElementById("result");

drawDateDifference();
setInterval(() => {
  drawDateDifference();
}, 1000);

function drawDateDifference() {
  const currentDate = new Date();

  const months = 11 - currentDate.getMonth();
  const days = getDaysInCurrentMonth() - currentDate.getDate();
  const hours = 24 - currentDate.getHours();
  const minutes = 60 - currentDate.getMinutes();
  const seconds = 60 - currentDate.getSeconds();

  result.innerHTML = `
  ${months} months <br/>
  ${days} days  <br/>
  ${hours} hours  <br/>
  ${minutes} minutes  <br/>
  ${seconds} seconds  <br/>
  `;
}

function getDaysInCurrentMonth() {
  const date = new Date();

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
