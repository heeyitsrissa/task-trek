

const delButtonHandler = async (event) => {
    const taskBox = event.target.closest(".box");
    const taskId = taskBox.dataset.taskId;

    const confirmed = window.confirm("Are you sure you want to delete this task?");

    if (confirmed) {
    
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                taskBox.remove(); 
            } else {
                alert("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("An error occurred while deleting the task");
        }
    }
};


const updateFormHandler = async (event) => {
    event.preventDefault(); 

    const form = event.currentTarget;
    const taskBox = form.closest(".box");
    const taskId = taskBox.dataset.taskId;

    const statusSelect = form.querySelector("select");
    const selectedStatus = statusSelect.value;

    if (selectedStatus) {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: "PUT",
                body: JSON.stringify({ status: selectedStatus }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
            
                const taskStatusElement = taskBox.querySelector(".task-status");
                taskStatusElement.textContent = selectedStatus;
            } else {
                alert("Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            alert("An error occurred while updating the task");
        }
    }
};


document.addEventListener("DOMContentLoaded", () => {

    const deleteButtons = document.querySelectorAll(".delete-task");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", delButtonHandler);
    });

    
    const updateForms = document.querySelectorAll(".update-status form");
    updateForms.forEach((form) => {
        form.addEventListener("submit", updateFormHandler);
    });
});


document.getElementById("showFormBtn").addEventListener("click", () => {
    document.getElementById("taskFormContainer").style.display = "block";
});


document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("taskFormContainer").style.display = "none";
});


document.getElementById("addTaskForm").addEventListener("submit", async (event) => {
    event.preventDefault();


    const title = document.querySelector('input[name="title"]').value.trim();
    const description = document.querySelector('textarea[name="description"]').value.trim();

    try {

        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
            
            document.location.reload();
        } else {
        
            const responseData = await response.json();
            alert(responseData.message);
        }
    } catch (error) {
        console.error("Error adding task:", error);
        alert("An error occurred while adding the task.");
    }
});


