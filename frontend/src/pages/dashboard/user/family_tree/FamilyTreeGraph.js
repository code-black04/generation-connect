import React, { useEffect, useRef, useState } from "react";
import f3 from "../../../../component/family-chart/index.js";
import "../../../../component/family-chart/styles/family-chart.css";
import FamilyTreeService from "./FamilyTreeService.js";
import * as d3 from 'd3';  // npm install d3 or yarn add d3
import { stringify, parse } from 'flatted';
import ProfileOverlay from './../profiles/ProfileOverlay';
import AiChatBox from '../../../../component/AIChat/AiChatBox';

const FamilyTreeGraph = ({ data, familyTreeId, userId, userRole }) => {
  const chartRef = useRef();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    // clear previous content before re-render
    chartRef.current.innerHTML = "";

    const f3Chart = f3.createChart("#FamilyChart", data)
      .setTransitionTime(1000)
      .setCardXSpacing(250)
      .setCardYSpacing(150)
      .setOrientationVertical()
      .setSingleParentEmptyCard(true, { label: "ADD" });

    const f3Card = f3Chart.setCard(f3.CardHtml)
      .setCardDisplay([["firstName", "lastName"], ["birthdate"]])
      .setCardDim({})
      .setMiniTree(true)
      .setStyle("imageRect")
      .setOnHoverPathToMain();

      const fields = [
        { id: "firstName", label: "First Name", type: "text" },
        { id: "lastName", label: "Last Name", type: "text" },
        { id: "gender", label: "Gender", type: "text" },
        { id: "label", label: "Label", type: "text" },
        { id: "desc", label: "Description", type: "textarea" },
        { id: "birthdate", label: "Birth Date (format:yyyy-mm-dd)", type: "text" },
        { id: "demiseDate", label: "Demise Date (format:yyyy-mm-dd)", type: "text" },
        { id: "avatar", label: "Avatar", type: "text" },
        { id: "countryOfCitizenship", label: "Country Of Citizenship", type: "text" },
        { id: "awardReceived", label: "Award Received", type: "text" },
        { id: "placeOfBirth", label: "Place Of Birth", type: "text" },
        { id: "educatedAt", label: "Educated At", type: "text" },
        { id: "occupation", label: "Occupation", type: "text" },
        { id: "positionHeld", label: "Position Held", type: "text" },
        { id: "employer", label: "Employer", type: "text" },
        { id: "residence", label: "Residence", type: "text" },
        { id: "languagesSpokenWritten", label: "Languages Spoken Written", type: "text" },
        { id: "significantEvent", label: "Significant Event", type: "textarea" },
        { id: "ownerOf", label: "Owner Of", type: "text" }
      ];

    const f3EditTree = f3Chart.editTree()
      .fixed(true)
      .setFields(fields)
      .setEditFirst(false)
      .setOnChange(props => {
        console.log("tree onchange " + props);
      }).setDatumCallback(async(d,props, isAddRelative) => {
        console.log("setDatumCallback " + JSON.stringify(d));
         console.log("setDatumCallback props" + JSON.stringify(props));
         console.log("setDatumCallback isAddRelative" + JSON.stringify(isAddRelative));
         console.log("setDatumCallback userId" + userId);
        if(props && props.delete){
          await FamilyTreeService.deletePerson(userId, familyTreeId, d.id);
          return;
        }
        await FamilyTreeService.updatePerson(userId, familyTreeId, d);
      });

    console.log("USER_ROLE", userRole)
    const allowEdit = userRole === "Owner" || userRole === "Contributor";

    if(allowEdit) {
      f3EditTree.setEdit();
      f3Card.setOnCardClick((e, d) => {
          console.log("onCardClick", d);
        f3EditTree.open(d);
        if (f3EditTree.isAddingRelative()) return;
        f3Card.onCardClickDefault(e, d);
      });
    } else {
      // View-only interaction
      f3Card.setOnCardClick((e, d) => {
        console.log("onCardClick (view-only)", d);
        f3Card.onCardClickDefault(e, d);
      });
    }

    if (f3Card) {
          f3Card.setOnProfileButtonClick((e, d) => {
            console.log('Profile clicked:', d.data);
            setProfileData(d.data);
            setIsProfileOpen(true);
          });
        }
    f3Chart.updateTree({ initial: true });
    if(allowEdit) {
      f3EditTree.open(f3Chart.getMainDatum());
    }
  }, [data]);

  return (
    <div>
            <div  id="FamilyChartAIChat">
      <AiChatBox familyTreeData={data}/>
    </div>
      <div
        id="overlay-message"
        style={{
          display: "none",
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#ffd37e",
          color: "#4a4a55",
          padding: "12px 16px",
          border: "1px solid #eeb549",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          zIndex: 1000,
          alignItems: "center",
          gap: "10px",
          flexDirection: "row",
        }}
      >
        <span id="overlay-text">Overlay message</span>
        <button
          id="overlay-close"
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#4a4a55",
          }}
          onClick={() => {
            const overlay = document.getElementById("overlay-message");
            if (overlay) overlay.style.display = "none";
          }}
        >
          ×
        </button>
      </div>
    <div
      className="f3 f3-cont"
      id="FamilyChart"
      ref={chartRef}
      style={{ width: "100%", height: "900px", margin: "auto", textAlign: "left" }}
    >
      {isProfileOpen && (
    <ProfileOverlay
        onClose={() => setIsProfileOpen(false)}
        profileData={profileData}
        userRole={userRole}
        familyTreeId={familyTreeId}
      />
      )}
    </div>
    </div>
  );
};

export default FamilyTreeGraph;
