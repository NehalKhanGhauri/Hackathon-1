// Get references to the form and display area
const forms = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElements = document.getElementById('resume-display') as HTMLDivElement;

const shareableLinkContainers = document.getElementById('shareable-link-container') as HTMLDivElement;

const shareableLinkElements = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButtons = document.getElementById('download-pdf') as HTMLButtonElement;
// Handle form submission
forms.addEventListener('submit', (event: Event) => {event.preventDefault(); 
    // prevent page reload
    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const mobile = (document.getElementById('mobile') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    // Save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        mobile,
        education,
        experience,
        skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Generate the resume content dynamically

    const ShareableResumeBuilder = `
<h2>Shareable Resume Builder</h2>
<h3>Personal Information</h3>
<p><b>Name:</b> <span contenteditable="true">${name}</span></p>
<p><b>Email:</b> <span contenteditable="true">${email}</span></p>
<p><b>Mobile:</b> <span contenteditable="true">${mobile}</span></p>
<h3>Education</h3>
<p contenteditable="true">${education}</p>
<h3>Experience</h3>
<p contenteditable="true">${experience}</p>
<h3>Skills</h3>
<p contenteditable="true">${skills}</p>
`;
    // Display the generated resume
    resumeDisplayElements.innerHTML = ShareableResumeBuilder;
    // Generate a shareable URL with the username only
    const shareableURL =
        `${window.location.origin}?username=${encodeURIComponent(username)}`;
    // Display the shareable link
    shareableLinkContainers.style.display = 'block';
    shareableLinkElements.href = shareableURL;
    shareableLinkElements.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButtons.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {

        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value =
                username;
            (document.getElementById('name') as HTMLInputElement).value =
                resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value =
                resumeData.email;
            (document.getElementById('mobile') as HTMLInputElement).value =
                resumeData.mobile;
            (document.getElementById('education') as HTMLTextAreaElement).value =
                resumeData.education;
            (document.getElementById('work-experience') as HTMLTextAreaElement).value
                = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value =
                resumeData.skills;
        }
    }
});























