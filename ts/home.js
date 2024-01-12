"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const tableBody = document.getElementById('healthrecord-table');
    const saveButton = document.getElementById('save-button');
    let isTableEdited = false;
    try {
        const token = getToken(); // Retrieve the token from local storage
        const response = yield fetch('http://localhost:3000/auth/my-health-records', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the request headers
            }
        });
        if (response.ok) {
            const healthRecords = yield response.json();
            console.log(healthRecords);
            // Clear existing table rows
            // tableBody.innerHTML = '';
            // Populate table rows with healthRecords data
            healthRecords.forEach((record) => {
                const row = document.createElement('tr');
                row.setAttribute('data-record-id', record._id);
                // Create table cells and populate with record data
                const dateCell = createEditableCell(record.date ? record.date.toString() : '');
                row.appendChild(dateCell);
                const caloriesAmountCell = createEditableCell(record.caloriesAmount.toString());
                row.appendChild(caloriesAmountCell);
                const weightCell = createEditableCell(record.weight.toString());
                row.appendChild(weightCell);
                const heightCell = createEditableCell(record.height.toString());
                row.appendChild(heightCell);
                const foodTypeCell = createEditableCell(record.foodType);
                row.appendChild(foodTypeCell);
                const exerciseMinutesCell = createEditableCell(record.minutesOfExercise.toString());
                row.appendChild(exerciseMinutesCell);
                const waterIntakeCell = createEditableCell(record.amountOfWaterTaken.toString());
                row.appendChild(waterIntakeCell);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        const recordId = row.getAttribute('data-record-id'); // Retrieve the ID from the data attribute
                        if (!recordId) {
                            console.error('No record ID found for the row');
                            return;
                        }
                        const deleteResponse = yield fetch(`http://localhost:3000/health-records/delete/${recordId}`, {
                            method: 'DELETE',
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (deleteResponse.ok) {
                            row.remove();
                            console.log('Health record deleted:', recordId);
                        }
                        else {
                            console.error('Failed to delete health record:', deleteResponse.status);
                        }
                    }
                    catch (error) {
                        console.error('Error occurred during delete:', error);
                    }
                }));
                row.appendChild(deleteButton);
                // Add click event listener to row for updating the record
                row.addEventListener('click', (event) => {
                    const cell = event.target;
                    if (cell.tagName === 'TD') {
                        const input = document.createElement('input');
                        input.value = cell.textContent || '';
                        input.addEventListener('blur', () => {
                            cell.textContent = input.value;
                            input.remove();
                            // Set the flag indicating the table is edited
                            isTableEdited = true;
                            saveButton.disabled = false; // Enable the save button
                        });
                        cell.textContent = '';
                        cell.appendChild(input);
                        input.focus();
                    }
                });
                // Add the row to the table body
                tableBody.appendChild(row);
            });
            // Add event listener to the save button
            saveButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
                if (!isTableEdited) {
                    return;
                }
                try {
                    const rows = Array.from(tableBody.querySelectorAll('tr[data-record-id]'));
                    for (const row of rows) {
                        const recordId = row.getAttribute('data-record-id');
                        const dateCell = row.cells[0];
                        const caloriesAmountCell = row.cells[1];
                        const weightCell = row.cells[2];
                        const heightCell = row.cells[3];
                        const foodTypeCell = row.cells[4];
                        const exerciseMinutesCell = row.cells[5];
                        const waterIntakeCell = row.cells[6];
                        const updateData = {
                            date: dateCell.textContent,
                            caloriesAmount: caloriesAmountCell.textContent,
                            weight: weightCell.textContent,
                            height: heightCell.textContent,
                            foodType: foodTypeCell.textContent,
                            minutesOfExercise: exerciseMinutesCell.textContent,
                            amountOfWaterTaken: waterIntakeCell.textContent,
                        };
                        const updateResponse = yield fetch(`http://localhost:3000/health-records/update/${recordId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(updateData),
                        });
                        if (updateResponse.ok) {
                            console.log(`Record with ID ${recordId} updated successfully`);
                        }
                        else {
                            console.error(`Failed to update record with ID ${recordId}: ${updateResponse.status}`);
                        }
                    }
                    console.log('Table updated successfully');
                    isTableEdited = false;
                    saveButton.disabled = true; // Disable the save button
                }
                catch (error) {
                    console.error('Error occurred during table update:', error);
                }
            }));
        }
    }
    catch (error) {
        console.error('Error occurred during initialization:', error);
    }
}));
function createEditableCell(value) {
    const cell = document.createElement('td');
    cell.textContent = value;
    return cell;
}
