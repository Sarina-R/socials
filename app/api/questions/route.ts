import { NextResponse } from "next/server";

const helpCenterData = [
  {
    id: 1,
    title: "How to get Support",
    des: [
      {
        title: "Contact Support Team",
        des: "You can contact the support team via email or live chat for quick assistance.",
        labels: ["support", "access"],
      },
      {
        title: "Submit a Ticket",
        des: "For complex issues, submit a ticket through the help center portal.",
        labels: ["support"],
      },
      {
        title: "Self-help Resources",
        des: "Access our knowledge base and FAQs for solutions to common problems.",
        labels: ["support", "privacy"],
      },
      {
        title: "Contact Support Team2",
        des: "You can contact the support team via email or live chat for quick assistance.",
        labels: ["support", "privacy"],
      },
      {
        title: "Submit a Ticket2",
        des: "For complex issues, submit a ticket through the help center portal.",
      },
      {
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
        title: "Change Member Roles",
        des: "Learn how to assign roles and permissions to community members.",
        labels: ["access", "security"],
      },
      {
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
        title: "Navigation Shortcuts",
        des: "Quickly navigate through pages using predefined keyboard shortcuts.",
        labels: ["shortcuts", "access"],
      },
      {
        title: "Customizing Shortcuts",
        des: "Set up your own shortcuts for frequently used actions.",
        labels: ["shortcuts"],
      },
      {
        title: "Navigation Shortcuts2",
        des: "Quickly navigate through pages using predefined keyboard shortcuts.",
        labels: ["security", "registration"],
      },
      {
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
        title: "Reset Password",
        des: "Use the 'Forgot Password' link on the login page to reset your password.",
        labels: ["shortcuts"],
      },
      {
        title: "Password Recovery Email",
        des: "Ensure you have access to the registered email to receive the recovery link.",
        labels: ["security"],
      },
      {
        title: "Reset Password2",
        des: "Use the 'Forgot Password' link on the login page to reset your password.",
        labels: ["security", "registration"],
      },
      {
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
        title: "Available Plans",
        des: "Explore the different pricing tiers and features offered in each plan.",
        labels: ["billing"],
      },
      {
        title: "Upgrading Plans",
        des: "Learn how to upgrade your plan to unlock additional features.",
        labels: ["billing", "security"],
      },
      {
        title: "Available Plans2",
        des: "Explore the different pricing tiers and features offered in each plan.",
      },
      {
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
        title: "View Invoices",
        des: "Access your past invoices and download them for your records.",
        labels: ["billing", "security"],
      },
      {
        title: "Update Payment Method",
        des: "Learn how to change your payment method to ensure uninterrupted service.",
      },
      {
        title: "View Invoices2",
        des: "Access your past invoices and download them for your records.",
      },
      {
        title: "Update Payment Method2",
        des: "Learn how to change your payment method to ensure uninterrupted service.",
      },
    ],
  },
];

export async function GET() {
  return NextResponse.json(helpCenterData);
}
