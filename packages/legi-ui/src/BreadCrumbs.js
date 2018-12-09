import React from "react";
import styled from "styled-components";

const BreadcrumbContainer = styled.span`
  border-right: 1px solid silver;
  padding: 0 10px;
`;

const BreadcrumbsContainer = styled.div`
  ${BreadcrumbContainer}:first-child {
    padding-left: 0;
  }
  ${BreadcrumbContainer}:last-child {
    border-right: 0px;
  }
`;

const Breadcrumbs = ({ items, onClick }) => (
  <BreadcrumbsContainer>
    {items &&
      items.map(p => (
        <BreadcrumbContainer key={p.id}>
          <a href="#" onClick={() => onClick(p)}>
            {p.titre_ta}
          </a>
        </BreadcrumbContainer>
      ))}
  </BreadcrumbsContainer>
);

export default Breadcrumbs;
