// ==========================================================================
// FILENAME: js/feedback-processor.js
// PURPOSE: Custom Programmatic Evaluation Engine for Driver Rating Portal
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const statusContainer = document.getElementById("feedbackFormStatus");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Flush old error loops
            statusContainer.innerHTML = "";
            let isValid = true;
            
            const selectedRating = feedbackForm.querySelector('input[name="rating"]:checked');
            const vehRegInput = document.getElementById("vehReg");

            // Reset field outline structures
            vehRegInput.style.borderColor = "var(--border-lux)";
            vehRegInput.style.backgroundColor = "var(--bg-primary)";

            let errors = [];

            // 1. Evaluate Radio Matrix Option Select
            if (!selectedRating) {
                errors.push("You must pick a driving quality score category performance metric.");
                isValid = false;
            }

            // 2. Evaluate South African Number Plate Matrix Syntax via Regular Expression Pattern
            const cleanReg = vehRegInput.value.trim().toUpperCase();
            // Validates common Gauteng numbering systems (e.g., AA 11 AA GP or AAA 111 GP)
            const gpPlatePattern = /[A-Z0-9]{4,8}\s?GP$/i; 

            if (!cleanReg) {
                errors.push("Please provide the taxi minibus registration layout profile.");
                vehRegInput.style.borderColor = "var(--error-red)";
                vehRegInput.style.backgroundColor = "var(--error-bg)";
                isValid = false;
            } else if (!gpPlatePattern.test(cleanReg)) {
                errors.push("Registration schema invalid. Ensure it concludes with the standard tracking 'GP' suffix.");
                vehRegInput.style.borderColor = "var(--error-red)";
                vehRegInput.style.backgroundColor = "var(--error-bg)";
                isValid = false;
            }

            // If loops failed validation checks, dump descriptive alerts
            if (!isValid) {
                statusContainer.innerHTML = `
                    <div style="background-color: var(--error-bg); border-left: 4px solid var(--error-red); color: #fda4af; padding: 1rem; border-radius: 4px; font-size: 0.9rem;">
                        <strong style="display:block; margin-bottom:0.4rem;">Validation Action Fault:</strong>
                        <ul style="margin-left: 1.2rem; padding: 0;">
                            ${errors.map(err => `<li>${err}</li>`).join('')}
                        </ul>
                    </div>
                `;
                return;
            }

            // 3. Compile Programmatic Async Feedback Submission Simulation
            const submitBtn = feedbackForm.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.textContent = "Compiling Safety Audit...";

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Submit Feedback Report";

                statusContainer.innerHTML = `
                    <div style="background-color: var(--success-bg); border-left: 4px solid var(--success-green); color: #a7f3d0; padding: 1.2rem; border-radius: 4px;">
                        <h4 style="margin-top:0; color: var(--success-green);">Report Tracked Anonymously!</h4>
                        <p style="margin: 0; font-size: 0.9rem; line-height:1.5;">Vehicle node <strong>${cleanReg}</strong> has been logged into the central database. Our internal dispatch operations team will cross-reference this submission against shift matrices within 48 tracking hours.</p>
                    </div>
                `;
                
                feedbackForm.reset();
            }, 1200);
        });
    }
});