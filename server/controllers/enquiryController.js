
const db = require("../config/db");
const mailer = require("../config/mailer");

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const createEnquiry = async (req, res, next) => {
  try {
    const {
      name = "",
      phone = "",
      travelDate = "",
      travellers = "",
      email = "",
      destination = "",
      message = "",
    } = req.body;

    const trimmedName = String(name).trim();
    const trimmedPhone = String(phone).trim();
    const trimmedTravelDate = String(travelDate).trim();
    const trimmedTravellers = String(travellers).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedDestination = String(destination).trim();
    const trimmedMessage = String(message).trim();

    // Required fields
    if (
      !trimmedName ||
      !trimmedPhone ||
      !trimmedTravelDate ||
      !trimmedTravellers
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone, travel date and number of travellers are required.",
      });
    }

    // Name validation
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 100 characters.",
      });
    }

    // Phone validation
    if (trimmedPhone.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Phone number cannot exceed 30 characters.",
      });
    }

    // Indian date format: DD/MM/YYYY
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const dateMatch = trimmedTravelDate.match(dateRegex);

    if (!dateMatch) {
      return res.status(400).json({
        success: false,
        message: "Travel date must be in DD/MM/YYYY format.",
      });
    }

    const [, day, month, year] = dateMatch;

    const parsedDate = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day))
    );

    if (
      parsedDate.getUTCDate() !== Number(day) ||
      parsedDate.getUTCMonth() !== Number(month) - 1 ||
      parsedDate.getUTCFullYear() !== Number(year)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid travel date.",
      });
    }

    // Convert DD/MM/YYYY to MySQL YYYY-MM-DD
    const mysqlTravelDate = `${year}-${month}-${day}`;

    // Travellers validation
    if (trimmedTravellers.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Invalid number of travellers.",
      });
    }

    // Optional email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Optional destination validation
    if (trimmedDestination.length > 150) {
      return res.status(400).json({
        success: false,
        message: "Destination cannot exceed 150 characters.",
      });
    }

    // Optional message validation
    if (trimmedMessage.length > 15000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 15000 characters.",
      });
    }

    // Insert enquiry into database
    const [result] = await db.execute(
      `
        INSERT INTO enquiries (
          name,
          phone,
          travel_date,
          travellers,
          email,
          destination,
          message
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        trimmedName,
        trimmedPhone,
        mysqlTravelDate,
        trimmedTravellers,
        trimmedEmail || null,
        trimmedDestination || null,
        trimmedMessage || null,
      ]
    );

    // Escape values for HTML email
    const safeName = escapeHtml(trimmedName);
    const safePhone = escapeHtml(trimmedPhone);
    const safeTravelDate = escapeHtml(trimmedTravelDate);
    const safeTravellers = escapeHtml(trimmedTravellers);
    const safeEmail = escapeHtml(trimmedEmail || "Not provided");
    const safeDestination = escapeHtml(
      trimmedDestination || "Not specified"
    );
    const safeMessage = escapeHtml(
      trimmedMessage || "No additional details"
    );

    // Send notification email when SMTP settings are configured
    if (process.env.SMTP_USER && process.env.CONTACT_EMAIL) {
      await mailer.sendMail({
        from: `"Nestroam" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL
          .split(",")
          .map((email) => email.trim())
          .filter(Boolean),
        replyTo: trimmedEmail || undefined,
        subject: `New Travel Enquiry from ${trimmedName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>New Travel Enquiry</h2>

            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Travel Date:</strong> ${safeTravelDate}</p>
            <p><strong>Travellers:</strong> ${safeTravellers}</p>
            <p><strong>Preferred Destination:</strong> ${safeDestination}</p>

            <p><strong>Additional Requirements:</strong></p>
            <p style="white-space: pre-line;">${safeMessage}</p>
          </div>
        `,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiryId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
};
