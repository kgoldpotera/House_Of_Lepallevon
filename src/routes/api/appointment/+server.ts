import { json, type RequestHandler } from "@sveltejs/kit";
import { Resend } from "resend";
import { env } from "$env/dynamic/private";

// Check if RESEND_API_KEY is available and throw an error if not
if (!env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set in environment variables.");
}

const resend = new Resend(env.RESEND_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
  try {
    // --- FIX: Use formData() to read data from the Svelte form ---
    const data = await request.formData();

    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();
    const phone = data.get("phone")?.toString() || "N/A";
    const preferredDate = data.get("preferredDate")?.toString() || "N/A"; // Corrected name
    const preferredTime = data.get("preferredTime")?.toString() || "N/A"; // Corrected name
    const message = data.get("message")?.toString() || "(none provided)";

    // Basic validation
    if (!name || !email) {
      return json(
        { success: false, message: "Name and Email are required." },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "Appointments <appointments@neemacarellc.org>",
      to: ["koechmanoah32@gmail.com"],
      subject: "New Appointment Request",
      html: `
                <h2>New Appointment Booking</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Preferred Date:</strong> ${preferredDate} at ${preferredTime}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
    });

    return json({ success: true, result });
  } catch (error) {
    console.error("Email error:", error);
    // Cast error for better logging/response if it's an object
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown server error occurred.";
    return json({ success: false, message: errorMessage }, { status: 500 });
  }
};
