import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

function ResourcesPage() {
  const navigate = useNavigate();

  const onBackToHomepage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const sections = [
    {
      title: "Existing Family Tree Applications (Market Alternatives)",
      content: (
        <>
          <ul style={{ paddingLeft: "1.25rem" }}>
            <li><strong>Confinity:</strong> Family history preservation platform.</li>
            <li><strong>iMeUsWe:</strong> Rooted in Indian heritage, combining family connections with knowledge.</li>
            <li><strong>Ancestry:</strong> Widely used for genealogy and historical records.</li>
            <li><strong>Gramps:</strong> A feature-rich, open-source genealogy tool that supports extensive data modelling
            and research tracking.</li>
          </ul>
          <p>
            Generation Connect aims to combine the best of both family tree building and research tools in one
            platform. Unlike other applications, it emphasizes both visual genealogy and deep historical integration.
          </p>
        </>
      )
    },
    {
      title: "Need for a Family-Centric Application",
      content: (
        <p>
          Current social platforms (Facebook, WhatsApp, Instagram) are not designed for family privacy. Generation
          Connect introduces a structured relationship model ("father of", "mother of") to ensure secure,
          relationship-based communication.
        </p>
      )
    },
    {
      title: "Integration of External Research Tools",
      content: (
        <ul style={{ paddingLeft: "1.25rem" }}>
          <li>
            <strong>National Archives – UK:</strong>
            <ul>
              <li>Website: <a href="https://discovery.nationalarchives.gov.uk" target="_blank" rel="noreferrer">Discovery</a></li>
              <li>API: <a href="https://www.nationalarchives.gov.uk/help/discovery-for-developers-about-the-application-programming-interface-api" target="_blank" rel="noreferrer">API Docs</a></li>
            </ul>
          </li>
          <li>
            <strong>National Archives – USA:</strong>
            <ul>
              <li>Website: <a href="https://www.archives.gov/research/start/online-tools" target="_blank" rel="noreferrer">National Archives Catalog</a></li>
              <li>API: <a href="https://catalog.archives.gov/api/v2/api-docs" target="_blank" rel="noreferrer">API Docs</a></li>
            </ul>
          </li>
        </ul>
      )
    },
    {
      title: "External Library – Used to Create Interactive Family Tree",
      content: (
        <p>
          Family Chart – An interactive family tree visualization library, available on GitHub:{" "}
          <a
            href="https://github.com/donatso/family-chart"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/donatso/family-chart
          </a>
        </p>
      )
    },    
    {
      title: "References",
      content: (
        <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.75" }}>
          <li>“Generations Connect: A Collaborative Family History Platform,” University of Leicester, By P. Severi. Available: <a href="https://campus.cs.le.ac.uk/teaching/proposals/v23626.generations_connect_a_collaborative_family_history_platform" target="_blank" rel="noreferrer">https://campus.cs.le.ac.uk/teaching/proposals/v23626...</a> [Accessed: 27-Feb-2025]</li>
          <li>"Intergenerational projects to preserve family heritage," Assisted Living Locators, By Katie Krupka. <a href="https://assistedlivinglocators.com/articles/intergenerational-projects-to-preserve-family-heritage" target="_blank" rel="noreferrer">https://assistedlivinglocators.com/articles/...</a> [Accessed: 27-Apr-2025]</li>
          <li>"3 places to share family history documents and images online," Family Tree Magazine, By Sunny Jane Morton. <a href="https://familytreemagazine.com/storytelling/3-places-to-share-family-history-documents-and-images-online" target="_blank" rel="noreferrer">https://familytreemagazine.com/storytelling/3-places...</a> [Accessed: 27-Apr-2025]</li>
          <li>"What Is Genealogy Software?" Evidentia Software, By Edward Thompson. <a href="https://evidentiasoftware.com/genealogy-software-best-features-benefit" target="_blank" rel="noreferrer">https://evidentiasoftware.com/genealogy-software-best...</a> [Accessed: 27-Apr-2025]</li>
          <li>"How to Organize Your Family History Research," Evidentia Software. <a href="https://evidentiasoftware.com/family-genealogy-software-research" target="_blank" rel="noreferrer">https://evidentiasoftware.com/family-genealogy...</a> [Accessed: 27-Apr-2025]</li>
          <li>"How to Choose the Best Genealogy Software," Evidentia Software. <a href="https://evidentiasoftware.com/choose-best-genealogy-software-for-family" target="_blank" rel="noreferrer">https://evidentiasoftware.com/choose-best...</a> [Accessed: 27-Apr-2025]</li>
          <li>"How Tree Genealogy Software Can Help You Discover Long-Lost Relatives," Evidentia Software. <a href="https://evidentiasoftware.com/how-tree-genealogy-software-can-help" target="_blank" rel="noreferrer">https://evidentiasoftware.com/how-tree...</a> [Accessed: 27-Apr-2025]</li>
          <li>"Discovery Platform", The National Archives (UK). <a href="https://discovery.nationalarchives.gov.uk" target="_blank" rel="noreferrer">https://discovery.nationalarchives.gov.uk</a> [Accessed: 27-Apr-2025]</li>
          <li>"API Guide," The National Archives (UK). <a href="https://www.nationalarchives.gov.uk/help/discovery-for-developers-about-the-application-programming-interface-api" target="_blank" rel="noreferrer">https://www.nationalarchives.gov.uk/help/discovery...</a> [Accessed: 27-Apr-2025]</li>
          <li>"API Documentation - UK," National Archives. <a href="https://discovery.nationalarchives.gov.uk/API/sandbox/index#!/SearchRecords/SearchRecords_GetRecords" target="_blank" rel="noreferrer">https://discovery.nationalarchives.gov.uk/API/...</a> [Accessed: 27-Apr-2025]</li>
          <li>"Online Research Tools," National Archives (USA). <a href="https://www.archives.gov/research/start/online-tools" target="_blank" rel="noreferrer">https://www.archives.gov/research/start/online-tools</a> [Accessed: 27-Apr-2025]</li>
          <li>"National Archives Catalog," USA. <a href="https://catalog.archives.gov" target="_blank" rel="noreferrer">https://catalog.archives.gov</a> [Accessed: 27-Apr-2025]</li>
          <li>"Swagger API Docs," USA. <a href="https://catalog.archives.gov/api/v2/api-docs" target="_blank" rel="noreferrer">https://catalog.archives.gov/api/v2/api-docs</a> [Accessed: 27-Apr-2025]</li>
          <li>"Confinity - Family Tree Application," Confinity. <a href="https://www.confinity.com/culture/best-online-platforms-for-family-history-preservation" target="_blank" rel="noreferrer">https://www.confinity.com/culture/best-online...</a> [Accessed: 27-Apr-2025]</li>
          <li>"iMeUsWe - Indian Heritage Family Tree," iMeUsWe. <a href="https://www.imeuswe.in/the-future-of-genealogy-how-to-create-family-tree-using-imeuswe" target="_blank" rel="noreferrer">https://www.imeuswe.in/the-future-of-genealogy...</a> [Accessed: 27-Apr-2025]</li>
          <li>"Ancestry - Family History and Genealogy," Ancestry.com. <a href="https://www.ancestry.com" target="_blank" rel="noreferrer">https://www.ancestry.com</a> [Accessed: 27-Apr-2025]</li>
          <li>"Features – Gramps Project," Gramps Blog. <a href="https://gramps-project.org/blog/features/" target="_blank" rel="noreferrer">https://gramps-project.org/blog/features/</a> [Accessed: 15-May-2025]</li>
          <li>Luiz G. Costa, “Dockerize Spring Boot + React Apps,” Medium. <a href="https://luizcostatech.medium.com/how-to-dockerize-spring-boot-react-apps-1a4aea1acc44" target="_blank" rel="noreferrer">https://luizcostatech.medium.com/how-to-dockerize...</a> [Accessed: 27-Apr-2025]</li>
          <li>"Docker Overview," Docker Docs. <a href="https://docs.docker.com/get-started/docker-overview/" target="_blank" rel="noreferrer">https://docs.docker.com/get-started/docker-overview/</a> [Accessed: 27-Apr-2025]</li>
          <li>"Family Chart – Interactive Family Tree Library," GitHub. <a href="https://github.com/donatso/family-chart" target="_blank" rel="noreferrer">https://github.com/donatso/family-chart</a> [Accessed: 15-May-2025]</li>
          <li>Sidharth M., “NGINX and Concurrent Requests,” Medium. <a href="https://medium.com/@_sidharth_m_/how-nginx-handles-thousands-of-concurrent-requests-202ca1a1cc44" target="_blank" rel="noreferrer">https://medium.com/@_sidharth_m_/how-nginx-handles...</a> [Accessed: 15-May-2025]</li>
          <li>"NGINX as a Reverse Proxy," Docs. <a href="https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/" target="_blank" rel="noreferrer">https://docs.nginx.com/nginx/admin-guide/web-server...</a> [Accessed: 15-May-2025]</li>
          <li>"MVC Framework - Introduction," GeeksforGeeks. <a href="https://www.geeksforgeeks.org/mvc-framework-introduction/" target="_blank" rel="noreferrer">https://www.geeksforgeeks.org/mvc-framework-introduction/</a> [Accessed: 15-May-2025]</li>
          <li>"OpenAI API Documentation," OpenAI Platform. <a href="https://platform.openai.com/docs/api-reference/introduction" target="_blank" rel="noreferrer">https://platform.openai.com/docs/api-reference/introduction</a> [Accessed: 15-May-2025]</li>

          <li>"Gemini API Quickstart," Google AI. <a href="https://ai.google.dev/gemini-api/docs/quickstart?lang=apps-script" target="_blank" rel="noreferrer">https://ai.google.dev/gemini-api/docs/quickstart?lang=apps-script</a> [Accessed: 15-May-2025]</li>

          <li>"Google GenAI Java Client Javadoc," Google APIs. <a href="https://googleapis.github.io/java-genai/javadoc/" target="_blank" rel="noreferrer">https://googleapis.github.io/java-genai/javadoc/</a> [Accessed: 15-May-2025]</li>

          <li>"OpenAI via RapidAPI," RapidAPI Marketplace. <a href="https://rapidapi.com/mnai01/api/openai37" target="_blank" rel="noreferrer">https://rapidapi.com/mnai01/api/openai37</a> [Accessed: 15-May-2025]</li>

          <li>"OpenAI Integrations with RapidAPI," Pipedream. <a href="https://pipedream.com/apps/openai/integrations/rapidapi" target="_blank" rel="noreferrer">https://pipedream.com/apps/openai/integrations/rapidapi</a> [Accessed: 15-May-2025]</li>

          <li>"RapidAPI Hub - Getting Started Guide," Medium, By API4AI. <a href="https://medium.com/@API4AI/rapid-api-hub-the-step-by-step-guide-to-subscribing-and-starting-with-an-api-ea5387269dfe" target="_blank" rel="noreferrer">https://medium.com/@API4AI/rapid-api-hub...</a> [Accessed: 15-May-2025]</li>

        </ul>
      )
    }
    
       
  ];
  

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc, rgb(179, 161, 201))"
    }}
    >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            paddingLeft: "3rem",
            paddingRight: "2rem",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            lineHeight: 1.7,
            color: "#2d3748",
            textAlign: "left"
          }}
        >
        
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

        <h1 style={{ fontSize: "1.75rem", color: "rgb(30, 158, 107)", marginBottom: "1.5rem" }}>
          Resources & References
        </h1>

        {sections.map((section, index) => (
          <section key={index} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", color: "#4f3d60", marginBottom: "0.5rem" }}>
              {index + 1}. {section.title}
            </h2>
            {section.content}
          </section>
        ))}
    </div>
    </div>
  );
}

export default ResourcesPage;
