const cells = document.querySelectorAll('.cell.points');

cells.forEach(cell => 
{
  cell.addEventListener('click', function() 
  {
    const frontAnswer = this.querySelector('.front.answer');
    if(frontAnswer.innerText.toLowerCase() === "daily double")
    {
      alert("DAILY DOUBLE DO STUFF WE WOO");
    }
  });
});
