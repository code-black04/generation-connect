import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

function FaqsPage() {
  const navigate = useNavigate();

  const onBackToHomepage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        padding: "2rem",
        
        color: "#384152",
        textAlign: "left",
        background: "linear-gradient(135deg, #f8fafc,rgb(179, 161, 201))"
        
      }}
    >
      {/* Back button */}
      <button
        onClick={onBackToHomepage}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "#3f314f",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "4px",
          padding: "6px 12px",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer",
          marginBottom: "1.5rem",
          boxShadow: "0 2px 6px rgba(210, 202, 202, 0.1)",
          transition: "background 0.3s ease"
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = "rgb(140, 110, 174)"}
        onMouseOut={e => e.currentTarget.style.backgroundColor = "#3f314f"}
      >
        <Home size={16} />
        Back to Homepage
      </button>

      <h1 style={{ fontSize: "1.75rem", color:"rgb(30, 158, 107)", marginBottom: "2rem", fontWeight: "bold" }}>
        Frequently Asked Questions
      </h1>

      {/* FAQ Sections */}
      {faqData.map((faq, index) => (
        <section
          key={index}
          style={{
            marginBottom: "2.5rem",
            borderLeft: "4px solid #94C7B3",
            paddingLeft: "1rem"
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              color: "#4f3d60",
              fontWeight: 600,
              marginBottom: "0.5rem"
            }}
          >
            {index + 1}. {faq.question}
          </h2>

          <p
            style={{ color: "#384152", fontSize: "1rem", margin: 0 }}
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </section>
      ))}
    </div>
  );
}

const faqData = [
  {
    question: "How do I create a family tree?",
    answer:
      'To create a new family tree, go to the “Your Genealogy” menu and select “Create New Genealogy.” Fill in the family name, a description, and choose the access level (Private or Public), then click “Create Family Tree.”',
  },
  {
    question: "Who can see my private family tree?",
    answer:
      'Private family trees are only visible to the creator and any users the owner explicitly grants access to by adding them or inviting them via email using the "Manage Users" tab of the selected family tree.',
  },
  {
    question: "Can I make my family tree public later?",
    answer:
      "No, currently we do not provide the option to switch a tree from Private to Public after creation.",
  },
  {
    question: "How do I delete a family tree?",
    answer:
      'Click on the red trash icon at the top-right corner of your family tree card. A confirmation prompt will appear before deletion.',
  },
  {
    question: "What’s the difference between Private and Public trees?",
    answer:
      '<strong>Private Tree</strong> – Only accessible/contributed by the Owner and invited users based on their assigned access role.<br/> <strong>Public Tree</strong> – Viewable by anyone on the platform, but only Contributors and Owners can make changes or add content.',
  },
  {
    question: "Can I add photos or stories to family members?",
    answer:
      "Yes! Click on a person’s node to open their profile panel. From there, you can add a post with text, images, or files directly related to that individual.",
  },
  {
    question: "What types of media can I upload?",
    answer:
      "Supported file formats include: PDF, audio, video, JPG, JPEG, PNG, CSV, ZIP, and plain text. Uploads can be made via the Family Profile tab, the Historical Documents tab, or an individual person’s profile panel.",
  },
  {
    question: "How do I invite family members to collaborate?",
    answer:
      'Inside your family tree, go to the Manage Users tab. Add the user’s email and assign a role (Owner, Contributor, or Viewer). They’ll receive an invitation to join the tree.',
  },
  {
    question: "What’s the difference between Owner and Contributor?",
    answer:
      '<strong>Owner</strong> – Full control over the tree, including editing, managing members, and deleting.<br/><strong>Contributor</strong> – Can add and edit family members and content but cannot manage access.',
  },
  {
    question: "How do I search historical records?",
    answer:
      "Use the Genealogical Research tab to search national archives like The National Archive (UK). You can filter by name, date, and location, and tag records to link them with your tree.",
  },
  {
    question: "Can I keep my family tree private?",
    answer:
      "Absolutely. Trees are private by default unless you switch it as Public Tree while creating it. Only users you add/invite will be able to view or contribute, based on their assigned roles.",
  },
  {
    question: "Is Generations Connect free to use?",
    answer:
      "Currently all the features are free to use. Premium features—such as extended archive integrations or expanded media storage — may become part of a future subscription plan.",
  }
];


export default FaqsPage;
