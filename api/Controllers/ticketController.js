import Ticket from "../Models/ticketmodel.js"; // Ensure correct import of Ticket model
import nodemailer from "nodemailer";

const generateTicketNumber = async () => {
  const count = await Ticket.countDocuments();
  return count + 1;
};

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export const submitticket = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const ticketNumber = await generateTicketNumber();
    const newTicket = new Ticket({
      name,
      email,
      message,
      ticketNumber,
    });
    await newTicket.save();
    await sendEmail(
      email,
      "Ticket Confirmation",
      `Thank you for contacting us, ${name}. \n \n Your ticket number is ${ticketNumber}. We will get back to you within 24 hours.`
    );
    res.status(201).json({
      message: `Ticket submitted successfully. Your ticket number is ${ticketNumber}.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getalltickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const replytoticket = async (req, res) => {
  const { ticketId, replyMessage } = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    ticket.reply = replyMessage;
    ticket.status = "Replied";
    await ticket.save();

    await sendEmail(
      ticket.email,
      `Reply to Your Ticket #${ticket.ticketNumber}`,
      `Hello ${ticket.name},\n\n Here is the reply to your ticket: ${replyMessage}`
    );

    res.status(200).json({ message: "Reply sent successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteticket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    res.status(200).json({ message: "Ticket deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
