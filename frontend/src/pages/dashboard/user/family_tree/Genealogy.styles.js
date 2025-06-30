// GenealogyTree.styles.js
import styled from "styled-components";

export const GenealogyTreeWrapper = styled.div`
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    margin: auto;

    button {
        background-color: #ff4747;
        color: white;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 5px;
        font-size: 14px;
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
`;