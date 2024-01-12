
document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('healthrecord-table') as HTMLElement;
  
    try {
      const token = getToken(); // Retrieve the token from local storage
  
      const response = await fetch('http://localhost:3000/auth/my-health-records', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
  
      if (response.ok) {
        const healthRecords = await response.json();
        console.log(healthRecords)
  
        // Clear existing table rows
        // tableBody.innerHTML = '';
  
        // Populate table rows with healthRecords data
        healthRecords.forEach((record: {userId: string;


            caloriesAmount: number;
          
          
            foodType: string;
          
           
            weight: number;
          
            height: number;
          
          
            minutesOfExercise: number;
          
          
            amountOfWaterTaken: number;
          
          
            date: Date;}) => {
          const row = document.createElement('tr');
  
          // Create table cells and populate with record data
          const dateCell = document.createElement('td');
  dateCell.textContent = record.date.toString(); // Convert Date to string
  row.appendChild(dateCell);
  
          const caloriesAmountCell = document.createElement('td');
          caloriesAmountCell.textContent = record.caloriesAmount.toString();
          row.appendChild(caloriesAmountCell);
  
          const weightCell = document.createElement('td');
          weightCell.textContent = record.weight.toString();
          row.appendChild(weightCell);
  
          const heightCell = document.createElement('td');
          heightCell.textContent = record.height.toString();
          row.appendChild(heightCell);
  
          const foodTypeCell = document.createElement('td');
          foodTypeCell.textContent = record.foodType;
          row.appendChild(foodTypeCell);
  
          const exerciseMinutesCell = document.createElement('td');
          exerciseMinutesCell.textContent = record.minutesOfExercise.toString();
          row.appendChild(exerciseMinutesCell);
  
          const waterIntakeCell = document.createElement('td');
          waterIntakeCell.textContent = record.amountOfWaterTaken.toString();
          row.appendChild(waterIntakeCell);
  
          // Add the row to the table body
          tableBody.appendChild(row);
         
        });
      } else {
        // Handle error response
        console.error('Failed to fetch health records:', response.status);
      }
    } catch (error) {
      // Handle network error
      console.error('Error occurred during fetch:', error);
    }
  });