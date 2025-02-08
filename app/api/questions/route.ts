import { NextResponse } from "next/server";

const helpCenterData = [
  {
    id: 1,
    title: "How to get Support",
    des: [
      {
        id: 101,
        title: "Contact Support Team",
        des: "You can contact the support team via email or live chat for quick assistance.  Our team is available 24/7 to ensure that all your queries are addressed promptly.  Whether you need help with account setup, troubleshooting issues, or understanding policies, our expert support agents are ready to assist you. Visit the support center to initiate a conversation and get real-time solutions.",
        labels: ["support", "access"],
      },
      {
        id: 102,
        title: "Submit a Ticket",
        des: "For complex issues that require detailed analysis, submit a ticket through our help center portal. When submitting a ticket, provide a detailed description of the issue, including error messages if any.  Our support team will review your request and respond with an appropriate solution or follow-up questions. You can track your ticket’s status in the portal and receive timely updates.  This ensures that your concerns are properly addressed in an organized manner.",
        labels: ["support"],
      },
      {
        id: 103,
        title: "Self-help Resources",
        des: "Access our knowledge base and FAQs for solutions to common problems.",
        labels: ["support", "privacy"],
      },
      {
        id: 104,
        title: "Contact Support Team2",
        des: "You can contact the support team via email or live chat for quick assistance.  Our team is available 24/7 to ensure that all your queries are addressed promptly.  Whether you need help with account setup, troubleshooting issues, or understanding policies, our expert support agents are ready to assist you. Visit the support center to initiate a conversation and get real-time solutions.",
        labels: ["support", "privacy"],
      },
      {
        id: 105,
        title: "Submit a Ticket2",
        des: "For complex issues that require detailed analysis, submit a ticket through our help center portal. When submitting a ticket, provide a detailed description of the issue, including error messages if any.  Our support team will review your request and respond with an appropriate solution or follow-up questions. You can track your ticket’s status in the portal and receive timely updates.  This ensures that your concerns are properly addressed in an organized manner.",
      },
      {
        id: 106,
        title: "Self-help Resources2",
        des: "Access our knowledge base and FAQs for solutions to common problems.",
      },
    ],
  },
  {
    id: 2,
    title: "Community's Access Settings",
    des: [
      {
        id: 201,
        title: "Change Member Roles",
        des: "Learn how to assign roles and permissions to community members.",
        labels: ["access", "security"],
      },
      {
        id: 202,
        title: "Privacy Settings",
        des: "Understand how to set your community to private, public, or restricted.",
        labels: ["privacy", "security"],
      },
    ],
  },
  {
    id: 3,
    title: "Use Keyboard Shortcuts",
    des: [
      {
        id: 301,
        title: "Navigation Shortcuts",
        des: "Quickly navigate through pages using predefined keyboard shortcuts.",
        labels: ["shortcuts", "access"],
      },
      {
        id: 302,
        title: "Customizing Shortcuts",
        des: "Set up your own shortcuts for frequently used actions.",
        labels: ["shortcuts"],
      },
      {
        id: 303,
        title: "Navigation Shortcuts2",
        des: "Quickly navigate through pages using predefined keyboard shortcuts.",
        labels: ["security", "registration"],
      },
      {
        id: 304,
        title: "Customizing Shortcuts2",
        des: "Set up your own shortcuts for frequently used actions.",
        labels: ["shortcuts"],
      },
    ],
  },
  {
    id: 4,
    title: "Forgot your Password?",
    des: [
      {
        id: 401,
        title: "Reset Password",
        des: "Use the 'Forgot Password' link on the login page to reset your password.",
        labels: ["shortcuts"],
      },
      {
        id: 402,
        title: "Password Recovery Email",
        des: "Ensure you have access to the registered email to receive the recovery link.",
        labels: ["security"],
      },
      {
        id: 403,
        title: "Reset Password2",
        des: "Use the 'Forgot Password' link on the login page to reset your password.",
        labels: ["security", "registration"],
      },
      {
        id: 404,
        title: "Password Recovery Email2",
        des: "Ensure you have access to the registered email to receive the recovery link.",
        labels: ["security", "registration"],
      },
    ],
  },
  {
    id: 5,
    title: "Bettermode's Pricing and Plans",
    des: [
      {
        id: 501,
        title: "Available Plans",
        des: "Explore the different pricing tiers and features offered in each plan.",
        labels: ["billing"],
      },
      {
        id: 502,
        title: "Upgrading Plans",
        des: "Learn how to upgrade your plan to unlock additional features.",
        labels: ["billing", "security"],
      },
      {
        id: 503,
        title: "Available Plans2",
        des: "Explore the different pricing tiers and features offered in each plan.",
      },
      {
        id: 504,
        title: "Upgrading Plans2",
        des: "Learn how to upgrade your plan to unlock additional features.",
      },
    ],
  },
  {
    id: 6,
    title: "Accessing your Billing Details",
    des: [
      {
        id: 601,
        title: "View Invoices",
        des: "Access your past invoices and download them for your records.",
        labels: ["billing", "security"],
      },
      {
        id: 602,
        title: "Update Payment Method",
        des: "Learn how to change your payment method to ensure uninterrupted service.",
      },
      {
        id: 603,
        title: "View Invoices2",
        des: "Access your past invoices and download them for your records.",
      },
      {
        id: 604,
        title: "Update Payment Method2",
        des: "Learn how to change your payment method to ensure uninterrupted service.",
      },
    ],
  },
];

export async function GET() {
  return NextResponse.json(helpCenterData);
}
