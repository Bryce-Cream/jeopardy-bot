// Function to send data to intermediary service
function sendDataToIntermediaryService(data) 
{
  fetch('http://localhost:3000/data', 
  {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => 
  {
      if (!response.ok) {
          throw new Error('Failed to send data to intermediary service');
      }
      console.log('Data sent successfully to intermediary service');
  })
  .catch(error => 
  {
      console.error('Error sending data to intermediary service:', error);
  });
}


const cells = document.querySelectorAll('.cell.points');

cells.forEach(cell => 
{
  cell.addEventListener('click', function()
  {
    const frontAnswer = this.querySelector('.front.answer');
    if(frontAnswer.innerText.toLowerCase() === "daily double")
    {
      const data = 
      {
        event: 'click',
        dailyDouble: true
      };
      sendDataToIntermediaryService(data);
      //alert("DAILY DOUBLE DO STUFF WE WOO");
    }
  });
});
