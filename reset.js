const resetForm = document.getElementById("resetForm");

if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values and trim spaces
    const email = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    // Frontend validation
    if (!email || !newPassword) {
      alert("Please enter both email and new password.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Call backend API
      const res = await fetch("http://localhost:3000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message); // Success
        window.location.href = "index.html"; // Redirect to login page
      } else {
        alert(data.message); // Show backend error
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Server error. Please try again later.");
    }
  });
}
