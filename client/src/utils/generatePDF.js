import html2pdf from "html2pdf.js";

export const generateTaskPDF = (tasks) => {
  const element = document.createElement("div");

  const today = new Date();

  const formattedDate = today.toLocaleDateString(undefined, {
    year: "numeric",

    month: "short",

    day: "numeric",
  });

  const html = `

  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px;">

   <h1 style="text-align: center; margin-bottom: 20px; color: #2c3e50;">📋 Task Report <span style="font-size:14px;color:#555;">(${formattedDate})</span></h1>

    

   <table style="width: 100%; border-collapse: collapse; font-size: 14px;">

    <thead>

     <tr style="background-color: #f4f6f8;">

      <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Title</th>

      <th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Description</th>

      <th style="border: 1px solid #ccc; padding: 10px; text-align: center;">Due Date</th>

      <th style="border: 1px solid #ccc; padding: 10px; text-align: center;">Status</th>

     </tr>

    </thead>

    <tbody>

     ${
       tasks.length > 0
         ? tasks

             .map(
               (task, index) => `

      <tr style="background-color: ${index % 2 === 0 ? "#ffffff" : "#f9f9f9"};">

       <td style="border: 1px solid #ccc; padding: 10px;">${task.title}</td>

       <td style="border: 1px solid #ccc; padding: 10px;">${
         task.description || "—"
       }</td>

       <td style="border: 1px solid #ccc; padding: 10px; text-align: center;">${
         task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"
       }</td>

       <td style="border: 1px solid #ccc; padding: 10px; text-align: center;">${
         task.status || "Pending"
       }</td>

      </tr>`
             )

             .join("")
         : `<tr><td colspan="4" style="text-align: center; padding: 20px; border: 1px solid #ccc;">No tasks available</td></tr>`
     }

    </tbody>

   </table>

  </div>

 `;

  element.innerHTML = html;

  html2pdf()
    .set({
      margin: 0.5,

      filename: "task_report.pdf",

      image: { type: "jpeg", quality: 0.98 },

      html2canvas: { scale: 2 },

      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })

    .from(element)

    .save();
};
